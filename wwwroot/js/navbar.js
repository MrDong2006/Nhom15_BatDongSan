/**
 * BĐS Việt Hub - Luxury Glassmorphism Navigation Bar Component
 * Tự động đồng bộ thanh Menu cao cấp trên tất cả 11 trang của hệ thống:
 * - index.html (Trang chủ)
 * - map-search.html (Bản đồ số)
 * - projects.html (Dự án đô thị)
 * - market-prices.html (Bảng giá thị trường)
 * - loan-calculator.html (Tính lãi vay)
 * - services.html (Dịch vụ BĐS)
 * - reviews.html (Đánh giá)
 * - contact.html (Liên hệ)
 * - post-property.html (Đăng tin ký gửi)
 * - property-detail.html (Chi tiết BĐS)
 * - auth.html (Đăng nhập / Đăng ký / Hồ sơ)
 */

(function () {
  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop().toLowerCase() || "index.html";
    if (page === "" || page === "index" || page === "index.htm") return "index.html";
    return page;
  }

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem("bds_current_user") || "null");
    } catch (e) {
      return null;
    }
  }

  function getFavoritesList() {
    try {
      return JSON.parse(localStorage.getItem("bds_favorites") || "[]");
    } catch (e) {
      return [];
    }
  }

  // Các mục hiển thị trực tiếp trên thanh Dock trung tâm
  const PRIMARY_NAV_ITEMS = [
    {
      id: "index",
      page: "index.html",
      label: "Trang chủ",
      icon: "fa-solid fa-house"
    },
    {
      id: "map-search",
      page: "map-search.html",
      label: "Bản đồ số",
      icon: "fa-solid fa-map-location-dot",
      iconColor: "text-rose-500",
      badge: "LIVE"
    },
    {
      id: "projects",
      page: "projects.html",
      label: "Dự án",
      icon: "fa-solid fa-building"
    },
    {
      id: "market-prices",
      page: "market-prices.html",
      label: "Bảng giá",
      icon: "fa-solid fa-chart-line",
      iconColor: "text-emerald-500"
    },
    {
      id: "loan-calculator",
      page: "loan-calculator.html",
      label: "Tính lãi vay",
      icon: "fa-solid fa-calculator",
      iconColor: "text-indigo-500"
    }
  ];

  // Các mục trong menu khám phá mở rộng (Dropdown "Khám phá thêm")
  const MORE_NAV_ITEMS = [
    {
      id: "services",
      page: "services.html",
      label: "Dịch vụ pháp lý & Ký gửi",
      desc: "Thẩm định giá, sang tên sổ hồng trọn gói",
      icon: "fa-solid fa-handshake",
      iconBg: "bg-blue-50 text-blue-600"
    },
    {
      id: "reviews",
      page: "reviews.html",
      label: "Đánh giá từ khách hàng",
      desc: "Hơn 2,850+ phản hồi thực tế 4.9★",
      icon: "fa-solid fa-star",
      iconBg: "bg-amber-50 text-amber-500"
    },
    {
      id: "contact",
      page: "contact.html",
      label: "Liên hệ & Văn phòng",
      desc: "Hỗ trợ 24/7 tại TP.HCM, Hà Nội, Cần Thơ",
      icon: "fa-solid fa-headset",
      iconBg: "bg-emerald-50 text-emerald-600"
    },
    {
      id: "admin",
      page: "admin.html",
      label: "Quản trị Admin",
      desc: "Bảng điều khiển quản lý BĐS, lịch hẹn & người dùng",
      icon: "fa-solid fa-gauge-high",
      iconBg: "bg-amber-50 text-amber-600"
    }
  ];

  function buildFullHeaderHtml(currentPage) {
    const user = getCurrentUser();
    const favCount = getFavoritesList().length;
    const isAuthPage = currentPage === "auth.html";
    const isMoreActive = MORE_NAV_ITEMS.some(item => item.page === currentPage);

    const authButtonHtml = user
      ? `
        <a href="auth.html" id="nav-auth-btn" title="Quản lý tài khoản: ${user.name}" class="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border ${
          isAuthPage ? 'border-blue-600 bg-blue-50/90 text-blue-700' : 'border-slate-200/90 bg-white hover:border-blue-300 text-slate-800'
        } text-xs font-bold transition-all shadow-2xs hover:shadow-sm">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80'}" class="w-7 h-7 rounded-full object-cover ring-2 ring-blue-500/30" />
          <span class="hidden xl:inline max-w-[96px] truncate">${user.name.split(" ").slice(-2).join(" ")}</span>
        </a>
      `
      : `
        <a href="auth.html" id="nav-auth-btn" class="flex items-center gap-2 px-3.5 py-2 rounded-full border ${
          isAuthPage
            ? 'border-blue-600 bg-blue-50 text-blue-700 font-extrabold'
            : 'border-slate-200/90 bg-white hover:border-blue-400 hover:text-blue-600 text-slate-700 font-bold'
        } text-xs transition-all shadow-2xs">
          <i class="fa-regular fa-circle-user text-sm text-blue-600"></i>
          <span class="hidden sm:inline">Đăng nhập</span>
        </a>
      `;

    return `
      <header id="main-header" class="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 transition-all duration-300 flex-shrink-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="flex items-center justify-between h-[70px] gap-3">
            
            <!-- 1. LOGO THƯƠNG HIỆU -->
            <a href="index.html" class="flex items-center gap-2.5 group flex-shrink-0">
              <div class="logo-badge-3d relative w-11 h-11 rounded-2xl overflow-hidden border border-amber-200/70 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-all bg-white p-0.5 flex-shrink-0">
                <img src="images/logo.jpg" alt="Minh Vương Home Luxury" class="w-full h-full object-cover rounded-xl" />
                <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse"></span>
              </div>
              <div>
                <div class="text-base sm:text-lg font-black tracking-tight text-slate-900 flex items-center gap-1 leading-none">
                  <span class="bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-600 bg-clip-text text-transparent font-extrabold">MINH VƯƠNG</span>
                  <span class="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-300/70 font-black uppercase ml-0.5">LUXURY</span>
                </div>
                <div class="text-[9.5px] text-slate-500 font-bold tracking-wider uppercase mt-1">Home Luxury & Bản Đồ Số</div>
              </div>
            </a>

            <!-- 2. DOCK MENU TRUNG TÂM (FLOATING SEGMENTED PILL) -->
            <nav class="hidden lg:flex items-center bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 shadow-inner gap-1" id="desktop-nav-links">
              ${PRIMARY_NAV_ITEMS.map(item => {
                const isActive = (currentPage === item.page) || (item.id === "index" && (currentPage === "" || currentPage === "index.html"));
                const activeClass = isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-md shadow-blue-600/25"
                  : "text-slate-600 hover:text-blue-600 hover:bg-white font-semibold";
                return `
                  <a href="${item.page}" data-nav="${item.id}" class="nav-link px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1.5 whitespace-nowrap ${activeClass}">
                    <i class="${item.icon} ${isActive ? 'text-white' : (item.iconColor || 'text-slate-400')} text-xs"></i>
                    <span>${item.label}</span>
                    ${item.badge ? `<span class="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-2xs flex items-center gap-1"><span class="live-radar-dot"></span>${item.badge}</span>` : ''}
                  </a>
                `;
              }).join("")}

              <!-- Dropdown Khám phá thêm -->
              <div class="relative group">
                <button type="button" class="nav-link px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1.5 whitespace-nowrap ${
                  isMoreActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-md shadow-blue-600/25'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-white font-semibold'
                }">
                  <span>Khám phá</span>
                  <i class="fa-solid fa-chevron-down text-[10px] opacity-75 group-hover:rotate-180 transition-transform duration-300"></i>
                </button>

                <!-- Mega Dropdown Menu -->
                <div class="absolute right-0 top-full pt-2.5 w-72 hidden group-hover:block z-50 animate-fadeIn">
                  <div class="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 space-y-1">
                    <div class="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Dịch vụ & Hỗ trợ</div>
                    ${MORE_NAV_ITEMS.map(sub => {
                      const subActive = currentPage === sub.page;
                      return `
                        <a href="${sub.page}" class="flex items-start gap-3 p-2.5 rounded-xl transition-all hover:translate-x-1 ${
                          subActive ? 'bg-blue-50/80 text-blue-600' : 'hover:bg-slate-50 text-slate-700'
                        }">
                          <div class="w-9 h-9 rounded-xl ${sub.iconBg} flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                            <i class="${sub.icon}"></i>
                          </div>
                          <div>
                            <div class="text-xs font-extrabold text-slate-900">${sub.label}</div>
                            <div class="text-[11px] text-slate-400 leading-snug mt-0.5">${sub.desc}</div>
                          </div>
                        </a>
                      `;
                    }).join("")}
                    <div class="pt-2 mt-1 border-t border-slate-100 px-3 py-2 flex items-center justify-between bg-slate-50/70 rounded-xl text-xs">
                      <span class="text-slate-500 font-medium">Tổng đài CSKH:</span>
                      <a href="tel:19006868" class="font-extrabold text-rose-600 hover:underline"><i class="fa-solid fa-phone-volume mr-1"></i>1900 6868</a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <!-- 3. CỤM NÚT HÀNH ĐỘNG BÊN PHẢI -->
            <div class="flex items-center gap-2 flex-shrink-0">
              
              <!-- Nút Tin đã lưu (Yêu thích) -->
              <button type="button" id="nav-saved-btn" onclick="window.openSavedPropertiesModal()" title="Danh sách BĐS đã lưu" class="relative h-9 px-3 rounded-full border border-slate-200/90 bg-white hover:border-rose-300 hover:bg-rose-50/40 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs hover:-translate-y-0.5">
                <i class="fa-solid fa-heart text-rose-500 text-xs"></i>
                <span class="hidden xl:inline text-slate-600">Đã lưu</span>
                <span id="nav-fav-badge" class="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  favCount > 0 ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600'
                }">${favCount}</span>
              </button>

              <!-- Nút Đăng nhập / Tài khoản -->
              ${authButtonHtml}

              <!-- Nút CTA Đăng tin ký gửi có hiệu ứng quét tia sáng (btn-shimmer) -->
              <a href="post-property.html" data-nav="post-property" class="btn-shimmer px-4 py-2 rounded-full text-xs font-extrabold ${
                currentPage === 'post-property.html'
                  ? 'bg-slate-900 text-white ring-2 ring-blue-400 shadow-lg'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/40 hover:-translate-y-0.5'
              } transition-all flex items-center gap-1.5">
                <i class="fa-solid fa-plus-circle"></i>
                <span>Đăng tin</span>
              </a>

              <!-- Nút Hamburger trên Mobile/Tablet -->
              <button id="mobile-menu-btn" type="button" aria-label="Mở menu" class="lg:hidden w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors">
                <i id="mobile-menu-icon" class="fa-solid fa-bars text-sm"></i>
              </button>
            </div>

          </div>
        </div>

        <!-- MENU DROPDOWN TRÊN MOBILE / TABLET -->
        <div id="mobile-menu-dropdown" class="hidden lg:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-1.5 shadow-2xl">
          <div class="grid grid-cols-2 gap-1.5 pb-2">
            ${[...PRIMARY_NAV_ITEMS, ...MORE_NAV_ITEMS].map(item => {
              const isActive = currentPage === item.page;
              return `
                <a href="${item.page}" class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }">
                  <i class="${item.icon} ${isActive ? 'text-white' : (item.iconColor || 'text-blue-600')} w-4 text-center"></i>
                  <span class="truncate">${item.label}</span>
                </a>
              `;
            }).join("")}
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <a href="auth.html" class="text-blue-600 flex items-center gap-1.5 hover:underline">
              <i class="fa-solid fa-user-circle"></i>
              <span>${user ? `Tài khoản: ${user.name}` : 'Đăng nhập / Đăng ký thành viên'}</span>
            </a>
            <a href="tel:19006868" class="text-rose-600 flex items-center gap-1.5 hover:underline">
              <i class="fa-solid fa-phone"></i> 1900 6868
            </a>
          </div>
        </div>
      </header>
    `;
  }

  function initNavbar() {
    const currentPage = getCurrentPage();
    const existingHeader = document.getElementById("main-header");
    const dynamicContainer = document.getElementById("app-navbar");

    // Thay thế đồng bộ toàn bộ Header cũ trên mọi trang bằng thiết kế mới
    if (existingHeader) {
      existingHeader.outerHTML = buildFullHeaderHtml(currentPage);
    } else if (dynamicContainer) {
      dynamicContainer.innerHTML = buildFullHeaderHtml(currentPage);
    }

    setupMobileMenu();
    renderMobileBottomNav(currentPage);
    setupScrollEffect();
    ensureStandardFooter();
    ensureSavedPropertiesModal();
  }

  function setupMobileMenu() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const menuDropdown = document.getElementById("mobile-menu-dropdown");
    const menuIcon = document.getElementById("mobile-menu-icon");

    if (!menuBtn || !menuDropdown) return;
    if (menuBtn.dataset.hasListener === "true") return;
    menuBtn.dataset.hasListener = "true";

    function toggleMenu(show) {
      const isOpen = show !== undefined ? show : menuDropdown.classList.contains("hidden");
      if (isOpen) {
        menuDropdown.classList.remove("hidden");
        if (menuIcon) {
          menuIcon.classList.remove("fa-bars");
          menuIcon.classList.add("fa-xmark");
        }
      } else {
        menuDropdown.classList.add("hidden");
        if (menuIcon) {
          menuIcon.classList.remove("fa-xmark");
          menuIcon.classList.add("fa-bars");
        }
      }
    }

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    menuDropdown.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    document.addEventListener("click", (e) => {
      if (!menuDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  function renderMobileBottomNav(currentPage) {
    let bottomNav = document.getElementById("mobile-bottom-nav");
    if (!bottomNav) {
      bottomNav = document.createElement("nav");
      bottomNav.id = "mobile-bottom-nav";
      bottomNav.className = "lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1 px-1 flex items-center justify-around shadow-2xl transition-all";
      document.body.appendChild(bottomNav);
    }

    const bottomItems = [
      { page: "index.html", label: "Trang chủ", icon: "fa-solid fa-house" },
      { page: "map-search.html", label: "Bản đồ", icon: "fa-solid fa-map-location-dot" },
      { page: "post-property.html", label: "Đăng tin", icon: "fa-solid fa-circle-plus", isCta: true },
      { page: "market-prices.html", label: "Bảng giá", icon: "fa-solid fa-chart-line" },
      { page: "auth.html", label: "Tài khoản", icon: "fa-solid fa-user" }
    ];

    bottomNav.innerHTML = bottomItems.map(item => {
      const isActive = (currentPage === item.page) || (item.page === "index.html" && (currentPage === "" || currentPage === "index.html"));
      if (item.isCta) {
        return `
          <a href="${item.page}" class="flex flex-col items-center justify-center flex-1 py-0.5 text-center group">
            <div class="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs shadow-md shadow-blue-600/30">
              <i class="${item.icon}"></i>
            </div>
            <span class="text-[9px] font-bold mt-0.5 text-blue-600">${item.label}</span>
          </a>
        `;
      }
      return `
        <a href="${item.page}" class="flex flex-col items-center justify-center flex-1 py-0.5 text-center transition-colors ${isActive ? 'text-blue-600 font-extrabold' : 'text-slate-500 hover:text-blue-600'}">
          <i class="${item.icon} text-sm mb-0.5"></i>
          <span class="text-[9px]">${item.label}</span>
        </a>
      `;
    }).join("");

    if (currentPage !== "map-search.html") {
      document.body.classList.add("pb-14", "lg:pb-0");
    }
  }

  function setupScrollEffect() {
    const header = document.getElementById("main-header");
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 12) {
        header.classList.add("shadow-lg", "shadow-slate-900/5", "bg-white/95");
      } else {
        header.classList.remove("shadow-lg", "shadow-slate-900/5", "bg-white/95");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Modal / Drawer hiển thị danh sách BĐS đã thả tim (Yêu thích) trên mọi trang
  function ensureSavedPropertiesModal() {
    if (document.getElementById("saved-properties-modal")) return;

    const modalHtml = `
      <div id="saved-properties-modal" class="fixed inset-0 z-[1200] bg-black/60 backdrop-blur-xs hidden justify-end">
        <div class="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-fadeIn">
          <div class="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <i class="fa-solid fa-heart"></i>
              </div>
              <div>
                <h3 class="font-extrabold text-slate-900 text-sm">Bất Động Sản Đã Lưu</h3>
                <p class="text-[11px] text-slate-500">Danh sách nhà đất bạn đang quan tâm</p>
              </div>
            </div>
            <button onclick="window.closeSavedPropertiesModal()" class="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div id="saved-properties-body" class="flex-1 overflow-y-auto p-4 space-y-3"></div>

          <div class="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2">
            <button onclick="window.clearAllSavedProperties()" class="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-bold transition-colors">
              Xóa tất cả
            </button>
            <a href="index.html" onclick="window.closeSavedPropertiesModal()" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors">
              Khám phá thêm BĐS &rarr;
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
  }

  window.updateNavbarSavedBadge = function () {
    const favCount = getFavoritesList().length;
    const badge = document.getElementById("nav-fav-badge");
    if (badge) {
      badge.textContent = favCount;
      badge.className = `px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
        favCount > 0 ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-600"
      }`;
    }
    const quickFavCount = document.getElementById("quick-fav-count");
    if (quickFavCount) {
      quickFavCount.textContent = favCount;
    }
  };

  window.openSavedPropertiesModal = function () {
    ensureSavedPropertiesModal();
    const modal = document.getElementById("saved-properties-modal");
    const body = document.getElementById("saved-properties-body");
    if (!modal || !body) return;

    const favIds = getFavoritesList();
    const allProps = typeof REAL_ESTATE_DATA !== "undefined" ? REAL_ESTATE_DATA : [];
    const savedProps = allProps.filter(p => favIds.includes(p.id));

    if (savedProps.length === 0) {
      body.innerHTML = `
        <div class="text-center py-16 px-4">
          <div class="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-3 text-2xl">
            <i class="fa-regular fa-heart"></i>
          </div>
          <div class="font-bold text-slate-800 text-sm mb-1">Chưa có bất động sản nào được lưu</div>
          <p class="text-xs text-slate-500">Nhấn vào biểu tượng trái tim trên bất kỳ thẻ nhà đất nào để lưu lại xem sau.</p>
        </div>
      `;
    } else {
      body.innerHTML = savedProps.map(p => `
        <div class="p-3 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white shadow-2xs flex gap-3 items-center transition-all">
          <img src="${p.images[0]}" class="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="text-rose-600 font-extrabold text-xs">${p.price} <span class="text-slate-400 font-normal">• ${p.area} m²</span></div>
            <a href="property-detail.html?id=${p.id}" class="font-bold text-slate-900 hover:text-blue-600 text-xs line-clamp-2 leading-snug mt-0.5">${p.title}</a>
            <div class="text-[11px] text-slate-400 truncate mt-1"><i class="fa-solid fa-location-dot text-rose-500 mr-1"></i>${p.district}</div>
          </div>
          <button onclick="window.removeSavedFromModal(${p.id})" title="Bỏ lưu" class="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 flex items-center justify-center flex-shrink-0">
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </div>
      `).join("");
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };

  window.closeSavedPropertiesModal = function () {
    const modal = document.getElementById("saved-properties-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  window.removeSavedFromModal = function (id) {
    if (typeof window.toggleFavorite === "function") {
      window.toggleFavorite(id);
    } else {
      const favs = getFavoritesList().filter(item => item !== id);
      localStorage.setItem("bds_favorites", JSON.stringify(favs));
    }
    window.updateNavbarSavedBadge();
    window.openSavedPropertiesModal();
  };

  window.clearAllSavedProperties = function () {
    localStorage.setItem("bds_favorites", "[]");
    if (typeof state !== "undefined" && state.favorites) {
      state.favorites = [];
      if (typeof applyFilters === "function") applyFilters();
    }
    window.updateNavbarSavedBadge();
    window.openSavedPropertiesModal();
  };

  function ensureStandardFooter() {
    const currentPage = getCurrentPage();
    if (currentPage === "map-search.html") return;

    let footer = document.querySelector("footer");
    if (!footer) {
      const footerHtml = `
  <footer class="bg-slate-900 text-slate-400 text-sm mt-auto pt-14 pb-8 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div class="space-y-4">
          <div class="flex items-center gap-2.5 text-white font-black text-lg">
            <img src="images/logo.jpg" alt="Minh Vương Home Luxury" class="w-9 h-9 rounded-xl object-cover border border-amber-400/40 shadow-sm" />
            <span>MINH VƯƠNG <span class="text-amber-400">HOME LUXURY</span></span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed">
            Hệ sinh thái công nghệ bất động sản cao cấp Minh Vương Home Luxury. Cung cấp giải pháp tìm kiếm bất động sản thông minh với bản đồ số và thẩm định giá.
          </p>
        </div>
        <div>
          <h4 class="text-white font-bold text-sm mb-4">Các trang chức năng</h4>
          <ul class="space-y-2 text-xs">
            <li><a href="index.html" class="hover:text-white transition-colors">Trang chủ sàn giao dịch</a></li>
            <li><a href="map-search.html" class="hover:text-white transition-colors">Bản đồ tìm kiếm toàn màn hình</a></li>
            <li><a href="projects.html" class="hover:text-white transition-colors">Dự án bất động sản đô thị</a></li>
            <li><a href="market-prices.html" class="hover:text-white transition-colors">Bảng giá nhà đất 3 miền</a></li>
            <li><a href="loan-calculator.html" class="hover:text-white transition-colors">Công cụ tính lãi vay mua nhà</a></li>
            <li><a href="post-property.html" class="hover:text-white transition-colors">Đăng tin ký gửi nhà đất</a></li>
            <li><a href="auth.html" class="hover:text-white transition-colors">Đăng nhập & Quản lý tài khoản</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-bold text-sm mb-4">Hỗ trợ & Pháp lý</h4>
          <ul class="space-y-2 text-xs">
            <li><a href="services.html" class="hover:text-white transition-colors">Dịch vụ pháp lý & Sang tên</a></li>
            <li><a href="reviews.html" class="hover:text-white transition-colors">Đánh giá từ khách hàng</a></li>
            <li><a href="contact.html" class="hover:text-white transition-colors">Liên hệ & Hỗ trợ 24/7</a></li>
          </ul>
        </div>
        <div class="space-y-3">
          <h4 class="text-white font-bold text-sm mb-4">Liên hệ chăm sóc</h4>
          <div class="text-xs">
            <div class="text-slate-400">Hotline tư vấn 24/7:</div>
            <div class="text-white font-extrabold text-base text-rose-500">1900 6868</div>
          </div>
          <div class="text-xs">
            <div class="text-slate-400">Chi nhánh Cần Thơ & Miền Tây:</div>
            <div class="text-slate-300">Ninh Kiều, TP. Cần Thơ (10°02'02.8"N 105°47'15.0"E)</div>
          </div>
        </div>
      </div>
    </div>
  </footer>
      `;
      const toastOrModal = document.getElementById("toast-container") || 
                           document.getElementById("property-detail-modal") || 
                           document.getElementById("project-lead-modal");
      if (toastOrModal && toastOrModal.parentNode) {
        toastOrModal.insertAdjacentHTML("beforebegin", footerHtml);
      } else {
        document.body.insertAdjacentHTML("beforeend", footerHtml);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavbar);
  } else {
    initNavbar();
  }

  window.BdsNavbar = {
    init: initNavbar,
    getCurrentPage: getCurrentPage
  };
})();
