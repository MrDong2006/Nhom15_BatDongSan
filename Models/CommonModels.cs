namespace Nhom15_BatDongSan.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = "fa-building";
        public string Description { get; set; } = string.Empty;
    }

    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Investor { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Scale { get; set; } = string.Empty;
        public string Status { get; set; } = "Đang mở bán";
        public string StatusColor { get; set; } = "bg-emerald-500";
        public string PriceRange { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public List<string> Highlights { get; set; } = new();
    }

    public class ContactInquiry
    {
        public int Id { get; set; }
        public int? PropertyId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Topic { get; set; } = "buy";
        public string TopicTitle { get; set; } = "Tư vấn tìm mua nhà đất / căn hộ";
        public string Branch { get; set; } = "cantho";
        public string Message { get; set; } = string.Empty;
        public bool Consent { get; set; } = true;
        public string Status { get; set; } = "new";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    public class Review
    {
        public int Id { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public string AuthorRole { get; set; } = "Khách hàng";
        public string AuthorAvatar { get; set; } = string.Empty;
        public int Rating { get; set; } = 5;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string TransactionType { get; set; } = "Mua bán";
        public string Location { get; set; } = "Cần Thơ";
        public bool VerifiedPurchase { get; set; } = true;
        public int LikesCount { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    public class MarketPrice
    {
        public string Id { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string City { get; set; } = "hcm";
        public string CityName { get; set; } = "TP. Hồ Chí Minh";
        public double ApartmentAvg { get; set; }
        public double HouseAvg { get; set; }
        public double VillaAvg { get; set; }
        public double LandAvg { get; set; }
        public string YoYGrowth { get; set; } = "+5.0%";
        public string Liquidity { get; set; } = "Cao";
        public string RentAvg { get; set; } = "15 - 35 tr/tháng";
        public string Trend { get; set; } = "Tăng nhẹ";
        public List<string> KeyProjects { get; set; } = new();
    }

    public class LoanPackage
    {
        public string BankName { get; set; } = string.Empty;
        public string BankCode { get; set; } = string.Empty;
        public double PreferentialRate { get; set; }
        public int PreferentialMonths { get; set; } = 12;
        public double FloatingRate { get; set; }
        public int MaxTermYears { get; set; } = 25;
        public int MaxLoanRatio { get; set; } = 70;
        public string LogoUrl { get; set; } = string.Empty;
    }

    public class AppUser
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Role { get; set; } = "agent"; // admin, agent, customer
        public string RoleDisplay { get; set; } = "Chuyên viên Môi giới VIP";
        public string Title { get; set; } = "Chuyên viên BĐS";
        public string Company { get; set; } = "Minh Vương Home Luxury";
        public string Avatar { get; set; } = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80";
        public string Status { get; set; } = "active"; // active, locked
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
