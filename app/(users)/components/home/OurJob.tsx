import Image from "next/image";
import { ourJob } from "../../utils/OurJob";

const OurJob = () => {
  return (
    <div className="flex flex-col py-[3.5rem]  lg:py-[5rem] px-8 lg:px-[5rem]">
      <div className="flex flex-col items-start md:items-center gap-8 md:gap-10">
        <div className="flex flex-col items-start md:items-center gap-2 md:max-w-[69rem]">
          <h1 className="text-[2rem] md:text-[2.75rem] lg:text-[3.75rem] unageo-bold leading-[2.5rem] md:leading-[3.5rem] lg:leading-[4.25rem] text-center">
            Where We Come In
          </h1>
          <p className="unageo-regular text-[1.125rem] md:text-[1.5rem] leading-[1.75rem] md:leading-[2rem] md:text-center">
            Our local dispatch services are designed to meet the unique needs of
            businesses and individuals across Nigeria with efficiency and
            professionalism.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem]">
          {ourJob.map((item) => (
            <div
              key={item.id}
              className="pb-4 flex flex-col items-start rounded-[1rem] bg-[#FDFDFD] job-box gap-6"
            >
              <div className="w-full h-[16rem] lg:h-[20rem] overflow-hidden rounded-t-[1rem]">
                <Image
                  src={item.image}
                  width={384}
                  height={352}
                  alt="job-img"
                  className="w-full h-full object-cover mt-4"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center items-start px-4">
                <h2 className="unageo text-[1.75rem] lg:text-[2rem] leading-[2rem] lg:leading-[2.5rem] font-semibold line-clamp-2">
                  {item.title}
                </h2>
                <p className="unageo-regular text-[0.9rem] lg:text-[1rem] leading-[1.4rem] lg:leading-[1.5rem] line-clamp-3 lg:line-clamp-4">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurJob;
