// Shown while the delivery dashboard loads after auth check.

export default function DeliveryLoading() {
  return (
    <div className="flex h-screen w-full animate-pulse">
      {/* Sidebar skeleton */}
      <div className="hidden md:flex flex-col w-20 h-full bg-white border-r border-[#F0F0F0] items-center py-8 gap-6">
        <div className="w-10 h-10 bg-[#E8E8E8] rounded-xl" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-8 h-8 bg-[#E8E8E8] rounded-lg" />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-[#FAFAFA]">
        {/* Header */}
        <div className="hidden md:flex justify-between items-center px-8 py-4">
          <div className="flex flex-col gap-2">
            <div className="h-7 w-64 bg-[#E8E8E8] rounded-full" />
            <div className="h-4 w-48 bg-[#E8E8E8] rounded-full" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-[#E8E8E8] rounded-full" />
            <div className="w-12 h-12 bg-[#E8E8E8] rounded-full" />
          </div>
        </div>

        {/* Map area */}
        <div className="flex-1 mx-8 mb-8 bg-[#E8E8E8] rounded-2xl" />

        {/* Find Courier button skeleton */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#FE581C]/30 rounded-full" />
      </div>
    </div>
  );
}