/**
 * Logic điều khiển giao diện chính của Cổng thông tin Bất Động Sản
 * Xử lý tìm kiếm, bộ lọc đa năng, sắp xếp, chuyển đổi giao diện (Split Map / Lưới),
 * Modal chi tiết, Yêu thích (Tin đã lưu) và So sánh Bất động sản trực quan.
 */

// Trạng thái ứng dụng (Application State)
const state = {
  category: "all",      // 'all', 'sale', 'rent'
  type: "all",          // 'all', 'apartment', 'house', 'villa', 'land'
  city: "all",          // 'all', 'cantho', 'hcm', 'hn', 'danang'
  priceRange: "all",    // 'all', 'under2', '2to5', '5to10', 'over10'
  areaRange: "all",     // 'all', 'under50', '50to100', '100to200', 'over200'
  keyword: "",
  sortBy: "default",    // 'default', 'price-asc', 'price-desc', 'area-desc'
  onlyFavorites: false, // Lọc riêng tin đã thả tim
  viewMode: "split",    // 'split' (chia đôi bản đồ) hoặc 'grid' (danh sách lớn)
  favorites: JSON.parse(localStorage.getItem("bds_favorites") || "[]"),
  compareList: JSON.parse(localStorage.getItem("bds_compare") || "[]")
};

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  initTypeButtons();
  initViewToggle();
  initSearchAndFilters();
  initModalEvents();
  ensureCompareUI();

  // Khởi tạo bản đồ Leaflet theo tọa độ Google Maps người dùng yêu cầu
  initLeafletMap("property-map", [10.0341, 105.7875], 15);

  // Lọc và hiển thị dữ liệu ban đầu
  applyFilters();
  renderCompareBar();
  if (typeof window.updateNavbarSavedBadge === "function") {
    window.updateNavbarSavedBadge();
  }
});

// Render danh sách icon loại hình BĐS
function initTypeButtons() {
  const container = document.getElementById("type-pills-container");
  if (!container) return;

  container.innerHTML = PROPERTY_TYPES.map(t => `
    <button 
      data-type="${t.id}"
      class="type-pill-btn px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all flex items-center gap-2 border ${
        t.id === state.type 
          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20' 
          : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50'
      }">
      <i class="fa-solid ${t.icon}"></i>
      <span>${t.name}</span>
    </button>
  `).join("");

  container.querySelectorAll(".type-pill-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.type = btn.dataset.type;
      container.querySelectorAll(".type-pill-btn").forEach(b => {
        b.className = "type-pill-btn px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all flex items-center gap-2 border bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50";
      });
      btn.className = "type-pill-btn px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all flex items-center gap-2 border bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20";
      applyFilters();
    });
  });
}

// Bắt sự kiện chuyển đổi View (Split Map vs Grid)
function initViewToggle() {
  const btnSplit = document.getElementById("btn-view-split");
  const btnGrid = document.getElementById("btn-view-grid");
  const mapContainer = document.getElementById("map-wrapper");
  const listContainer = document.getElementById("list-wrapper");

  if (btnSplit && btnGrid) {
    btnSplit.addEventListener("click", () => {
      state.viewMode = "split";
      btnSplit.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm flex items-center gap-1.5";
      btnGrid.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center gap-1.5";
      
      mapContainer.classList.remove("hidden");
      mapContainer.classList.add("block");
      listContainer.className = "w-full lg:w-3/5 xl:w-7/12 overflow-y-auto px-4 py-2";
      
      setTimeout(() => {
        if (mapInstance) mapInstance.invalidateSize();
      }, 200);
    });

    btnGrid.addEventListener("click", () => {
      state.viewMode = "grid";
      btnGrid.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm flex items-center gap-1.5";
      btnSplit.className = "px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center gap-1.5";

      mapContainer.classList.add("hidden");
      mapContainer.classList.remove("block");
      listContainer.className = "w-full max-w-7xl mx-auto px-4 py-2";
    });
  }
}

// Bắt sự kiện các bộ lọc & sắp xếp
function initSearchAndFilters() {
  const tabSale = document.getElementById("tab-sale");
  const tabRent = document.getElementById("tab-rent");
  const tabAll = document.getElementById("tab-all");

  const categoryTabs = [
    { el: tabAll, value: "all" },
    { el: tabSale, value: "sale" },
    { el: tabRent, value: "rent" }
  ];

  categoryTabs.forEach(t => {
    if (!t.el) return;
    t.el.addEventListener("click", () => {
      categoryTabs.forEach(item => {
        if (item.el) {
          item.el.className = "pb-2.5 px-1 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-all border-b-2 border-transparent flex items-center gap-2 whitespace-nowrap";
        }
      });
      t.el.className = "pb-2.5 px-1 text-xs sm:text-sm font-bold text-blue-600 border-b-2 border-blue-600 transition-all flex items-center gap-2 whitespace-nowrap";
      state.category = t.value;
      applyFilters();
    });
  });

  // Tìm kiếm từ khóa & Gợi ý Tra Cứu Live Auto-suggest
  const keywordInput = document.getElementById("search-keyword");
  const suggestionsDropdown = document.getElementById("search-suggestions-dropdown");
  const btnClearKeyword = document.getElementById("btn-clear-keyword");

  if (keywordInput) {
    keywordInput.addEventListener("input", (e) => {
      const val = e.target.value;
      state.keyword = val.toLowerCase().trim();

      if (btnClearKeyword) {
        if (val.trim() !== "") {
          btnClearKeyword.classList.remove("hidden");
        } else {
          btnClearKeyword.classList.add("hidden");
        }
      }

      applyFilters();
      if (suggestionsDropdown) {
        renderLiveSuggestions(state.keyword, suggestionsDropdown);
      }
    });

    if (btnClearKeyword) {
      btnClearKeyword.addEventListener("click", () => {
        keywordInput.value = "";
        state.keyword = "";
        btnClearKeyword.classList.add("hidden");
        if (suggestionsDropdown) suggestionsDropdown.classList.add("hidden");
        applyFilters();
      });
    }

    // Đóng dropdown gợi ý khi click ra ngoài
    document.addEventListener("click", (e) => {
      if (suggestionsDropdown && !keywordInput.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
        suggestionsDropdown.classList.add("hidden");
      }
    });

    // Mở lại gợi ý khi focus ô tìm kiếm
    keywordInput.addEventListener("focus", () => {
      if (suggestionsDropdown && state.keyword) {
        renderLiveSuggestions(state.keyword, suggestionsDropdown);
      }
    });
  }

  // Tỉnh / Thành phố
  const selectCity = document.getElementById("select-city");
  if (selectCity) {
    selectCity.addEventListener("change", (e) => {
      state.city = e.target.value;
      const cityObj = CITIES.find(c => c.id === state.city);
      if (cityObj && mapInstance) {
        mapInstance.setView(cityObj.center, cityObj.zoom);
      }
      applyFilters();
    });
  }

  // Khoảng giá
  const selectPrice = document.getElementById("select-price");
  if (selectPrice) {
    selectPrice.addEventListener("change", (e) => {
      state.priceRange = e.target.value;
      applyFilters();
    });
  }

  // Diện tích
  const selectArea = document.getElementById("select-area");
  if (selectArea) {
    selectArea.addEventListener("change", (e) => {
      state.areaRange = e.target.value;
      applyFilters();
    });
  }

  // Sắp xếp (Sorting)
  const selectSort = document.getElementById("select-sort");
  if (selectSort) {
    selectSort.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      applyFilters();
    });
  }

  // Nút lọc nhanh "Tin đã lưu"
  const btnFavFilter = document.getElementById("btn-filter-favorites");
  if (btnFavFilter) {
    btnFavFilter.addEventListener("click", () => {
      state.onlyFavorites = !state.onlyFavorites;
      updateFavFilterButtonUI();
      applyFilters();
    });
  }

  // Nút xóa bộ lọc
  const btnReset = document.getElementById("btn-reset-filter");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      state.category = "all";
      state.type = "all";
      state.city = "all";
      state.priceRange = "all";
      state.areaRange = "all";
      state.keyword = "";
      state.sortBy = "default";
      state.onlyFavorites = false;
      if (keywordInput) keywordInput.value = "";
      if (selectCity) selectCity.value = "all";
      if (selectPrice) selectPrice.value = "all";
      if (selectArea) selectArea.value = "all";
      if (selectSort) selectSort.value = "default";
      updateFavFilterButtonUI();
      initTypeButtons();
      applyFilters();
      showToast("Đã khôi phục tất cả bộ lọc mặc định", "info");
    });
  }
}

function updateFavFilterButtonUI() {
  const btnFavFilter = document.getElementById("btn-filter-favorites");
  if (!btnFavFilter) return;
  if (state.onlyFavorites) {
    btnFavFilter.className = "px-3 py-1.5 rounded-xl border border-rose-500 bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-rose-500/20";
    const countSpan = document.getElementById("quick-fav-count");
    if (countSpan) countSpan.className = "px-1.5 py-0.2 rounded-full bg-white text-rose-600 text-[10px] font-extrabold";
  } else {
    btnFavFilter.className = "px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-rose-400 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-all shadow-2xs";
    const countSpan = document.getElementById("quick-fav-count");
    if (countSpan) countSpan.className = "px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-600 text-[10px] font-extrabold";
  }
}

// Render gợi ý tra cứu tức thì khi người dùng gõ
function renderLiveSuggestions(query, container) {
  if (!query || query.length < 1) {
    container.classList.add("hidden");
    container.innerHTML = "";
    return;
  }

  const matches = REAL_ESTATE_DATA.filter(item => {
    return (
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.address && item.address.toLowerCase().includes(query)) ||
      (item.district && item.district.toLowerCase().includes(query)) ||
      (item.project && item.project.toLowerCase().includes(query)) ||
      (item.typeName && item.typeName.toLowerCase().includes(query))
    );
  }).slice(0, 5);

  if (matches.length === 0) {
    container.innerHTML = `
      <div class="p-4 text-center text-xs text-slate-500">
        <i class="fa-solid fa-magnifying-glass text-slate-400 mb-1"></i>
        <p>Không có kết quả khớp với "<strong>${query}</strong>"</p>
      </div>
    `;
    container.classList.remove("hidden");
    return;
  }

  container.innerHTML = `
    <div class="px-3.5 py-2 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase flex items-center justify-between">
      <span>Gợi ý tra cứu (${matches.length})</span>
      <span class="text-[10px] text-blue-600 font-semibold">Nhấn để xem</span>
    </div>
    ${matches.map(item => `
      <div 
        class="suggestion-item p-3 hover:bg-blue-50/70 transition-colors cursor-pointer flex items-center gap-3 border-b border-slate-100 last:border-none"
        onclick="window.showDetailModal(${item.id}); document.getElementById('search-suggestions-dropdown').classList.add('hidden');">
        <img src="${item.images[0]}" alt="${item.title}" class="w-14 h-11 object-cover rounded-xl flex-shrink-0" />
        <div class="flex-1 min-w-0">
          <div class="text-xs font-bold text-slate-900 truncate">${item.title}</div>
          <div class="text-[11px] text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
            <span class="font-extrabold text-blue-600">${item.price}</span>
            <span>•</span>
            <span>${item.area} m²</span>
            <span>•</span>
            <span class="truncate">${item.district}</span>
          </div>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400 group-hover:text-blue-600 flex-shrink-0"></i>
      </div>
    `).join("")}
  `;
  container.classList.remove("hidden");
}

// Bộ lọc & sắp xếp chính
function applyFilters() {
  state.favorites = JSON.parse(localStorage.getItem("bds_favorites") || "[]");

  let filtered = REAL_ESTATE_DATA.filter(item => {
    // 0. Lọc Tin đã lưu nếu đang bật
    if (state.onlyFavorites && !state.favorites.includes(item.id)) {
      return false;
    }

    // 1. Lọc Danh mục (Bán / Thuê)
    if (state.category !== "all" && item.category !== state.category) {
      return false;
    }

    // 2. Lọc Loại hình
    if (state.type !== "all" && item.type !== state.type) {
      return false;
    }

    // 3. Lọc Thành phố
    if (state.city !== "all" && item.city !== state.city) {
      return false;
    }

    // 4. Lọc Khoảng giá
    if (state.priceRange !== "all") {
      if (state.priceRange === "under2" && item.priceValue >= 2000) return false;
      if (state.priceRange === "2to5" && (item.priceValue < 2000 || item.priceValue > 5000)) return false;
      if (state.priceRange === "5to10" && (item.priceValue < 5000 || item.priceValue > 10000)) return false;
      if (state.priceRange === "over10" && item.priceValue <= 10000) return false;
    }

    // 5. Lọc Diện tích
    if (state.areaRange !== "all") {
      if (state.areaRange === "under50" && item.area >= 50) return false;
      if (state.areaRange === "50to100" && (item.area < 50 || item.area > 100)) return false;
      if (state.areaRange === "100to200" && (item.area < 100 || item.area > 200)) return false;
      if (state.areaRange === "over200" && item.area <= 200) return false;
    }

    // 6. Lọc Từ khóa
    if (state.keyword) {
      const matchTitle = item.title.toLowerCase().includes(state.keyword);
      const matchAddress = item.address.toLowerCase().includes(state.keyword);
      const matchDistrict = item.district.toLowerCase().includes(state.keyword);
      if (!matchTitle && !matchAddress && !matchDistrict) return false;
    }

    return true;
  });

  // 7. Sắp xếp kết quả
  if (state.sortBy === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.priceValue - b.priceValue);
  } else if (state.sortBy === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.priceValue - a.priceValue);
  } else if (state.sortBy === "area-desc") {
    filtered = [...filtered].sort((a, b) => b.area - a.area);
  }

  // Cập nhật số lượng đếm
  const resultCountEl = document.getElementById("result-count");
  if (resultCountEl) {
    resultCountEl.textContent = `${filtered.length} Bất động sản phù hợp`;
  }
  const quickFavCount = document.getElementById("quick-fav-count");
  if (quickFavCount) {
    quickFavCount.textContent = state.favorites.length;
  }

  // Render thẻ danh sách
  renderPropertyList(filtered);

  // Cập nhật các điểm ghim trên bản đồ Leaflet
  updateMapMarkers(filtered);
}

// Render danh sách thẻ BĐS
function renderPropertyList(properties) {
  const container = document.getElementById("property-list-grid");
  if (!container) return;

  if (properties.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          <i class="fa-solid fa-house-chimney-crack"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800 mb-1">Không tìm thấy bất động sản phù hợp</h3>
        <p class="text-sm text-slate-500 max-w-md mx-auto mb-6">Thử nới lỏng các tiêu chí lọc như mức giá, diện tích hoặc tắt chế độ chỉ xem Tin đã lưu.</p>
        <button onclick="document.getElementById('btn-reset-filter').click()" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-blue-500/20">
          Xem tất cả bất động sản
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = properties.map((prop, idx) => {
    const isFav = state.favorites.includes(prop.id);
    const isCompared = state.compareList.includes(prop.id);
    return `
      <div 
        id="card-${prop.id}"
        style="animation-delay: ${idx * 65}ms"
        onmouseenter="window.highlightMarker(${prop.id})" 
        onmouseleave="window.unhighlightMarker(${prop.id})"
        class="property-card bg-white rounded-2xl border border-slate-200/80 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
        
        <!-- Hình ảnh & Tag -->
        <div class="relative h-52 w-full img-zoom-container bg-slate-100 cursor-pointer" onclick="window.showDetailModal(${prop.id})">
          <img src="${prop.images[0]}" alt="${prop.title}" class="w-full h-full object-cover" loading="lazy" />
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

          <!-- Badges góc trên -->
          <div class="absolute top-3 left-3 flex items-center gap-1.5">
            <span class="px-3 py-1 rounded-full text-[11px] font-extrabold text-white tracking-wide shadow-md ${prop.badgeColor || 'bg-blue-600'}">
              ${prop.badge}
            </span>
            <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/50 text-white backdrop-blur-md">
              ${prop.typeName}
            </span>
          </div>

          <!-- Cụm nút So sánh & Yêu thích góc trên phải -->
          <div class="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button 
              onclick="event.stopPropagation(); window.toggleCompare(${prop.id})"
              title="Thêm vào bàn cân so sánh"
              class="h-9 px-2.5 rounded-full ${
                isCompared
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600'
              } flex items-center justify-center gap-1 text-[11px] font-bold transition-all shadow-md">
              <i class="fa-solid fa-scale-balanced"></i>
              <span class="hidden sm:inline">${isCompared ? 'Đã chọn' : 'So sánh'}</span>
            </button>

            <button 
              onclick="event.stopPropagation(); window.toggleFavorite(${prop.id})"
              title="Lưu tin yêu thích"
              class="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-500 flex items-center justify-center transition-all shadow-md">
              <i class="${isFav ? 'fa-solid text-rose-500' : 'fa-regular'} fa-heart text-base"></i>
            </button>
          </div>

          <!-- Định vị trên bản đồ nhanh -->
          <button 
            onclick="event.stopPropagation(); window.focusPropertyOnMap(${prop.id})"
            title="Định vị trên bản đồ"
            class="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/60 hover:bg-blue-600 text-white backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition-colors z-10">
            <i class="fa-solid fa-map-location-dot"></i>
            <span>Bản đồ</span>
          </button>

          <!-- Số lượng ảnh -->
          <div class="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-[11px] font-medium backdrop-blur-md flex items-center gap-1">
            <i class="fa-solid fa-camera"></i>
            <span>${prop.images.length} ảnh</span>
          </div>
        </div>

        <!-- Nội dung thẻ -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <!-- Giá & Đơn giá -->
            <div class="flex items-baseline justify-between mb-2">
              <div class="flex items-baseline gap-2">
                <span class="text-xl font-extrabold text-rose-600 tracking-tight">${prop.price}</span>
                <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">${prop.unitPrice}</span>
              </div>
              <span class="text-[11px] text-slate-400 font-medium">${prop.postedAt || 'Hôm nay'}</span>
            </div>

            <!-- Tiêu đề -->
            <h3 
              onclick="window.showDetailModal(${prop.id})"
              class="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mb-3 cursor-pointer group-hover:text-blue-600 transition-colors">
              ${prop.title}
            </h3>

            <!-- Thông số cơ bản (Diện tích, PN, WC, Hướng) -->
            <div class="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl mb-3 text-xs text-slate-700">
              <div class="flex items-center gap-1.5">
                <i class="fa-solid fa-ruler-combined text-blue-500"></i>
                <span class="font-bold">${prop.area} m²</span>
              </div>
              <div class="flex items-center gap-1.5">
                <i class="fa-solid fa-bed text-blue-500"></i>
                <span>${prop.bedrooms > 0 ? prop.bedrooms + ' PN' : 'Mặt bằng'}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <i class="fa-solid fa-compass text-blue-500"></i>
                <span class="truncate">${prop.direction}</span>
              </div>
            </div>

            <!-- Địa chỉ -->
            <div class="flex items-start gap-1.5 text-xs text-slate-500 mb-4">
              <i class="fa-solid fa-location-dot text-rose-500 mt-0.5 flex-shrink-0"></i>
              <span class="truncate">${prop.address}</span>
            </div>
          </div>

          <!-- Thông tin Môi giới & Nút Gọi -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img src="${prop.agent.avatar}" alt="${prop.agent.name}" class="w-8 h-8 rounded-full object-cover border border-slate-200" />
              <div>
                <div class="text-xs font-bold text-slate-800 leading-tight">${prop.agent.name}</div>
                <div class="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Đang trực tuyến</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-1.5">
              <a 
                href="tel:${prop.agent.phone.replace(/\s+/g, '')}"
                class="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1 transition-colors">
                <i class="fa-solid fa-phone"></i>
                <span class="hidden sm:inline">${prop.agent.phone}</span>
              </a>
              <a 
                href="property-detail.html?id=${prop.id}"
                title="Mở trang chi tiết"
                class="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-xs">
                <span>Chi tiết</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Bật/tắt yêu thích (Favorites)
window.toggleFavorite = function(id) {
  const idx = state.favorites.indexOf(id);
  if (idx > -1) {
    state.favorites.splice(idx, 1);
    showToast("Đã xóa khỏi danh sách Tin đã lưu", "info");
  } else {
    state.favorites.push(id);
    showToast("Đã lưu vào danh sách BĐS yêu thích!", "success");
  }
  localStorage.setItem("bds_favorites", JSON.stringify(state.favorites));
  if (typeof window.updateNavbarSavedBadge === "function") {
    window.updateNavbarSavedBadge();
  }
  applyFilters();
};

// ================= TÍNH NĂNG SO SÁNH BẤT ĐỘNG SẢN (COMPARE) =================
function ensureCompareUI() {
  if (!document.getElementById("compare-floating-bar")) {
    const barHtml = `
      <div id="compare-floating-bar" class="fixed bottom-16 lg:bottom-5 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 hidden items-center gap-4 max-w-2xl w-[94%] sm:w-auto">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-xs">
            <i class="fa-solid fa-scale-balanced"></i>
          </div>
          <div>
            <div class="text-xs font-extrabold">So sánh BĐS (<span id="compare-count-text">0</span>/3)</div>
            <div class="text-[10px] text-slate-400 hidden sm:block">Chọn tối đa 3 căn để đối chiếu</div>
          </div>
        </div>

        <div id="compare-bar-thumbs" class="flex items-center gap-2"></div>

        <div class="flex items-center gap-2 ml-auto">
          <button onclick="window.clearCompareList()" class="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold">
            Thu gọn
          </button>
          <button onclick="window.openCompareModal()" class="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/30">
            So sánh ngay
          </button>
        </div>
      </div>

      <!-- Modal Bảng So Sánh BĐS -->
      <div id="compare-modal" class="fixed inset-0 z-[1200] bg-black/75 backdrop-blur-xs hidden items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-8 relative animate-fadeIn">
          <div class="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                <i class="fa-solid fa-scale-balanced"></i>
              </div>
              <div>
                <h2 class="text-lg sm:text-xl font-black text-slate-900">Bàn Cân So Sánh Bất Động Sản</h2>
                <p class="text-xs text-slate-500">Đối chiếu trực quan giá bán, đơn giá/m², pháp lý và tiện ích</p>
              </div>
            </div>
            <button onclick="window.closeCompareModal()" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div id="compare-modal-body" class="overflow-x-auto"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", barHtml);
  }
}

window.toggleCompare = function(id) {
  const idx = state.compareList.indexOf(id);
  if (idx > -1) {
    state.compareList.splice(idx, 1);
    showToast("Đã bỏ khỏi danh sách so sánh", "info");
  } else {
    if (state.compareList.length >= 3) {
      showToast("Chỉ có thể so sánh tối đa 3 bất động sản cùng lúc!", "info");
      return;
    }
    state.compareList.push(id);
    showToast("Đã thêm vào bàn cân so sánh!", "success");
  }
  localStorage.setItem("bds_compare", JSON.stringify(state.compareList));
  renderCompareBar();
  applyFilters();
};

window.clearCompareList = function() {
  state.compareList = [];
  localStorage.setItem("bds_compare", "[]");
  renderCompareBar();
  applyFilters();
};

function renderCompareBar() {
  const bar = document.getElementById("compare-floating-bar");
  const countText = document.getElementById("compare-count-text");
  const thumbs = document.getElementById("compare-bar-thumbs");
  if (!bar || !countText || !thumbs) return;

  if (state.compareList.length === 0) {
    bar.classList.add("hidden");
    bar.classList.remove("flex");
    return;
  }

  bar.classList.remove("hidden");
  bar.classList.add("flex");
  countText.textContent = state.compareList.length;

  const items = state.compareList.map(id => REAL_ESTATE_DATA.find(p => p.id === id)).filter(Boolean);
  thumbs.innerHTML = items.map(p => `
    <div class="relative group">
      <img src="${p.images[0]}" title="${p.title}" class="w-10 h-10 rounded-xl object-cover border border-slate-600" />
      <button onclick="window.toggleCompare(${p.id})" class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join("");
}

window.openCompareModal = function() {
  const modal = document.getElementById("compare-modal");
  const body = document.getElementById("compare-modal-body");
  if (!modal || !body) return;

  const items = state.compareList.map(id => REAL_ESTATE_DATA.find(p => p.id === id)).filter(Boolean);
  if (items.length === 0) return;

  body.innerHTML = `
    <table class="w-full text-left border-collapse min-w-[640px]">
      <thead>
        <tr class="border-b border-slate-200">
          <th class="p-3 w-40 text-xs font-extrabold text-slate-400 uppercase">Tiêu chí</th>
          ${items.map(p => `
            <th class="p-3 align-top w-64">
              <div class="relative h-36 rounded-2xl overflow-hidden mb-2.5">
                <img src="${p.images[0]}" class="w-full h-full object-cover" />
                <span class="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${p.badgeColor || 'bg-blue-600'}">${p.badge}</span>
              </div>
              <a href="property-detail.html?id=${p.id}" class="text-xs font-extrabold text-slate-900 hover:text-blue-600 line-clamp-2 leading-snug">${p.title}</a>
            </th>
          `).join("")}
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 text-xs">
        <tr class="bg-rose-50/40">
          <td class="p-3 font-bold text-slate-600">Mức giá</td>
          ${items.map(p => `<td class="p-3 font-black text-base text-rose-600">${p.price} <span class="text-xs font-semibold text-slate-500">(${p.unitPrice})</span></td>`).join("")}
        </tr>
        <tr>
          <td class="p-3 font-bold text-slate-600">Loại hình</td>
          ${items.map(p => `<td class="p-3 font-semibold text-slate-800">${p.typeName}</td>`).join("")}
        </tr>
        <tr class="bg-slate-50/60">
          <td class="p-3 font-bold text-slate-600">Diện tích</td>
          ${items.map(p => `<td class="p-3 font-bold text-blue-600">${p.area} m²</td>`).join("")}
        </tr>
        <tr>
          <td class="p-3 font-bold text-slate-600">Phòng ngủ / WC</td>
          ${items.map(p => `<td class="p-3 text-slate-700">${p.bedrooms} PN • ${p.bathrooms} WC</td>`).join("")}
        </tr>
        <tr class="bg-slate-50/60">
          <td class="p-3 font-bold text-slate-600">Hướng nhà</td>
          ${items.map(p => `<td class="p-3 text-slate-700">${p.direction}</td>`).join("")}
        </tr>
        <tr>
          <td class="p-3 font-bold text-slate-600">Pháp lý</td>
          ${items.map(p => `<td class="p-3 font-semibold text-emerald-700"><i class="fa-solid fa-shield-check mr-1"></i>${p.legal}</td>`).join("")}
        </tr>
        <tr class="bg-slate-50/60">
          <td class="p-3 font-bold text-slate-600">Nội thất</td>
          ${items.map(p => `<td class="p-3 text-slate-700">${p.furniture}</td>`).join("")}
        </tr>
        <tr>
          <td class="p-3 font-bold text-slate-600">Vị trí</td>
          ${items.map(p => `<td class="p-3 text-slate-600">${p.address}</td>`).join("")}
        </tr>
        <tr>
          <td class="p-3 font-bold text-slate-600">Hành động</td>
          ${items.map(p => `
            <td class="p-3">
              <a href="property-detail.html?id=${p.id}" class="inline-block w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center">
                Xem chi tiết &rarr;
              </a>
            </td>
          `).join("")}
        </tr>
      </tbody>
    </table>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

window.closeCompareModal = function() {
  const modal = document.getElementById("compare-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
};

// Hiển thị Modal chi tiết Bất Động Sản
window.showDetailModal = function(id) {
  const prop = REAL_ESTATE_DATA.find(p => p.id === id);
  if (!prop) return;

  const modal = document.getElementById("property-detail-modal");
  const modalContent = document.getElementById("modal-detail-body");
  if (!modal || !modalContent) return;

  const agentRole = prop.agent.role || prop.agent.title || "Chuyên viên tư vấn BĐS";
  const agentZalo = prop.agent.zalo || `https://zalo.me/${prop.agent.phone.replace(/\s+/g, '')}`;

  modalContent.innerHTML = `
    <!-- Tiêu đề & Thông tin cơ bản -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-5 border-b border-slate-100">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="px-3 py-1 rounded-full text-xs font-extrabold text-white ${prop.badgeColor || 'bg-blue-600'}">
            ${prop.badge}
          </span>
          <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Mã tin: BDS-${prop.id.toString().slice(-5).padStart(5, '0')}
          </span>
          <span class="text-xs text-slate-400 font-medium">Đăng ${prop.postedAt || 'Hôm nay'}</span>
        </div>
        <h2 class="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug">${prop.title}</h2>
        <div class="flex items-center gap-2 text-sm text-slate-500 mt-2">
          <i class="fa-solid fa-location-dot text-rose-500"></i>
          <span>${prop.address}</span>
        </div>
      </div>

      <div class="flex md:flex-col items-baseline md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0">
        <div class="text-2xl md:text-3xl font-black text-rose-600">${prop.price}</div>
        <div class="text-sm font-semibold text-slate-500">Đơn giá: <span class="text-slate-800">${prop.unitPrice}</span></div>
        <a href="property-detail.html?id=${prop.id}" class="mt-2 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs">
          <i class="fa-solid fa-expand"></i>
          <span>Mở toàn trang chi tiết</span>
        </a>
      </div>
    </div>

    <!-- Gallery Ảnh -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
      <div class="md:col-span-2 h-72 md:h-96 rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
        <img id="modal-main-img" src="${prop.images[0]}" alt="${prop.title}" class="w-full h-full object-cover" />
      </div>
      <div class="grid grid-cols-3 md:grid-cols-1 gap-3 h-72 md:h-96">
        ${prop.images.slice(1, 4).map((img, i) => `
          <div class="rounded-xl overflow-hidden cursor-pointer h-24 md:h-[120px] bg-slate-100 hover:opacity-85 transition-opacity" onclick="document.getElementById('modal-main-img').src='${img}'">
            <img src="${img}" alt="Ảnh ${i + 2}" class="w-full h-full object-cover" />
          </div>
        `).join("")}
      </div>
    </div>

    <!-- Nội dung 2 cột: Chi tiết bên trái, Form liên hệ bên phải -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100">
          <h3 class="font-extrabold text-slate-800 text-base mb-4 flex items-center gap-2">
            <i class="fa-solid fa-circle-info text-blue-600"></i>
            <span>Đặc điểm bất động sản</span>
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div class="text-xs text-slate-500">Diện tích</div>
              <div class="font-bold text-slate-800">${prop.area} m²</div>
            </div>
            <div>
              <div class="text-xs text-slate-500">Số phòng ngủ</div>
              <div class="font-bold text-slate-800">${prop.bedrooms} Phòng</div>
            </div>
            <div>
              <div class="text-xs text-slate-500">Số phòng tắm</div>
              <div class="font-bold text-slate-800">${prop.bathrooms} Phòng</div>
            </div>
            <div>
              <div class="text-xs text-slate-500">Hướng nhà</div>
              <div class="font-bold text-slate-800">${prop.direction}</div>
            </div>
            <div>
              <div class="text-xs text-slate-500">Pháp lý</div>
              <div class="font-bold text-slate-800">${prop.legal}</div>
            </div>
            <div>
              <div class="text-xs text-slate-500">Nội thất</div>
              <div class="font-bold text-slate-800">${prop.furniture}</div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-extrabold text-slate-800 text-base mb-3 flex items-center gap-2">
            <i class="fa-solid fa-sparkles text-amber-500"></i>
            <span>Tiện ích & Điểm nổi bật</span>
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${prop.features.map(f => `
              <div class="flex items-center gap-2 text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-100 shadow-xs">
                <i class="fa-solid fa-circle-check text-emerald-500 flex-shrink-0"></i>
                <span>${f}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div>
          <h3 class="font-extrabold text-slate-800 text-base mb-3 flex items-center gap-2">
            <i class="fa-solid fa-align-left text-blue-600"></i>
            <span>Mô tả chi tiết</span>
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 rounded-xl border border-slate-100">
            ${prop.description}
          </p>
        </div>
      </div>

      <!-- Cột Môi giới & Form liên hệ tư vấn -->
      <div class="space-y-5">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 rounded-2xl border border-blue-100">
          <div class="flex items-center gap-3.5 mb-4">
            <img src="${prop.agent.avatar}" alt="${prop.agent.name}" class="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
            <div>
              <div class="font-bold text-slate-900 text-base">${prop.agent.name}</div>
              <div class="text-xs text-blue-600 font-semibold">${agentRole}</div>
              <div class="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Phản hồi trong 5 phút</span>
              </div>
            </div>
          </div>

          <div class="space-y-2 mb-5">
            <a 
              href="tel:${prop.agent.phone.replace(/\s+/g, '')}"
              class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all text-sm">
              <i class="fa-solid fa-phone"></i>
              <span>Gọi ngay: ${prop.agent.phone}</span>
            </a>
            <a 
              href="${agentZalo}" target="_blank"
              class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all text-sm">
              <i class="fa-solid fa-comment-dots"></i>
              <span>Chat qua Zalo</span>
            </a>
          </div>

          <div class="pt-4 border-t border-blue-200/60">
            <h4 class="font-bold text-slate-800 text-sm mb-3">Đăng ký xem nhà & Nhận báo giá</h4>
            <form onsubmit="event.preventDefault(); window.submitTourRequest(${prop.id});" class="space-y-3">
              <div>
                <input type="text" id="lead-name" required placeholder="Họ và tên của bạn" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <input type="tel" id="lead-phone" required placeholder="Số điện thoại Zalo" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <textarea rows="2" placeholder="Ghi chú (ví dụ: muốn xem nhà vào cuối tuần...)" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
              </div>
              <button type="submit" class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors">
                Gửi yêu cầu tư vấn
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
};

window.closeDetailModal = function() {
  const modal = document.getElementById("property-detail-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
};

window.submitTourRequest = function(propId) {
  const name = document.getElementById("lead-name")?.value || "Quý khách";
  showToast(`Cảm ơn anh/chị ${name}! Chuyên viên tư vấn sẽ liên hệ lại ngay trong ít phút.`, "success");
  setTimeout(() => {
    closeDetailModal();
  }, 1200);
};

function initModalEvents() {
  const btnPost = document.getElementById("btn-open-post-modal");
  const postModal = document.getElementById("post-property-modal");
  const btnClosePost = document.getElementById("btn-close-post-modal");

  if (btnPost && postModal) {
    btnPost.addEventListener("click", () => {
      postModal.classList.remove("hidden");
      postModal.classList.add("flex");
      document.body.style.overflow = "hidden";
    });
  }

  if (btnClosePost && postModal) {
    btnClosePost.addEventListener("click", () => {
      postModal.classList.add("hidden");
      postModal.classList.remove("flex");
      document.body.style.overflow = "auto";
    });
  }
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const isSuccess = type === "success";
  
  toast.className = `p-4 rounded-xl shadow-xl flex items-center gap-3 transition-all duration-300 transform translate-y-4 opacity-0 text-sm font-semibold text-white ${
    isSuccess ? "bg-emerald-600 shadow-emerald-500/20" : "bg-blue-600 shadow-blue-500/20"
  }`;
  toast.innerHTML = `
    <i class="fa-solid ${isSuccess ? 'fa-circle-check text-lg' : 'fa-circle-info text-lg'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-4");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
