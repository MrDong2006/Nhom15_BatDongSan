using Microsoft.AspNetCore.Mvc;
using Nhom15_BatDongSan.Services;

namespace Nhom15_BatDongSan.Controllers
{
    public class HomeController : Controller
    {
        private readonly DataService _dataService;

        public HomeController(DataService dataService)
        {
            _dataService = dataService;
        }

        public IActionResult Index(string? category, string? city, string? type, string? keyword)
        {
            var properties = _dataService.GetProperties(category, city, type, keyword);
            ViewBag.Categories = _dataService.GetCategories();
            ViewBag.SelectedCategory = category ?? "all";
            ViewBag.SelectedCity = city ?? "all";
            ViewBag.SelectedType = type ?? "all";
            ViewBag.Keyword = keyword ?? "";
            return View(properties);
        }

        public IActionResult Services()
        {
            return View();
        }

        public IActionResult Reviews()
        {
            var reviews = _dataService.GetReviews();
            return View(reviews);
        }

        public IActionResult LoanCalculator()
        {
            var packages = _dataService.GetLoanPackages();
            return View(packages);
        }

        public IActionResult MarketPrices()
        {
            var prices = _dataService.GetMarketPrices();
            return View(prices);
        }
    }
}
