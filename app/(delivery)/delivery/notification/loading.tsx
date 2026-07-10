// Streamed skeleton while the Notification page loads.
export default function NotificationLoading() {
  return (
    <div className="flex flex-col gap-4 p-8 animate-pulse w-full min-h-screen">
      <div className="h-8 w-48 bg-[#E8E8E8] rounded-full" />
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-16 w-full bg-[#F4F4F4] rounded-2xl" />
      ))}
    </div>
  );
}