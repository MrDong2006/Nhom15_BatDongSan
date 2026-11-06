# BÁO CÁO ĐỒ ÁN MÔN HỌC: PHÁT TRIỂN ỨNG DỤNG WEB
## ĐỀ TÀI: XÂY DỰNG HỆ THỐNG TRA CỨU THÔNG TIN NHÀ ĐẤT & BẢN ĐỒ SỐ MINH VƯƠNG HOME LUXURY
### ĐƠN VỊ THỰC HIỆN: NHÓM 15

---

```
========================================================================================
                      BỘ GIÁO DỤC VÀ ĐÀO TẠO
               TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN
                     KHOA HỆ THỐNG THÔNG TIN
                             -----***-----

                     BÁO CÁO ĐỒ ÁN MÔN HỌC
               MÔN HỌC: PHÁT TRIỂN ỨNG DỤNG WEB

  ĐỀ TÀI:
  XÂY DỰNG CỔNG THÔNG TIN VÀ HỆ THỐNG TRA CỨU BẤT ĐỘNG SẢN 
           TÍCH HỢP BẢN ĐỒ SỐ QUY HOẠCH MINH VƯƠNG HOME LUXURY

  Giảng viên hướng dẫn : ThS. Giảng viên phụ trách môn học
  Nhóm sinh viên thực hiện: NHÓM 15
  Chuyên ngành         : Kỹ thuật Phần mềm / Công nghệ Thông tin
  Niên khóa            : 2023 - 2027

                            NĂM 2026
========================================================================================
```

---

## MỤC LỤC CHI TIẾT

- **LỜI CẢM ƠN & CAM ĐOAN**
- **CHƯƠNG 1: TỔNG QUAN ĐỀ TÀI & TÍNH CẤP THIẾT**
  - 1.1. Bối cảnh thị trường bất động sản thời đại số
  - 1.2. Lý do chọn đề tài "Tra cứu thông tin nhà đất"
  - 1.3. Mục tiêu nghiên cứu và sản phẩm kỳ vọng của đồ án
  - 1.4. Đối tượng phục vụ và phạm vi ứng dụng
- **CHƯƠNG 2: KHẢO SÁT HIỆN TRẠNG & PHÂN TÍCH YÊU CẦU**
  - 2.1. Khảo sát các nền tảng tra cứu nhà đất hiện nay (Batdongsan, MeeyLand)
  - 2.2. Yêu cầu chức năng (Functional Requirements)
    - 2.2.1. Module Tra cứu đa tiêu chí & Live Auto-suggest
    - 2.2.2. Module Bản đồ số tương tác (GIS Leaflet Maps)
    - 2.2.3. Module Khảo sát biến động giá thị trường 3 miền 2026
    - 2.2.4. Module So sánh BĐS & Dự toán tài chính vay ngân hàng
    - 2.2.5. Module Đặt lịch hẹn xem thực tế & Yêu cầu tư vấn
    - 2.2.6. Module Quản trị hệ thống (Admin Dashboard & CRUD)
  - 2.3. Yêu cầu phi chức năng (Non-functional Requirements)
  - 2.4. Biểu đồ Ca sử dụng (Use Case Diagram) và Mô tả Actor
- **CHƯƠNG 3: THIẾT KẾ KIẾN TRÚC HỆ THỐNG & CÔNG NGHỆ**
  - 3.1. Mô hình kiến trúc 3 tầng (3-Tier Architecture)
  - 3.2. Ngăn xếp công nghệ lựa chọn (Technology Stack)
    - 3.2.1. Frontend: HTML5 Semantic, Tailwind CSS, Vanilla ES6+, Leaflet GIS
    - 3.2.2. Backend: Node.js (v24+), Express.js framework, Native node:sqlite
    - 3.2.3. Database: Microsoft SQL Server (T-SQL) & SQLite 3
  - 3.3. Thiết kế RESTful API tiêu chuẩn
- **CHƯƠNG 4: THIẾT KẾ CƠ SỞ DỮ LIỆU QUAN HỆ (DATABASE DESIGN)**
  - 4.1. Quy trình chuẩn hóa dữ liệu (Chuẩn 3NF)
  - 4.2. Sơ đồ thực thể quan hệ (ERD - Database Diagram 14 bảng)
  - 4.3. Từ điển dữ liệu chi tiết 14 bảng (Data Dictionary)
  - 4.4. Ràng buộc toàn vẹn, Khóa chính (PK), Khóa ngoại (FK), View & Stored Procedure
- **CHƯƠNG 5: THIẾT KẾ GIAO DIỆN NGƯỜI DÙNG (UI/UX DESIGN)**
  - 5.1. Triết lý thiết kế giao diện PropTech hiện đại
  - 5.2. Chi tiết 11 màn hình chức năng của hệ thống
- **CHƯƠNG 6: CÀI ĐẶT VÀ KIỂM THỬ HỆ THỐNG (TESTING & EVALUATION)**
  - 6.1. Môi trường triển khai thực tế
  - 6.2. Kịch bản kiểm thử chức năng tự động (8 Automated Test Cases)
  - 6.3. Đánh giá hiệu năng và tính bảo mật
- **CHƯƠNG 7: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN**
  - 7.1. Các kết quả đã đạt được
  - 7.2. Hạn chế còn tồn tại
  - 7.3. Hướng phát triển mở rộng trong tương lai
- **TÀI LIỆU THAM KHẢO**

---

## LỜI CẢM ƠN & CAM ĐOAN

Nhóm 15 xin gửi lời cảm ơn chân thành và sâu sắc nhất đến Quý Thầy/Cô bộ môn **Phát triển ứng dụng Web** đã truyền đạt những kiến thức nền tảng quý báu về kiến trúc web, giao thức mạng, xây dựng RESTful API và tối ưu hóa trải nghiệm người dùng hiện đại.

Chúng em xin cam đoan đây là công trình nghiên cứu và phát triển phần mềm độc lập của Nhóm 15. Toàn bộ mã nguồn, cơ sở dữ liệu và tài liệu báo cáo được xây dựng nghiêm túc, tuân thủ đúng chuẩn quy cách học thuật của môn học.

*Nhóm sinh viên thực hiện: Nhóm 15*

---

## CHƯƠNG 1: TỔNG QUAN ĐỀ TÀI & TÍNH CẤP THIẾT

### 1.1. Bối cảnh thị trường bất động sản thời đại số
Bất động sản là tài sản có giá trị lớn đối với mỗi người dân và nhà đầu tư. Trong kỷ nguyên chuyển đổi số quốc gia, nhu cầu tiếp cận thông tin nhà đất một cách minh bạch, chính xác về tọa độ địa lý, pháp lý rõ ràng và đơn giá thực tế trở nên cấp thiết hơn bao giờ hết.

### 1.2. Lý do chọn đề tài "Tra cứu thông tin nhà đất"
Các website truyền thống thường gặp các nhược điểm:
1. Tin rác, thông tin ảo, không có tọa độ GPS thực tế.
2. Thiếu sự kết hợp giữa bản đồ số GIS trực quan với danh sách phân trang.
3. Người dùng khó so sánh các bất động sản và không thể tính toán phương án tài chính vay ngân hàng ngay tại trang chi tiết.
4. Thiếu dữ liệu khảo sát đơn giá thị trường thực tế theo từng quận/huyện để định giá.

Xuất phát từ thực tiễn trên, **Nhóm 15** lựa chọn đề tài: **"Xây dựng hệ thống tra cứu thông tin nhà đất & Bản đồ số quy hoạch Minh Vương Home Luxury"** nhằm giải quyết trọn vẹn bài toán tra cứu thông tin minh bạch và trải nghiệm số hóa cho người mua và thuê nhà.

### 1.3. Mục tiêu đề tài
- Xây dựng một ứng dụng web hoàn chỉnh từ giao diện người dùng (Frontend), logic nghiệp vụ (Backend REST API) đến cơ sở dữ liệu quan hệ (RDBMS) chuẩn mực.
- Tích hợp bản đồ số không gian Leaflet GIS với dữ liệu tọa độ vệ tinh tại Cần Thơ (tọa độ trung tâm: 10.0341°N, 105.7875°E), TP. Hồ Chí Minh và Hà Nội.
- Xây dựng CSDL chuẩn hóa 14 bảng quan hệ trên Microsoft SQL Server và SQLite.
- Cung cấp đầy đủ công cụ phục vụ tra cứu: Bộ lọc 6 tiêu chí, Gợi ý tra cứu Live Auto-suggest, Bảng giá thị trường 3 miền, Bảng dự toán vay trả góp, Đặt lịch xem nhà thực tế, và Bảng điều khiển quản trị Admin.

---

## CHƯƠNG 2: KHẢO SÁT HIỆN TRẠNG & PHÂN TÍCH YÊU CẦU

### 2.1. Khảo sát các nền tảng tra cứu nhà đất hiện nay
| Tiêu chí so sánh | Nền tảng truyền thống | Hệ thống Minh Vương Home Luxury (Nhóm 15) |
|:---|:---|:---|
| **Công nghệ bản đồ** | Chỉ có bản đồ tĩnh Google Maps | Bản đồ số tương tác Leaflet GIS đa lớp, đồng bộ 2 chiều với thẻ nhà |
| **Gợi ý tra cứu** | Tải lại trang (Page reload) | Live Auto-suggest khi người dùng gõ từ khóa, kết quả tức thì |
| **Tính lãi suất vay** | Tách biệt ở trang khác | Tích hợp trực tiếp trong trang chi tiết BĐS |
| **Khảo sát giá thị trường** | Thường phải trả phí | Tra cứu biểu đồ đơn giá m² và thanh khoản miễn phí |
| **Công cụ so sánh** | Không hỗ trợ | So sánh đối chiếu 2-3 BĐS song song |

### 2.2. Yêu cầu chức năng chi tiết (Functional Requirements)

#### 2.2.1. Module Tra cứu đa tiêu chí & Live Auto-suggest
- **Tra cứu từ khóa:** Tìm kiếm theo tên dự án, tên đường, phường/xã, quận/huyện.
- **Gợi ý tự động (Live Auto-suggest):** Khi người dùng gõ 1 ký tự trở lên, hệ thống hiển thị danh sách 5 gợi ý phù hợp nhất kèm ảnh đại diện, giá bán và khu vực; click vào gợi ý mở ngay modal chi tiết.
- **Lọc theo hình thức giao dịch:** Mua bán (`sale`) hoặc Cho thuê (`rent`).
- **Lọc theo loại hình BĐS:** Căn hộ chung cư, Nhà phố liền kề, Biệt thự cao cấp, Đất nền dự án, Penthouse / Shophouse.
- **Lọc theo khu vực địa lý:** Toàn quốc, Cần Thơ (trọng điểm), TP. Hồ Chí Minh, Hà Nội, Đà Nẵng.
- **Lọc theo khoảng giá:** Dưới 2 tỷ, 2 - 5 tỷ, 5 - 10 tỷ, Trên 10 tỷ VNĐ.
- **Lọc theo diện tích:** Dưới 50m², 50 - 100m², 100 - 200m², Trên 200m².
- **Sắp xếp linh hoạt:** Giá tăng dần, Giá giảm dần, Diện tích lớn nhất, Lượt xem nhiều nhất.

#### 2.2.2. Module Bản đồ số tương tác (GIS Leaflet Maps)
- Hiển thị marker vị trí thực tế của từng bất động sản trên nền bản đồ số vệ tinh và đường phố.
- Tính năng tương tác 2 chiều (Bidirectional Synchronization):
  - Rê chuột qua thẻ nhà: Marker trên bản đồ phóng to và hiển thị popup thông tin.
  - Nhấp vào marker trên bản đồ: Màn hình tự động cuộn đến thẻ nhà tương ứng và làm nổi bật viền thẻ.
- Hỗ trợ 2 chế độ hiển thị: Chế độ chia đôi màn hình (Split Map) và Chế độ lưới lớn (Grid View).

#### 2.2.3. Module Khảo sát giá thị trường 3 miền 2026
- Bảng tra cứu giá theo từng quận/huyện tại TP.HCM, Hà Nội, Đà Nẵng và Cần Thơ.
- Hiển thị đơn giá min, max, trung bình (triệu/m²) cho từng phân khúc: Căn hộ, Nhà phố, Biệt thự, Đất nền.
- Thống kê tỷ lệ tăng trưởng so với năm trước (YoY Growth %) và mức độ thanh khoản (Rất cao, Cao, Ổn định).

#### 2.2.4. Module So sánh BĐS & Dự toán tài chính vay
- Cho phép chọn tối đa 3 bất động sản để đưa vào thanh so sánh (Compare Bar).
- Bảng tính lãi suất vay mua nhà: Cho phép nhập giá trị nhà, tỷ lệ vay (30% - 85%), thời hạn vay (5 - 35 năm), lãi suất ưu đãi (%/năm), tự động tính số tiền gốc + lãi trả hàng tháng theo dư nợ giảm dần hoặc dư nợ cố định.

#### 2.2.5. Module Đặt lịch hẹn xem thực tế & Yêu cầu tư vấn
- Khách hàng điền họ tên, số điện thoại, ngày giờ mong muốn và ghi chú.
- Dữ liệu được ghi nhận vào bảng `contact_inquiries` trên CSDL để chuyên viên môi giới phụ trách liên hệ xác nhận.

#### 2.2.6. Module Quản trị hệ thống (Admin Dashboard)
- Thống kê KPI thời gian thực: Tổng BĐS niêm yết, Tổng lượt xem toàn sàn, Lịch hẹn mới chờ xử lý, Tổng số thành viên.
- Quản lý danh mục nhà đất: Thêm mới, Sửa thông tin, Xóa BĐS.
- Quản lý lịch hẹn: Duyệt lịch hẹn xem nhà, đổi trạng thái (`new`, `confirmed`, `completed`).
- Quản lý người dùng và đánh giá từ khách hàng.

### 2.3. Yêu cầu phi chức năng (Non-functional Requirements)
- **Hiệu năng (Performance):** Thời gian tải trang dưới 1.5 giây, truy vấn API phản hồi dưới 100ms.
- **Tương thích (Responsiveness):** Hiển thị tối ưu trên máy tính để bàn (Desktop), máy tính bảng (Tablet) và điện thoại thông minh (Mobile).
- **Tính sẵn sàng (Availability):** Ứng dụng hỗ trợ cả 2 chế độ: Chạy trực tiếp từ file HTML tĩnh hoặc chạy qua máy chủ Node.js REST API.
- **Bảo mật (Security):** Mã hóa mật khẩu người dùng, bảo vệ chống SQL Injection thông qua Prepared Statements.

---

## CHƯƠNG 3: THIẾT KẾ KIẾN TRÚC HỆ THỐNG & CÔNG NGHỆ

### 3.1. Mô hình kiến trúc 3 tầng (3-Tier Architecture)

```
+-----------------------------------------------------------------------+
|                       TẦNG TRÌNH DIỄN (FRONTEND)                      |
|  - 11 Trang HTML5 Semantic (index, map-search, property-detail...)    |
|  - Giao diện Tailwind CSS 3.4 Responsive + FontAwesome 6 Icons        |
|  - Thư viện bản đồ Leaflet.js GIS + OpenStreetMap Tiles               |
|  - Logic điều khiển: js/app.js, js/map.js, js/navbar.js, js/data.js  |
+-----------------------------------------------------------------------+
                                   │
                           HTTP / RESTful API (JSON)
                                   ▼
+-----------------------------------------------------------------------+
|                       TẦNG NGHIỆP VỤ (BACKEND API)                    |
|  - Nền tảng Node.js (v24+) + Express.js Framework                     |
|  - server.js: Routing, Controllers, Middleware (CORS, JSON Parser)    |
|  - API Endpoints: /api/properties, /api/auth, /api/inquiries...       |
|  - Automated Test Suite: tests/api.test.js                            |
+-----------------------------------------------------------------------+
                                   │
                      Native C Driver / SQL Prepared Statements
                                   ▼
+-----------------------------------------------------------------------+
|                       TẦNG DỮ LIỆU (DATABASE TIER)                    |
|  - Microsoft SQL Server 2016-2022 (T-SQL Scripts: database.sql)       |
|  - Embedded SQLite 3 (node:sqlite native: database.sqlite)            |
|  - 14 Bảng dữ liệu chuẩn hóa 3NF + Foreign Keys + Constraints         |
+-----------------------------------------------------------------------+
```

### 3.2. Danh sách các RESTful API chính của Backend

| Phương thức | Endpoint | Chức năng nghiệp vụ |
|:---:|:---|:---|
| `GET` | `/api/health` | Kiểm tra trạng thái hoạt động của server |
| `POST`| `/api/auth/login` | Đăng nhập tài khoản (Admin, Agent, Customer) |
| `POST`| `/api/auth/register`| Đăng ký tài khoản thành viên mới |
| `GET` | `/api/properties` | Tra cứu danh sách BĐS với bộ lọc đa tiêu chí |
| `GET` | `/api/properties/:id`| Lấy chi tiết 1 BĐS và tự động tăng lượt xem |
| `POST`| `/api/properties` | Thêm mới 1 BĐS vào cơ sở dữ liệu (Admin/Agent) |
| `PUT` | `/api/properties/:id`| Cập nhật thông tin BĐS theo ID |
| `DELETE`| `/api/properties/:id`| Xóa BĐS khỏi hệ thống |
| `GET` | `/api/inquiries` | Lấy danh sách lịch hẹn xem nhà cho Admin |
| `POST`| `/api/inquiries` | Khách hàng gửi yêu cầu hẹn lịch xem thực tế |
| `PUT` | `/api/inquiries/:id/status`| Đổi trạng thái xử lý lịch hẹn (`confirmed`, `done`)|
| `GET` | `/api/market-prices` | Lấy bảng giá thị trường khảo sát 2026 |
| `GET` | `/api/reviews` | Lấy danh sách đánh giá đã được phê duyệt |
| `POST`| `/api/reviews` | Gửi đánh giá phản hồi mới từ người dùng |
| `GET` | `/api/admin/stats` | Thống kê KPI tổng quan cho Admin Dashboard |

---

## CHƯƠNG 4: THIẾT KẾ CƠ SỞ DỮ LIỆU QUAN HỆ

Cơ sở dữ liệu được đặt tên là **`nhom15_batdongsan_db`**, gồm đầy đủ 14 bảng dữ liệu chuẩn hóa theo dạng chuẩn 3NF:

```
                                  [roles]
                                     │ 1
                                     │
                                     ▼ ∞
      [contact_inquiries] ◄─── [users] ───► [saved_favorites]
              │                  │  ▲               │
              │                  │  │               │
              ▼ ∞                ▼  │               ▼ ∞
   ┌───────────────────────────────────────────────────────┐
   │                     [properties]                      │
   └───────┬──────────┬──────────┬──────────┬──────────────┘
           │          │          │          │
           ▼ ∞        ▼ ∞        ▼ ∞        ▼ ∞
   [prop_images] [prop_feats] [prop_amen] [loan_calcs]
           ▲          ▲
           │          │
       [projects]  [property_types]
           ▲
           │
       [locations] ───► [market_prices]
```

### Bảng tóm tắt 14 thực thể dữ liệu:
1. **`roles`**: Phân quyền người dùng (`admin`, `agent`, `customer`).
2. **`users`**: Tài khoản người dùng, môi giới VIP và quản trị viên.
3. **`property_types`**: Danh mục loại hình BĐS (Căn hộ, Biệt thự, Nhà phố, Đất nền...).
4. **`locations`**: Danh mục tỉnh thành và tọa độ trung tâm phục vụ bản đồ số.
5. **`projects`**: Thông tin các đại đô thị quy mô lớn (Vinhomes, Masterise, Aqua City...).
6. **`properties`**: Thực thể chính lưu trữ thông tin chi tiết nhà đất (33 thuộc tính).
7. **`property_images`**: Thư viện hình ảnh thực tế chất lượng cao của từng BĐS.
8. **`property_features`**: Danh sách đặc điểm nổi bật (Sổ hồng, view công viên...).
9. **`property_amenities`**: Quét tiện ích ngoại khu theo bán kính km (Bệnh viện, Trường học, Metro).
10. **`market_prices`**: Biến động giá thị trường 3 miền 2026 và chỉ số thanh khoản.
11. **`reviews`**: Đánh giá, xếp hạng sao và phản hồi từ khách hàng.
12. **`contact_inquiries`**: Phiếu tiếp nhận lịch hẹn xem nhà và tư vấn chuyên sâu.
13. **`saved_favorites`**: Danh sách tin yêu thích người dùng đã thả tim lưu lại.
14. **`loan_calculations`**: Lịch sử các phương án tính toán lãi vay trả góp ngân hàng.

---

## CHƯƠNG 5: THIẾT KẾ GIAO DIỆN VÀ TRẢI NGHIỆM NGƯỜI DÙNG (UI/UX)

Hệ thống được thiết kế hoàn thiện bao gồm **11 trang giao diện chuyên biệt**:

1. **`index.html` (Trang chủ & Tra cứu đa tiêu chí):**
   - Hero banner với hiệu ứng Aurora và thông tin tọa độ GPS vệ tinh trực tuyến.
   - Thanh công cụ tìm kiếm kết hợp Live Auto-suggest và nút xóa từ khóa nhanh.
   - Khung điều khiển chuyển đổi hiển thị: Chia đôi bản đồ (Split Map) / Dạng lưới (Grid View).
   - Danh sách thẻ nhà đất tương tác kèm hiệu ứng hover nảy marker trên bản đồ Leaflet.
   - Thanh công cụ so sánh BĐS (Compare Bar) cố định ở góc dưới màn hình.
   - Modal xem chi tiết tức thì (Quick View Modal) và Form đặt lịch hẹn trực tiếp.

2. **`map-search.html` (Bản đồ số tra cứu toàn màn hình):**
   - Không gian bản đồ GIS 100% chiều cao màn hình.
   - Bộ lọc nổi (Floating Filters) theo tỉnh thành, loại hình và khoảng giá.
   - Danh sách thẻ kết quả cuộn mượt mà ở thanh bên trái (Sidebar).

3. **`market-prices.html` (Khảo sát giá thị trường 3 miền 2026):**
   - Biểu đồ và thẻ KPI giá trung bình theo từng khu vực.
   - Bảng tra cứu giá chi tiết hỗ trợ tìm kiếm nhanh theo quận huyện, lọc phân khúc và sắp xếp tăng/giảm.

4. **`property-detail.html` (Trang chi tiết chuyên sâu):**
   - Slider trình diễn ảnh độ phân giải cao.
   - Bảng thông số kỹ thuật (Pháp lý, diện tích, hướng nhà, số phòng).
   - Danh sách tiện ích ngoại khu phân loại theo bán kính di chuyển.
   - Công cụ tính toán phương án tài chính vay vốn ngân hàng trực tiếp.
   - Form đăng ký xem nhà và thông tin liên hệ môi giới phụ trách (Call/Zalo).

5. **`loan-calculator.html` (Công cụ hoạch định tài chính mua nhà):**
   - Mô phỏng gói vay ngân hàng với thanh kéo (Slider) trực quan.
   - Biểu đồ cơ cấu vốn: Vốn tự có vs Số tiền cần vay.
   - Bảng lịch trình trả nợ chi tiết từng năm.

6. **`post-property.html` (Quy trình đăng tin bán / cho thuê 4 bước):**
   - Bước 1: Thông tin cơ bản & Loại hình.
   - Bước 2: Vị trí tọa độ & Địa chỉ.
   - Bước 3: Giá bán & Diện tích.
   - Bước 4: Tải ảnh & Xác thực tin đăng.

7. **`projects.html` (Danh bạ các đại dự án đô thị):**
   - Tra cứu các dự án quy mô lớn, tiến độ thi công, chính sách ưu đãi của chủ đầu tư.

8. **`reviews.html` (Cổng đánh giá uy tín môi giới & dự án):**
   - Xếp hạng 5 sao, bộ lọc theo dịch vụ và form gửi phản hồi khách hàng.

9. **`services.html` (Hệ sinh thái dịch vụ BĐS trọn gói):**
   - Tư vấn pháp lý, thẩm định giá độc lập, hỗ trợ thủ tục sang tên sổ đỏ.

10. **`contact.html` (Kênh liên hệ & Hỗ trợ khách hàng 24/7):**
    - Bản đồ chỉ đường trụ sở công ty, tổng đài hỗ trợ và form gửi thư.

11. **`admin.html` (Bảng điều khiển Quản trị viên):**
    - Thống kê biểu đồ Chart.js trực quan về lượt xem và giao dịch.
    - Quản lý giỏ hàng BĐS (CRUD modal).
    - Duyệt lịch hẹn khách hàng và phân công môi giới xử lý.

12. **`auth.html` (Đăng nhập / Đăng ký tài khoản):**
    - Xác thực phân quyền Quản trị viên, Chuyên viên môi giới và Khách hàng.

---

## CHƯƠNG 6: CÀI ĐẶT VÀ KIỂM THỬ HỆ THỐNG (TESTING)

Nhóm 15 đã xây dựng kịch bản kiểm thử tự động toàn diện trong tệp **`tests/api.test.js`** nhằm bảo đảm 100% logic CSDL và API vận hành chính xác:

### Kết quả chạy kiểm thử tự động (`npm test`):
```
🚀 BẮT ĐẦU KIỂM THỬ TỰ ĐỘNG HỆ THỐNG (NHÓM 15)...
  ✅ [PASS] CSDL SQLite kết nối và đầy đủ 14 bảng quan hệ
  ✅ [PASS] Bảng properties có đủ 9 BĐS ban đầu với tọa độ GPS
  ✅ [PASS] Truy vấn lọc BĐS theo hình thức Cho thuê (rent)
  ✅ [PASS] Bảng users có tài khoản Admin với quyền admin
  ✅ [PASS] Thêm mới lịch hẹn xem nhà vào contact_inquiries
  ✅ [PASS] Bảng reviews chứa đánh giá 5 sao và cập nhật helpful_count
  ✅ [PASS] Bảng market_prices có đầy đủ 15 phân vùng thị trường 2026
  ✅ [PASS] Tính toán số liệu KPI cho Admin Dashboard

======================================================
🎉 KẾT QUẢ KIỂM THỬ: 8/8 TESTS THÀNH CÔNG (100%)
======================================================
```

---

## CHƯƠNG 7: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

### 7.1. Kết quả đạt được
- Hoàn thành 100% mục tiêu đồ án môn học Phát triển ứng dụng Web theo đúng tiến độ.
- Hệ thống hoạt động trơn tru, giao diện hiện đại, đồng bộ thương hiệu **Minh Vương Home Luxury** xuyên suốt toàn bộ các màn hình.
- Đáp ứng xuất sắc chủ đề **"Tra cứu thông tin nhà đất"** với tính năng tìm kiếm đa tiêu chí, gợi ý trực tiếp khi gõ, bản đồ số Leaflet GIS và khảo sát giá thị trường.
- Cung cấp đầy đủ CSDL chuẩn hóa trên cả Microsoft SQL Server T-SQL và SQLite.

### 7.2. Hướng phát triển trong tương lai
- Tích hợp công nghệ thực tế ảo VR 360 Tour để người dùng có thể tham quan căn hộ từ xa.
- Xây dựng mô hình học máy (Machine Learning) tự động dự báo giá nhà đất dựa trên dữ liệu giao dịch lịch sử.
- Đóng gói ứng dụng di động đa nền tảng (React Native / Flutter) đồng bộ với hệ thống Backend RESTful API hiện tại.

---

## TÀI LIỆU THAM KHẢO
1. MDN Web Docs, *JavaScript, HTML5 Semantic and Modern CSS Reference*, Mozilla Developer Network, 2025.
2. Vladimir Agafonkin, *Leaflet.js - An open-source JavaScript library for mobile-friendly interactive maps*, 2024.
3. Express.js Official Documentation, *Fast, unopinionated, minimalist web framework for Node.js*, 2025.
4. Microsoft Corporation, *Transact-SQL Reference (Database Engine)*, Microsoft Learn, 2024.
5. Tailwind Labs, *Tailwind CSS - Rapidly build modern websites without ever leaving your HTML*, 2025.
