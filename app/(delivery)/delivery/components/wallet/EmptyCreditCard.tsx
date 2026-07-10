import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const EmptyCreditCard = () => {
  return (
    <div className="w-full lg:h-[24rem] lg:rounded-[1.25rem] lg:bg-white lg:shadow-md flex justify-center items-center lg:p-6 unageo-regular">
      <div className="flex w-[14.5rem] flex-col items-center gap-[0.875rem]">
        <Image
          src={"/delivery/wallet/empty-card.svg"}
          alt="empty-card"
          width={231}
          height={193}
          className="w-[6rem] lg:w-[14.4rem] h-[5rem] lg:h-[12rem]"
        />
        <h3 className="text-[#808080] text-[1rem] md:text-[1.25rem] font-semibold leading-[1.25rem] md:leading-[1.75rem]">
          You have no saved card
        </h3>
        <Link
          href={"/delivery/wallet/add-new-card"}
          className="flex w-[9.5rem] h-[3rem] py-[0.75rem] px-[1.5rem] items-center justify-center rounded-[1.5rem] bg-[#FE581C] text-white text-[0.75rem] leading-[1.13rem] hover:bg-[#f54708] transition-colors duration-500 ease-in-out"
        >
          Add new card
        </Link>
      </div>
    </div>
  );
}

export default EmptyCreditCard