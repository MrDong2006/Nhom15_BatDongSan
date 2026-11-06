using Microsoft.AspNetCore.Mvc;
using Nhom15_BatDongSan.Models;
using Nhom15_BatDongSan.Services;

namespace Nhom15_BatDongSan.Controllers
{
    public class ContactController : Controller
    {
        private readonly DataService _dataService;

        public ContactController(DataService dataService)
        {
            _dataService = dataService;
        }

        // BÀI THỰC HÀNH 12: GỬI LIÊN HỆ - HIỂN THỊ TRANG VÀ FORM
        [HttpGet]
        public IActionResult Index(int? propertyId)
        {
            ViewBag.PropertyId = propertyId;
            return View();
        }

        // BÀI THỰC HÀNH 12: TIẾP NHẬN YÊU CẦU LIÊN HỆ TỪ KHÁCH HÀNG
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(ContactInquiry model)
        {
            if (string.IsNullOrWhiteSpace(model.FullName) || string.IsNullOrWhiteSpace(model.Phone))
            {
                ModelState.AddModelError("", "Vui lòng nhập họ tên và số điện thoại.");
                return View(model);
            }

            _dataService.AddContact(model);
            TempData["SuccessMessage"] = "Cảm ơn bạn! Yêu cầu liên hệ đã được gửi thành công. Chuyên viên sẽ gọi lại cho bạn trong vòng 15 phút.";

            return RedirectToAction(nameof(Index));
        }

        // API Endpoint cho AJAX submit nếu giao diện gửi qua fetch()
        [HttpPost]
        public IActionResult SubmitAjax([FromBody] ContactInquiry model)
        {
            if (string.IsNullOrWhiteSpace(model.FullName) || string.IsNullOrWhiteSpace(model.Phone))
            {
                return Json(new { success = false, message = "Vui lòng nhập đầy đủ họ tên và số điện thoại!" });
            }

            _dataService.AddContact(model);
            return Json(new { success = true, message = "Gửi yêu cầu liên hệ thành công! Chuyên viên sẽ hỗ trợ bạn sớm nhất." });
        }
    }
}
