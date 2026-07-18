import Link from 'next/link';
import React from 'react'
import DispatchHub from './faq/DispatchHub';
import DeliveryOrder from './faq/DeliveryOrder';
import ItemsType from './faq/ItemsType';
import DeliveryTime from './faq/DeliveryTime';
import DispatchHubCourier from './faq/DispatchHubCourier';

const Faq = () => {
  return (
    <div className="py-[3.5rem] lg:py-[6rem] px-8 lg:px-[5rem] w-full">
      <div className="flex flex-col lg:flex-row md:gap-[3rem] lg:gap-[4.75rem] gap-8 w-full justify-between">
        <div className="md:max-w-[26rem] md:py-8 md:px-6 flex flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-2">
            <h1 className="unageo-bold text-[2rem] md:text-[2.5rem] leading-[2.5rem] md:leading-[3rem]">
              Frequently Asked Question About Us
            </h1>
            <p className="unageo-regular text-[1rem] md:text-[1.25rem] leading-[1.5rem] md:leading-[2rem]">
              If you can’t find the answer you are looking for, reach out to us.{" "}
            </p>
          </div>
          <Link
            href="/contact-us"
            className="py-[0.75rem] md:py-4 px-6 md:px-8 rounded-[2rem] unageo-regular text-[1rem] font-medium leading-[1.125rem] md:leading-[1.5rem] w-full md:w-auto button"
          >
            Send A Direct Message
          </Link>
        </div>
        <div className="flex w-full lg:w-[48rem] flex-col items-start md:gap-4">
          <DispatchHub />
          <DeliveryOrder />
          <ItemsType />
          <DeliveryTime />
          <DispatchHubCourier />
        </div>
      </div>
    </div>
  );
}

export default Faq