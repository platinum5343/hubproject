"use client";

import ServicesHeader from "./ServicesHeader";
import ServicesCarousel from "./ServicesCarousel";

const Services = () => {
  return (
    <section className="px-4 md:px-8 lg:px-[10.3rem] py-[3.5rem] lg:py-10 flex flex-col items-center gap-12">
      <ServicesHeader />
      <ServicesCarousel />
    </section>
  );
};

export default Services;
