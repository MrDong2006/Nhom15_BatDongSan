using Nhom15_BatDongSan.Models;

namespace Nhom15_BatDongSan.Services
{
    public class DataService
    {
        private static readonly List<Property> _properties = new();
        private static readonly List<Category> _categories = new();
        private static readonly List<Project> _projects = new();
        private static readonly List<ContactInquiry> _contacts = new();
        private static readonly List<Review> _reviews = new();
        private static readonly List<MarketPrice> _marketPrices = new();
        private static readonly List<LoanPackage> _loanPackages = new();
        private static readonly List<AppUser> _users = new();

        static DataService()
        {
            SeedData();
        }

        public List<Property> GetProperties(string? category = null, string? city = null, string? type = null, string? keyword = null)
        {
            var query = _properties.AsQueryable();

            if (!string.IsNullOrEmpty(category) && category != "all")
                query = query.Where(p => p.Category.Equals(category, StringComparison.OrdinalIgnoreCase));

            if (!string.IsNullOrEmpty(city) && city != "all")
                query = query.Where(p => p.CityCode.Equals(city, StringComparison.OrdinalIgnoreCase));

            if (!string.IsNullOrEmpty(type) && type != "all")
                query = query.Where(p => p.TransactionType.Equals(type, StringComparison.OrdinalIgnoreCase));

            if (!string.IsNullOrEmpty(keyword))
            {
                var kw = keyword.ToLower();
                query = query.Where(p => p.Title.ToLower().Contains(kw) || p.Address.ToLower().Contains(kw) || p.District.ToLower().Contains(kw));
            }

            return query.ToList();
        }

        public Property? GetPropertyById(int id)
        {
            return _properties.FirstOrDefault(p => p.Id == id) ?? _properties.FirstOrDefault();
        }

        public void AddProperty(Property property)
        {
            property.Id = _properties.Any() ? _properties.Max(p => p.Id) + 1 : 1;
            _properties.Insert(0, property);
        }

        public void UpdateProperty(Property updated)
        {
            var idx = _properties.FindIndex(p => p.Id == updated.Id);
            if (idx >= 0)
            {
                _properties[idx] = updated;
            }
        }

        public bool DeleteProperty(int id)
        {
            var prop = _properties.FirstOrDefault(p => p.Id == id);
            if (prop != null)
            {
                return _properties.Remove(prop);
            }
            return false;
        }

        public List<AppUser> GetUsers() => _users;

        public void AddUser(AppUser user)
        {
            user.Id = _users.Any() ? _users.Max(u => u.Id) + 1 : 1;
            user.CreatedAt = DateTime.Now;
            _users.Add(user);
        }

        public bool DeleteUser(int id)
        {
            if (id == 1) return false;
            var u = _users.FirstOrDefault(x => x.Id == id);
            if (u != null) return _users.Remove(u);
            return false;
        }

        public void ToggleUserStatus(int id)
        {
            var u = _users.FirstOrDefault(x => x.Id == id);
            if (u != null)
            {
                u.Status = u.Status == "active" ? "locked" : "active";
            }
        }

        public void UpdateContactStatus(int id, string status)
        {
            var c = _contacts.FirstOrDefault(x => x.Id == id);
            if (c != null)
            {
                c.Status = status;
            }
        }

        public bool DeleteContact(int id)
        {
            var c = _contacts.FirstOrDefault(x => x.Id == id);
            if (c != null)
            {
                return _contacts.Remove(c);
            }
            return false;
        }

        // PHỤC VỤ BÀI THỰC HÀNH 11: QUẢN LÝ ẢNH SẢN PHẨM
        public bool AddPropertyImage(int propertyId, string imageUrl)
        {
            var prop = _properties.FirstOrDefault(p => p.Id == propertyId);
            if (prop != null)
            {
                prop.Images.Add(imageUrl);
                return true;
            }
            return false;
        }

        public bool RemovePropertyImage(int propertyId, string imageUrl)
        {
            var prop = _properties.FirstOrDefault(p => p.Id == propertyId);
            if (prop != null)
            {
                return prop.Images.Remove(imageUrl);
            }
            return false;
        }

        public List<Category> GetCategories() => _categories;
        public List<Project> GetProjects() => _projects;
        public List<Review> GetReviews() => _reviews;
        public List<MarketPrice> GetMarketPrices() => _marketPrices;
        public List<LoanPackage> GetLoanPackages() => _loanPackages;

        // PHỤC VỤ BÀI THỰC HÀNH 12: GỬI LIÊN HỆ
        public List<ContactInquiry> GetContacts() => _contacts;

        public void AddContact(ContactInquiry inquiry)
        {
            inquiry.Id = _contacts.Any() ? _contacts.Max(c => c.Id) + 1 : 1;
            inquiry.CreatedAt = DateTime.Now;
            _contacts.Insert(0, inquiry);
        }

        private static void SeedData()
        {
            // Seed Categories
            _categories.AddRange(new[]
            {
                new Category { Id = 1, Code = "apartment", Name = "Căn hộ chung cư", Icon = "fa-building", Description = "Căn hộ cao cấp, duplex, penthouse" },
                new Category { Id = 2, Code = "house", Name = "Nhà phố, nhà riêng", Icon = "fa-house", Description = "Nhà phố thương mại, shophouse mặt tiền" },
                new Category { Id = 3, Code = "villa", Name = "Biệt thự cao cấp", Icon = "fa-house-chimney-window", Description = "Biệt thự ven sông, ven biển" },
                new Category { Id = 4, Code = "land", Name = "Đất nền dự án", Icon = "fa-mountain-sun", Description = "Đất nền thổ cư, sổ đỏ chính chủ" }
            });

            // Seed Properties
            _properties.Add(new Property
            {
                Id = 10,
                Title = "Nhà phố thương mại Vincom Shophouse Cần Thơ - Bến Ninh Kiều (10°02'02.8\"N 105°47'15.0\"E)",
                Category = "house",
                CategoryName = "Nhà phố thương mại",
                TransactionType = "sale",
                PriceDisplay = "12.8 Tỷ",
                PriceValue = 12800,
                UnitPrice = "85.3 tr/m²",
                AreaSqm = 150,
                Bedrooms = 4,
                Bathrooms = 4,
                Direction = "Đông Nam",
                BalconyDirection = "Đông Nam",
                Address = "Số 209 Đường 30 Tháng 4, Phường Xuân Khánh, Quận Ninh Kiều, Cần Thơ",
                CityCode = "cantho",
                District = "Quận Ninh Kiều",
                Latitude = 10.0341,
                Longitude = 105.7875,
                Badge = "GOOGLE MAPS HOT",
                BadgeColor = "bg-rose-600",
                LegalStatus = "Sổ hồng hoàn công chính chủ",
                FurnitureStatus = "Nội thất cao cấp nhập khẩu toàn bộ",
                FloorInfo = "1 trệt 3 lầu",
                YearBuilt = 2023,
                Investor = "Vingroup",
                Description = "Bán căn nhà phố Shophouse vị trí kim cương ngay trung tâm Quận Ninh Kiều, Cần Thơ (tọa độ GPS: 10.0341, 105.7875). Vị trí sầm uất nhất miền Tây, view trực diện ngã ba sông Hậu và cầu Ninh Kiều. Pháp lý sổ hồng sang tên ngay trong ngày.",
                ViewsCount = 1845,
                PostedTime = "Hôm nay",
                Images = new()
                {
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                },
                Features = new()
                {
                    "Tọa độ thực tế Google Maps 10°02'02.8\"N 105°47'15.0\"E",
                    "Mặt tiền đắc địa ngay trung tâm Bến Ninh Kiều, Cần Thơ",
                    "Khai thác kinh doanh hoặc cho thuê dòng tiền 55 triệu/tháng",
                    "Liền kề TTTM Vincom Plaza Xuân Khánh và công viên Sông Hậu"
                },
                Amenities = new()
                {
                    new() { Name = "Bến Ninh Kiều", Distance = "300m", Icon = "fa-water" },
                    new() { Name = "Vincom Plaza", Distance = "150m", Icon = "fa-bag-shopping" },
                    new() { Name = "Cầu Đi Bộ Cần Thơ", Distance = "500m", Icon = "fa-bridge" },
                    new() { Name = "Chợ Đêm Cần Thơ", Distance = "400m", Icon = "fa-store" }
                },
                Agent = new()
                {
                    Name = "Nguyễn Văn Hưng",
                    Phone = "0908 123 456",
                    Avatar = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
                    Title = "Chuyên viên tư vấn BĐS Cần Thơ & Miền Tây"
                }
            });

            _properties.Add(new Property
            {
                Id = 1,
                Title = "Căn hộ cao cấp The Beverly - Vinhomes Grand Park view công viên 36ha",
                Category = "apartment",
                CategoryName = "Căn hộ chung cư",
                TransactionType = "sale",
                PriceDisplay = "3.2 Tỷ",
                PriceValue = 3200,
                UnitPrice = "42.6 tr/m²",
                AreaSqm = 75,
                Bedrooms = 2,
                Bathrooms = 2,
                Direction = "Đông Nam",
                BalconyDirection = "Đông Nam",
                Address = "Phường Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh",
                CityCode = "hcm",
                District = "TP. Thủ Đức",
                Latitude = 10.8423,
                Longitude = 106.8415,
                Badge = "VIP HOT",
                BadgeColor = "bg-rose-500",
                LegalStatus = "Sổ hồng sở hữu lâu dài",
                FurnitureStatus = "Nội thất cơ bản cao cấp Hafele",
                FloorInfo = "Tầng 18 (Tòa BE5)",
                YearBuilt = 2024,
                Investor = "Vinhomes",
                Description = "Căn hộ tầng trung view trọn vẹn công viên ánh sáng 36ha và sông Tắc mát mẻ quanh năm. Thiết kế hiện đại 2PN 2WC vuông vức tối ưu công năng.",
                ViewsCount = 1230,
                PostedTime = "Hôm nay",
                Images = new()
                {
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                },
                Features = new()
                {
                    "View trực diện công viên 36ha và sông Đồng Nai",
                    "Bàn giao nội thất nhập khẩu Hafele, Kohler",
                    "Hệ thống Smart Home điều khiển qua điện thoại",
                    "Hồ bơi nước mặn vô cực tầng 4 phong cách resort"
                },
                Amenities = new()
                {
                    new() { Name = "Công viên 36ha", Distance = "100m", Icon = "fa-tree" },
                    new() { Name = "Vincom Mega Mall", Distance = "200m", Icon = "fa-bag-shopping" },
                    new() { Name = "Bệnh viện Vinmec", Distance = "800m", Icon = "fa-hospital" }
                },
                Agent = new()
                {
                    Name = "Lê Hoàng Nam",
                    Phone = "0912 345 678",
                    Avatar = "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
                    Title = "Trưởng phòng Kinh Doanh Vinhomes Thủ Đức"
                }
            });

            _properties.Add(new Property
            {
                Id = 6,
                Title = "Đất nền sổ đỏ thổ cư ven sông Cổ Cò - Nam Đà Nẵng, thích hợp xây biệt thự vườn",
                Category = "land",
                CategoryName = "Đất nền dự án",
                TransactionType = "sale",
                PriceDisplay = "3.6 Tỷ",
                PriceValue = 3600,
                UnitPrice = "18 tr/m²",
                AreaSqm = 200,
                Bedrooms = 0,
                Bathrooms = 0,
                Address = "Đường Võ Quí Huân, Phường Hòa Hải, Quận Ngũ Hành Sơn, Đà Nẵng",
                CityCode = "danang",
                District = "Ngũ Hành Sơn",
                Latitude = 15.9868,
                Longitude = 108.2615,
                Badge = "SỔ ĐỎ CÔNG CHỨNG",
                BadgeColor = "bg-teal-600",
                Description = "Cần nhượng lô đất nền thổ cư ven sông Cổ Cò, phong thủy tụ khí cực tốt. Mặt tiền ngang 10m x dài 20m vuông vắn.",
                Images = new()
                {
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
                },
                Agent = new()
                {
                    Name = "Ngô Văn Phát",
                    Phone = "0945 678 999",
                    Avatar = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
                    Title = "Giám đốc SGD BĐS Miền Trung - Đà Nẵng"
                }
            });

            // Seed Projects
            _projects.AddRange(new[]
            {
                new Project
                {
                    Id = 101,
                    Name = "Vinhomes Grand Park",
                    Investor = "Tập đoàn Vingroup",
                    Location = "TP. Thủ Đức, TP. Hồ Chí Minh",
                    Scale = "271 hecta",
                    PriceRange = "Từ 2.5 - 65 Tỷ",
                    Type = "Đại đô thị thông minh",
                    ImageUrl = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
                    Highlights = new() { "Công viên 36ha", "Vincom Mega Mall", "Bệnh viện Vinmec", "VinBus nội khu" }
                },
                new Project
                {
                    Id = 102,
                    Name = "Masteri Centre Point",
                    Investor = "Masterise Homes",
                    Location = "Trung tâm Vinhomes Grand Park, TP. Thủ Đức",
                    Scale = "7.07 hecta (10 tháp căn hộ)",
                    PriceRange = "Từ 3.1 - 8.5 Tỷ",
                    Type = "Căn hộ Compound cao cấp",
                    ImageUrl = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
                    Highlights = new() { "Compound biệt lập", "Nội thất Marriott", "Hồ bơi 2 tầng" }
                },
                new Project
                {
                    Id = 103,
                    Name = "Khu đô thị Starlake Tây Hồ Tây",
                    Investor = "Tập đoàn Daewoo E&C Hàn Quốc",
                    Location = "Quận Tây Hồ & Bắc Từ Liêm, Hà Nội",
                    Scale = "186.3 hecta",
                    PriceRange = "Từ 35 - 120 Tỷ",
                    Type = "KĐT Quốc tế Thượng lưu",
                    ImageUrl = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                    Highlights = new() { "Ngoại giao đoàn", "Trung tâm R&D Samsung", "Trường Quốc tế Dewey" }
                }
            });

            // Seed Contacts (Bài Thực Hành 12)
            _contacts.Add(new ContactInquiry
            {
                Id = 1,
                PropertyId = 10,
                FullName = "Trần Minh Quang",
                Phone = "0918 888 777",
                Email = "quang.tran@gmail.com",
                Topic = "buy",
                TopicTitle = "Tư vấn tìm mua nhà đất / căn hộ",
                Branch = "cantho",
                Message = "Tôi muốn xem thực tế căn Shophouse Vincom Cần Thơ vào chiều thứ 7 tuần này lúc 15h.",
                Status = "in_progress"
            });

            // Seed Users
            _users.AddRange(new[]
            {
                new AppUser { Id = 1, FullName = "Quản Trị Viên Sàn", Email = "admin@minhvuongluxury.vn", Phone = "1900 6868", Role = "admin", RoleDisplay = "Quản trị viên Hệ thống", Title = "Giám đốc Vận hành", Status = "active" },
                new AppUser { Id = 2, FullName = "Nguyễn Văn Hưng", Email = "hung.nguyen@minhvuongluxury.vn", Phone = "0908 123 456", Role = "agent", RoleDisplay = "Chuyên viên Môi giới VIP", Title = "Chuyên viên Cao cấp", Status = "active" },
                new AppUser { Id = 3, FullName = "Trần Minh Khôi", Email = "khoi.tran@gmail.com", Phone = "0912 345 678", Role = "customer", RoleDisplay = "Khách mua & Nhà đầu tư", Title = "Nhà đầu tư cá nhân", Status = "active" },
                new AppUser { Id = 4, FullName = "Lê Hoàng Nam", Email = "nam.le@minhvuongluxury.vn", Phone = "0909 888 999", Role = "agent", RoleDisplay = "Chuyên viên Môi giới", Title = "Chuyên viên Tư vấn", Status = "active" },
                new AppUser { Id = 5, FullName = "Ngô Văn Phát", Email = "phat.ngo@minhvuongluxury.vn", Phone = "0945 678 999", Role = "agent", RoleDisplay = "Chuyên viên Môi giới", Title = "Chuyên viên BĐS Miền Trung", Status = "active" }
            });
        }
    }
}
