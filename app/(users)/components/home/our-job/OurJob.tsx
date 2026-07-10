"use client";

import { ourJob } from "@/app/(users)/utils/OurJob";
import JobCard from "./JobCard";

const OurJob = () => {
  return (
    <section className="py-[3.5rem] lg:py-[5rem] px-8 lg:px-[5rem]">
      <div className="flex flex-col items-start md:items-center gap-10">
        {/* Header */}
        <div className="flex flex-col items-start md:items-center gap-2 md:max-w-[69rem]">
          <h1 className="text-[2rem] md:text-[2.75rem] lg:text-[3.75rem] unageo-bold leading-tight text-center">
            Where We Come In
          </h1>
          <p className="unageo-regular text-[1.125rem] md:text-[1.5rem] leading-relaxed md:text-center">
            Our local dispatch services are designed to meet the unique needs of
            businesses and individuals across Nigeria with efficiency and
            professionalism.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem]">
          {ourJob.map((item) => (
            <JobCard
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurJob;
