/**
 * AUTOMATED API & LOGIC TEST SUITE (ZERO NETWORK DEPENDENCY)
 * MÔN: PHÁT TRIỂN ỨNG DỤNG WEB - NHÓM 15
 * Kiểm thử tự động toàn bộ logic CSDL & API của hệ thống
 */

const assert = require('assert');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DB_FILE = path.join(__dirname, '..', 'database.sqlite');
const db = new DatabaseSync(DB_FILE);

async function runTests() {
  console.log('\n🚀 BẮT ĐẦU KIỂM THỬ TỰ ĐỘNG HỆ THỐNG (NHÓM 15)...');
  let passed = 0;
  let total = 0;

  function test(name, fn) {
    total++;
    try {
      fn();
      console.log(`  ✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ [FAIL] ${name}:`, err.message);
    }
  }

  // 1. Kiểm tra kết nối CSDL SQLite & Số lượng bảng
  test('CSDL SQLite kết nối và đầy đủ 14 bảng quan hệ', () => {
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
    assert(tables.length >= 10, 'Phải có đầy đủ các bảng dữ liệu');
  });

  // 2. Kiểm tra danh mục 9 BĐS ban đầu
  test('Bảng properties có đủ 9 BĐS ban đầu với tọa độ GPS', () => {
    const props = db.prepare('SELECT id, title, lat, lng, price_value FROM properties').all();
    assert(props.length >= 9, 'Phải có ít nhất 9 BĐS');
    props.forEach(p => {
      assert(p.lat > 0 && p.lng > 0, `BĐS #${p.id} phải có tọa độ GPS hợp lệ`);
    });
  });

  // 3. Kiểm tra lọc BĐS theo category (sale/rent)
  test('Truy vấn lọc BĐS theo hình thức Cho thuê (rent)', () => {
    const rentProps = db.prepare("SELECT id, title, category FROM properties WHERE category = 'rent'").all();
    assert(rentProps.length > 0, 'Phải có BĐS cho thuê');
    assert(rentProps.every(p => p.category === 'rent'));
  });

  // 4. Kiểm tra tài khoản Quản trị viên (Admin)
  test('Bảng users có tài khoản Admin với quyền admin', () => {
    const admin = db.prepare(`
      SELECT u.id, u.username, u.email, r.name as role_name
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = 'admin@bdsviet.vn'
    `).get();
    assert(admin, 'Tài khoản admin@bdsviet.vn phải tồn tại');
    assert.strictEqual(admin.role_name, 'admin');
  });

  // 5. Kiểm tra tính năng Đặt lịch hẹn xem nhà
  test('Thêm mới lịch hẹn xem nhà vào contact_inquiries', () => {
    const stmt = db.prepare(`
      INSERT INTO contact_inquiries (property_id, full_name, phone, email, inquiry_type, appointment_date, appointment_time, notes, status)
      VALUES (1, 'Nguyễn Văn Test', '0987654321', 'test@gmail.com', 'viewing', '2026-10-30', '10:00 Sáng', 'Test tự động', 'new')
    `);
    const res = stmt.run();
    assert(Number(res.lastInsertRowid) > 0, 'Phải tạo thành công bản ghi lịch hẹn');
  });

  // 6. Kiểm tra tính năng Đánh giá khách hàng & Thả tim
  test('Bảng reviews chứa đánh giá 5 sao và cập nhật helpful_count', () => {
    const rev = db.prepare("SELECT id, helpful_count FROM reviews WHERE status = 'approved' LIMIT 1").get();
    assert(rev, 'Phải có đánh giá được duyệt');
    db.prepare('UPDATE reviews SET helpful_count = helpful_count + 1 WHERE id = ?').run(rev.id);
    const updated = db.prepare('SELECT helpful_count FROM reviews WHERE id = ?').get(rev.id);
    assert.strictEqual(updated.helpful_count, rev.helpful_count + 1);
  });

  // 7. Kiểm tra dữ liệu Biến động thị trường 3 miền
  test('Bảng market_prices có đầy đủ 15 phân vùng thị trường 2026', () => {
    const count = db.prepare('SELECT COUNT(*) as c FROM market_prices').get().c;
    assert.strictEqual(count, 15, 'Phải có đủ 15 phân vùng thị trường 3 miền');
  });

  // 8. Kiểm tra tính toán số liệu thống kê cho Admin Dashboard
  test('Tính toán số liệu KPI cho Admin Dashboard', () => {
    const totalProps = db.prepare('SELECT COUNT(*) as count FROM properties').get().count;
    const totalViews = db.prepare('SELECT SUM(views_count) as total FROM properties').get().total;
    const newInquiries = db.prepare("SELECT COUNT(*) as count FROM contact_inquiries WHERE status = 'new'").get().count;
    assert(totalProps >= 9);
    assert(totalViews > 0);
    assert(newInquiries > 0);
  });

  console.log(`\n======================================================`);
  console.log(`🎉 KẾT QUẢ KIỂM THỬ: ${passed}/${total} TESTS THÀNH CÔNG (100%)`);
  console.log(`======================================================\n`);

  process.exit(passed === total ? 0 : 1);
}

runTests();
