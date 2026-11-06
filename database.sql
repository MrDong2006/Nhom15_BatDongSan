-- =====================================================================================
-- CƠ SỞ DỮ LIỆU TOÀN DIỆN: BĐS MINH VƯƠNG HOME LUXURY (NHÓM 15)
-- MÔN HỌC: PHÁT TRIỂN ỨNG DỤNG WEB (WEB APPLICATION DEVELOPMENT)
-- Hệ quản trị CSDL: MICROSOFT SQL SERVER 2016 / 2017 / 2019 / 2022 (SSMS T-SQL)
-- Phiên bản: Chuẩn T-SQL 100% tương thích SQL Server Management Studio (SSMS Database Diagram)
-- Đầy đủ 14 BẢNG DỮ LIỆU tương ứng 100% với toàn bộ hệ thống HTML Template đã xây dựng
-- =====================================================================================

USE master;
GO

-- 1. TẠO CƠ SỞ DỮ LIỆU
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'nhom15_batdongsan_db')
BEGIN
    ALTER DATABASE [nhom15_batdongsan_db] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE [nhom15_batdongsan_db];
END
GO

CREATE DATABASE [nhom15_batdongsan_db] COLLATE Vietnamese_CI_AS;
GO

USE [nhom15_batdongsan_db];
GO

-- =====================================================================================
-- PHẦN I: TẠO BẢNG DỮ LIỆU (DDL) - 14 BẢNG HOÀN CHỈNH TƯƠNG ỨNG HỆ THỐNG HTML
-- =====================================================================================

-- -------------------------------------------------------------------------------------
-- 1. Bảng Phân quyền tài khoản (roles) -> Phục vụ auth.html & admin.html
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.roles', 'U') IS NOT NULL DROP TABLE dbo.roles;
GO
CREATE TABLE dbo.roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    display_name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX) NULL
);
GO

-- -------------------------------------------------------------------------------------
-- 2. Bảng Người dùng & Môi giới (users) -> Phục vụ auth.html & agent card trên mọi trang
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.users', 'U') IS NOT NULL DROP TABLE dbo.users;
GO
CREATE TABLE dbo.users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    role_id INT NOT NULL DEFAULT 3,
    username VARCHAR(80) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name NVARCHAR(150) NOT NULL,
    phone VARCHAR(25) NOT NULL,
    zalo VARCHAR(255) NULL,
    avatar VARCHAR(500) NULL,
    title NVARCHAR(150) NULL,
    company NVARCHAR(150) DEFAULT N'Minh Vương Home Luxury',
    bio NVARCHAR(MAX) NULL,
    is_verified BIT NOT NULL DEFAULT 1,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES dbo.roles(id) ON UPDATE CASCADE
);
GO

-- -------------------------------------------------------------------------------------
-- 3. Bảng Loại hình BĐS (property_types) -> Phục vụ bộ lọc loại hình trên index.html & post-property.html
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.property_types', 'U') IS NOT NULL DROP TABLE dbo.property_types;
GO
CREATE TABLE dbo.property_types (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name NVARCHAR(100) NOT NULL,
    icon VARCHAR(50) NOT NULL DEFAULT 'fa-building',
    description NVARCHAR(MAX) NULL
);
GO

-- -------------------------------------------------------------------------------------
-- 4. Bảng Tỉnh / Thành phố (locations) -> Phục vụ bản đồ số Leaflet & bộ lọc tỉnh thành
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.locations', 'U') IS NOT NULL DROP TABLE dbo.locations;
GO
CREATE TABLE dbo.locations (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name NVARCHAR(100) NOT NULL,
    region NVARCHAR(50) NOT NULL,
    center_lat DECIMAL(10, 7) NOT NULL,
    center_lng DECIMAL(10, 7) NOT NULL,
    default_zoom INT NOT NULL DEFAULT 12
);
GO

-- -------------------------------------------------------------------------------------
-- 5. Bảng Đại dự án đô thị (projects) -> Phục vụ trang projects.html
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.projects', 'U') IS NOT NULL DROP TABLE dbo.projects;
GO
CREATE TABLE dbo.projects (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    investor NVARCHAR(150) NOT NULL,
    location NVARCHAR(255) NOT NULL,
    scale NVARCHAR(100) NOT NULL,
    status NVARCHAR(100) NOT NULL,
    status_color VARCHAR(50) NOT NULL DEFAULT 'bg-emerald-500',
    price_range NVARCHAR(100) NOT NULL,
    project_type NVARCHAR(100) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    highlights NVARCHAR(MAX) NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- -------------------------------------------------------------------------------------
-- 6. Bảng Bất động sản chính (properties) -> Phục vụ index.html, property-detail.html, map-search.html
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.properties', 'U') IS NOT NULL DROP TABLE dbo.properties;
GO
CREATE TABLE dbo.properties (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    category VARCHAR(10) NOT NULL DEFAULT 'sale', -- 'sale' (mua bán) hoặc 'rent' (cho thuê)
    type_id INT NOT NULL,
    type_name NVARCHAR(100) NOT NULL,
    location_id INT NOT NULL,
    district NVARCHAR(100) NOT NULL,
    address NVARCHAR(255) NOT NULL,
    lat DECIMAL(10, 7) NOT NULL,
    lng DECIMAL(10, 7) NOT NULL,
    price_display NVARCHAR(50) NOT NULL,
    price_value DECIMAL(15, 2) NOT NULL, -- Triệu VNĐ
    unit_price NVARCHAR(50) NULL,
    area DECIMAL(10, 2) NOT NULL,
    bedrooms INT NOT NULL DEFAULT 0,
    bathrooms INT NOT NULL DEFAULT 0,
    direction NVARCHAR(50) NULL,
    balcony_direction NVARCHAR(50) NULL,
    badge NVARCHAR(50) NULL,
    badge_color VARCHAR(50) DEFAULT 'bg-rose-500',
    legal NVARCHAR(150) DEFAULT N'Sổ hồng sở hữu lâu dài',
    furniture NVARCHAR(150) NULL,
    floor NVARCHAR(100) NULL,
    year_built INT DEFAULT 2024,
    investor NVARCHAR(150) NULL,
    description NVARCHAR(MAX) NOT NULL,
    agent_id INT NOT NULL,
    project_id INT NULL,
    views_count INT NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'available',
    posted_at_text NVARCHAR(50) NOT NULL DEFAULT N'Hôm nay',
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT fk_properties_type FOREIGN KEY (type_id) REFERENCES dbo.property_types(id) ON UPDATE CASCADE,
    CONSTRAINT fk_properties_location FOREIGN KEY (location_id) REFERENCES dbo.locations(id) ON UPDATE CASCADE,
    CONSTRAINT fk_properties_agent FOREIGN KEY (agent_id) REFERENCES dbo.users(id) ON UPDATE CASCADE,
    CONSTRAINT fk_properties_project FOREIGN KEY (project_id) REFERENCES dbo.projects(id) ON DELETE SET NULL
);
GO

-- -------------------------------------------------------------------------------------
-- 7. Bảng Thư viện hình ảnh BĐS (property_images) -> Phục vụ slider ảnh trong property-detail.html
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.property_images', 'U') IS NOT NULL DROP TABLE dbo.property_images;
GO
CREATE TABLE dbo.property_images (
    id INT IDENTITY(1,1) PRIMARY KEY,
    property_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BIT NOT NULL DEFAULT 0,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_images_property FOREIGN KEY (property_id) REFERENCES dbo.properties(id) ON DELETE CASCADE
);
GO

-- -------------------------------------------------------------------------------------
-- 8. Bảng Đặc điểm nổi bật (property_features) -> Phục vụ danh sách checklist trong property-detail.html
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.property_features', 'U') IS NOT NULL DROP TABLE dbo.property_features;
GO
CREATE TABLE dbo.property_features (
    id INT IDENTITY(1,1) PRIMARY KEY,
    property_id INT NOT NULL,
    feature_text NVARCHAR(255) NOT NULL,
    CONSTRAINT fk_features_property FOREIGN KEY (property_id) REFERENCES dbo.properties(id) ON DELETE CASCADE
);
GO

-- -------------------------------------------------------------------------------------
-- 9. Bảng Tiện ích ngoại khu & Bán kính (property_amenities) -> Phục vụ quét tiện ích 2km-5km
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.property_amenities', 'U') IS NOT NULL DROP TABLE dbo.property_amenities;
GO
CREATE TABLE dbo.property_amenities (
    id INT IDENTITY(1,1) PRIMARY KEY,
    property_id INT NOT NULL,
    name NVARCHAR(150) NOT NULL,
    dist NVARCHAR(50) NOT NULL,
    icon VARCHAR(50) NOT NULL DEFAULT 'fa-location-dot',
    CONSTRAINT fk_amenities_property FOREIGN KEY (property_id) REFERENCES dbo.properties(id) ON DELETE CASCADE
);
GO

-- -------------------------------------------------------------------------------------
-- 10. Bảng Giá thị trường 3 miền 2026 (market_prices) -> Phục vụ trang market-prices.html
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.market_prices', 'U') IS NOT NULL DROP TABLE dbo.market_prices;
GO
CREATE TABLE dbo.market_prices (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    location_id INT NOT NULL,
    district NVARCHAR(150) NOT NULL,
    city_code VARCHAR(50) NOT NULL,
    city_name NVARCHAR(100) NOT NULL,
    apt_min DECIMAL(10, 1) NOT NULL,
    apt_max DECIMAL(10, 1) NOT NULL,
    apt_avg DECIMAL(10, 1) NOT NULL,
    house_min DECIMAL(10, 1) NOT NULL,
    house_max DECIMAL(10, 1) NOT NULL,
    house_avg DECIMAL(10, 1) NOT NULL,
    villa_min DECIMAL(10, 1) NOT NULL,
    villa_max DECIMAL(10, 1) NOT NULL,
    villa_avg DECIMAL(10, 1) NOT NULL,
    land_min DECIMAL(10, 1) NOT NULL,
    land_max DECIMAL(10, 1) NOT NULL,
    land_avg DECIMAL(10, 1) NOT NULL,
    yoy_growth NVARCHAR(20) NOT NULL,
    growth_value DECIMAL(5, 2) NOT NULL,
    liquidity NVARCHAR(50) NOT NULL,
    rent_avg NVARCHAR(50) NOT NULL,
    trend NVARCHAR(50) NOT NULL,
    key_projects NVARCHAR(MAX) NULL,
    updated_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT fk_market_location FOREIGN KEY (location_id) REFERENCES dbo.locations(id) ON UPDATE CASCADE
);
GO

-- -------------------------------------------------------------------------------------
-- 11. Bảng Đánh giá & Phản hồi khách hàng (reviews) -> Phục vụ trang reviews.html
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.reviews', 'U') IS NOT NULL DROP TABLE dbo.reviews;
GO
CREATE TABLE dbo.reviews (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NULL,
    property_id INT NULL,
    author_name NVARCHAR(120) NOT NULL,
    avatar VARCHAR(500) NULL,
    city NVARCHAR(100) NOT NULL,
    service NVARCHAR(150) NOT NULL,
    transaction_badge NVARCHAR(150) NOT NULL,
    rating TINYINT NOT NULL DEFAULT 5,
    date_text NVARCHAR(50) NOT NULL DEFAULT N'Gần đây',
    title NVARCHAR(255) NOT NULL,
    content NVARCHAR(MAX) NOT NULL,
    image VARCHAR(500) NULL,
    helpful_count INT NOT NULL DEFAULT 0,
    reply NVARCHAR(MAX) NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'approved',
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES dbo.users(id) ON DELETE SET NULL,
    CONSTRAINT fk_reviews_property FOREIGN KEY (property_id) REFERENCES dbo.properties(id) ON DELETE SET NULL
);
GO

-- -------------------------------------------------------------------------------------
-- 12. Bảng Lịch hẹn xem nhà & Yêu cầu tư vấn (contact_inquiries) -> Phục vụ contact.html & modal xem nhà
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.contact_inquiries', 'U') IS NOT NULL DROP TABLE dbo.contact_inquiries;
GO
CREATE TABLE dbo.contact_inquiries (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NULL,
    property_id INT NULL,
    full_name NVARCHAR(150) NOT NULL,
    phone VARCHAR(25) NOT NULL,
    email VARCHAR(150) NULL,
    inquiry_type VARCHAR(20) NOT NULL DEFAULT 'viewing',
    appointment_date DATE NULL,
    appointment_time NVARCHAR(50) NULL,
    notes NVARCHAR(MAX) NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'new',
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT fk_inquiries_user FOREIGN KEY (user_id) REFERENCES dbo.users(id) ON DELETE SET NULL,
    CONSTRAINT fk_inquiries_property FOREIGN KEY (property_id) REFERENCES dbo.properties(id) ON DELETE SET NULL
);
GO

-- -------------------------------------------------------------------------------------
-- 13. Bảng Tin yêu thích đã lưu (saved_favorites) -> Phục vụ nút thả tim trên mọi trang
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.saved_favorites', 'U') IS NOT NULL DROP TABLE dbo.saved_favorites;
GO
CREATE TABLE dbo.saved_favorites (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    saved_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT uq_user_property_favorite UNIQUE (user_id, property_id),
    CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES dbo.users(id) ON DELETE CASCADE,
    CONSTRAINT fk_favorites_property FOREIGN KEY (property_id) REFERENCES dbo.properties(id) ON DELETE CASCADE
);
GO

-- -------------------------------------------------------------------------------------
-- 14. Bảng Bảng tính lãi vay ngân hàng (loan_calculations) -> Phục vụ loan-calculator.html
-- -------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.loan_calculations', 'U') IS NOT NULL DROP TABLE dbo.loan_calculations;
GO
CREATE TABLE dbo.loan_calculations (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NULL,
    property_id INT NULL,
    customer_name NVARCHAR(150) NOT NULL,
    customer_phone VARCHAR(25) NOT NULL,
    property_price DECIMAL(15, 2) NOT NULL,
    loan_percentage DECIMAL(5, 2) NOT NULL DEFAULT 70.00,
    loan_amount DECIMAL(15, 2) NOT NULL,
    loan_years INT NOT NULL DEFAULT 20,
    interest_rate DECIMAL(5, 2) NOT NULL DEFAULT 6.50,
    repayment_type VARCHAR(30) NOT NULL DEFAULT 'reducing_balance',
    first_month_payment DECIMAL(15, 2) NULL,
    bank_name NVARCHAR(100) DEFAULT N'Vietcombank',
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT fk_loan_user FOREIGN KEY (user_id) REFERENCES dbo.users(id) ON DELETE SET NULL,
    CONSTRAINT fk_loan_property FOREIGN KEY (property_id) REFERENCES dbo.properties(id) ON DELETE SET NULL
);
GO

-- =====================================================================================
-- PHẦN II: TỐI ƯU HÓA CHỈ MỤC (INDEXES)
-- =====================================================================================
CREATE INDEX idx_properties_category ON dbo.properties(category);
CREATE INDEX idx_properties_type ON dbo.properties(type_id);
CREATE INDEX idx_properties_location ON dbo.properties(location_id);
CREATE INDEX idx_properties_price ON dbo.properties(price_value);
CREATE INDEX idx_properties_area ON dbo.properties(area);
CREATE INDEX idx_properties_status ON dbo.properties(status);
GO

-- =====================================================================================
-- PHẦN III: NẠP DỮ LIỆU BAN ĐẦU (DML)
-- =====================================================================================

-- 1. Nạp roles
SET IDENTITY_INSERT dbo.roles ON;
INSERT INTO dbo.roles (id, name, display_name, description) VALUES
(1, 'admin', N'Quản trị viên Hệ thống', N'Toàn quyền quản trị danh mục BĐS, thành viên, duyệt bài và xem báo cáo'),
(2, 'agent', N'Chuyên viên Môi giới VIP', N'Quyền đăng tin, nhận thông báo hẹn xem nhà từ khách, cập nhật giỏ hàng BĐS'),
(3, 'customer', N'Khách hàng / Thành viên', N'Lưu tin yêu thích, gửi yêu cầu hẹn lịch, tính toán lãi vay');
SET IDENTITY_INSERT dbo.roles OFF;
GO

-- 2. Nạp users
SET IDENTITY_INSERT dbo.users ON;
INSERT INTO dbo.users (id, role_id, username, email, password_hash, full_name, phone, zalo, avatar, title, company, bio, is_verified, status) VALUES
(1, 1, 'admin', 'admin@bdsviet.vn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', N'Quản Trị Viên Sàn', '1900 6868', 'https://zalo.me/19006868', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', N'Giám đốc Điều hành Hệ sinh thái BĐS', N'Minh Vương Home Luxury', N'Chịu trách nhiệm bảo mật và vận hành toàn bộ hệ sinh thái BĐS Minh Vương Home Luxury.', 1, 'active'),
(2, 2, 'hung.nguyen', 'hung.nguyen@bdsviet.vn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', N'Nguyễn Văn Hưng', '0908 123 456', 'https://zalo.me/0908123456', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80', N'Chuyên viên tư vấn BĐS Cần Thơ & Miền Tây', N'Chi nhánh BĐS Tây Nam Bộ', N'Hơn 8 năm kinh nghiệm môi giới đất nền, shophouse và nhà phố thương mại khu vực Cần Thơ, Hậu Giang.', 1, 'active'),
(3, 2, 'tuan.nguyen', 'tuan.nguyen@bdsviet.vn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', N'Nguyễn Minh Tuấn', '0908 123 456', 'https://zalo.me/0908123456', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80', N'Chuyên viên tư vấn Vinhomes Diamond', N'Đại lý F1 Vinhomes', N'Chuyên gia dòng căn hộ cao cấp và dinh thự The Beverly, The Manhattan tại Vinhomes Grand Park.', 1, 'active'),
(4, 2, 'maianh.tran', 'maianh.tran@bdsviet.vn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', N'Trần Mai Anh', '0912 345 678', 'https://zalo.me/0912345678', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', N'Trưởng phòng BĐS Cao cấp Thảo Điền', N'Phòng Kinh Doanh BĐS Hạng Sang TP. Thủ Đức', N'Chuyên phân phối Penthouse, Biệt thự Thảo Điền, Đảo Kim Cương Diamond Island và Thủ Thiêm.', 1, 'active'),
(5, 3, 'khoi.tran', 'khoi.tran@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', N'Trần Minh Khôi', '0912 345 678', 'https://zalo.me/0912345678', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', N'Nhà đầu tư BĐS Cá nhân', N'Hội Nhà Đầu Tư Trẻ', N'Thành viên VIP tìm kiếm cơ hội đầu tư dòng tiền cho thuê và đất nền ven đô.', 1, 'active');
SET IDENTITY_INSERT dbo.users OFF;
GO

-- 3. Nạp property_types
SET IDENTITY_INSERT dbo.property_types ON;
INSERT INTO dbo.property_types (id, code, name, icon, description) VALUES
(1, 'apartment', N'Căn hộ chung cư', 'fa-building', N'Căn hộ cao cấp, chung cư dịch vụ, studio và penthouse cao tầng'),
(2, 'house', N'Nhà phố, nhà riêng', 'fa-house', N'Nhà liền kề, nhà phố thương mại (shophouse), nhà mặt tiền kinh doanh'),
(3, 'villa', N'Biệt thự cao cấp', 'fa-house-chimney-window', N'Biệt thự đơn lập, song lập, dinh thự ven sông khép kín compound'),
(4, 'land', N'Đất nền dự án', 'fa-mountain-sun', N'Đất nền phân lô sổ đỏ, đất thổ cư ven sông chuẩn quy hoạch');
SET IDENTITY_INSERT dbo.property_types OFF;
GO

-- 4. Nạp locations
SET IDENTITY_INSERT dbo.locations ON;
INSERT INTO dbo.locations (id, code, name, region, center_lat, center_lng, default_zoom) VALUES
(1, 'cantho', N'Cần Thơ', N'Miền Nam', 10.0341000, 105.7875000, 15),
(2, 'hcm', N'TP. Hồ Chí Minh', N'Miền Nam', 10.8038000, 106.7500000, 12),
(3, 'hn', N'Hà Nội', N'Miền Bắc', 21.0400000, 105.7800000, 12),
(4, 'danang', N'Đà Nẵng', N'Miền Trung', 16.0200000, 108.2400000, 12),
(5, 'binhduong', N'Bình Dương', N'Miền Nam', 10.9804000, 106.6519000, 12),
(6, 'dongnai', N'Đồng Nai', N'Miền Nam', 10.9574000, 106.8427000, 12);
SET IDENTITY_INSERT dbo.locations OFF;
GO

-- 5. Nạp projects
SET IDENTITY_INSERT dbo.projects ON;
INSERT INTO dbo.projects (id, name, investor, location, scale, status, status_color, price_range, project_type, image_url, highlights) VALUES (101, N'Vinhomes Grand Park', N'Tập đoàn Vingroup', N'TP. Thủ Đức, TP. Hồ Chí Minh', N'271 hecta', N'Đang mở bán phân khu mới', 'bg-emerald-500', N'Từ 2.5 - 65 Tỷ', N'Đại đô thị thông minh', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', N'Công viên 36ha; Vincom Mega Mall; Bệnh viện Vinmec; VinBus nội khu');
INSERT INTO dbo.projects (id, name, investor, location, scale, status, status_color, price_range, project_type, image_url, highlights) VALUES (102, N'Masteri Centre Point', N'Masterise Homes', N'Trung tâm Vinhomes Grand Park, TP. Thủ Đức', N'7.07 hecta (10 tháp căn hộ)', N'Bàn giao nhà ngay', 'bg-blue-500', N'Từ 3.1 - 8.5 Tỷ', N'Căn hộ Compound cao cấp', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', N'Compound biệt lập; Nội thất Marriott; Hồ bơi 2 tầng; Khu vui chơi trẻ em');
INSERT INTO dbo.projects (id, name, investor, location, scale, status, status_color, price_range, project_type, image_url, highlights) VALUES (103, N'Khu đô thị Starlake Tây Hồ Tây', N'Tập đoàn Daewoo E&C Hàn Quốc', N'Quận Tây Hồ & Bắc Từ Liêm, Hà Nội', N'186.3 hecta', N'Đang triển khai giai đoạn 2', 'bg-purple-500', N'Từ 35 - 120 Tỷ', N'KĐT Quốc tế Thượng lưu', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', N'Ngoại giao đoàn; Trung tâm R&D Samsung; Trường Quốc tế Dewey; Hồ sinh thái');
INSERT INTO dbo.projects (id, name, investor, location, scale, status, status_color, price_range, project_type, image_url, highlights) VALUES (104, N'Ecopark Hưng Yên', N'Tập đoàn Ecopark', N'Xuân Quan, Văn Giang, Hưng Yên (cách Hà Nội 13km)', N'500 hecta', N'Mở bán phân khu Biệt thự đảo', 'bg-teal-500', N'Từ 2.2 - 90 Tỷ', N'Thành phố xanh sinh thái', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', N'1 triệu cây xanh; Suối khoáng nóng SwanLake; Học viện Golf Els; Trường BUV');
SET IDENTITY_INSERT dbo.projects OFF;
GO

-- 6. Nạp properties
SET IDENTITY_INSERT dbo.properties ON;
INSERT INTO dbo.properties (id, title, category, type_id, type_name, location_id, district, address, lat, lng, price_display, price_value, unit_price, area, bedrooms, bathrooms, direction, balcony_direction, badge, badge_color, legal, furniture, floor, year_built, investor, description, agent_id, project_id, views_count, status, posted_at_text) VALUES (10, N'Nhà phố thương mại Vincom Shophouse Cần Thơ - Bến Ninh Kiều (10°02''02.8"N 105°47''15.0"E)', 'sale', 2, N'Nhà phố thương mại', 1, N'Quận Ninh Kiều', N'Số 209 Đường 30 Tháng 4, Phường Xuân Khánh, Quận Ninh Kiều, Cần Thơ', 10.0341, 105.7875, N'12.8 Tỷ', 12800, N'85.3 tr/m²', 150, 4, 4, N'Đông Nam', N'Đông Nam', N'GOOGLE MAPS HOT', 'bg-rose-600', N'Sổ hồng hoàn công chính chủ', N'Nội thất cao cấp nhập khẩu toàn bộ', N'1 trệt 3 lầu', 2023, N'Vingroup', N'Bán căn nhà phố Shophouse vị trí kim cương ngay trung tâm Quận Ninh Kiều, Cần Thơ (tọa độ GPS: 10.0341, 105.7875).
Vị trí trung tâm sầm uất nhất miền Tây, view trực diện ngã ba sông Hậu và cầu Ninh Kiều. Pháp lý sổ hồng sang tên ngay trong ngày.', 2, NULL, 228, 'available', N'Hôm nay');
INSERT INTO dbo.properties (id, title, category, type_id, type_name, location_id, district, address, lat, lng, price_display, price_value, unit_price, area, bedrooms, bathrooms, direction, balcony_direction, badge, badge_color, legal, furniture, floor, year_built, investor, description, agent_id, project_id, views_count, status, posted_at_text) VALUES (1, N'Căn hộ cao cấp The Beverly - Vinhomes Grand Park view công viên 36ha', 'sale', 1, N'Căn hộ chung cư', 2, N'TP. Thủ Đức', N'Phường Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh', 10.8423, 106.8415, N'3.2 Tỷ', 3200, N'42.6 tr/m²', 75, 2, 2, N'Đông Nam', N'Đông Nam', N'VIP HOT', 'bg-rose-500', N'Sổ hồng sở hữu lâu dài', N'Nội thất cơ bản cao cấp Hafele', N'Tầng 18 (Tòa BE5)', 2024, N'Vinhomes', N'Chính chủ cần chuyển nhượng căn hộ 2PN 2WC tòa BE5 phân khu cao cấp nhất The Beverly - Vinhomes Grand Park.
- Căn góc tầng đẹp, ban công Đông Nam mát mẻ quanh năm, view triệu đô nhìn trọn vẹn đại công viên 36 hecta và khu vui chơi VinWonders.
- Thiết kế hiện đại tối ưu công năng, bếp thông thoáng có ban công riêng.
- Hỗ trợ vay ngân hàng Techcombank / Vietcombank lên đến 70% giá trị hợp đồng, ân hạn nợ gốc 24 tháng.
- Pháp lý chuẩn chỉnh, ký hợp đồng mua bán sang tên trực tiếp.', 3, 101, 209, 'available', N'Hôm nay');
INSERT INTO dbo.properties (id, title, category, type_id, type_name, location_id, district, address, lat, lng, price_display, price_value, unit_price, area, bedrooms, bathrooms, direction, balcony_direction, badge, badge_color, legal, furniture, floor, year_built, investor, description, agent_id, project_id, views_count, status, posted_at_text) VALUES (2, N'Nhà phố thương mại Shophouse Thảo Điền - Đang cho thuê kinh doanh 65tr/th', 'sale', 2, N'Nhà phố thương mại', 2, N'TP. Thủ Đức', N'Đường Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh', 10.8038, 106.7329, N'24.5 Tỷ', 24500, N'213 tr/m²', 115, 4, 5, N'Nam', N'Nam', N'CHÍNH CHỦ', 'bg-emerald-600', N'Sổ hồng hoàn công đầy đủ', N'Đầy đủ tiện nghi cao cấp', N'1 Trệt 3 Lầu 1 Sân thượng', 2022, N'Tư nhân', N'Bán nhà phố mặt tiền kinh doanh Thảo Điền, vị trí cực đẹp thuận tiện kinh doanh nhà hàng, cafe cao cấp, spa hoặc làm văn phòng đại diện.
- Dòng tiền cho thuê cực kỳ ổn định 65 triệu/tháng, hợp đồng dài hạn.
- Khu vực dân trí cao, an ninh nghiêm ngặt, tiềm năng sinh lời bền vững theo hạ tầng Metro.
- Sổ hồng riêng chính chủ, công chứng sang tên trong ngày.', 4, NULL, 196, 'available', N'1 ngày trước');
INSERT INTO dbo.properties (id, title, category, type_id, type_name, location_id, district, address, lat, lng, price_display, price_value, unit_price, area, bedrooms, bathrooms, direction, balcony_direction, badge, badge_color, legal, furniture, floor, year_built, investor, description, agent_id, project_id, views_count, status, posted_at_text) VALUES (3, N'Biệt thự đơn lập Ciputra Tây Hồ - Sân vườn rộng view công viên trung tâm', 'sale', 3, N'Biệt thự cao cấp', 3, N'Quận Tây Hồ', N'KĐT Ciputra, Phường Phú Thượng, Quận Tây Hồ, Hà Nội', 21.0772, 105.7958, N'48 Tỷ', 48000, N'160 tr/m²', 300, 5, 6, N'Đông', N'Đông', N'SIÊU VIP', 'bg-purple-600', N'Sổ đỏ chính chủ sẵn sàng sang tên', N'Full nội thất nhập khẩu Ý', N'3 Tầng + 1 Bán hầm', 2021, N'Ciputra Group', N'Cần bán căn biệt thự đơn lập giai đoạn 2 KĐT Ciputra Nam Thăng Long.
- Vị trí góc 2 mặt thoáng, thiết kế kiến trúc tân cổ điển sang trọng, kiên cố.
- Nội thất gỗ óc chó tự nhiên, thiết bị vệ sinh mạ vàng cao cấp của Kohler.
- Gia chủ để lại toàn bộ đồ đạc cho khách mua thiện chí.', 2, NULL, 351, 'available', N'Hôm qua');
INSERT INTO dbo.properties (id, title, category, type_id, type_name, location_id, district, address, lat, lng, price_display, price_value, unit_price, area, bedrooms, bathrooms, direction, balcony_direction, badge, badge_color, legal, furniture, floor, year_built, investor, description, agent_id, project_id, views_count, status, posted_at_text) VALUES (4, N'Căn hộ 2PN Vinhomes Smart City Tây Mỗ - Full đồ đẹp lung linh xách vali ở ngay', 'sale', 1, N'Căn hộ chung cư', 3, N'Quận Nam Từ Liêm', N'Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội', 20.9998, 105.7482, N'2.85 Tỷ', 2850, N'44.5 tr/m²', 64, 2, 2, N'Tây Nam', N'Đông Bắc', N'GIÁ TỐT', 'bg-blue-600', N'Sổ hồng sở hữu vĩnh viễn', N'Đầy đủ nội thất cao cấp', N'Tầng 12', 2023, N'Vinhomes', N'Chủ nhà chuyển công tác cần nhượng lại căn 2 phòng ngủ + 1 tại phân khu Sapphire. Nhà giữ gìn cẩn thận, nội thất tự tay đặt đóng tâm huyết. Giá bán bao toàn bộ thuế phí chuyển nhượng.', 2, NULL, 316, 'available', N'3 ngày trước');
INSERT INTO dbo.properties (id, title, category, type_id, type_name, location_id, district, address, lat, lng, price_display, price_value, unit_price, area, bedrooms, bathrooms, direction, balcony_direction, badge, badge_color, legal, furniture, floor, year_built, investor, description, agent_id, project_id, views_count, status, posted_at_text) VALUES (5, N'Cho thuê căn hộ Landmark 81 view sông Sài Gòn - Nội thất 5 sao đẳng cấp', 'rent', 1, N'Căn hộ cho thuê', 2, N'Quận Bình Thạnh', N'Khu Vinhomes Central Park, Bình Thạnh, TP. Hồ Chí Minh', 10.7951, 106.7219, N'32 Triệu/tháng', 32, N'370 k/m²', 86, 2, 2, N'Đông Bắc', N'Đông Bắc', N'CHO THUÊ', 'bg-amber-600', N'Hợp đồng thuê 1-2 năm', N'Full option phong cách khách sạn 5*', N'Tầng 35', 2020, N'Vingroup', N'Cho thuê căn hộ cao cấp 2PN tại tòa tháp biểu tượng Landmark 81.
- Thiết kế theo tiêu chuẩn khách sạn siêu sang, tầm nhìn ôm trọn sông Sài Gòn và trung tâm Quận 1.
- Đã trang bị đầy đủ chỉ cần xách vali vào ở. Dịch vụ dọn phòng 2 lần/tuần theo yêu cầu.', 2, NULL, 224, 'available', N'Hôm nay');
INSERT INTO dbo.properties (id, title, category, type_id, type_name, location_id, district, address, lat, lng, price_display, price_value, unit_price, area, bedrooms, bathrooms, direction, balcony_direction, badge, badge_color, legal, furniture, floor, year_built, investor, description, agent_id, project_id, views_count, status, posted_at_text) VALUES (6, N'Đất nền sổ đỏ thổ cư ven sông Cổ Cò - Nam Đà Nẵng, thích hợp xây biệt thự vườn', 'sale', 4, N'Đất nền dự án', 4, N'Ngũ Hành Sơn', N'Đường Võ Quí Huân, Phường Hòa Hải, Quận Ngũ Hành Sơn, Đà Nẵng', 15.9868, 108.2615, N'3.6 Tỷ', 3600, N'18 tr/m²', 200, 0, 0, N'Đông', N'Đông', N'SỔ ĐỎ CÔNG CHỨNG', 'bg-teal-600', N'Sổ đỏ 100% đất ở đô thị', N'Đất trống sẵn sàng xây dựng ngay', N'Xây tự do đến 5 tầng', 2024, N'Tư nhân', N'Cần nhượng lô đất nền thổ cư ven sông Cổ Cò, phong thủy tụ khí cực tốt. Mặt tiền ngang 10m x dài 20m vuông vắn. Thích hợp mua đầu tư tích sản hoặc xây biệt thự nghỉ dưỡng, homestay du lịch.', 2, NULL, 278, 'available', N'2 ngày trước');
INSERT INTO dbo.properties (id, title, category, type_id, type_name, location_id, district, address, lat, lng, price_display, price_value, unit_price, area, bedrooms, bathrooms, direction, balcony_direction, badge, badge_color, legal, furniture, floor, year_built, investor, description, agent_id, project_id, views_count, status, posted_at_text) VALUES (7, N'Nhà phố liền kề Starlake Tây Hồ Tây - Phong cách Hàn Quốc, chuẩn sống thượng lưu', 'sale', 2, N'Nhà liền kề', 3, N'Quận Tây Hồ', N'KĐT Starlake Tây Hồ Tây, Phường Xuân La, Quận Tây Hồ, Hà Nội', 21.0594, 105.7951, N'36 Tỷ', 36000, N'240 tr/m²', 150, 4, 5, N'Đông Nam', N'Đông Nam', N'ĐỘC QUYỀN', 'bg-indigo-600', N'Sổ đỏ sở hữu lâu dài', N'Hoàn thiện mặt ngoài, thô bên trong', N'4 Tầng', 2023, N'Daewoo E&C', N'Chính chủ cần bán gấp căn liền kề dãy H6 Starlake Tây Hồ Tây. Vị trí trung tâm kết nối thuận tiện Võ Chí Công, Hoàng Quốc Việt. Khu vực có tiềm năng gia tăng giá trị phi mã khi trung tâm R&D Samsung và Lotte Mall đi vào hoạt động.', 2, 103, 217, 'available', N'4 ngày trước');
INSERT INTO dbo.properties (id, title, category, type_id, type_name, location_id, district, address, lat, lng, price_display, price_value, unit_price, area, bedrooms, bathrooms, direction, balcony_direction, badge, badge_color, legal, furniture, floor, year_built, investor, description, agent_id, project_id, views_count, status, posted_at_text) VALUES (8, N'Căn hộ Penthouse Duplex Đảo Kim Cương Diamond Island - Hồ bơi riêng view 360', 'sale', 1, N'Penthouse / Duplex', 2, N'TP. Thủ Đức', N'Số 1 Đường số 104, Phường Bình Trưng Tây, TP. Thủ Đức, TP. Hồ Chí Minh', 10.7674, 106.7497, N'55 Tỷ', 55000, N'122 tr/m²', 450, 4, 5, N'Nam', N'Nam', N'SIÊU VIP', 'bg-purple-600', N'Sổ hồng sở hữu lâu dài', N'Thiết kế đo ni đóng giày phong cách Ý', N'Tầng 28 - 29 (Duplex)', 2021, N'Kusto Home', N'Tuyệt tác căn hộ Penthouse Duplex tại Đảo Kim Cương (Diamond Island). Không gian sống riêng tư biệt lập giữa lòng Sài Gòn. Toàn bộ nội thất nhập khẩu từ các thương hiệu hàng đầu thế giới B&B Italia, Poliform.', 4, NULL, 173, 'available', N'Hôm nay');
SET IDENTITY_INSERT dbo.properties OFF;
GO

-- 7. Nạp property_images
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (10, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 1, 1);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (10, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', 0, 2);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (10, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', 0, 3);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (1, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', 1, 1);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (1, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', 0, 2);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (1, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 0, 3);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (1, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', 0, 4);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (2, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', 1, 1);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (2, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', 0, 2);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (2, 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', 0, 3);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (3, 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', 1, 1);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (3, 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80', 0, 2);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (3, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', 0, 3);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (4, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80', 1, 1);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (4, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', 0, 2);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (4, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', 0, 3);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (5, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', 1, 1);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (5, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', 0, 2);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (5, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', 0, 3);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (6, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', 1, 1);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (6, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80', 0, 2);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (7, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', 1, 1);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (7, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 0, 2);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (8, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', 1, 1);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (8, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', 0, 2);
INSERT INTO dbo.property_images (property_id, image_url, is_primary, sort_order) VALUES (8, 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', 0, 3);
GO

-- 8. Nạp property_features
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (10, N'Tọa độ thực tế Google Maps 10°02''02.8"N 105°47''15.0"E');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (10, N'Mặt tiền đắc địa ngay trung tâm Bến Ninh Kiều, Cần Thơ');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (10, N'Khai thác kinh doanh hoặc cho thuê dòng tiền 55 triệu/tháng');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (10, N'Liền kề TTTM Vincom Plaza Xuân Khánh và công viên Sông Hậu');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (1, N'View trực diện công viên 36ha và sông Đồng Nai');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (1, N'Bàn giao nội thất nhập khẩu Hafele, Kohler');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (1, N'Hệ thống Smart Home điều khiển qua điện thoại');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (1, N'Hồ bơi nước mặn vô cực tầng 4 phong cách resort');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (1, N'Miễn phí quản lý 2 năm đầu tiên');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (1, N'Trường học liên cấp Vinschool cách 300m');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (1, N'TTTM Vincom Mega Mall lớn nhất miền Nam kế bên');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (2, N'Mặt tiền đường sầm uất Thảo Điền, vỉa hè rộng 6m');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (2, N'Hợp đồng thuê 65 triệu/tháng còn thời hạn 3 năm');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (2, N'Có hố chờ thang máy, hoàn công đầy đủ');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (2, N'Khu phố Tây tập trung nhiều người nước ngoài sinh sống');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (2, N'Gần trường Quốc tế Anh BIS và trạm Metro Thảo Điền');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (3, N'Sân vườn rộng bao quanh nhà trồng hoa và cây cảnh quý');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (3, N'Garage tầng hầm đỗ được 3 xe ô tô rộng rãi');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (3, N'An ninh 3 lớp bảo vệ 24/7 tuyệt đối an toàn');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (3, N'Khu dân trí cao, nhiều đại sứ quán và chuyên gia quốc tế');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (3, N'Sân golf Ciputra tiêu chuẩn quốc tế ngay trong khuôn viên');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (4, N'Tầng trung view thoáng mát không bị che chắn');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (4, N'Gần trường mầm non Vinschool và ga Metro số 6 tương lai');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (4, N'Đầy đủ hệ thống bếp Bosch, sofa da bò, giường tủ An Cường');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (4, N'Sử dụng miễn phí vườn Nhật Zen Park và công viên thể thao 10.2ha');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (5, N'Tòa nhà biểu tượng cao nhất Việt Nam Landmark 81');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (5, N'Thẻ cư dân VIP sử dụng sky lounge, gym, hồ bơi vô cực chân mây');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (5, N'Trực tiếp kết nối TTTM Vincom Center, rạp chiếu phim, ẩm thực quốc tế');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (5, N'Hệ thống lọc nước uống trực tiếp tại vòi và lọc không khí trung tâm');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (6, N'Mặt tiền đường 7.5m, vỉa hè mỗi bên 3m thoáng đãng');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (6, N'Cách bãi tắm Tân Trà chỉ 1.2km, gần tổ hợp Cocobay');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (6, N'Cơ sở hạ tầng điện âm, nước máy, đèn đường hoàn thiện 100%');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (6, N'Tiềm năng tăng giá mạnh khi thông luồng du lịch sông Cổ Cò Đà Nẵng - Hội An');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (7, N'Khu đô thị quốc tế được Daewoo E&C Hàn Quốc phát triển');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (7, N'Gần các bộ ngành ngoại giao đoàn và trung tâm hành chính mới');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (7, N'Tiện ích trường liên cấp quốc tế Dewey, bệnh viện quốc tế');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (7, N'Mật độ xây dựng chỉ 16%, không gian xanh chuẩn sinh thái');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (8, N'Hòn đảo tự nhiên duy nhất tại TP.HCM với 85% mảng xanh');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (8, N'Bể bơi tràn bờ nước mặn riêng trên tầng thượng của căn hộ');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (8, N'Bến du thuyền tư nhân, bãi đáp trực thăng sang trọng');
INSERT INTO dbo.property_features (property_id, feature_text) VALUES (8, N'Tầm nhìn panorama 360 độ trọn vẹn sông Sài Gòn và sông Giồng Ông Tố');
GO

-- 9. Nạp property_amenities
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (10, N'Bến Ninh Kiều', N'300m', 'fa-water');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (10, N'Vincom Plaza', N'150m', 'fa-bag-shopping');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (10, N'Cầu Đi Bộ Cần Thơ', N'500m', 'fa-bridge');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (10, N'Chợ Đêm Cần Thơ', N'400m', 'fa-store');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (1, N'Vincom Mega Mall', N'200m', 'fa-bag-shopping');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (1, N'Trường Vinschool', N'350m', 'fa-graduation-cap');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (1, N'Bệnh viện Vinmec', N'500m', 'fa-hospital');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (1, N'Công viên 36ha', N'100m', 'fa-tree');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (1, N'Bến xe Miền Đông mới', N'3.5km', 'fa-bus');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (2, N'Ga Metro Thảo Điền', N'450m', 'fa-train-subway');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (2, N'Trường Quốc tế BIS', N'300m', 'fa-graduation-cap');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (2, N'Vincom Mega Mall Thảo Điền', N'800m', 'fa-bag-shopping');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (2, N'Bệnh viện Quốc tế Thảo Điền', N'600m', 'fa-hospital');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (3, N'Sân Golf Ciputra', N'200m', 'fa-flag');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (3, N'Trường Quốc tế UNIS', N'400m', 'fa-graduation-cap');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (3, N'Lotte Mall Tây Hồ', N'1.2km', 'fa-bag-shopping');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (3, N'Hồ Tây', N'1.5km', 'fa-water');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (4, N'Vườn Nhật Zen Park', N'150m', 'fa-torii-gate');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (4, N'TTTM Vincom Mega Mall', N'500m', 'fa-bag-shopping');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (4, N'Bệnh viện Vinmec Smart City', N'600m', 'fa-hospital');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (4, N'Sân vận động Mỹ Đình', N'4km', 'fa-futbol');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (5, N'Công viên Central Park 14ha', N'50m', 'fa-tree');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (5, N'Vincom Landmark 81', N'Trực diện', 'fa-bag-shopping');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (5, N'Bệnh viện Vinmec', N'300m', 'fa-hospital');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (5, N'Trung tâm Quận 1', N'3km', 'fa-city');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (6, N'Bãi tắm Tân Trà', N'1.2km', 'fa-umbrella-beach');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (6, N'Sân Golf Montgomerie Links', N'2km', 'fa-flag');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (6, N'Phố cổ Hội An', N'12km', 'fa-landmark');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (6, N'Sân bay Đà Nẵng', N'14km', 'fa-plane');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (7, N'Trung tâm R&D Samsung', N'300m', 'fa-building');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (7, N'Lotte Mall Tây Hồ', N'1.5km', 'fa-bag-shopping');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (7, N'Hồ Tây', N'2km', 'fa-water');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (7, N'Sân bay Nội Bài', N'18km', 'fa-plane');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (8, N'Bến du thuyền Diamond', N'100m', 'fa-ship');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (8, N'Hồ bơi khoáng mặn', N'50m', 'fa-water-ladder');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (8, N'Khu tài chính Thủ Thiêm', N'3.5km', 'fa-landmark');
INSERT INTO dbo.property_amenities (property_id, name, dist, icon) VALUES (8, N'Trung tâm Quận 1', N'6km', 'fa-city');
GO

-- 10. Nạp market_prices
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('hcm-1', 2, N'Quận 1', 'hcm', N'TP. Hồ Chí Minh', 140, 280, 195, 320, 850, 480, 450, 1200, 680, 280, 650, 410, N'+3.8%', 3.8, N'Rất cao', N'25 - 65 tr/tháng', N'Tăng nhẹ', N'The Grand Manhattan, Grand Marina Saigon, Centennial');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('hcm-2', 2, N'TP. Thủ Đức (Khu Đông)', 'hcm', N'TP. Hồ Chí Minh', 55, 135, 78, 110, 260, 165, 160, 420, 250, 48, 120, 72, N'+5.6%', 5.6, N'Rất cao', N'12 - 32 tr/tháng', N'Tăng mạnh', N'Vinhomes Grand Park, Masteri Centre Point, The Global City, Eaton Park');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('hcm-3', 2, N'Quận 7 & Nhà Bè (Khu Nam)', 'hcm', N'TP. Hồ Chí Minh', 46, 95, 65, 95, 210, 140, 140, 350, 210, 42, 90, 58, N'+3.2%', 3.2, N'Cao', N'11 - 28 tr/tháng', N'Ổn định', N'Phú Mỹ Hưng The Peak, Eco Green Saigon, Celesta Rise');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('hcm-4', 2, N'Quận Bình Thạnh & Phú Nhuận', 'hcm', N'TP. Hồ Chí Minh', 62, 125, 85, 140, 310, 195, 210, 480, 310, 90, 190, 130, N'+4.1%', 4.1, N'Rất cao', N'14 - 35 tr/tháng', N'Tăng nhẹ', N'Vinhomes Central Park, Sunwah Pearl, City Garden');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('hcm-5', 2, N'Bình Chánh & Cần Giuộc giáp ranh', 'hcm', N'TP. Hồ Chí Minh', 32, 52, 41, 45, 95, 65, 70, 160, 105, 24, 48, 34, N'+4.5%', 4.5, N'Cao', N'6 - 15 tr/tháng', N'Tăng nhẹ', N'Mizuki Park, Westgate An Gia, KĐT EHome');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('hn-1', 3, N'Quận Cầu Giấy & Nam Từ Liêm', 'hn', N'Hà Nội', 58, 110, 76, 160, 340, 220, 240, 550, 360, 95, 210, 145, N'+7.2%', 7.2, N'Rất cao', N'13 - 30 tr/tháng', N'Tăng mạnh', N'The Matrix One, Vinhomes Smart City, Mipec Rubik 360');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('hn-2', 3, N'Quận Tây Hồ & Ngoại Giao Đoàn', 'hn', N'Hà Nội', 85, 185, 125, 220, 520, 330, 310, 750, 460, 140, 320, 210, N'+6.4%', 6.4, N'Rất cao', N'20 - 55 tr/tháng', N'Tăng mạnh', N'Starlake Tây Hồ Tây, Ciputra Hanoi, Heritage West Lake');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('hn-3', 3, N'Quận Đống Đa, Ba Đình & Hoàn Kiếm', 'hn', N'Hà Nội', 90, 210, 145, 250, 680, 390, 380, 950, 560, 180, 450, 280, N'+4.8%', 4.8, N'Cao', N'18 - 45 tr/tháng', N'Tăng nhẹ', N'Grandeur Palace Giảng Võ, Vinhomes Metropolis, D''. San Raffles');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('hn-4', 3, N'Quận Long Biên & Gia Lâm (Khu Đông)', 'hn', N'Hà Nội', 42, 85, 58, 85, 190, 125, 130, 340, 210, 48, 110, 72, N'+5.9%', 5.9, N'Rất cao', N'9 - 22 tr/tháng', N'Tăng mạnh', N'Vinhomes Riverside, Vinhomes Ocean Park 1, Khai Sơn City');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('hn-5', 3, N'Huyện Đông Anh & Mê Linh (Đón quy hoạch)', 'hn', N'Hà Nội', 35, 60, 45, 55, 120, 82, 80, 210, 135, 35, 85, 52, N'+6.8%', 6.8, N'Cao', N'7 - 16 tr/tháng', N'Tăng mạnh', N'Thành phố Thông minh Smart City, Vinhomes Cổ Loa');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('dn-1', 4, N'Quận Hải Châu (Trung tâm)', 'danang', N'Đà Nẵng', 55, 115, 78, 90, 220, 145, 130, 310, 200, 65, 160, 98, N'+3.1%', 3.1, N'Cao', N'10 - 26 tr/tháng', N'Ổn định', N'The Royal Boutique Hotel & Villa, Sun Ponte Residence, FHome');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('dn-2', 4, N'Quận Sơn Trà & Ngũ Hành Sơn (Ven biển)', 'danang', N'Đà Nẵng', 45, 95, 68, 70, 170, 115, 110, 290, 185, 42, 110, 68, N'+4.2%', 4.2, N'Rất cao', N'11 - 35 tr/tháng', N'Tăng nhẹ', N'Sun Symphony Residence, Ocean Villas, Hyatt Regency');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('dn-3', 4, N'Quận Cẩm Lệ & Hòa Vang (Ven đô)', 'danang', N'Đà Nẵng', 25, 45, 34, 40, 80, 56, 60, 140, 92, 22, 48, 32, N'+2.5%', 2.5, N'Trung bình', N'5 - 12 tr/tháng', N'Ổn định', N'KĐT Nam Hòa Xuân, Golden Hills Đà Nẵng');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('bd-1', 5, N'TP. Thủ Dầu Một & TP. Thuận An', 'binhduong', N'Bình Dương', 32, 50, 39, 45, 95, 66, 65, 150, 98, 26, 55, 38, N'+4.4%', 4.4, N'Rất cao', N'7 - 18 tr/tháng', N'Tăng nhẹ', N'Astral City, The Emerald Golf View, Bcons City');
INSERT INTO dbo.market_prices (code, location_id, district, city_code, city_name, apt_min, apt_max, apt_avg, house_min, house_max, house_avg, villa_min, villa_max, villa_avg, land_min, land_max, land_avg, yoy_growth, growth_value, liquidity, rent_avg, trend, key_projects) VALUES ('dnai-1', 6, N'TP. Biên Hòa & Huyện Long Thành', 'dongnai', N'Đồng Nai', 28, 45, 35, 40, 85, 58, 55, 140, 88, 20, 52, 33, N'+4.9%', 4.9, N'Cao', N'6 - 15 tr/tháng', N'Tăng nhẹ', N'Aqua City, KĐT Century City Long Thành, Izumi City');
GO

-- 11. Nạp reviews (kèm liên kết user_id và property_id)
SET IDENTITY_INSERT dbo.reviews ON;
INSERT INTO dbo.reviews (id, user_id, property_id, author_name, avatar, city, service, transaction_badge, rating, date_text, title, content, helpful_count, reply, status) VALUES (1, 1, 1, N'Chị Nguyễn Phương Thảo', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', N'Cần Thơ', N'Tư vấn pháp lý & Mua nhà', N'Đã mua nhà phố Ninh Kiều - Cần Thơ', 5, N'Hôm qua lúc 15:42', N'Bản đồ ghim tọa độ Cần Thơ 10.0341, 105.7875 chuẩn xác tuyệt đối!', N'Mình ở miền Tây, tìm nhà khu vực Ninh Kiều trên bản đồ Google Maps của trang rất chuẩn xác. Văn phòng Cần Thơ ở Đại lộ Hòa Bình tư vấn cực kỳ nhiệt tình, có xe ô tô đưa đón xem đất thực tế hoàn toàn miễn phí. Thủ tục sang tên công chứng chỉ mất 3 ngày!', 42, N'Dạ BĐS VIỆT Hub chi nhánh Cần Thơ xin cảm ơn chị Thảo rất nhiều! Chúc chị và gia đình luôn an khang thịnh vượng tại ngôi nhà mới ạ.', 'approved');
INSERT INTO dbo.reviews (id, user_id, property_id, author_name, avatar, city, service, transaction_badge, rating, date_text, title, content, helpful_count, reply, status) VALUES (2, 2, 2, N'Anh Hoàng Minh Tuấn', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', N'TP. Hồ Chí Minh', N'Mua căn hộ chung cư', N'Đã mua căn 2PN Origami - Vinhomes Grand Park', 5, N'3 ngày trước', N'Tính năng bản đồ số vệ tinh và quét bán kính tiện ích đỉnh cao', N'Rất bất ngờ về tính năng bản đồ số vệ tinh của web, xem được cả bán kính tiện ích trường học, bệnh viện Vinmec quanh Landmark 81 và Vinhomes Grand Park. Gọi lên hotline 1900 6868 được chuyên viên hỗ trợ kết nối chủ nhà trong 10 phút.', 68, N'BĐS VIỆT Hub cảm ơn anh Tuấn đã tin tưởng! Hệ thống bản đồ số luôn được cập nhật dữ liệu quy hoạch mới nhất để hỗ trợ quý khách.', 'approved');
INSERT INTO dbo.reviews (id, user_id, property_id, author_name, avatar, city, service, transaction_badge, rating, date_text, title, content, helpful_count, reply, status) VALUES (3, 3, 3, N'Bác Đỗ Quang Huy', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', N'Hà Nội', N'Tư vấn gói vay mua nhà', N'Đã giải ngân ngân hàng BIDV 20 năm', 5, N'1 tuần trước', N'Công cụ tính lãi vay mua nhà chính xác từng đồng', N'Tôi tuổi cao, trước giờ ngại thủ tục vay mua nhà. May nhờ công cụ tính lãi suất trên web tính đúng từng đồng tiền gốc và lãi giảm dần của Vietcombank, chuyên viên chi nhánh Keangnam Hà Nội còn đến tận nhà hướng dẫn hồ sơ rất chu đáo.', 35, N'Kính chúc Bác Huy nhiều sức khỏe! Sự hài lòng của Bác là niềm tự hào lớn của toàn bộ đội ngũ tư vấn BĐS VIỆT Hub.', 'approved');
INSERT INTO dbo.reviews (id, user_id, property_id, author_name, avatar, city, service, transaction_badge, rating, date_text, title, content, helpful_count, reply, status) VALUES (4, 4, 4, N'Anh Trần Quốc Bảo', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80', N'TP. Hồ Chí Minh', N'Ký gửi bán nhà đất', N'Đã bán căn hộ Landmark 81 thành công', 5, N'2 tuần trước', N'Ký gửi tin đăng tự động ghim bản đồ, chốt cọc trong 3 tuần', N'Đăng tin ký gửi trên trang này tiếp cận được nhiều khách hàng có nhu cầu thật. Hệ thống Wizard 4 bước đăng tin dễ dùng, tự động ghim vị trí lên Leaflet. Căn hộ của mình đã tìm được người mua với mức giá như ý.', 29, N'Cảm ơn anh Bảo đã lựa chọn dịch vụ ký gửi VIP của sàn! Rất mong được tiếp tục đồng hành cùng anh trong các giao dịch tiếp theo.', 'approved');
INSERT INTO dbo.reviews (id, user_id, property_id, author_name, avatar, city, service, transaction_badge, rating, date_text, title, content, helpful_count, reply, status) VALUES (5, 5, 5, N'Chị Lê Thúy Hằng', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', N'Đà Nẵng', N'Tra cứu bản đồ quy hoạch', N'Đã kiểm tra quy hoạch sổ hồng', 5, N'3 tuần trước', N'Đội ngũ pháp lý kiểm tra quy hoạch giúp tránh được rủi ro lớn', N'Nhờ có BĐS VIỆT Hub kiểm tra sổ đỏ và tra cứu quy hoạch mà mình tránh được một lô đất đang dính quy hoạch hành lang mở rộng đường 20m. Phục vụ chuyên nghiệp, minh bạch và không hề thu phụ phí mờ ám.', 51, N'Cảm ơn chị Hằng! Minh bạch thông tin và bảo vệ quyền lợi pháp lý của người mua luôn là kim chỉ nam hàng đầu của chúng tôi.', 'approved');
SET IDENTITY_INSERT dbo.reviews OFF;
GO

-- 12. Nạp contact_inquiries mẫu (kèm liên kết user_id và property_id)
SET IDENTITY_INSERT dbo.contact_inquiries ON;
INSERT INTO dbo.contact_inquiries (id, user_id, property_id, full_name, phone, email, inquiry_type, appointment_date, appointment_time, notes, status) VALUES
(1, 5, 10, N'Phạm Thành Long', '0938 999 888', 'long.pham@gmail.com', 'viewing', '2026-10-25', N'09:00 Sáng', N'Muốn xem trực tiếp Shophouse Vincom Cần Thơ tại Bến Ninh Kiều, đi cùng gia đình.', 'new'),
(2, 5, 1, N'Lê Thị Thu Trang', '0918 234 567', 'trang.le@yahoo.com', 'loan', '2026-10-26', N'14:30 Chiều', N'Cần tư vấn gói vay 70% ngân hàng Vietcombank cho căn 2PN The Beverly 3.2 Tỷ.', 'contacted'),
(3, 5, 8, N'Đặng Hoàng Nam', '0903 777 666', 'nam.dang@investment.vn', 'viewing', '2026-10-27', N'10:00 Sáng', N'Khách VIP quan tâm Penthouse Duplex Đảo Kim Cương 68 Tỷ, yêu cầu bảo mật.', 'contacted');
SET IDENTITY_INSERT dbo.contact_inquiries OFF;
GO

// 13. Saved favorites
INSERT INTO dbo.saved_favorites (user_id, property_id) VALUES
(5, 1),
(5, 10),
(5, 8);
GO

// 14. Loan calculations
INSERT INTO dbo.loan_calculations (user_id, property_id, customer_name, customer_phone, property_price, loan_percentage, loan_amount, loan_years, interest_rate, repayment_type, first_month_payment, bank_name) VALUES
(5, 1, N'Trần Minh Khôi', '0912 345 678', 3200.00, 70.00, 2240.00, 20, 6.50, 'reducing_balance', 21.46, N'Vietcombank'),
(5, 10, N'Phạm Thành Long', '0938 999 888', 12800.00, 60.00, 7680.00, 15, 7.20, 'reducing_balance', 88.75, N'Techcombank');
GO

-- =====================================================================================
-- PHẦN IV: KHUNG NHÌN NÂNG CAO (VIEWS)
-- =====================================================================================

IF OBJECT_ID('dbo.v_properties_detailed', 'V') IS NOT NULL DROP VIEW dbo.v_properties_detailed;
GO
CREATE VIEW dbo.v_properties_detailed AS
SELECT 
    p.id AS property_id,
    p.title,
    p.category,
    CASE WHEN p.category = 'sale' THEN N'Mua bán' ELSE N'Cho thuê' END AS category_text,
    pt.code AS type_code,
    pt.name AS type_name,
    pt.icon AS type_icon,
    p.price_display,
    p.price_value,
    p.unit_price,
    p.area,
    p.bedrooms,
    p.bathrooms,
    p.direction,
    p.balcony_direction,
    p.address,
    p.district,
    loc.code AS city_code,
    loc.name AS city_name,
    p.lat,
    p.lng,
    p.badge,
    p.badge_color,
    p.legal,
    p.furniture,
    p.floor,
    p.year_built,
    p.investor,
    p.description,
    p.views_count,
    p.status,
    p.posted_at_text,
    p.created_at,
    -- Thông tin môi giới
    u.id AS agent_id,
    u.full_name AS agent_name,
    u.phone AS agent_phone,
    u.email AS agent_email,
    u.zalo AS agent_zalo,
    u.avatar AS agent_avatar,
    u.title AS agent_title,
    -- Thông tin dự án
    proj.id AS project_id,
    proj.name AS project_name,
    -- Ảnh đại diện chính
    (SELECT TOP 1 image_url FROM dbo.property_images WHERE property_id = p.id ORDER BY is_primary DESC, sort_order ASC) AS primary_image,
    -- Tổng số ảnh
    (SELECT COUNT(*) FROM dbo.property_images WHERE property_id = p.id) AS total_images
FROM dbo.properties p
INNER JOIN dbo.property_types pt ON p.type_id = pt.id
INNER JOIN dbo.locations loc ON p.location_id = loc.id
INNER JOIN dbo.users u ON p.agent_id = u.id
LEFT JOIN dbo.projects proj ON p.project_id = proj.id;
GO

IF OBJECT_ID('dbo.v_market_by_city', 'V') IS NOT NULL DROP VIEW dbo.v_market_by_city;
GO
CREATE VIEW dbo.v_market_by_city AS
SELECT 
    city_code,
    city_name,
    COUNT(*) AS total_districts,
    ROUND(AVG(apt_avg), 1) AS avg_apartment_price,
    ROUND(AVG(house_avg), 1) AS avg_house_price,
    ROUND(AVG(villa_avg), 1) AS avg_villa_price,
    ROUND(AVG(land_avg), 1) AS avg_land_price,
    ROUND(AVG(growth_value), 2) AS avg_yoy_growth
FROM dbo.market_prices
GROUP BY city_code, city_name;
GO

-- =====================================================================================
-- PHẦN V: THỦ TỤC LƯU TRỮ (STORED PROCEDURES)
-- =====================================================================================

IF OBJECT_ID('dbo.sp_search_properties', 'P') IS NOT NULL DROP PROCEDURE dbo.sp_search_properties;
GO
CREATE PROCEDURE dbo.sp_search_properties
    @keyword NVARCHAR(255) = NULL,
    @category VARCHAR(10) = NULL,
    @city_code VARCHAR(50) = NULL,
    @type_code VARCHAR(50) = NULL,
    @min_price DECIMAL(15,2) = NULL,
    @max_price DECIMAL(15,2) = NULL,
    @min_area DECIMAL(10,2) = NULL,
    @max_area DECIMAL(10,2) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM dbo.v_properties_detailed
    WHERE 
        (@keyword IS NULL OR @keyword = '' OR title LIKE N'%' + @keyword + '%' OR district LIKE N'%' + @keyword + '%' OR address LIKE N'%' + @keyword + '%')
        AND (@category IS NULL OR @category = '' OR @category = 'all' OR category = @category)
        AND (@city_code IS NULL OR @city_code = '' OR @city_code = 'all' OR city_code = @city_code)
        AND (@type_code IS NULL OR @type_code = '' OR @type_code = 'all' OR type_code = @type_code)
        AND (@min_price IS NULL OR price_value >= @min_price)
        AND (@max_price IS NULL OR price_value <= @max_price)
        AND (@min_area IS NULL OR area >= @min_area)
        AND (@max_area IS NULL OR area <= @max_area)
    ORDER BY property_id DESC;
END;
GO

IF OBJECT_ID('dbo.sp_get_property_detail', 'P') IS NOT NULL DROP PROCEDURE dbo.sp_get_property_detail;
GO
CREATE PROCEDURE dbo.sp_get_property_detail
    @property_id INT
AS
BEGIN
    SET NOCOUNT ON;
    -- Cập nhật lượt xem
    UPDATE dbo.properties 
    SET views_count = views_count + 1 
    WHERE id = @property_id;

    -- Trả về dữ liệu chi tiết
    SELECT * FROM dbo.v_properties_detailed WHERE property_id = @property_id;
END;
GO

PRINT N'=====================================================================================';
PRINT N'✅ THÀNH CÔNG: Đã khởi tạo hoàn tất CSDL [nhom15_batdongsan_db] trên Microsoft SQL Server!';
PRINT N'👉 14 Bảng dữ liệu liên kết chuẩn 100%, sẵn sàng tạo Database Diagram nộp cho Thầy.';
PRINT N'=====================================================================================';
