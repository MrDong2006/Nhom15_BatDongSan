namespace Nhom15_BatDongSan.Models
{
    public class Property
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = "apartment"; // apartment, house, villa, land
        public string CategoryName { get; set; } = string.Empty;
        public string TransactionType { get; set; } = "sale"; // sale, rent
        public string PriceDisplay { get; set; } = string.Empty;
        public decimal PriceValue { get; set; } // in million VND or USD
        public string UnitPrice { get; set; } = string.Empty;
        public double AreaSqm { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public string Direction { get; set; } = "Đông Nam";
        public string BalconyDirection { get; set; } = "Đông Nam";
        public string Address { get; set; } = string.Empty;
        public string CityCode { get; set; } = "hcm";
        public string District { get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Badge { get; set; } = string.Empty;
        public string BadgeColor { get; set; } = "bg-rose-500";
        public string LegalStatus { get; set; } = "Sổ hồng lâu dài";
        public string FurnitureStatus { get; set; } = "Đầy đủ nội thất";
        public string FloorInfo { get; set; } = string.Empty;
        public int YearBuilt { get; set; } = 2024;
        public string Investor { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int ViewsCount { get; set; } = 1000;
        public string Status { get; set; } = "active";
        public string PostedTime { get; set; } = "Hôm nay";

        // Navigation / related data
        public List<string> Images { get; set; } = new();
        public List<string> Features { get; set; } = new();
        public List<PropertyAmenity> Amenities { get; set; } = new();

        public Agent Agent { get; set; } = new();
    }

    public class PropertyAmenity
    {
        public string Name { get; set; } = string.Empty;
        public string Distance { get; set; } = string.Empty;
        public string Icon { get; set; } = "fa-map-pin";
    }

    public class Agent
    {
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public bool Verified { get; set; } = true;
    }
}
