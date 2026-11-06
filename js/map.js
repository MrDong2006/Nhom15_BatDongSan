/**
 * Quản lý Bản đồ tương tác Leaflet
 * - Khởi tạo bản đồ với giao diện hiện đại (CartoDB Voyager)
 * - Hiển thị các điểm ghim giá tiền BĐS tùy biến (Price Pill Markers)
 * - Tương tác 2 chiều: rê chuột vào thẻ danh sách thì bản đồ highlight ghim tương ứng và ngược lại
 */

let mapInstance = null;
let currentMarkers = {};
let markerClusterGroup = null;

// Khởi tạo bản đồ
function initLeafletMap(containerId = "property-map", defaultCenter = [10.0341, 105.7875], defaultZoom = 15) {
  if (mapInstance) {
    mapInstance.remove();
  }

  // Khởi tạo Leaflet Map
  mapInstance = L.map(containerId, {
    zoomControl: false,
    scrollWheelZoom: true,
    attributionControl: false
  }).setView(defaultCenter, defaultZoom);

  // Thêm bộ điều khiển phóng to / thu nhỏ ở góc phải dưới
  L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);

  // Lớp bản đồ Google Maps sắc nét chuẩn vị trí Việt Nam
  L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: 'Google Maps'
  }).addTo(mapInstance);

  return mapInstance;
}

// Cập nhật các điểm ghim BĐS trên bản đồ
function updateMapMarkers(properties) {
  if (!mapInstance) return;

  // Xóa các marker cũ
  Object.values(currentMarkers).forEach(m => mapInstance.removeLayer(m));
  currentMarkers = {};

  if (!properties || properties.length === 0) return;

  const latLngs = [];

  properties.forEach(prop => {
    if (!prop.lat || !prop.lng) return;

    latLngs.push([prop.lat, prop.lng]);

    // HTML tùy biến cho ghim giá tiền
    const markerHtml = `
      <div class="custom-price-marker" id="marker-${prop.id}">
        <div class="price-pill">
          <i class="fa-solid fa-tag text-[10px] opacity-75"></i>
          <span>${prop.price}</span>
        </div>
        <div class="price-pill-tail"></div>
      </div>
    `;

    const customIcon = L.divIcon({
      html: markerHtml,
      className: '',
      iconSize: [80, 36],
      iconAnchor: [40, 36],
      popupAnchor: [0, -38]
    });

    // Nội dung Popup chi tiết khi click vào ghim
    const popupContent = `
      <div class="w-64 bg-white rounded-2xl overflow-hidden font-sans">
        <div class="relative h-32 w-full overflow-hidden">
          <img src="${prop.images[0]}" alt="${prop.title}" class="w-full h-full object-cover" />
          <span class="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white ${prop.badgeColor || 'bg-blue-600'}">
            ${prop.badge || 'HOT'}
          </span>
          <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
            ${prop.typeName}
          </span>
        </div>
        <div class="p-3">
          <div class="text-rose-600 font-extrabold text-base mb-1">${prop.price} <span class="text-xs text-slate-500 font-normal">(${prop.unitPrice})</span></div>
          <h4 class="font-bold text-slate-900 text-xs line-clamp-2 mb-2 leading-snug">${prop.title}</h4>
          <div class="flex items-center gap-3 text-slate-500 text-xs mb-3 pb-2 border-b border-slate-100">
            <span><i class="fa-solid fa-ruler-combined text-blue-500 mr-1"></i>${prop.area} m²</span>
            <span><i class="fa-solid fa-bed text-blue-500 mr-1"></i>${prop.bedrooms} PN</span>
            <span><i class="fa-solid fa-bath text-blue-500 mr-1"></i>${prop.bathrooms} WC</span>
          </div>
          <div class="text-[11px] text-slate-500 flex items-center gap-1 mb-3 truncate">
            <i class="fa-solid fa-location-dot text-rose-500 flex-shrink-0"></i>
            <span class="truncate">${prop.district}, ${prop.city === 'cantho' ? 'TP. Cần Thơ' : prop.city === 'hcm' ? 'TP.HCM' : prop.city === 'hn' ? 'Hà Nội' : 'Đà Nẵng'}</span>
          </div>
          <button onclick="window.showDetailModal(${prop.id})" class="w-full py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
            <span>Xem chi tiết</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>
      </div>
    `;

    const marker = L.marker([prop.lat, prop.lng], { icon: customIcon })
      .bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-leaflet-popup'
      })
      .addTo(mapInstance);

    currentMarkers[prop.id] = marker;
  });

  // Tự động căn chỉnh bản đồ ôm trọn các điểm ghim
  if (latLngs.length > 0) {
    mapInstance.fitBounds(latLngs, { padding: [40, 40], maxZoom: 14 });
  }
}

// Highlight điểm ghim khi hover thẻ bên danh mục
function highlightMarker(id) {
  const markerEl = document.getElementById(`marker-${id}`);
  if (markerEl) {
    markerEl.classList.add('marker-highlight');
  }
}

// Bỏ highlight điểm ghim
function unhighlightMarker(id) {
  const markerEl = document.getElementById(`marker-${id}`);
  if (markerEl) {
    markerEl.classList.remove('marker-highlight');
  }
}

// Pan tới điểm và mở popup khi click từ danh mục
function focusPropertyOnMap(id) {
  const marker = currentMarkers[id];
  if (marker && mapInstance) {
    const latLng = marker.getLatLng();
    mapInstance.setView(latLng, 14, { animate: true, duration: 0.6 });
    marker.openPopup();
    highlightMarker(id);
  }
}
