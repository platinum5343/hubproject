import Image from "next/image";
import Link from "next/link";
import { socials } from "../../utils/socials";

const Socials = () => {
  return (
    <div className="flex items-center md:gap-3 gap-2">
      {socials.map(({ name, href, icon: Icon, icon2: Icon2, image }) => (
        <Link
          key={name}
          href={href}
          target="_blank"
          aria-label={name}
          className="group bg-white flex items-center justify-center
                     w-7 h-7 md:w-9 md:h-9
                     p-2 md:p-3 rounded-full relative"
        >
          {/* Default icon */}
          <span className="group-hover:opacity-0 transition-opacity duration-200">
            <Icon />
          </span>
          <span
            className="absolute opacity-0 group-hover:opacity-100
                       transition-opacity duration-200"
          >
            <Icon2 />
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
