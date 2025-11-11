document.addEventListener("DOMContentLoaded", () => {
  const center = [37.487244, 126.824556];
  const map = L.map('map').setView(center, 17);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  const FORM_BASE_URL = "https://docs.google.com/forms/d/e/REPLACE_WITH_YOUR_FORM/viewform";
  const restaurants = [
    { name: "나의유부", lat: 37.487900, lng: 126.824900, menu: "유부초밥, 분식류", addr: "부천시 OO로 XX" },
    { name: "칼국시", lat: 37.487600, lng: 126.824200, menu: "손칼국수, 만두", addr: "부천시 OO로 XX" },
    { name: "메밀꽃", lat: 37.487861, lng: 126.825092, menu: "메밀국수, 냉모밀, 돈까스", addr: "부천시 지봉로43번길 6" },
    { name: "새우식탁", lat: 37.487400, lng: 126.825000, menu: "새우요리 전문", addr: "부천시 OO로 XX" },
    { name: "더오삼", lat: 37.487200, lng: 126.824600, menu: "오삼불고기, 반찬류", addr: "부천시 OO로 XX" }
  ];
  const defaultLevels = { "나의유부":"low","칼국시":"mid","메밀꽃":"mid","새우식탁":"low","더오삼":"mid" };
  function levelToColor(lv){ if(lv==="low")return"#8fd7bf"; if(lv==="mid")return"#ffb74d"; return"#ff7b7b"; }
  restaurants.forEach(r => {
    const level = defaultLevels[r.name] || "mid";
    const color = levelToColor(level);
    const marker = L.circleMarker([r.lat, r.lng], { radius:9, fillColor:color, color:"#fff", weight:2, fillOpacity:0.95 }).addTo(map);
    const reportUrl = FORM_BASE_URL + "?restaurant=" + encodeURIComponent(r.name);
    const qrUrl = "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" + encodeURIComponent(reportUrl);
    const popupHtml = `<div class="popup-card"><div class="popup-title">${r.name}</div><div class="popup-meta">${r.menu}<br/><small>${r.addr}</small></div><div class="popup-actions"><a class="btn-report" href="${reportUrl}" target="_blank" rel="noopener">제보하기</a><div class="qr-wrap"><img src="${qrUrl}" alt="QR for ${r.name}" width="72" height="72" style="border-radius:8px;border:1px solid #eee"/></div></div></div>`;
    marker.bindPopup(popupHtml,{minWidth:200});
  });
});