# SLIDE THUYẾT TRÌNH BẢO VỆ ĐỒ ÁN MÔN HỌC
## MÔN: PHÁT TRIỂN ỨNG DỤNG WEB (WEB APPLICATION DEVELOPMENT)
### ĐỀ TÀI: HỆ THỐNG TRA CỨU THÔNG TIN NHÀ ĐẤT & BẢN ĐỒ SỐ MINH VƯƠNG HOME LUXURY
### ĐƠN VỊ THỰC HIỆN: NHÓM 15

---

## 📌 SLIDE 1: TRANG BÌA GIỚI THIỆU
- **Tên đề tài:** Hệ Thống Tra Cứu Thông Tin Nhà Đất & Bản Đồ Số Quy Hoạch
- **Thương hiệu dự án:** MINH VƯƠNG HOME LUXURY
- **Môn học:** Phát triển ứng dụng Web (Web Application Development)
- **Nhóm thực hiện:** Nhóm 15
- **Giảng viên hướng dẫn:** ThS. Giảng viên phụ trách môn học
- **Thời gian báo cáo:** Học kỳ 1 - Năm học 2026

---

## 📌 SLIDE 2: ĐẶT VẤN ĐỀ & TÍNH CẤP THIẾT
- **Thực trạng:** 
  - Nhu cầu giao dịch nhà đất ngày càng cao, nhưng thị trường tồn tại nhiều tin ảo, sai lệch vị trí địa lý.
  - Người mua nhà mất nhiều thời gian tìm kiếm mà không nắm được đơn giá thực tế theo từng quận huyện.
- **Giải pháp của Nhóm 15:**
  - Xây dựng cổng thông tin số hóa tích hợp bản đồ không gian GIS Leaflet.
  - Công khai bảng khảo sát biến động giá đất 3 miền minh bạch.
  - Tích hợp công cụ so sánh trực quan và bảng tính lãi suất vay mua nhà trực tiếp.

---

## 📌 SLIDE 3: MỤC TIÊU VÀ PHẠM VI DỰ ÁN
- **Mục tiêu chính:**
  1. Xây dựng ứng dụng web hoàn chỉnh chuẩn kiến trúc 3 tầng (3-Tier Architecture).
  2. Xây dựng CSDL quan hệ chuẩn hóa 14 bảng trên Microsoft SQL Server và SQLite.
  3. Cung cấp trải nghiệm tra cứu tối ưu: Live Auto-suggest, đa tiêu chí lọc, bản đồ vệ tinh.
- **Phạm vi dữ liệu:**
  - Dữ liệu tập trung trọng điểm tại TP. Cần Thơ (10.0341°N, 105.7875°E), TP. Hồ Chí Minh và Hà Nội.

---

## 📌 SLIDE 4: KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE)
- **Tầng Trình Diễn (Frontend):**
  - HTML5 Semantic, Tailwind CSS Responsive, Vanilla JavaScript ES6+.
  - Thư viện bản đồ số Leaflet.js tương tác 2 chiều với danh sách BĐS.
- **Tầng Nghiệp Vụ (Backend):**
  - Node.js (v24+) + Express.js RESTful API.
  - Tự động nạp hạt giống dữ liệu (Auto-seeding) an toàn, ổn định.
- **Tầng Dữ Liệu (Database):**
  - Microsoft SQL Server 2016-2022 (T-SQL scripts `database.sql`).
  - SQLite 3 nhúng (`node:sqlite`) chạy ngay lập tức không cần cài đặt phức tạp.

---

## 📌 SLIDE 5: THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE DIAGRAM)
- **Cấu trúc:** 14 bảng quan hệ đạt chuẩn 3NF.
- **Các thực thể chính:**
  - Quản lý tài khoản: `roles`, `users`
  - Quản lý BĐS: `property_types`, `locations`, `projects`, `properties`, `property_images`, `property_features`, `property_amenities`
  - Nghiệp vụ khách hàng: `contact_inquiries`, `saved_favorites`, `loan_calculations`, `reviews`, `market_prices`
- **Khóa chính & Khóa ngoại:** Ràng buộc toàn vẹn dữ liệu chặt chẽ (`ON UPDATE CASCADE`, `ON DELETE CASCADE`).

---

## 📌 SLIDE 6: MODULE TRỌNG TÂM - TRA CỨU THÔNG TIN NHÀ ĐẤT
- **Tìm kiếm đa chiều (Multi-Criteria Search):**
  - Tra cứu từ khóa theo tên dự án, tên đường, khu vực.
  - **Live Auto-suggest:** Gợi ý tức thì khi người dùng gõ phím kèm ảnh, giá và vị trí.
  - Lọc theo hình thức (Bán / Thuê), loại hình (Căn hộ, Biệt thự, Nhà phố, Đất nền).
  - Lọc theo khoảng giá (Dưới 2 tỷ $\rightarrow$ Trên 10 tỷ) và diện tích (< 50m² $\rightarrow$ > 200m²).
  - Sắp xếp kết quả linh hoạt theo giá, diện tích, lượt xem.

---

## 📌 SLIDE 7: BẢN ĐỒ SỐ GIS TƯƠNG TÁC (LEAFLET MAPS)
- **Đồng bộ hóa 2 chiều (Bidirectional Sync):**
  - Rê chuột vào danh sách nhà $\rightarrow$ Marker trên bản đồ nảy lên và hiển thị Popup.
  - Click vào Marker trên bản đồ $\rightarrow$ Màn hình tự động cuộn đến thẻ nhà và làm nổi bật viền xanh.
- **2 Chế độ xem linh hoạt:**
  - Chế độ chia đôi màn hình (Split Map View)
  - Chế độ lưới toàn màn hình (Grid View)

---

## 📌 SLIDE 8: CÁC CÔNG CỤ HỖ TRỢ NGƯỜI MUA NHÀ
1. **So sánh BĐS (Comparison Bar):**
   - Đặt 2 đến 3 căn nhà lên cùng một bảng để đối chiếu giá, diện tích, số phòng, pháp lý.
2. **Bảng tính lãi suất vay ngân hàng (Loan Calculator):**
   - Tự động tính số tiền gốc và lãi trả hàng tháng theo dư nợ giảm dần.
3. **Tra cứu giá thị trường 3 miền (Market Prices 2026):**
   - Xem biến động đơn giá m², biên độ tăng trưởng và chỉ số thanh khoản theo từng quận/huyện.

---

## 📌 SLIDE 9: BẢNG ĐIỀU KHIỂN QUẢN TRỊ VIÊN (ADMIN DASHBOARD)
- **Thống kê KPI thời gian thực:**
  - Tổng số BĐS niêm yết, Lượt xem toàn sàn, Lịch hẹn mới, Thành viên.
- **Quản lý dữ liệu (CRUD):**
  - Modal thêm mới, chỉnh sửa thông tin BĐS và cập nhật tọa độ GPS.
  - Phê duyệt và chuyển trạng thái lịch hẹn xem nhà (`new` $\rightarrow$ `confirmed` $\rightarrow$ `done`).

---

## 📌 SLIDE 10: KẾT QUẢ KIỂM THỬ HỆ THỐNG (TESTING)
- Bộ kiểm thử tự động `tests/api.test.js`:
  - Kiểm tra kết nối CSDL và số lượng 14 bảng quan hệ.
  - Kiểm tra tính hợp lệ của tọa độ GPS trên 100% BĐS.
  - Kiểm tra bộ lọc mua bán/cho thuê.
  - Kiểm tra thêm mới lịch hẹn tư vấn và tính toán KPI quản trị.
- **Kết quả:** Đạt **8/8 bài kiểm thử thành công (100% Pass Rate)**.

---

## 📌 SLIDE 11: DEMO VÀ KẾT QUẢ SẢN PHẨM
- 11 Trang giao diện hoạt động hoàn hảo, mượt mà trên mọi thiết bị.
- Hỗ trợ chạy cả 2 môi trường:
  - Mở trực tiếp file HTML tĩnh không cần internet.
  - Khởi chạy qua Node.js REST API Server (`npm start`).
- Đầy đủ sơ đồ CSDL chuẩn 4K Ultra-HD phục vụ in ấn báo cáo.

---

## 📌 SLIDE 12: KẾT LUẬN & HƯỚNG MỞ RỘNG
- **Kết luận:** Nhóm 15 đã hoàn thành xuất sắc đồ án môn học Phát triển ứng dụng Web, đáp ứng trọn vẹn yêu cầu thực tiễn của đề tài Tra cứu thông tin nhà đất.
- **Hướng mở rộng:**
  - Ứng dụng AI Chatbot hỗ trợ tư vấn nhà đất tự động 24/7.
  - Tích hợp không gian thực tế ảo 360 VR Tour.
- **Lời cảm ơn:** Xin chân thành cảm ơn Quý Thầy/Cô đã lắng nghe phần thuyết trình của Nhóm 15!
