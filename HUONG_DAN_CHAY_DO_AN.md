# 🚀 HƯỚNG DẪN MỞ & KHỞI CHẠY ĐỒ ÁN TRÊN VISUAL STUDIO
## MÔN: PHÁT TRIỂN ỨNG DỤNG WEB - NHÓM 15
### NỀN TẢNG: ASP.NET CORE MVC (.NET 8 LTS) & MICROSOFT VISUAL STUDIO 2022

---

## 🎯 CÁCH 1: KHỞI CHẠY TRỰC TIẾP TRÊN VISUAL STUDIO (Chuẩn môn học 100%)

1. Vào thư mục đồ án: `c:\Users\Administrator\Downloads\Nhóm 15\`
2. **Nhấp đúp chuột vào tệp Solution:**
   👉 **`Nhom15_BatDongSan.sln`** *(Biểu tượng Visual Studio màu tím)*
3. Visual Studio 2022 / 2019 sẽ tự động mở toàn bộ Solution, cấu trúc Models, Views `.cshtml`, Controllers và wwwroot.
4. Nhấn phím **`F5`** (hoặc bấm nút màu xanh **`https` / `IIS Express`** trên thanh công cụ của Visual Studio).
5. Visual Studio sẽ tự động build C#, khởi chạy máy chủ web Kestrel và tự động bật trình duyệt web tại địa chỉ:
   ```
   https://localhost:7001
   hoặc
   http://localhost:5000
   ```

---

## 💻 CÁCH 2: CHẠY QUA DÒNG LỆNH (DOTNET CLI / TERMINAL)

Nếu muốn chạy nhanh từ Terminal / PowerShell:
```powershell
cd "c:\Users\Administrator\Downloads\Nhóm 15"
dotnet run
```
Sau đó mở trình duyệt truy cập: `https://localhost:7001` hoặc `http://localhost:5000`

---

## 🧭 BẢNG ÁNH XẠ CÁC BÀI THỰC HÀNH TRÊN LỚP

| Bài thực hành trên lớp | Controller / View phụ trách | Chức năng kiểm tra trên web |
|:---|:---|:---|
| **BÀI THỰC HÀNH 10: QUẢN LÝ SẢN PHẨM** | `AdminController.cs` $\rightarrow$ `Views/Admin/Index.cshtml` | Danh sách sản phẩm, bảng giá, trạng thái duyệt tin, xem chi tiết |
| **BÀI THỰC HÀNH 11: QUẢN LÝ ẢNH SẢN PHẨM** | `AdminController.cs` $\rightarrow$ `Views/Admin/ManageImages.cshtml` & `Views/Property/Details.cshtml` | Xem bộ sưu tập nhiều ảnh, thêm ảnh mới, xóa ảnh, chọn ảnh đại diện |
| **BÀI THỰC HÀNH 12: GỬI LIÊN HỆ** | `ContactController.cs` $\rightarrow$ `Views/Contact/Index.cshtml` | Nhận form liên hệ, xác thực dữ liệu, lưu vào CSDL, thông báo Toast |
| **ĐỒ ÁN: TEMPLATE & GIAO DIỆN** | `HomeController.cs`, `PropertyController.cs` | Trang chủ, Tra cứu đa tiêu chí, Bản đồ số Leaflet (GPS), Tính lãi vay ngân hàng |
| **ĐỒ ÁN: DATABASE** | [`database.sql`](database.sql) | CSDL chuẩn gồm 12 bảng 100% tiếng Anh |

---

## 🗄️ CÁCH NẠP CƠ SỞ DỮ LIỆU (DATABASE)

Tệp CSDL độc lập bằng tiếng Anh 100%:
👉 **`c:\Users\Administrator\Downloads\Nhóm 15\database.sql`**

- **Trên SQL Server (SSMS):** Mở SSMS $\rightarrow$ Mở file `database.sql` $\rightarrow$ Bấm `Execute (F5)`.
- **Trên MySQL / phpMyAdmin:** Mở phpMyAdmin $\rightarrow$ Chọn tab `Import` $\rightarrow$ Chọn file `database.sql` $\rightarrow$ Bấm `Import`.
