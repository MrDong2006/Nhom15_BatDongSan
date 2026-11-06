/**
 * =====================================================================================
 * HỆ THỐNG BACKEND SERVER - BĐS MINH VƯƠNG HOME LUXURY (NHÓM 15)
 * MÔN HỌC: PHÁT TRIỂN ỨNG DỤNG WEB (WEB APPLICATION DEVELOPMENT)
 * =====================================================================================
 * Công nghệ: Node.js (v24+), Express.js, SQLite 3 (node:sqlite native), RESTful API
 * Tác giả: Nhóm 15
 * Phiên bản: 2.5.0
 * =====================================================================================
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { DatabaseSync } = require('node:sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'database.sqlite');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Phục vụ toàn bộ các trang giao diện tĩnh (HTML, CSS, JS, Images)
app.use(express.static(__dirname));

// =====================================================================================
// KHỞI TẠO CƠ SỞ DỮ LIỆU SQLITE
// =====================================================================================
let db;
try {
  db = new DatabaseSync(DB_FILE);
  
  // Tự động kiểm tra và khởi tạo dữ liệu 14 bảng nếu CSDL mới hoặc trống
  const checkTable = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name = 'properties'").get();
  if (!checkTable) {
    console.log('[DB] Phát hiện CSDL mới, đang tự động nạp cấu trúc 14 bảng và hạt giống dữ liệu...');
    db.close();
    require('./init_sqlite.js');
    db = new DatabaseSync(DB_FILE);
  }
} catch (err) {
  console.error('[DB] Lỗi kết nối CSDL SQLite:', err.message);
  process.exit(1);
}

// Bật Foreign Keys
db.exec('PRAGMA foreign_keys = ON;');

// Helper lấy danh sách ảnh của BĐS
function getPropertyImages(propertyId) {
  const stmt = db.prepare('SELECT image_url, is_primary, sort_order FROM property_images WHERE property_id = ? ORDER BY is_primary DESC, sort_order ASC');
  return stmt.all(propertyId);
}

// Helper lấy danh sách đặc điểm nổi bật
function getPropertyFeatures(propertyId) {
  const stmt = db.prepare('SELECT feature_text FROM property_features WHERE property_id = ?');
  return stmt.all(propertyId).map(r => r.feature_text);
}

// Helper lấy danh sách tiện ích ngoại khu
function getPropertyAmenities(propertyId) {
  const stmt = db.prepare('SELECT name, dist, icon FROM property_amenities WHERE property_id = ?');
  return stmt.all(propertyId);
}

// Helper lấy chi tiết môi giới phụ trách
function getAgentInfo(agentId) {
  const stmt = db.prepare('SELECT id, full_name, email, phone, zalo, avatar, title, company, bio, is_verified FROM users WHERE id = ?');
  return stmt.get(agentId);
}

// =====================================================================================
// RESTFUL API ENDPOINTS
// =====================================================================================

// -------------------------------------------------------------------------------------
// 1. HEALTH CHECK & THÔNG TIN HỆ THỐNG
// -------------------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    project: 'BĐS Minh Vương Home Luxury - Nhóm 15',
    course: 'Phát triển ứng dụng Web',
    version: '2.5.0',
    timestamp: new Date().toISOString()
  });
});

// -------------------------------------------------------------------------------------
// 2. AUTHENTICATION & TÀI KHOẢN (ĐĂNG NHẬP / ĐĂNG KÝ / LẤY THÔNG TIN)
// -------------------------------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng nhập email và mật khẩu!' });
    }

    const stmt = db.prepare(`
      SELECT u.id, u.username, u.email, u.full_name, u.phone, u.zalo, u.avatar, u.title, u.company, u.is_verified, u.status, r.name as role_name, r.display_name as role_display
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.email = ? OR u.username = ?
    `);
    const user = stmt.get(email.trim(), email.trim());

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Tài khoản không tồn tại trên hệ thống!' });
    }

    if (user.status === 'locked') {
      return res.status(403).json({ status: 'error', message: 'Tài khoản này đã bị tạm khóa bởi Quản trị viên!' });
    }

    // Đối với môi trường thực tập môn học: chấp nhận pass mẫu hoặc kiểm tra
    // Trả về token mô phỏng & thông tin user
    const token = `jwt_token_${user.id}_${Date.now()}`;

    res.json({
      status: 'success',
      message: `Chào mừng ${user.full_name} đã đăng nhập thành công!`,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        name: user.full_name,
        phone: user.phone,
        zalo: user.zalo,
        avatar: user.avatar,
        title: user.title,
        company: user.company,
        role: user.role_name,
        roleDisplay: user.role_display,
        isVerified: !!user.is_verified
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.post('/api/auth/register', (req, res) => {
  try {
    const { fullName, email, phone, role, password } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng điền đầy đủ các trường bắt buộc!' });
    }

    // Kiểm tra email trùng
    const checkStmt = db.prepare('SELECT id FROM users WHERE email = ?');
    if (checkStmt.get(email.trim())) {
      return res.status(400).json({ status: 'error', message: 'Địa chỉ Email này đã được đăng ký!' });
    }

    const roleId = (role && role.includes('Môi giới')) ? 2 : 3;
    const username = email.split('@')[0] + '_' + Math.floor(Math.random() * 1000);
    const avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';

    const insertStmt = db.prepare(`
      INSERT INTO users (role_id, username, email, password_hash, full_name, phone, avatar, title, is_verified, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 'active')
    `);

    const result = insertStmt.run(
      roleId,
      username,
      email.trim(),
      '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
      fullName.trim(),
      phone.trim(),
      avatar,
      roleId === 2 ? 'Chuyên viên Môi giới' : 'Thành viên cá nhân'
    );

    res.status(201).json({
      status: 'success',
      message: 'Tạo tài khoản thành viên thành công!',
      userId: Number(result.lastInsertRowid)
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// -------------------------------------------------------------------------------------
// 3. API BẤT ĐỘNG SẢN (PROPERTIES) - DANH SÁCH, LỌC, CHI TIẾT, THÊM, SỬA, XÓA
// -------------------------------------------------------------------------------------
app.get('/api/properties', (req, res) => {
  try {
    const { keyword, category, city, type, minPrice, maxPrice, minArea, maxArea, sort, limit } = req.query;

    let sql = `
      SELECT p.*, pt.code as type_code, pt.name as type_name_ref, loc.code as city_code, loc.name as city_name,
             u.full_name as agent_name, u.phone as agent_phone, u.email as agent_email, u.avatar as agent_avatar,
             proj.name as project_name
      FROM properties p
      LEFT JOIN property_types pt ON p.type_id = pt.id
      LEFT JOIN locations loc ON p.location_id = loc.id
      LEFT JOIN users u ON p.agent_id = u.id
      LEFT JOIN projects proj ON p.project_id = proj.id
      WHERE 1=1
    `;
    const params = [];

    // Bộ lọc từ khóa
    if (keyword && keyword.trim() !== '') {
      sql += ` AND (p.title LIKE ? OR p.address LIKE ? OR p.district LIKE ? OR proj.name LIKE ?)`;
      const kw = `%${keyword.trim()}%`;
      params.push(kw, kw, kw, kw);
    }

    // Bộ lọc mua bán / cho thuê
    if (category && category !== 'all') {
      sql += ` AND p.category = ?`;
      params.push(category);
    }

    // Bộ lọc theo Tỉnh thành
    if (city && city !== 'all') {
      sql += ` AND loc.code = ?`;
      params.push(city);
    }

    // Bộ lọc theo Loại hình
    if (type && type !== 'all') {
      sql += ` AND (pt.code = ? OR p.category = ?)`;
      params.push(type, type);
    }

    // Bộ lọc khoảng giá
    if (minPrice) {
      sql += ` AND p.price_value >= ?`;
      params.push(Number(minPrice));
    }
    if (maxPrice) {
      sql += ` AND p.price_value <= ?`;
      params.push(Number(maxPrice));
    }

    // Bộ lọc diện tích
    if (minArea) {
      sql += ` AND p.area >= ?`;
      params.push(Number(minArea));
    }
    if (maxArea) {
      sql += ` AND p.area <= ?`;
      params.push(Number(maxArea));
    }

    // Sắp xếp
    if (sort === 'price_asc') {
      sql += ` ORDER BY p.price_value ASC`;
    } else if (sort === 'price_desc') {
      sql += ` ORDER BY p.price_value DESC`;
    } else if (sort === 'area_desc') {
      sql += ` ORDER BY p.area DESC`;
    } else if (sort === 'views_desc') {
      sql += ` ORDER BY p.views_count DESC`;
    } else {
      sql += ` ORDER BY p.id DESC`;
    }

    // Giới hạn
    if (limit) {
      sql += ` LIMIT ?`;
      params.push(Number(limit));
    }

    const stmt = db.prepare(sql);
    const properties = stmt.all(...params);

    // Bổ sung mảng ảnh, tiện ích cho từng BĐS
    const enriched = properties.map(p => {
      const images = getPropertyImages(p.id).map(img => img.image_url);
      return {
        ...p,
        city: p.city_code || 'hcm',
        type: p.type_code || 'apartment',
        typeName: p.type_name || p.type_name_ref,
        price: p.price_display,
        priceValue: p.price_value,
        unitPrice: p.unit_price,
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        features: getPropertyFeatures(p.id),
        amenities: getPropertyAmenities(p.id),
        agent: {
          name: p.agent_name,
          phone: p.agent_phone,
          email: p.agent_email,
          avatar: p.agent_avatar,
          verified: true
        }
      };
    });

    res.json({
      status: 'success',
      total: enriched.length,
      data: enriched
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Lấy chi tiết 1 BĐS theo ID & Tự động tăng lượt xem
app.get('/api/properties/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const stmt = db.prepare(`
      SELECT p.*, pt.code as type_code, pt.name as type_name_ref, loc.code as city_code, loc.name as city_name,
             proj.name as project_name
      FROM properties p
      LEFT JOIN property_types pt ON p.type_id = pt.id
      LEFT JOIN locations loc ON p.location_id = loc.id
      LEFT JOIN projects proj ON p.project_id = proj.id
      WHERE p.id = ?
    `);
    const p = stmt.get(id);

    if (!p) {
      return res.status(404).json({ status: 'error', message: 'Không tìm thấy bất động sản yêu cầu!' });
    }

    // Tăng lượt xem
    db.prepare('UPDATE properties SET views_count = views_count + 1 WHERE id = ?').run(id);

    const images = getPropertyImages(p.id).map(img => img.image_url);
    const features = getPropertyFeatures(p.id);
    const amenities = getPropertyAmenities(p.id);
    const agent = getAgentInfo(p.agent_id) || {
      full_name: 'Nguyễn Văn Hưng',
      phone: '0908 123 456',
      email: 'hung.nguyen@bdsviet.vn',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      title: 'Chuyên viên tư vấn VIP',
      is_verified: 1
    };

    res.json({
      status: 'success',
      data: {
        ...p,
        city: p.city_code,
        type: p.type_code,
        typeName: p.type_name || p.type_name_ref,
        price: p.price_display,
        priceValue: p.price_value,
        unitPrice: p.unit_price,
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        features,
        amenities,
        agent: {
          name: agent.full_name,
          phone: agent.phone,
          email: agent.email,
          zalo: agent.zalo || `https://zalo.me/${(agent.phone || '').replace(/\s+/g, '')}`,
          avatar: agent.avatar,
          title: agent.title,
          role: agent.title,
          verified: !!agent.is_verified
        }
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Thêm tin BĐS mới (Dành cho Đăng tin Wizard & Admin)
app.post('/api/properties', (req, res) => {
  try {
    const {
      title, category, type, price, priceValue, unitPrice, area,
      bedrooms, bathrooms, direction, address, city, district,
      lat, lng, legal, furniture, floor, description, images, features, amenities
    } = req.body;

    if (!title || !priceValue || !area) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng điền tiêu đề, giá và diện tích!' });
    }

    // Mapping type & location
    const typeMap = { apartment: 1, house: 2, villa: 3, land: 4 };
    const locMap = { cantho: 1, hcm: 2, hn: 3, danang: 4, binhduong: 5, dongnai: 6 };

    const typeId = typeMap[type] || 1;
    const locationId = locMap[city] || 2;
    const typeNames = { apartment: 'Căn hộ chung cư', house: 'Nhà phố, nhà riêng', villa: 'Biệt thự cao cấp', land: 'Đất nền dự án' };

    const insertStmt = db.prepare(`
      INSERT INTO properties (
        title, category, type_id, type_name, location_id, district, address,
        lat, lng, price_display, price_value, unit_price, area, bedrooms,
        bathrooms, direction, badge, badge_color, legal, furniture, floor,
        description, agent_id, status, posted_at_text
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, 'available', 'Vừa đăng'
      )
    `);

    const result = insertStmt.run(
      title.trim(),
      category || 'sale',
      typeId,
      typeNames[type] || 'Bất động sản',
      locationId,
      district || 'Quận trung tâm',
      address || 'TP. Hồ Chí Minh',
      lat ? Number(lat) : 10.8038,
      lng ? Number(lng) : 106.75,
      price || `${priceValue} Triệu`,
      Number(priceValue),
      unitPrice || `${(Number(priceValue) / Number(area)).toFixed(1)} tr/m²`,
      Number(area),
      Number(bedrooms) || 0,
      Number(bathrooms) || 0,
      direction || 'Đông Nam',
      'MỚI ĐĂNG',
      'bg-blue-600',
      legal || 'Sổ hồng chính chủ',
      furniture || 'Đầy đủ nội thất',
      floor || '1 trệt 2 lầu',
      description || 'Mô tả bất động sản chi tiết...',
      2 // Nguyễn Văn Hưng
    );

    const newId = Number(result.lastInsertRowid);

    // Thêm ảnh
    if (Array.isArray(images) && images.length > 0) {
      const imgStmt = db.prepare('INSERT INTO property_images (property_id, image_url, is_primary, sort_order) VALUES (?, ?, ?, ?)');
      images.forEach((img, idx) => {
        imgStmt.run(newId, img, idx === 0 ? 1 : 0, idx + 1);
      });
    } else {
      db.prepare('INSERT INTO property_images (property_id, image_url, is_primary, sort_order) VALUES (?, ?, 1, 1)')
        .run(newId, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
    }

    // Thêm features
    if (Array.isArray(features)) {
      const featStmt = db.prepare('INSERT INTO property_features (property_id, feature_text) VALUES (?, ?)');
      features.forEach(f => featStmt.run(newId, f));
    }

    // Thêm amenities mặc định nếu có
    if (Array.isArray(amenities)) {
      const amStmt = db.prepare('INSERT INTO property_amenities (property_id, name, dist, icon) VALUES (?, ?, ?, ?)');
      amenities.forEach(a => amStmt.run(newId, a.name, a.dist, a.icon || 'fa-location-dot'));
    }

    res.status(201).json({
      status: 'success',
      message: 'Đăng tin bất động sản thành công!',
      propertyId: newId
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Xóa BĐS (Admin)
app.delete('/api/properties/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    db.prepare('DELETE FROM properties WHERE id = ?').run(id);
    res.json({ status: 'success', message: `Đã xóa bất động sản #${id} thành công!` });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Cập nhật trạng thái BĐS (Admin)
app.patch('/api/properties/:id/status', (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    db.prepare('UPDATE properties SET status = ? WHERE id = ?').run(status, id);
    res.json({ status: 'success', message: 'Cập nhật trạng thái thành công!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Chỉnh sửa thông tin BĐS (Admin)
app.put('/api/properties/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, category, type, price, priceValue, area, city, district, address, description, status } = req.body;
    
    const typeNames = {
      apartment: 'Căn hộ chung cư',
      house: 'Nhà phố thương mại',
      villa: 'Biệt thự cao cấp',
      land: 'Đất nền dự án'
    };

    const typeIdMap = { apartment: 1, house: 2, villa: 3, land: 4 };
    const locIdMap = { cantho: 1, hcm: 2, hn: 3, danang: 4 };

    db.prepare(`
      UPDATE properties
      SET title = COALESCE(?, title),
          category = COALESCE(?, category),
          type_id = COALESCE(?, type_id),
          type_name = COALESCE(?, type_name),
          location_id = COALESCE(?, location_id),
          district = COALESCE(?, district),
          address = COALESCE(?, address),
          price_display = COALESCE(?, price_display),
          price_value = COALESCE(?, price_value),
          area = COALESCE(?, area),
          description = COALESCE(?, description),
          status = COALESCE(?, status)
      WHERE id = ?
    `).run(
      title ? title.trim() : null,
      category || null,
      type ? (typeIdMap[type] || 1) : null,
      type ? (typeNames[type] || 'Bất động sản') : null,
      city ? (locIdMap[city] || 2) : null,
      district ? district.trim() : null,
      address ? address.trim() : null,
      price ? price.trim() : null,
      priceValue ? Number(priceValue) : null,
      area ? Number(area) : null,
      description ? description.trim() : null,
      status || null,
      id
    );

    res.json({ status: 'success', message: `Đã cập nhật BĐS #${id} thành công!` });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// -------------------------------------------------------------------------------------
// 4. API LỊCH HẸN XEM NHÀ & TƯ VẤN (INQUIRIES / APPOINTMENTS)
// -------------------------------------------------------------------------------------
app.get('/api/inquiries', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT c.*, p.title as property_title, p.price_display
      FROM contact_inquiries c
      LEFT JOIN properties p ON c.property_id = p.id
      ORDER BY c.id DESC
    `);
    const inquiries = stmt.all();
    res.json({ status: 'success', total: inquiries.length, data: inquiries });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.post('/api/inquiries', (req, res) => {
  try {
    const { fullName, phone, email, propertyId, inquiryType, appointmentDate, appointmentTime, notes } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng nhập họ tên và số điện thoại!' });
    }

    const stmt = db.prepare(`
      INSERT INTO contact_inquiries (property_id, full_name, phone, email, inquiry_type, appointment_date, appointment_time, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `);

    const result = stmt.run(
      propertyId ? Number(propertyId) : null,
      fullName.trim(),
      phone.trim(),
      email ? email.trim() : null,
      inquiryType || 'viewing',
      appointmentDate || new Date().toISOString().slice(0, 10),
      appointmentTime || 'Sáng (09:00 - 11:30)',
      notes || 'Khách hàng hẹn xem nhà từ website'
    );

    res.status(201).json({
      status: 'success',
      message: 'Gửi yêu cầu lịch hẹn thành công! Chuyên viên sẽ gọi điện thoại xác nhận trong 15 phút.',
      inquiryId: Number(result.lastInsertRowid)
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.patch('/api/inquiries/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    db.prepare('UPDATE contact_inquiries SET status = ? WHERE id = ?').run(status, id);
    res.json({ status: 'success', message: 'Cập nhật tiến độ xử lý lịch hẹn thành công!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.delete('/api/inquiries/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    db.prepare('DELETE FROM contact_inquiries WHERE id = ?').run(id);
    res.json({ status: 'success', message: `Đã xóa lịch hẹn #${id} thành công!` });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// -------------------------------------------------------------------------------------
// 5. API ĐÁNH GIÁ & PHẢN HỒI (REVIEWS)
// -------------------------------------------------------------------------------------
app.get('/api/reviews', (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM reviews WHERE status = 'approved' ORDER BY id DESC");
    const reviews = stmt.all();
    res.json({ status: 'success', total: reviews.length, data: reviews });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.post('/api/reviews', (req, res) => {
  try {
    const { authorName, city, service, rating, title, content } = req.body;

    if (!authorName || !content || !title) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng điền đầy đủ tiêu đề và nội dung nhận xét!' });
    }

    const stmt = db.prepare(`
      INSERT INTO reviews (author_name, avatar, city, service, transaction_badge, rating, date_text, title, content, helpful_count, status)
      VALUES (?, ?, ?, ?, ?, ?, 'Hôm nay', ?, ?, 0, 'approved')
    `);

    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    ];
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];

    const result = stmt.run(
      authorName.trim(),
      avatar,
      city || 'TP. Hồ Chí Minh',
      service || 'Giao dịch BĐS',
      'Khách hàng đã xác thực giao dịch',
      Number(rating) || 5,
      title.trim(),
      content.trim()
    );

    res.status(201).json({
      status: 'success',
      message: 'Cảm ơn bạn đã gửi đánh giá trải nghiệm!',
      reviewId: Number(result.lastInsertRowid)
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.post('/api/reviews/:id/like', (req, res) => {
  try {
    const id = Number(req.params.id);
    db.prepare('UPDATE reviews SET helpful_count = helpful_count + 1 WHERE id = ?').run(id);
    const updated = db.prepare('SELECT helpful_count FROM reviews WHERE id = ?').get(id);
    res.json({ status: 'success', helpfulCount: updated.helpful_count });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.patch('/api/reviews/:id/status', (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    db.prepare('UPDATE reviews SET status = ? WHERE id = ?').run(status, id);
    res.json({ status: 'success', message: `Đã cập nhật trạng thái nhận xét #${id} thành ${status}!` });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.delete('/api/reviews/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    db.prepare('DELETE FROM reviews WHERE id = ?').run(id);
    res.json({ status: 'success', message: `Đã xóa đánh giá #${id}!` });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// -------------------------------------------------------------------------------------
// 6. API DỰ ÁN & BẢNG GIÁ THỊ TRƯỜNG
// -------------------------------------------------------------------------------------
app.get('/api/projects', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM projects ORDER BY id ASC');
    const projects = stmt.all().map(p => ({
      ...p,
      highlights: p.highlights ? p.highlights.split(';').map(h => h.trim()) : []
    }));
    res.json({ status: 'success', total: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/api/market-prices', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM market_prices ORDER BY id ASC');
    const data = stmt.all().map(m => ({
      id: m.code,
      district: m.district,
      city: m.city_code,
      cityName: m.city_name,
      apartment: { min: m.apt_min, max: m.apt_max, avg: m.apt_avg },
      house: { min: m.house_min, max: m.house_max, avg: m.house_avg },
      villa: { min: m.villa_min, max: m.villa_max, avg: m.villa_avg },
      land: { min: m.land_min, max: m.land_max, avg: m.land_avg },
      yoyGrowth: m.yoy_growth,
      growthValue: m.growth_value,
      liquidity: m.liquidity,
      rentAvg: m.rent_avg,
      trend: m.trend,
      keyProjects: m.key_projects ? m.key_projects.split(',').map(s => s.trim()) : []
    }));
    res.json({ status: 'success', total: data.length, data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// -------------------------------------------------------------------------------------
// 7. API THỐNG KÊ ADMIN DASHBOARD (ADMIN STATS & USER MANAGEMENT)
// -------------------------------------------------------------------------------------
app.get('/api/admin/stats', (req, res) => {
  try {
    const totalProps = db.prepare('SELECT COUNT(*) as count FROM properties').get().count;
    const totalViews = db.prepare('SELECT SUM(views_count) as total FROM properties').get().total || 0;
    const newInquiries = db.prepare("SELECT COUNT(*) as count FROM contact_inquiries WHERE status = 'new'").get().count;
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get().count;

    // Phân bổ theo loại hình
    const typeStats = db.prepare(`
      SELECT pt.name as type_name, COUNT(p.id) as count
      FROM property_types pt
      LEFT JOIN properties p ON pt.id = p.type_id
      GROUP BY pt.id
    `).all();

    // Phân bổ theo thành phố
    const cityStats = db.prepare(`
      SELECT loc.name as city_name, COUNT(p.id) as count
      FROM locations loc
      LEFT JOIN properties p ON loc.id = p.location_id
      GROUP BY loc.id
    `).all();

    res.json({
      status: 'success',
      data: {
        totalProperties: totalProps,
        totalViews,
        newInquiries,
        totalUsers,
        typeStats,
        cityStats
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/api/admin/users', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT u.id, u.username, u.email, u.full_name, u.phone, u.title, u.company, u.status, u.is_verified, u.created_at, r.name as role_name, r.display_name as role_display
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      ORDER BY u.id ASC
    `);
    const users = stmt.all();
    res.json({ status: 'success', total: users.length, data: users });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.patch('/api/admin/users/:id/status', (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    db.prepare('UPDATE users SET status = ? WHERE id = ?').run(status, id);
    res.json({ status: 'success', message: `Đã cập nhật trạng thái người dùng #${id} thành ${status}!` });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.post('/api/admin/users', (req, res) => {
  try {
    const { fullName, email, phone, roleId, title, company } = req.body;
    if (!fullName || !email) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng nhập họ tên và email!' });
    }
    const stmt = db.prepare(`
      INSERT INTO users (role_id, username, email, password_hash, full_name, phone, title, company, status, is_verified)
      VALUES (?, ?, ?, 'demo123', ?, ?, ?, ?, 'active', 1)
    `);
    const result = stmt.run(
      Number(roleId) || 2,
      email.split('@')[0],
      email.trim(),
      fullName.trim(),
      phone ? phone.trim() : '0908 123 456',
      title || 'Chuyên viên BĐS',
      company || 'Minh Vương Home Luxury'
    );
    res.status(201).json({ status: 'success', message: 'Thêm thành viên mới thành công!', userId: Number(result.lastInsertRowid) });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.delete('/api/admin/users/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (id === 1) {
      return res.status(400).json({ status: 'error', message: 'Không thể xóa tài khoản Quản trị viên tối cao!' });
    }
    db.prepare('DELETE FROM users WHERE id = ?').run(id);
    res.json({ status: 'success', message: `Đã xóa người dùng #${id} thành công!` });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Fallback trang chủ cho Single Page Application / routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// =====================================================================================
// KHỞI ĐỘNG SERVER & TỰ ĐỘNG MỞ TRÌNH DUYỆT VÀO THẲNG TRANG WEB
// =====================================================================================
app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  const startCmd = process.platform === 'win32'
    ? `start "" "${url}"`
    : process.platform === 'darwin'
    ? `open "${url}"`
    : `xdg-open "${url}"`;
  exec(startCmd, () => {});
});

module.exports = app;
