interface Props {
  onClick: () => void;
}

export default function RecenterButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-5 right-5 bg-white px-4 py-2 rounded shadow-md text-sm font-medium z-10"
    >
      📍 My Location
    </button>
  );
}
