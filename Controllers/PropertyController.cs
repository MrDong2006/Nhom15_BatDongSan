using Microsoft.AspNetCore.Mvc;
using Nhom15_BatDongSan.Models;
using Nhom15_BatDongSan.Services;

namespace Nhom15_BatDongSan.Controllers
{
    public class PropertyController : Controller
    {
        private readonly DataService _dataService;

        public PropertyController(DataService dataService)
        {
            _dataService = dataService;
        }

        public IActionResult Index(string? category, string? city, string? type, string? keyword)
        {
            var properties = _dataService.GetProperties(category, city, type, keyword);
            ViewBag.Categories = _dataService.GetCategories();
            return View(properties);
        }

        // CHI TIẾT BẤT ĐỘNG SẢN & BỘ SƯU TẬP ẢNH (BÀI THỰC HÀNH 11)
        public IActionResult Details(int id)
        {
            var property = _dataService.GetPropertyById(id);
            if (property == null) return NotFound();

            var related = _dataService.GetProperties().Where(p => p.Id != id).Take(3).ToList();
            ViewBag.Related = related;

            return View(property);
        }

        public IActionResult MapSearch()
        {
            var properties = _dataService.GetProperties();
            return View(properties);
        }

        [HttpGet]
        public IActionResult Post()
        {
            ViewBag.Categories = _dataService.GetCategories();
            return View();
        }

        [HttpPost]
        public IActionResult Post(Property model)
        {
            if (ModelState.IsValid)
            {
                _dataService.AddProperty(model);
                TempData["SuccessMessage"] = "Đăng tin bất động sản thành công!";
                return RedirectToAction("Index", "Home");
            }
            return View(model);
        }

        public IActionResult Projects()
        {
            var projects = _dataService.GetProjects();
            return View(projects);
        }
    }
}
