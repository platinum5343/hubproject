interface Props {
  message?: string;
}

export default function MapLoading({ message = "Loading map…" }: Props) {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-[#f9f5ed] rounded-lg gap-3">
      {/* Animated dots */}
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 bg-[#FE581C] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 bg-[#FE581C] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 bg-[#FE581C] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}