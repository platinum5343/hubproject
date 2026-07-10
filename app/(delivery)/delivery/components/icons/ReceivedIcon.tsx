import Image from "next/image";

const ReceivedIcon = () => {
  return (
    <div className="flex p-[0.375rem] items-center justify-center rounded-full bg-[#C8E4C9]/90">
      <Image alt="icon" src={"/icons/received.png"} height={16} width={16} />
    </div>
  );
};

export default ReceivedIcon;
