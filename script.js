document.addEventListener("DOMContentLoaded", () => {
  // 지도 중심: 가톨릭대학교
  const center = [37.48670, 126.8026];
  const map = L.map('map').setView(center, 17);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // 제보 폼 링크 (본인 구글폼 URL로 교체)
  const FORM_BASE_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc8iHqmDumIS5oWi2uzhL5lp1qeAjSmGQUdE_BiRDZgVZ6UbA/viewform?usp=dialog&entry.1234567890=";

  // 식당 정보
  const restaurants = [
    { name: "나의유부", lat: 37.48566, lng: 126.8064, menu: "유부초밥, 우동" },
    { name: "손칼국시", lat: 37.48547, lng: 126.8060, menu: "얼큰닭칼국수" },
    { name: "메밀꽃", lat: 37.48575, lng: 126.8046, menu: "순두부, 덮밥" },
    { name: "새우식탁", lat: 37.48646, lng: 126.8046, menu: "감바스, 파스타, 새우요리" },
    { name: "더53", lat: 37.48473, lng: 126.8088, menu: "53불고기, 제육" }
  ];

  // 혼잡도 기본값
  const defaultLevels = { 
    "나의유부":"low",
    "손칼국시":"mid",
    "메밀꽃":"mid",
    "새우식탁":"low",
    "더53":"mid"
  };

  // 혼잡도 색상
  function levelToColor(lv){
    if(lv==="low") return "#8fd7bf";
    if(lv==="mid") return "#ffb74d";
    return "#ff7b7b";
  }

  // 마커 생성
  restaurants.forEach(r => {
    const level = defaultLevels[r.name] || "mid";
    const color = levelToColor(level);

    const marker = L.circleMarker([r.lat, r.lng], { 
      radius:9, fillColor:color, color:"#fff", weight:2, fillOpacity:0.95 
    }).addTo(map);

    const reportUrl = FORM_BASE_URL + "?restaurant=" + encodeURIComponent(r.name);
    const qrUrl = "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=" + encodeURIComponent(reportUrl);

    const popupHtml = `
      <div class="popup-card">
        <div class="popup-title">${r.name}</div>
        <div class="popup-meta">${r.menu}</div>
        <div class="popup-actions">
          <a class="btn-report" href="${reportUrl}" target="_blank" rel="noopener">제보하기</a>
          <div class="qr-wrap">
            <img src="${qrUrl}" alt="QR for ${r.name}" width="72" height="72" style="border-radius:8px;border:1px solid #eee"/>
          </div>
        </div>
      </div>`;

    marker.bindPopup(popupHtml,{minWidth:200});
  });
});
