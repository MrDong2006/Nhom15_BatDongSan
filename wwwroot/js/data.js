/**
 * Dữ liệu mẫu Bất Động Sản & Dự Án (Mock Data Hub)
 * Hỗ trợ toàn bộ các trang: Trang chủ, Chi tiết BĐS, Bản đồ số, Dự án & Tính lãi vay
 */

const REAL_ESTATE_DATA = [
  {
    id: 10,
    title: "Nhà phố thương mại Vincom Shophouse Cần Thơ - Bến Ninh Kiều (10°02'02.8\"N 105°47'15.0\"E)",
    category: "sale",
    type: "house",
    typeName: "Nhà phố thương mại",
    price: "12.8 Tỷ",
    priceValue: 12800,
    unitPrice: "85.3 tr/m²",
    area: 150,
    bedrooms: 4,
    bathrooms: 4,
    direction: "Đông Nam",
    balconyDirection: "Đông Nam",
    address: "Số 209 Đường 30 Tháng 4, Phường Xuân Khánh, Quận Ninh Kiều, Cần Thơ",
    city: "cantho",
    district: "Quận Ninh Kiều",
    lat: 10.0341,
    lng: 105.7875,
    badge: "GOOGLE MAPS HOT",
    badgeColor: "bg-rose-600",
    legal: "Sổ hồng hoàn công chính chủ",
    furniture: "Nội thất cao cấp nhập khẩu toàn bộ",
    floor: "1 trệt 3 lầu",
    yearBuilt: 2023,
    investor: "Vingroup",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Tọa độ thực tế Google Maps 10°02'02.8\"N 105°47'15.0\"E",
      "Mặt tiền đắc địa ngay trung tâm Bến Ninh Kiều, Cần Thơ",
      "Khai thác kinh doanh hoặc cho thuê dòng tiền 55 triệu/tháng",
      "Liền kề TTTM Vincom Plaza Xuân Khánh và công viên Sông Hậu"
    ],
    amenities: [
      { name: "Bến Ninh Kiều", dist: "300m", icon: "fa-water" },
      { name: "Vincom Plaza", dist: "150m", icon: "fa-bag-shopping" },
      { name: "Cầu Đi Bộ Cần Thơ", dist: "500m", icon: "fa-bridge" },
      { name: "Chợ Đêm Cần Thơ", dist: "400m", icon: "fa-store" }
    ],
    description: `Bán căn nhà phố Shophouse vị trí kim cương ngay trung tâm Quận Ninh Kiều, Cần Thơ (tọa độ GPS: 10.0341, 105.7875).
Vị trí trung tâm sầm uất nhất miền Tây, view trực diện ngã ba sông Hậu và cầu Ninh Kiều. Pháp lý sổ hồng sang tên ngay trong ngày.`,
    agent: {
      name: "Nguyễn Văn Hưng",
      phone: "0908 123 456",
      zalo: "https://zalo.me/0908123456",
      email: "hung.nguyen@bdsviet.vn",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      title: "Chuyên viên tư vấn BĐS Cần Thơ & Miền Tây",
      role: "Chuyên viên tư vấn BĐS Cần Thơ & Miền Tây",
      verified: true
    },
    postedAt: "Hôm nay"
  },
  {
    id: 1,
    title: "Căn hộ cao cấp The Beverly - Vinhomes Grand Park view công viên 36ha",
    category: "sale",
    type: "apartment",
    typeName: "Căn hộ chung cư",
    price: "3.2 Tỷ",
    priceValue: 3200, // triệu VNĐ
    unitPrice: "42.6 tr/m²",
    area: 75,
    bedrooms: 2,
    bathrooms: 2,
    direction: "Đông Nam",
    balconyDirection: "Đông Nam",
    address: "Phường Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh",
    city: "hcm",
    district: "TP. Thủ Đức",
    lat: 10.8423,
    lng: 106.8415,
    badge: "VIP HOT",
    badgeColor: "bg-rose-500",
    legal: "Sổ hồng sở hữu lâu dài",
    furniture: "Nội thất cơ bản cao cấp Hafele",
    floor: "Tầng 18 (Tòa BE5)",
    yearBuilt: 2024,
    investor: "Vinhomes",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "View trực diện công viên 36ha và sông Đồng Nai",
      "Bàn giao nội thất nhập khẩu Hafele, Kohler",
      "Hệ thống Smart Home điều khiển qua điện thoại",
      "Hồ bơi nước mặn vô cực tầng 4 phong cách resort",
      "Miễn phí quản lý 2 năm đầu tiên",
      "Trường học liên cấp Vinschool cách 300m",
      "TTTM Vincom Mega Mall lớn nhất miền Nam kế bên"
    ],
    amenities: [
      { name: "Vincom Mega Mall", dist: "200m", icon: "fa-bag-shopping" },
      { name: "Trường Vinschool", dist: "350m", icon: "fa-graduation-cap" },
      { name: "Bệnh viện Vinmec", dist: "500m", icon: "fa-hospital" },
      { name: "Công viên 36ha", dist: "100m", icon: "fa-tree" },
      { name: "Bến xe Miền Đông mới", dist: "3.5km", icon: "fa-bus" }
    ],
    description: `Chính chủ cần chuyển nhượng căn hộ 2PN 2WC tòa BE5 phân khu cao cấp nhất The Beverly - Vinhomes Grand Park.
- Căn góc tầng đẹp, ban công Đông Nam mát mẻ quanh năm, view triệu đô nhìn trọn vẹn đại công viên 36 hecta và khu vui chơi VinWonders.
- Thiết kế hiện đại tối ưu công năng, bếp thông thoáng có ban công riêng.
- Hỗ trợ vay ngân hàng Techcombank / Vietcombank lên đến 70% giá trị hợp đồng, ân hạn nợ gốc 24 tháng.
- Pháp lý chuẩn chỉnh, ký hợp đồng mua bán sang tên trực tiếp.`,
    agent: {
      name: "Nguyễn Minh Tuấn",
      phone: "0908 123 456",
      zalo: "https://zalo.me/0908123456",
      email: "tuan.nguyen@bdsviet.vn",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
      role: "Chuyên viên tư vấn Vinhomes Diamond",
      verified: true
    },
    postedAt: "Hôm nay"
  },
  {
    id: 2,
    title: "Nhà phố thương mại Shophouse Thảo Điền - Đang cho thuê kinh doanh 65tr/th",
    category: "sale",
    type: "house",
    typeName: "Nhà phố thương mại",
    price: "24.5 Tỷ",
    priceValue: 24500,
    unitPrice: "213 tr/m²",
    area: 115,
    bedrooms: 4,
    bathrooms: 5,
    direction: "Nam",
    balconyDirection: "Nam",
    address: "Đường Xuân Thủy, Phường Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh",
    city: "hcm",
    district: "TP. Thủ Đức",
    lat: 10.8038,
    lng: 106.7329,
    badge: "CHÍNH CHỦ",
    badgeColor: "bg-emerald-600",
    legal: "Sổ hồng hoàn công đầy đủ",
    furniture: "Đầy đủ tiện nghi cao cấp",
    floor: "1 Trệt 3 Lầu 1 Sân thượng",
    yearBuilt: 2022,
    investor: "Tư nhân",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Mặt tiền đường sầm uất Thảo Điền, vỉa hè rộng 6m",
      "Hợp đồng thuê 65 triệu/tháng còn thời hạn 3 năm",
      "Có hố chờ thang máy, hoàn công đầy đủ",
      "Khu phố Tây tập trung nhiều người nước ngoài sinh sống",
      "Gần trường Quốc tế Anh BIS và trạm Metro Thảo Điền"
    ],
    amenities: [
      { name: "Ga Metro Thảo Điền", dist: "450m", icon: "fa-train-subway" },
      { name: "Trường Quốc tế BIS", dist: "300m", icon: "fa-graduation-cap" },
      { name: "Vincom Mega Mall Thảo Điền", dist: "800m", icon: "fa-bag-shopping" },
      { name: "Bệnh viện Quốc tế Thảo Điền", dist: "600m", icon: "fa-hospital" }
    ],
    description: `Bán nhà phố mặt tiền kinh doanh Thảo Điền, vị trí cực đẹp thuận tiện kinh doanh nhà hàng, cafe cao cấp, spa hoặc làm văn phòng đại diện.
- Dòng tiền cho thuê cực kỳ ổn định 65 triệu/tháng, hợp đồng dài hạn.
- Khu vực dân trí cao, an ninh nghiêm ngặt, tiềm năng sinh lời bền vững theo hạ tầng Metro.
- Sổ hồng riêng chính chủ, công chứng sang tên trong ngày.`,
    agent: {
      name: "Trần Mai Anh",
      phone: "0912 345 678",
      zalo: "https://zalo.me/0912345678",
      email: "maianh.tran@bdsviet.vn",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      role: "Trưởng phòng BĐS Cao cấp Thảo Điền",
      verified: true
    },
    postedAt: "1 ngày trước"
  },
  {
    id: 3,
    title: "Biệt thự đơn lập Ciputra Tây Hồ - Sân vườn rộng view công viên trung tâm",
    category: "sale",
    type: "villa",
    typeName: "Biệt thự cao cấp",
    price: "48 Tỷ",
    priceValue: 48000,
    unitPrice: "160 tr/m²",
    area: 300,
    bedrooms: 5,
    bathrooms: 6,
    direction: "Đông",
    balconyDirection: "Đông",
    address: "KĐT Ciputra, Phường Phú Thượng, Quận Tây Hồ, Hà Nội",
    city: "hn",
    district: "Quận Tây Hồ",
    lat: 21.0772,
    lng: 105.7958,
    badge: "SIÊU VIP",
    badgeColor: "bg-purple-600",
    legal: "Sổ đỏ chính chủ sẵn sàng sang tên",
    furniture: "Full nội thất nhập khẩu Ý",
    floor: "3 Tầng + 1 Bán hầm",
    yearBuilt: 2021,
    investor: "Ciputra Group",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Sân vườn rộng bao quanh nhà trồng hoa và cây cảnh quý",
      "Garage tầng hầm đỗ được 3 xe ô tô rộng rãi",
      "An ninh 3 lớp bảo vệ 24/7 tuyệt đối an toàn",
      "Khu dân trí cao, nhiều đại sứ quán và chuyên gia quốc tế",
      "Sân golf Ciputra tiêu chuẩn quốc tế ngay trong khuôn viên"
    ],
    amenities: [
      { name: "Sân Golf Ciputra", dist: "200m", icon: "fa-flag" },
      { name: "Trường Quốc tế UNIS", dist: "400m", icon: "fa-graduation-cap" },
      { name: "Lotte Mall Tây Hồ", dist: "1.2km", icon: "fa-bag-shopping" },
      { name: "Hồ Tây", dist: "1.5km", icon: "fa-water" }
    ],
    description: `Cần bán căn biệt thự đơn lập giai đoạn 2 KĐT Ciputra Nam Thăng Long.
- Vị trí góc 2 mặt thoáng, thiết kế kiến trúc tân cổ điển sang trọng, kiên cố.
- Nội thất gỗ óc chó tự nhiên, thiết bị vệ sinh mạ vàng cao cấp của Kohler.
- Gia chủ để lại toàn bộ đồ đạc cho khách mua thiện chí.`,
    agent: {
      name: "Hoàng Gia Bảo",
      phone: "0988 889 999",
      zalo: "https://zalo.me/0988889999",
      email: "giabao.hoang@bdsviet.vn",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      role: "Chuyên viên BĐS Triệu Đô Hà Nội",
      verified: true
    },
    postedAt: "Hôm qua"
  },
  {
    id: 4,
    title: "Căn hộ 2PN Vinhomes Smart City Tây Mỗ - Full đồ đẹp lung linh xách vali ở ngay",
    category: "sale",
    type: "apartment",
    typeName: "Căn hộ chung cư",
    price: "2.85 Tỷ",
    priceValue: 2850,
    unitPrice: "44.5 tr/m²",
    area: 64,
    bedrooms: 2,
    bathrooms: 2,
    direction: "Tây Nam",
    balconyDirection: "Đông Bắc",
    address: "Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội",
    city: "hn",
    district: "Quận Nam Từ Liêm",
    lat: 20.9998,
    lng: 105.7482,
    badge: "GIÁ TỐT",
    badgeColor: "bg-blue-600",
    legal: "Sổ hồng sở hữu vĩnh viễn",
    furniture: "Đầy đủ nội thất cao cấp",
    floor: "Tầng 12",
    yearBuilt: 2023,
    investor: "Vinhomes",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Tầng trung view thoáng mát không bị che chắn",
      "Gần trường mầm non Vinschool và ga Metro số 6 tương lai",
      "Đầy đủ hệ thống bếp Bosch, sofa da bò, giường tủ An Cường",
      "Sử dụng miễn phí vườn Nhật Zen Park và công viên thể thao 10.2ha"
    ],
    amenities: [
      { name: "Vườn Nhật Zen Park", dist: "150m", icon: "fa-torii-gate" },
      { name: "TTTM Vincom Mega Mall", dist: "500m", icon: "fa-bag-shopping" },
      { name: "Bệnh viện Vinmec Smart City", dist: "600m", icon: "fa-hospital" },
      { name: "Sân vận động Mỹ Đình", dist: "4km", icon: "fa-futbol" }
    ],
    description: `Chủ nhà chuyển công tác cần nhượng lại căn 2 phòng ngủ + 1 tại phân khu Sapphire. Nhà giữ gìn cẩn thận, nội thất tự tay đặt đóng tâm huyết. Giá bán bao toàn bộ thuế phí chuyển nhượng.`,
    agent: {
      name: "Lê Thu Trang",
      phone: "0936 789 102",
      zalo: "https://zalo.me/0936789102",
      email: "thutrang.le@bdsviet.vn",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
      role: "Tư vấn BĐS Smart City",
      verified: true
    },
    postedAt: "3 ngày trước"
  },
  {
    id: 5,
    title: "Cho thuê căn hộ Landmark 81 view sông Sài Gòn - Nội thất 5 sao đẳng cấp",
    category: "rent",
    type: "apartment",
    typeName: "Căn hộ cho thuê",
    price: "32 Triệu/tháng",
    priceValue: 32,
    unitPrice: "370 k/m²",
    area: 86,
    bedrooms: 2,
    bathrooms: 2,
    direction: "Đông Bắc",
    balconyDirection: "Đông Bắc",
    address: "Khu Vinhomes Central Park, Bình Thạnh, TP. Hồ Chí Minh",
    city: "hcm",
    district: "Quận Bình Thạnh",
    lat: 10.7951,
    lng: 106.7219,
    badge: "CHO THUÊ",
    badgeColor: "bg-amber-600",
    legal: "Hợp đồng thuê 1-2 năm",
    furniture: "Full option phong cách khách sạn 5*",
    floor: "Tầng 35",
    yearBuilt: 2020,
    investor: "Vingroup",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Tòa nhà biểu tượng cao nhất Việt Nam Landmark 81",
      "Thẻ cư dân VIP sử dụng sky lounge, gym, hồ bơi vô cực chân mây",
      "Trực tiếp kết nối TTTM Vincom Center, rạp chiếu phim, ẩm thực quốc tế",
      "Hệ thống lọc nước uống trực tiếp tại vòi và lọc không khí trung tâm"
    ],
    amenities: [
      { name: "Công viên Central Park 14ha", dist: "50m", icon: "fa-tree" },
      { name: "Vincom Landmark 81", dist: "Trực diện", icon: "fa-bag-shopping" },
      { name: "Bệnh viện Vinmec", dist: "300m", icon: "fa-hospital" },
      { name: "Trung tâm Quận 1", dist: "3km", icon: "fa-city" }
    ],
    description: `Cho thuê căn hộ cao cấp 2PN tại tòa tháp biểu tượng Landmark 81.
- Thiết kế theo tiêu chuẩn khách sạn siêu sang, tầm nhìn ôm trọn sông Sài Gòn và trung tâm Quận 1.
- Đã trang bị đầy đủ chỉ cần xách vali vào ở. Dịch vụ dọn phòng 2 lần/tuần theo yêu cầu.`,
    agent: {
      name: "Đặng Quang Huy",
      phone: "0909 999 888",
      zalo: "https://zalo.me/0909999888",
      email: "quanghuy.dang@bdsviet.vn",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      role: "Quản lý BĐS Vinhomes Central Park",
      verified: true
    },
    postedAt: "Hôm nay"
  },
  {
    id: 6,
    title: "Đất nền sổ đỏ thổ cư ven sông Cổ Cò - Nam Đà Nẵng, thích hợp xây biệt thự vườn",
    category: "sale",
    type: "land",
    typeName: "Đất nền dự án",
    price: "3.6 Tỷ",
    priceValue: 3600,
    unitPrice: "18 tr/m²",
    area: 200,
    bedrooms: 0,
    bathrooms: 0,
    direction: "Đông",
    balconyDirection: "Đông",
    address: "Đường Võ Quí Huân, Phường Hòa Hải, Quận Ngũ Hành Sơn, Đà Nẵng",
    city: "danang",
    district: "Ngũ Hành Sơn",
    lat: 15.9868,
    lng: 108.2615,
    badge: "SỔ ĐỎ CÔNG CHỨNG",
    badgeColor: "bg-teal-600",
    legal: "Sổ đỏ 100% đất ở đô thị",
    furniture: "Đất trống sẵn sàng xây dựng ngay",
    floor: "Xây tự do đến 5 tầng",
    yearBuilt: 2024,
    investor: "Tư nhân",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Mặt tiền đường 7.5m, vỉa hè mỗi bên 3m thoáng đãng",
      "Cách bãi tắm Tân Trà chỉ 1.2km, gần tổ hợp Cocobay",
      "Cơ sở hạ tầng điện âm, nước máy, đèn đường hoàn thiện 100%",
      "Tiềm năng tăng giá mạnh khi thông luồng du lịch sông Cổ Cò Đà Nẵng - Hội An"
    ],
    amenities: [
      { name: "Bãi tắm Tân Trà", dist: "1.2km", icon: "fa-umbrella-beach" },
      { name: "Sân Golf Montgomerie Links", dist: "2km", icon: "fa-flag" },
      { name: "Phố cổ Hội An", dist: "12km", icon: "fa-landmark" },
      { name: "Sân bay Đà Nẵng", dist: "14km", icon: "fa-plane" }
    ],
    description: `Cần nhượng lô đất nền thổ cư ven sông Cổ Cò, phong thủy tụ khí cực tốt. Mặt tiền ngang 10m x dài 20m vuông vắn. Thích hợp mua đầu tư tích sản hoặc xây biệt thự nghỉ dưỡng, homestay du lịch.`,
    agent: {
      name: "Ngô Văn Phát",
      phone: "0945 678 999",
      zalo: "https://zalo.me/0945678999",
      email: "phat.ngo@bdsviet.vn",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      role: "Giám đốc SGD BĐS Miền Trung",
      verified: true
    },
    postedAt: "2 ngày trước"
  },
  {
    id: 7,
    title: "Nhà phố liền kề Starlake Tây Hồ Tây - Phong cách Hàn Quốc, chuẩn sống thượng lưu",
    category: "sale",
    type: "house",
    typeName: "Nhà liền kề",
    price: "36 Tỷ",
    priceValue: 36000,
    unitPrice: "240 tr/m²",
    area: 150,
    bedrooms: 4,
    bathrooms: 5,
    direction: "Đông Nam",
    balconyDirection: "Đông Nam",
    address: "KĐT Starlake Tây Hồ Tây, Phường Xuân La, Quận Tây Hồ, Hà Nội",
    city: "hn",
    district: "Quận Tây Hồ",
    lat: 21.0594,
    lng: 105.7951,
    badge: "ĐỘC QUYỀN",
    badgeColor: "bg-indigo-600",
    legal: "Sổ đỏ sở hữu lâu dài",
    furniture: "Hoàn thiện mặt ngoài, thô bên trong",
    floor: "4 Tầng",
    yearBuilt: 2023,
    investor: "Daewoo E&C",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Khu đô thị quốc tế được Daewoo E&C Hàn Quốc phát triển",
      "Gần các bộ ngành ngoại giao đoàn và trung tâm hành chính mới",
      "Tiện ích trường liên cấp quốc tế Dewey, bệnh viện quốc tế",
      "Mật độ xây dựng chỉ 16%, không gian xanh chuẩn sinh thái"
    ],
    amenities: [
      { name: "Trung tâm R&D Samsung", dist: "300m", icon: "fa-building" },
      { name: "Lotte Mall Tây Hồ", dist: "1.5km", icon: "fa-bag-shopping" },
      { name: "Hồ Tây", dist: "2km", icon: "fa-water" },
      { name: "Sân bay Nội Bài", dist: "18km", icon: "fa-plane" }
    ],
    description: `Chính chủ cần bán gấp căn liền kề dãy H6 Starlake Tây Hồ Tây. Vị trí trung tâm kết nối thuận tiện Võ Chí Công, Hoàng Quốc Việt. Khu vực có tiềm năng gia tăng giá trị phi mã khi trung tâm R&D Samsung và Lotte Mall đi vào hoạt động.`,
    agent: {
      name: "Hoàng Gia Bảo",
      phone: "0988 889 999",
      zalo: "https://zalo.me/0988889999",
      email: "giabao.hoang@bdsviet.vn",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      role: "Chuyên viên BĐS Triệu Đô Hà Nội",
      verified: true
    },
    postedAt: "4 ngày trước"
  },
  {
    id: 8,
    title: "Căn hộ Penthouse Duplex Đảo Kim Cương Diamond Island - Hồ bơi riêng view 360",
    category: "sale",
    type: "apartment",
    typeName: "Penthouse / Duplex",
    price: "55 Tỷ",
    priceValue: 55000,
    unitPrice: "122 tr/m²",
    area: 450,
    bedrooms: 4,
    bathrooms: 5,
    direction: "Nam",
    balconyDirection: "Nam",
    address: "Số 1 Đường số 104, Phường Bình Trưng Tây, TP. Thủ Đức, TP. Hồ Chí Minh",
    city: "hcm",
    district: "TP. Thủ Đức",
    lat: 10.7674,
    lng: 106.7497,
    badge: "SIÊU VIP",
    badgeColor: "bg-purple-600",
    legal: "Sổ hồng sở hữu lâu dài",
    furniture: "Thiết kế đo ni đóng giày phong cách Ý",
    floor: "Tầng 28 - 29 (Duplex)",
    yearBuilt: 2021,
    investor: "Kusto Home",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    features: [
      "Hòn đảo tự nhiên duy nhất tại TP.HCM với 85% mảng xanh",
      "Bể bơi tràn bờ nước mặn riêng trên tầng thượng của căn hộ",
      "Bến du thuyền tư nhân, bãi đáp trực thăng sang trọng",
      "Tầm nhìn panorama 360 độ trọn vẹn sông Sài Gòn và sông Giồng Ông Tố"
    ],
    amenities: [
      { name: "Bến du thuyền Diamond", dist: "100m", icon: "fa-ship" },
      { name: "Hồ bơi khoáng mặn", dist: "50m", icon: "fa-water-ladder" },
      { name: "Khu tài chính Thủ Thiêm", dist: "3.5km", icon: "fa-landmark" },
      { name: "Trung tâm Quận 1", dist: "6km", icon: "fa-city" }
    ],
    description: `Tuyệt tác căn hộ Penthouse Duplex tại Đảo Kim Cương (Diamond Island). Không gian sống riêng tư biệt lập giữa lòng Sài Gòn. Toàn bộ nội thất nhập khẩu từ các thương hiệu hàng đầu thế giới B&B Italia, Poliform.`,
    agent: {
      name: "Trần Mai Anh",
      phone: "0912 345 678",
      zalo: "https://zalo.me/0912345678",
      email: "maianh.tran@bdsviet.vn",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      role: "Trưởng phòng BĐS Cao cấp Thảo Điền",
      verified: true
    },
    postedAt: "Hôm nay"
  }
];

// Danh sách các Dự án Đô thị Nổi bật
const PROJECTS_DATA = [
  {
    id: 101,
    name: "Vinhomes Grand Park",
    investor: "Tập đoàn Vingroup",
    location: "TP. Thủ Đức, TP. Hồ Chí Minh",
    scale: "271 hecta",
    status: "Đang mở bán phân khu mới",
    statusColor: "bg-emerald-500",
    priceRange: "Từ 2.5 - 65 Tỷ",
    type: "Đại đô thị thông minh",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    highlights: ["Công viên 36ha", "Vincom Mega Mall", "Bệnh viện Vinmec", "VinBus nội khu"]
  },
  {
    id: 102,
    name: "Masteri Centre Point",
    investor: "Masterise Homes",
    location: "Trung tâm Vinhomes Grand Park, TP. Thủ Đức",
    scale: "7.07 hecta (10 tháp căn hộ)",
    status: "Bàn giao nhà ngay",
    statusColor: "bg-blue-500",
    priceRange: "Từ 3.1 - 8.5 Tỷ",
    type: "Căn hộ Compound cao cấp",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    highlights: ["Compound biệt lập", "Nội thất Marriott", "Hồ bơi 2 tầng", "Khu vui chơi trẻ em"]
  },
  {
    id: 103,
    name: "Khu đô thị Starlake Tây Hồ Tây",
    investor: "Tập đoàn Daewoo E&C Hàn Quốc",
    location: "Quận Tây Hồ & Bắc Từ Liêm, Hà Nội",
    scale: "186.3 hecta",
    status: "Đang triển khai giai đoạn 2",
    statusColor: "bg-purple-500",
    priceRange: "Từ 35 - 120 Tỷ",
    type: "KĐT Quốc tế Thượng lưu",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    highlights: ["Ngoại giao đoàn", "Trung tâm R&D Samsung", "Trường Quốc tế Dewey", "Hồ sinh thái"]
  },
  {
    id: 104,
    name: "Ecopark Hưng Yên",
    investor: "Tập đoàn Ecopark",
    location: "Xuân Quan, Văn Giang, Hưng Yên (cách Hà Nội 13km)",
    scale: "500 hecta",
    status: "Mở bán phân khu Biệt thự đảo",
    statusColor: "bg-teal-500",
    priceRange: "Từ 2.2 - 90 Tỷ",
    type: "Thành phố xanh sinh thái",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    highlights: ["1 triệu cây xanh", "Suối khoáng nóng SwanLake", "Học viện Golf Els", "Trường BUV"]
  }
];

// Danh mục loại hình
const PROPERTY_TYPES = [
  { id: "all", name: "Tất cả loại hình", icon: "fa-border-all" },
  { id: "apartment", name: "Căn hộ chung cư", icon: "fa-building" },
  { id: "house", name: "Nhà phố, nhà riêng", icon: "fa-house" },
  { id: "villa", name: "Biệt thự cao cấp", icon: "fa-house-chimney-window" },
  { id: "land", name: "Đất nền dự án", icon: "fa-mountain-sun" }
];

// Danh mục Tỉnh/Thành
const CITIES = [
  { id: "all", name: "Toàn quốc", center: [10.0341, 105.7875], zoom: 14 },
  { id: "cantho", name: "📍 Cần Thơ (10°02'02.8\"N 105°47'15.0\"E)", center: [10.0341, 105.7875], zoom: 15 },
  { id: "hcm", name: "TP. Hồ Chí Minh", center: [10.8038, 106.75], zoom: 12 },
  { id: "hn", name: "Hà Nội", center: [21.04, 105.78], zoom: 12 },
  { id: "danang", name: "Đà Nẵng", center: [16.02, 108.24], zoom: 12 }
];

// Đồng bộ các tin đăng mới của người dùng từ localStorage vào REAL_ESTATE_DATA
(function syncUserPostedProperties() {
  try {
    const savedPosts = JSON.parse(localStorage.getItem("bds_user_posts") || "[]");
    if (Array.isArray(savedPosts) && savedPosts.length > 0) {
      savedPosts.forEach(post => {
        if (!REAL_ESTATE_DATA.some(p => p.id === post.id)) {
          REAL_ESTATE_DATA.unshift(post);
        }
      });
    }
  } catch (e) {
    console.warn("Không thể đọc tin đăng từ localStorage:", e);
  }
})();

// Hàm tiện ích lấy BĐS theo ID
function getPropertyById(id) {
  const numId = parseInt(id, 10);
  return REAL_ESTATE_DATA.find(p => p.id === numId) || REAL_ESTATE_DATA[0];
}

// Dữ liệu bảng giá thị trường chi tiết toàn quốc 2026
const MARKET_PRICE_DATA = [
  // TP. HỒ CHÍ MINH
  {
    id: "hcm-1",
    district: "Quận 1",
    city: "hcm",
    cityName: "TP. Hồ Chí Minh",
    apartment: { min: 140, max: 280, avg: 195 },
    house: { min: 320, max: 850, avg: 480 },
    villa: { min: 450, max: 1200, avg: 680 },
    land: { min: 280, max: 650, avg: 410 },
    yoyGrowth: "+3.8%",
    growthValue: 3.8,
    liquidity: "Rất cao",
    rentAvg: "25 - 65 tr/tháng",
    trend: "Tăng nhẹ",
    keyProjects: ["The Grand Manhattan", "Grand Marina Saigon", "Centennial"]
  },
  {
    id: "hcm-2",
    district: "TP. Thủ Đức (Khu Đông)",
    city: "hcm",
    cityName: "TP. Hồ Chí Minh",
    apartment: { min: 55, max: 135, avg: 78 },
    house: { min: 110, max: 260, avg: 165 },
    villa: { min: 160, max: 420, avg: 250 },
    land: { min: 48, max: 120, avg: 72 },
    yoyGrowth: "+5.6%",
    growthValue: 5.6,
    liquidity: "Rất cao",
    rentAvg: "12 - 32 tr/tháng",
    trend: "Tăng mạnh",
    keyProjects: ["Vinhomes Grand Park", "Masteri Centre Point", "The Global City", "Eaton Park"]
  },
  {
    id: "hcm-3",
    district: "Quận 7 & Nhà Bè (Khu Nam)",
    city: "hcm",
    cityName: "TP. Hồ Chí Minh",
    apartment: { min: 46, max: 95, avg: 65 },
    house: { min: 95, max: 210, avg: 140 },
    villa: { min: 140, max: 350, avg: 210 },
    land: { min: 42, max: 90, avg: 58 },
    yoyGrowth: "+3.2%",
    growthValue: 3.2,
    liquidity: "Cao",
    rentAvg: "11 - 28 tr/tháng",
    trend: "Ổn định",
    keyProjects: ["Phú Mỹ Hưng The Peak", "Eco Green Saigon", "Celesta Rise"]
  },
  {
    id: "hcm-4",
    district: "Quận Bình Thạnh & Phú Nhuận",
    city: "hcm",
    cityName: "TP. Hồ Chí Minh",
    apartment: { min: 62, max: 125, avg: 85 },
    house: { min: 140, max: 310, avg: 195 },
    villa: { min: 210, max: 480, avg: 310 },
    land: { min: 90, max: 190, avg: 130 },
    yoyGrowth: "+4.1%",
    growthValue: 4.1,
    liquidity: "Rất cao",
    rentAvg: "14 - 35 tr/tháng",
    trend: "Tăng nhẹ",
    keyProjects: ["Vinhomes Central Park", "Sunwah Pearl", "City Garden"]
  },
  {
    id: "hcm-5",
    district: "Bình Chánh & Cần Giuộc giáp ranh",
    city: "hcm",
    cityName: "TP. Hồ Chí Minh",
    apartment: { min: 32, max: 52, avg: 41 },
    house: { min: 45, max: 95, avg: 65 },
    villa: { min: 70, max: 160, avg: 105 },
    land: { min: 24, max: 48, avg: 34 },
    yoyGrowth: "+4.5%",
    growthValue: 4.5,
    liquidity: "Cao",
    rentAvg: "6 - 15 tr/tháng",
    trend: "Tăng nhẹ",
    keyProjects: ["Mizuki Park", "Westgate An Gia", "KĐT EHome"]
  },

  // HÀ NỘI
  {
    id: "hn-1",
    district: "Quận Cầu Giấy & Nam Từ Liêm",
    city: "hn",
    cityName: "Hà Nội",
    apartment: { min: 58, max: 110, avg: 76 },
    house: { min: 160, max: 340, avg: 220 },
    villa: { min: 240, max: 550, avg: 360 },
    land: { min: 95, max: 210, avg: 145 },
    yoyGrowth: "+7.2%",
    growthValue: 7.2,
    liquidity: "Rất cao",
    rentAvg: "13 - 30 tr/tháng",
    trend: "Tăng mạnh",
    keyProjects: ["The Matrix One", "Vinhomes Smart City", "Mipec Rubik 360"]
  },
  {
    id: "hn-2",
    district: "Quận Tây Hồ & Ngoại Giao Đoàn",
    city: "hn",
    cityName: "Hà Nội",
    apartment: { min: 85, max: 185, avg: 125 },
    house: { min: 220, max: 520, avg: 330 },
    villa: { min: 310, max: 750, avg: 460 },
    land: { min: 140, max: 320, avg: 210 },
    yoyGrowth: "+6.4%",
    growthValue: 6.4,
    liquidity: "Rất cao",
    rentAvg: "20 - 55 tr/tháng",
    trend: "Tăng mạnh",
    keyProjects: ["Starlake Tây Hồ Tây", "Ciputra Hanoi", "Heritage West Lake"]
  },
  {
    id: "hn-3",
    district: "Quận Đống Đa, Ba Đình & Hoàn Kiếm",
    city: "hn",
    cityName: "Hà Nội",
    apartment: { min: 90, max: 210, avg: 145 },
    house: { min: 250, max: 680, avg: 390 },
    villa: { min: 380, max: 950, avg: 560 },
    land: { min: 180, max: 450, avg: 280 },
    yoyGrowth: "+4.8%",
    growthValue: 4.8,
    liquidity: "Cao",
    rentAvg: "18 - 45 tr/tháng",
    trend: "Tăng nhẹ",
    keyProjects: ["Grandeur Palace Giảng Võ", "Vinhomes Metropolis", "D'. San Raffles"]
  },
  {
    id: "hn-4",
    district: "Quận Long Biên & Gia Lâm (Khu Đông)",
    city: "hn",
    cityName: "Hà Nội",
    apartment: { min: 42, max: 85, avg: 58 },
    house: { min: 85, max: 190, avg: 125 },
    villa: { min: 130, max: 340, avg: 210 },
    land: { min: 48, max: 110, avg: 72 },
    yoyGrowth: "+5.9%",
    growthValue: 5.9,
    liquidity: "Rất cao",
    rentAvg: "9 - 22 tr/tháng",
    trend: "Tăng mạnh",
    keyProjects: ["Vinhomes Riverside", "Vinhomes Ocean Park 1", "Khai Sơn City"]
  },
  {
    id: "hn-5",
    district: "Huyện Đông Anh & Mê Linh (Đón quy hoạch)",
    city: "hn",
    cityName: "Hà Nội",
    apartment: { min: 35, max: 60, avg: 45 },
    house: { min: 55, max: 120, avg: 82 },
    villa: { min: 80, max: 210, avg: 135 },
    land: { min: 35, max: 85, avg: 52 },
    yoyGrowth: "+6.8%",
    growthValue: 6.8,
    liquidity: "Cao",
    rentAvg: "7 - 16 tr/tháng",
    trend: "Tăng mạnh",
    keyProjects: ["Thành phố Thông minh Smart City", "Vinhomes Cổ Loa"]
  },

  // ĐÀ NẴNG & MIỀN TRUNG
  {
    id: "dn-1",
    district: "Quận Hải Châu (Trung tâm)",
    city: "danang",
    cityName: "Đà Nẵng",
    apartment: { min: 55, max: 115, avg: 78 },
    house: { min: 90, max: 220, avg: 145 },
    villa: { min: 130, max: 310, avg: 200 },
    land: { min: 65, max: 160, avg: 98 },
    yoyGrowth: "+3.1%",
    growthValue: 3.1,
    liquidity: "Cao",
    rentAvg: "10 - 26 tr/tháng",
    trend: "Ổn định",
    keyProjects: ["The Royal Boutique Hotel & Villa", "Sun Ponte Residence", "FHome"]
  },
  {
    id: "dn-2",
    district: "Quận Sơn Trà & Ngũ Hành Sơn (Ven biển)",
    city: "danang",
    cityName: "Đà Nẵng",
    apartment: { min: 45, max: 95, avg: 68 },
    house: { min: 70, max: 170, avg: 115 },
    villa: { min: 110, max: 290, avg: 185 },
    land: { min: 42, max: 110, avg: 68 },
    yoyGrowth: "+4.2%",
    growthValue: 4.2,
    liquidity: "Rất cao",
    rentAvg: "11 - 35 tr/tháng",
    trend: "Tăng nhẹ",
    keyProjects: ["Sun Symphony Residence", "Ocean Villas", "Hyatt Regency"]
  },
  {
    id: "dn-3",
    district: "Quận Cẩm Lệ & Hòa Vang (Ven đô)",
    city: "danang",
    cityName: "Đà Nẵng",
    apartment: { min: 25, max: 45, avg: 34 },
    house: { min: 40, max: 80, avg: 56 },
    villa: { min: 60, max: 140, avg: 92 },
    land: { min: 22, max: 48, avg: 32 },
    yoyGrowth: "+2.5%",
    growthValue: 2.5,
    liquidity: "Trung bình",
    rentAvg: "5 - 12 tr/tháng",
    trend: "Ổn định",
    keyProjects: ["KĐT Nam Hòa Xuân", "Golden Hills Đà Nẵng"]
  },

  // BÌNH DƯƠNG
  {
    id: "bd-1",
    district: "TP. Thủ Dầu Một & TP. Thuận An",
    city: "binhduong",
    cityName: "Bình Dương",
    apartment: { min: 32, max: 50, avg: 39 },
    house: { min: 45, max: 95, avg: 66 },
    villa: { min: 65, max: 150, avg: 98 },
    land: { min: 26, max: 55, avg: 38 },
    yoyGrowth: "+4.4%",
    growthValue: 4.4,
    liquidity: "Rất cao",
    rentAvg: "7 - 18 tr/tháng",
    trend: "Tăng nhẹ",
    keyProjects: ["Astral City", "The Emerald Golf View", "Bcons City"]
  },

  // ĐỒNG NAI
  {
    id: "dnai-1",
    district: "TP. Biên Hòa & Huyện Long Thành",
    city: "dongnai",
    cityName: "Đồng Nai",
    apartment: { min: 28, max: 45, avg: 35 },
    house: { min: 40, max: 85, avg: 58 },
    villa: { min: 55, max: 140, avg: 88 },
    land: { min: 20, max: 52, avg: 33 },
    yoyGrowth: "+4.9%",
    growthValue: 4.9,
    liquidity: "Cao",
    rentAvg: "6 - 15 tr/tháng",
    trend: "Tăng nhẹ",
    keyProjects: ["Aqua City", "KĐT Century City Long Thành", "Izumi City"]
  }
];
