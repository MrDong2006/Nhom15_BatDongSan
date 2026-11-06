/**
 * SCRIPT KHỞI TẠO & SEED CSDL SQLITE CHO HỆ THỐNG (NHÓM 15)
 */
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DB_FILE = path.join(__dirname, 'database.sqlite');
const JSON_FILE = path.join(__dirname, 'database.json');

console.log('🔄 Đang khởi tạo CSDL SQLite từ database.json...');

if (fs.existsSync(DB_FILE)) {
  try {
    fs.unlinkSync(DB_FILE);
  } catch (e) {
    // If locked, continue
  }
}

const db = new DatabaseSync(DB_FILE);
db.exec('PRAGMA foreign_keys = ON;');

// TẠO BẢNG
db.exec(`
CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_id INTEGER NOT NULL DEFAULT 3,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  zalo TEXT,
  avatar TEXT,
  title TEXT,
  company TEXT DEFAULT 'Minh Vương Home Luxury',
  bio TEXT,
  is_verified INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS property_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'fa-building',
  description TEXT
);

CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  center_lat REAL NOT NULL,
  center_lng REAL NOT NULL,
  default_zoom INTEGER NOT NULL DEFAULT 12
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  investor TEXT NOT NULL,
  location TEXT NOT NULL,
  scale TEXT NOT NULL,
  status TEXT NOT NULL,
  status_color TEXT NOT NULL DEFAULT 'bg-emerald-500',
  price_range TEXT NOT NULL,
  project_type TEXT NOT NULL,
  image_url TEXT NOT NULL,
  highlights TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'sale',
  type_id INTEGER NOT NULL,
  type_name TEXT NOT NULL,
  location_id INTEGER NOT NULL,
  district TEXT NOT NULL,
  address TEXT NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  price_display TEXT NOT NULL,
  price_value REAL NOT NULL,
  unit_price TEXT,
  area REAL NOT NULL,
  bedrooms INTEGER NOT NULL DEFAULT 0,
  bathrooms INTEGER NOT NULL DEFAULT 0,
  direction TEXT,
  balcony_direction TEXT,
  badge TEXT,
  badge_color TEXT DEFAULT 'bg-rose-500',
  legal TEXT DEFAULT 'Sổ hồng sở hữu lâu dài',
  furniture TEXT,
  floor TEXT,
  year_built INTEGER DEFAULT 2024,
  investor TEXT,
  description TEXT NOT NULL,
  agent_id INTEGER NOT NULL,
  project_id INTEGER,
  views_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'available',
  posted_at_text TEXT NOT NULL DEFAULT 'Hôm nay',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (type_id) REFERENCES property_types(id),
  FOREIGN KEY (location_id) REFERENCES locations(id),
  FOREIGN KEY (agent_id) REFERENCES users(id),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS property_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  is_primary INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS property_features (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER NOT NULL,
  feature_text TEXT NOT NULL,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS property_amenities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  dist TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'fa-location-dot',
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS market_prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  location_id INTEGER NOT NULL,
  district TEXT NOT NULL,
  city_code TEXT NOT NULL,
  city_name TEXT NOT NULL,
  apt_min REAL NOT NULL,
  apt_max REAL NOT NULL,
  apt_avg REAL NOT NULL,
  house_min REAL NOT NULL,
  house_max REAL NOT NULL,
  house_avg REAL NOT NULL,
  villa_min REAL NOT NULL,
  villa_max REAL NOT NULL,
  villa_avg REAL NOT NULL,
  land_min REAL NOT NULL,
  land_max REAL NOT NULL,
  land_avg REAL NOT NULL,
  yoy_growth TEXT NOT NULL,
  growth_value REAL NOT NULL,
  liquidity TEXT NOT NULL,
  rent_avg TEXT NOT NULL,
  trend TEXT NOT NULL,
  key_projects TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  property_id INTEGER,
  author_name TEXT NOT NULL,
  avatar TEXT,
  city TEXT NOT NULL,
  service TEXT NOT NULL,
  transaction_badge TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  date_text TEXT NOT NULL DEFAULT 'Gần đây',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  helpful_count INTEGER NOT NULL DEFAULT 0,
  reply TEXT,
  status TEXT NOT NULL DEFAULT 'approved',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id)
);

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  property_id INTEGER,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  inquiry_type TEXT NOT NULL DEFAULT 'viewing',
  appointment_date TEXT,
  appointment_time TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id)
);

CREATE TABLE IF NOT EXISTS saved_favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  property_id INTEGER NOT NULL,
  saved_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, property_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS loan_calculations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  property_id INTEGER,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  property_price REAL NOT NULL,
  loan_percentage REAL NOT NULL,
  loan_amount REAL NOT NULL,
  loan_years INTEGER NOT NULL,
  interest_rate REAL NOT NULL,
  repayment_type TEXT NOT NULL,
  first_month_payment REAL NOT NULL,
  bank_name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id)
);
`);

// SEED DATA
const rawData = fs.readFileSync(JSON_FILE, 'utf8');
const data = JSON.parse(rawData);

// 1. Roles
const insRole = db.prepare('INSERT INTO roles (id, name, display_name, description) VALUES (?, ?, ?, ?)');
(data.roles || []).forEach(r => {
  insRole.run(r.id, r.name, r.displayName, r.description || null);
});

// 2. Users
const insUser = db.prepare(`
  INSERT INTO users (id, role_id, username, email, password_hash, full_name, phone, zalo, avatar, title, company, bio, is_verified, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
(data.users || []).forEach(u => {
  insUser.run(
    u.id,
    u.roleId || 3,
    u.username,
    u.email,
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    u.fullName,
    u.phone,
    u.zalo || null,
    u.avatar || null,
    u.title || null,
    u.company || 'Minh Vương Home Luxury',
    u.bio || null,
    u.isVerified ? 1 : 0,
    u.status || 'active'
  );
});

// 3. Property Types
const insType = db.prepare('INSERT INTO property_types (id, code, name, icon, description) VALUES (?, ?, ?, ?, ?)');
(data.propertyTypes || []).forEach(t => {
  insType.run(t.id, t.code, t.name, t.icon || 'fa-building', t.description || null);
});

// 4. Locations
const insLoc = db.prepare('INSERT INTO locations (id, code, name, region, center_lat, center_lng, default_zoom) VALUES (?, ?, ?, ?, ?, ?, ?)');
(data.locations || []).forEach(l => {
  insLoc.run(l.id, l.code, l.name, l.region, l.centerLat, l.centerLng, l.defaultZoom);
});

// Location map helper
const locMap = { 'cantho': 1, 'hcm': 2, 'hn': 3, 'danang': 4 };
const typeMap = { 'apartment': 1, 'house': 2, 'villa': 3, 'land': 4, 'penthouse': 5, 'shophouse': 6 };

// 5. Projects
const insProj = db.prepare(`
  INSERT INTO projects (id, name, investor, location, scale, status, status_color, price_range, project_type, image_url, highlights)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
(data.projects || []).forEach(p => {
  insProj.run(
    p.id,
    p.name,
    p.investor,
    p.location,
    p.scale,
    p.status,
    p.statusColor || 'bg-emerald-500',
    p.priceRange,
    p.type || p.projectType || 'Khu đô thị',
    p.image || p.imageUrl || '',
    Array.isArray(p.highlights) ? p.highlights.join(', ') : (p.highlights || null)
  );
});

// 6. Properties
const insProp = db.prepare(`
  INSERT INTO properties (
    id, title, category, type_id, type_name, location_id, district, address, lat, lng,
    price_display, price_value, unit_price, area, bedrooms, bathrooms, direction, balcony_direction,
    badge, badge_color, legal, furniture, floor, year_built, investor, description, agent_id, project_id, views_count, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insImg = db.prepare('INSERT INTO property_images (property_id, image_url, is_primary, sort_order) VALUES (?, ?, ?, ?)');
const insFeat = db.prepare('INSERT INTO property_features (property_id, feature_text) VALUES (?, ?)');
const insAmen = db.prepare('INSERT INTO property_amenities (property_id, name, dist, icon) VALUES (?, ?, ?, ?)');

(data.properties || []).forEach(p => {
  const locId = locMap[p.city] || 1;
  const typeId = typeMap[p.type] || 1;

  insProp.run(
    p.id,
    p.title,
    p.category || 'sale',
    typeId,
    p.typeName || 'Căn hộ cao cấp',
    locId,
    p.district || '',
    p.address || '',
    p.lat || 10.0341,
    p.lng || 105.7875,
    p.price || 'Liên hệ',
    p.priceValue || 0,
    p.unitPrice || '',
    p.area || 50,
    p.bedrooms || 0,
    p.bathrooms || 0,
    p.direction || 'Đông Nam',
    p.balconyDirection || 'Đông Nam',
    p.badge || 'VIP',
    p.badgeColor || 'bg-blue-600',
    p.legal || 'Sổ hồng sở hữu lâu dài',
    p.furniture || 'Đầy đủ nội thất cao cấp',
    p.floor || 'Tầng 12',
    p.yearBuilt || 2024,
    p.investor || 'Minh Vương Group',
    p.description || '',
    2, // Môi giới Nguyễn Văn Hưng
    p.projectId || null,
    p.viewsCount || 150,
    'available'
  );

  // Images
  (p.images || []).forEach((img, idx) => {
    insImg.run(p.id, img, idx === 0 ? 1 : 0, idx);
  });

  // Features
  (p.features || []).forEach(f => {
    insFeat.run(p.id, f);
  });

  // Amenities
  (p.amenities || []).forEach(a => {
    insAmen.run(p.id, a.name, a.dist, a.icon || 'fa-location-dot');
  });
});

// 7. Market Prices
const insMarket = db.prepare(`
  INSERT INTO market_prices (
    id, code, location_id, district, city_code, city_name,
    apt_min, apt_max, apt_avg, house_min, house_max, house_avg,
    villa_min, villa_max, villa_avg, land_min, land_max, land_avg,
    yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

(data.marketPrices || []).forEach((m, idx) => {
  const locId = locMap[m.city] || 1;
  const apt = m.apartment || { min: 30, max: 50, avg: 40 };
  const house = m.house || { min: 50, max: 90, avg: 70 };
  const villa = m.villa || { min: 80, max: 180, avg: 120 };
  const land = m.land || { min: 25, max: 60, avg: 42 };

  insMarket.run(
    idx + 1,
    String(m.id || `MP_${idx + 1}`),
    locId,
    m.district,
    m.city,
    m.cityName,
    Number(apt.min || 0), Number(apt.max || 0), Number(apt.avg || 0),
    Number(house.min || 0), Number(house.max || 0), Number(house.avg || 0),
    Number(villa.min || 0), Number(villa.max || 0), Number(villa.avg || 0),
    Number(land.min || 0), Number(land.max || 0), Number(land.avg || 0),
    m.yoyGrowth || '+5.5%',
    Number(m.growthValue || 5.5),
    m.liquidity || 'Cao',
    m.rentAvg || '15 - 25 Triệu/tháng',
    m.trend || 'Tăng trưởng',
    Array.isArray(m.keyProjects) ? m.keyProjects.join(', ') : (m.keyProjects || null)
  );
});

// 8. Reviews
const insRev = db.prepare(`
  INSERT INTO reviews (id, user_id, property_id, author_name, avatar, city, service, transaction_badge, rating, date_text, title, content, image, helpful_count, reply, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
(data.reviews || []).forEach(r => {
  insRev.run(
    r.id,
    3, // user customer
    1, // property 1
    r.authorName,
    r.avatar || null,
    r.city,
    r.service,
    r.transactionBadge,
    r.rating || 5,
    r.dateText || 'Gần đây',
    r.title,
    r.content,
    null,
    r.helpfulCount || 0,
    r.reply || null,
    'approved'
  );
});

// 9. Sample Contact Inquiries
const insInq = db.prepare(`
  INSERT INTO contact_inquiries (id, user_id, property_id, full_name, phone, email, inquiry_type, appointment_date, appointment_time, notes, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
insInq.run(1, 3, 1, 'Trần Minh Đức', '0912 345 678', 'duc.tran@gmail.com', 'viewing', '2026-10-28', '09:30', 'Hẹn xem thực tế căn hộ Masterise Lumiere', 'new');
insInq.run(2, 3, 2, 'Lê Hoàng Yến', '0988 765 432', 'yen.le@yahoo.com', 'consulting', '2026-10-29', '14:00', 'Tư vấn phương án vay ngân hàng VCB', 'confirmed');

// 10. Sample Saved Favorites
const insFav = db.prepare('INSERT INTO saved_favorites (id, user_id, property_id) VALUES (?, ?, ?)');
insFav.run(1, 1, 1);
insFav.run(2, 1, 2);
insFav.run(3, 1, 4);

// 11. Sample Loan Calculations
const insLoan = db.prepare(`
  INSERT INTO loan_calculations (id, user_id, property_id, customer_name, customer_phone, property_price, loan_percentage, loan_amount, loan_years, interest_rate, repayment_type, first_month_payment, bank_name)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
insLoan.run(1, 3, 1, 'Trần Minh Đức', '0912 345 678', 6500000000, 70, 4550000000, 20, 6.5, 'reducing', 37600000, 'Vietcombank');

console.log('✅ KHỞI TẠO & SEED CSDL SQLITE THÀNH CÔNG 14 BẢNG!');
