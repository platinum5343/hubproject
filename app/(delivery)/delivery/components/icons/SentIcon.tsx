import Image from "next/image";

const SentIcon = () => {
  return (
    <div className="flex p-[0.375rem] items-center justify-center rounded-full bg-[#FFCBB9]/90">
      <Image alt="icon" src={"/icons/sent.png"} height={16} width={16} />
    </div>
  );
};

export default SentIcon;
