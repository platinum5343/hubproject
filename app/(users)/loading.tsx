// Shown by Next.js while the landing page hydrates.
// Mirrors the real section heights so there's no layout shift.

export default function HomeLoading() {
  return (
    <div className="w-full animate-pulse">
      {/* Hero skeleton */}
      <div className="w-full h-[90vh] bg-[#F0F0F0]" />

      {/* Logistics skeleton */}
      <div className="py-16 px-8 lg:px-20 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-6 w-1/3 bg-[#E8E8E8] rounded-full" />
          <div className="h-10 w-2/3 bg-[#E8E8E8] rounded-full" />
          <div className="h-4 w-full bg-[#E8E8E8] rounded-full" />
          <div className="h-4 w-5/6 bg-[#E8E8E8] rounded-full" />
        </div>
        <div className="flex-1 h-[20rem] bg-[#E8E8E8] rounded-2xl" />
      </div>

      {/* Services skeleton */}
      <div className="py-10 px-8 lg:px-20 flex flex-col items-center gap-8">
        <div className="h-8 w-1/4 bg-[#E8E8E8] rounded-full" />
        <div className="flex gap-6 w-full overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 w-[16rem] h-[14rem] bg-[#E8E8E8] rounded-2xl" />
          ))}
        </div>
      </div>

      {/* OurJob skeleton */}
      <div className="py-16 px-8 lg:px-20">
        <div className="h-8 w-1/3 bg-[#E8E8E8] rounded-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[12rem] bg-[#E8E8E8] rounded-2xl" />
          ))}
        </div>
      </div>

      {/* FAQ skeleton */}
      <div className="py-10 px-8 lg:px-20 flex flex-col gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 bg-[#E8E8E8] rounded-xl" />
        ))}
      </div>
    </div>
  );
}