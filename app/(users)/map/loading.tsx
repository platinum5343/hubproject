// Shown while the tracking page verifies the tracking ID and loads the map.

export default function MapLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white gap-6 animate-pulse px-4">
      {/* Logo skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-7 bg-[#E8E8E8] rounded" />
        <div className="w-32 h-6 bg-[#E8E8E8] rounded-full" />
      </div>

      {/* Card skeleton */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#F0F0F0] shadow-sm p-8 flex flex-col gap-5">
        {/* Icon */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-[#E8E8E8] rounded-full" />
          <div className="h-5 w-2/3 bg-[#E8E8E8] rounded-full" />
          <div className="h-4 w-1/2 bg-[#E8E8E8] rounded-full" />
        </div>
        {/* Input */}
        <div className="h-12 bg-[#E8E8E8] rounded-full" />
        {/* Button */}
        <div className="h-12 bg-[#FE581C]/20 rounded-full" />
      </div>
    </div>
  );
}