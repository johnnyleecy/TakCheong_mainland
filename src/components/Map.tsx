// components/AmapIframe.tsx
export default function AmapIframe() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">關於我們</h1>

      {/* 響應式地圖外殼，aspect‑ratio 16 /9；手機可自動維持比例 */}
      <div className="w-full rounded-lg overflow-hidden shadow-md" style={{ aspectRatio: "6 / 4" }}>
        <iframe
          src="https://ditu.amap.com/ssr/embed/place?id=B0FFGQR0TC&name=%E5%9F%8E%E5%8D%97%E8%A1%97&lng=118.293402&lat=25.316909&address=%E6%B0%B8%E6%98%A5%E5%8E%BF&zoom=16&source=poi_detail&platform=pc"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
