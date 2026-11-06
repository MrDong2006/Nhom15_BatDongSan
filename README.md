# ĐỒ ÁN MÔN HỌC: PHÁT TRIỂN ỨNG DỤNG WEB (NHÓM 15)
## ĐỀ TÀI: HỆ THỐNG TRA CỨU THÔNG TIN NHÀ ĐẤT & BẢN ĐỒ SỐ MINH VƯƠNG HOME LUXURY

[![Test Status](https://img.shields.io/badge/Tests-8%2F8%20Passed%20(100%25)-emerald.svg)](tests/api.test.js)
[![Database](https://img.shields.io/badge/SQL%20Server-14%20Tables%203NF-blue.svg)](database.sql)
[![Node.js](https://img.shields.io/badge/Node.js-v24%20%2B%20Express-success.svg)](server.js)
[![Maps](https://img.shields.io/badge/GIS%20Maps-Leaflet.js-amber.svg)](map-search.html)

---

## 🌟 GIỚI THIỆU TỔNG QUAN

Hệ thống **Minh Vương Home Luxury** là đồ án hoàn chỉnh của môn học **Phát triển ứng dụng Web**, do **Nhóm 15** nghiên cứu và phát triển. Hệ thống giải quyết trọn vẹn bài toán **"Tra cứu thông tin nhà đất"** với độ chính xác cao về tọa độ không gian (GIS), bảng khảo sát biến động giá đất 3 miền minh bạch và công cụ hỗ trợ người mua nhà toàn diện.

---

## 🚀 CÁC TÍNH NĂNG CHÍNH

1. **Tra cứu BĐS đa tiêu chí & Live Auto-suggest:**
   - Tìm kiếm từ khóa theo dự án, tên đường, khu vực, tỉnh thành.
   - Gợi ý thông minh tự động (Live Auto-suggest) hiển thị ngay khi gõ phím.
   - Lọc theo hình thức (Mua bán / Cho thuê), loại hình (Căn hộ, Biệt thự, Nhà phố, Đất nền).
   - Lọc theo khoảng giá và diện tích.
2. **Bản đồ số GIS quy hoạch tương tác (Leaflet Maps):**
   - Ghim tọa độ vệ tinh thực tế tại Cần Thơ (10.0341°N, 105.7875°E), TP.HCM, Hà Nội.
   - Đồng bộ hóa 2 chiều giữa danh sách BĐS và ghim trên bản đồ.
   - Hỗ trợ xem dạng chia đôi (Split Map) hoặc lưới lớn (Grid View).
3. **Bảng giá khảo sát thị trường 3 miền 2026:**
   - Tra cứu đơn giá m² trung bình theo quận/huyện, tỷ lệ tăng trưởng YoY và thanh khoản.
4. **Công cụ so sánh BĐS & Dự toán vay ngân hàng:**
   - So sánh song song 2-3 căn nhà cùng lúc.
   - Bảng tính gốc + lãi ngân hàng theo dư nợ giảm dần hoặc cố định.
5. **Đặt lịch hẹn xem nhà & Gửi yêu cầu tư vấn trực tiếp:**
   - Ghi nhận lịch hẹn tự động vào CSDL cho chuyên viên môi giới.
6. **Bảng điều khiển Quản trị viên (Admin Dashboard):**
   - Biểu đồ KPI thống kê thời gian thực, CRUD giỏ hàng BĐS, duyệt lịch hẹn khách hàng.

---

## 📂 CẤU TRÚC THƯ MỤC DỰ ÁN

```
Nhóm 15/
├── admin.html                    # Trang Quản trị hệ thống (KPI, CRUD, Duyệt lịch hẹn)
├── auth.html                     # Trang Đăng nhập & Đăng ký phân quyền tài khoản
├── contact.html                  # Trang Liên hệ & Tư vấn 24/7
├── index.html                    # Trang chủ & Cổng tra cứu BĐS đa tiêu chí
├── loan-calculator.html          # Công cụ tính toán lãi vay mua nhà
├── map-search.html               # Bản đồ số tra cứu BĐS toàn màn hình (GIS Leaflet)
├── market-prices.html            # Khảo sát biến động giá thị trường 3 miền 2026
├── post-property.html            # Đăng tin mua bán / cho thuê nhà đất 4 bước
├── projects.html                 # Danh bạ các đại đô thị quy mô lớn
├── property-detail.html          # Chi tiết BĐS chuyên sâu & Tiện ích xung quanh
├── reviews.html                  # Cổng đánh giá uy tín môi giới & dự án
├── services.html                 # Hệ sinh thái dịch vụ BĐS trọn gói
│
├── js/
│   ├── app.js                    # Logic tra cứu, bộ lọc, live auto-suggest, so sánh BĐS
│   ├── data.js                   # Tập dữ liệu mẫu 9 BĐS ban đầu chuẩn hóa
│   ├── map.js                    # Tích hợp bản đồ số Leaflet.js
│   └── navbar.js                 # Điều hướng Header, Footer và đếm tin đã lưu
│
├── server.js                     # Máy chủ Backend Node.js Express RESTful API
├── init_sqlite.js                # Tự động khởi tạo & nạp dữ liệu vào SQLite
├── database.sql                  # Tập lệnh T-SQL 14 bảng cho Microsoft SQL Server
├── database_mysql.sql            # Bản tương thích MySQL / XAMPP / phpMyAdmin
├── database.sqlite               # Cơ sở dữ liệu SQLite 3 nhúng sẵn
├── database.json                 # Cấu trúc dữ liệu chuẩn hóa dạng JSON
├── Sodo_CSDL_Nhom15_SieuNet_4K.png # Sơ đồ Database Diagram độ phân giải 4K Ultra-HD
│
├── BAO_CAO_DO_AN_MON_HOC.md      # Báo cáo Đồ án môn học hoàn chỉnh 7 chương
├── SLIDE_THUYET_TRINH.md         # 12 Slide thuyết trình bảo vệ đồ án
├── HUONG_DAN_CHAY_DO_AN.md       # Hướng dẫn chi tiết từng bước khởi chạy
└── tests/
    └── api.test.js               # Bộ kiểm thử tự động 8 bài kiểm thử (100% Pass)
```

---

## ⚡ KHỞI CHẠY NHANH

### 1. Khởi chạy Server Node.js (Khuyên dùng):
```powershell
npm start
```
Truy cập: `http://localhost:3000`

### 2. Chạy kiểm thử tự động:
```powershell
npm test
```

### 3. Xem trực tiếp không cần cài đặt:
Nhấp đúp chuột mở trực tiếp file `index.html`.

---

## 👥 THÔNG TIN NHÓM THỰC HIỆN
- **Đơn vị:** NHÓM 15
- **Môn học:** Phát triển ứng dụng Web (Web Application Development)
- **Năm thực hiện:** 2026
