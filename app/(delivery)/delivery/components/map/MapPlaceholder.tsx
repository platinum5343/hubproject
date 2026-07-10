export default function MapPlaceholder() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center bg-[#f9f5ed] border-2 border-dashed border-gray-300 rounded-lg relative overflow-hidden">
      <div className="text-center p-6 z-10">
        <div className="text-5xl mb-4 text-gray-500">🗺️</div>

        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Map Placeholder
        </h3>

        <p className="text-sm text-gray-500">
          Add your Google Maps API key to <code>.env.local</code>
        </p>

        <code className="block mt-3 px-3 py-2 bg-white/80 rounded text-xs text-gray-700">
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
        </code>
      </div>

      {/* Grid overlay background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #aee0f4 1px, transparent 1px),
            linear-gradient(#aee0f4 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}
