import Link from 'next/link';
import React from 'react'

const FooterLinks = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href={"/terms-and-conditions"}
        className="text-[0.875rem] md:text-[1.125rem] font-medium unageo-regular leading-[1.25rem] md:leading-[1.75rem] text-white whitespace-nowrap"
      >
        Terms & Conditions
      </Link>
      <Link
        href={"/privacy"}
        className="text-[0.875rem] md:text-[1.125rem] font-medium unageo-regular leading-[1.25rem] md:leading-[1.75rem] text-white"
      >
        Privacy
      </Link>
      <Link
        href={"/cookies"}
        className="text-[0.875rem] md:text-[1.125rem] font-medium unageo-regular leading-[1.25rem] md:leading-[1.75rem] text-white"
      >
        Cookies
      </Link>
      <Link
        href={"/security"}
        className="text-[0.875rem] md:text-[1.125rem] font-medium unageo-regular leading-[1.25rem] md:leading-[1.75rem] text-white"
      >
        Security
      </Link>
    </div>
  );
}

export default FooterLinks