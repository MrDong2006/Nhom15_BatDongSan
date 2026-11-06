using Microsoft.AspNetCore.Mvc;
using Nhom15_BatDongSan.Services;

namespace Nhom15_BatDongSan.Controllers
{
    public class AdminController : Controller
    {
        private readonly DataService _dataService;

        public AdminController(DataService dataService)
        {
            _dataService = dataService;
        }

        public IActionResult Index()
        {
            var properties = _dataService.GetProperties();
            var contacts = _dataService.GetContacts();

            ViewBag.TotalProperties = properties.Count;
            ViewBag.TotalContacts = contacts.Count;
            ViewBag.Contacts = contacts;

            return View(properties);
        }

        // BÀI THỰC HÀNH 11: QUẢN LÝ ẢNH SẢN PHẨM
        [HttpGet]
        public IActionResult ManageImages(int propertyId)
        {
            var property = _dataService.GetPropertyById(propertyId);
            if (property == null) return NotFound();

            return View(property);
        }

        [HttpPost]
        public IActionResult AddImage(int propertyId, string imageUrl)
        {
            if (!string.IsNullOrWhiteSpace(imageUrl))
            {
                _dataService.AddPropertyImage(propertyId, imageUrl);
                TempData["SuccessMessage"] = "Thêm ảnh sản phẩm thành công!";
            }
            return RedirectToAction(nameof(ManageImages), new { propertyId });
        }

        [HttpPost]
        public IActionResult DeleteImage(int propertyId, string imageUrl)
        {
            _dataService.RemovePropertyImage(propertyId, imageUrl);
            TempData["SuccessMessage"] = "Đã xóa ảnh sản phẩm!";
            return RedirectToAction(nameof(ManageImages), new { propertyId });
        }
    }
}
