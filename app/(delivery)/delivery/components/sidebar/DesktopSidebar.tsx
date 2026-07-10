import Image from "next/image";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleExpanded } from "../../store/sidebarSlice";
import { bottomItems, menuItems } from "../../utils/menuItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopSidebar = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isExpanded = useAppSelector((state) => state.sidebar.expanded);

  // Helper function to check if a menu item is active
  const isActive = (href: string) => {
    // Exact match for home route
    if (href === "/delivery") {
      return pathname === "/delivery" || pathname === "/delivery/";
    }
    // For other routes, check if pathname starts with the href
    return pathname === href || pathname.startsWith(href + "/");
  };
  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? "auto" : "5rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden md:flex h-full px-[1.350rem] flex-col justify-center items-center py-[4.4rem] delivery-sidebar bg-white fixed"
    >
      <div className="flex flex-col justify-center items-center gap-12 w-full h-full">
        {/* Toggle Arrow Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch(toggleExpanded())}
          className="flex absolute top-[4rem] -right-4 p-2 items-center gap-[0.625rem] rounded-full bg-white circle-left cursor-pointer shadow-md hover:shadow-lg transition-shadow z-10"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={"/delivery/icons/arrow-left.png"}
              alt="toggle"
              className="w-[0.83rem] h-[0.83rem] object-cover"
              width={13}
              height={13}
              priority
              loading="eager"
            />
          </motion.div>
        </motion.div>

        {/* Logo Section */}
        <div className="flex justify-center items-center">
          <motion.div
            animate={{
              width: isExpanded ? "3.2rem" : "2.8rem",
              height: isExpanded ? "2rem" : "2.8rem",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            // w-[2.8rem] h-[2.8rem] gives the container a real size on the
            // first render before framer-motion applies its animated values.
            // Without this, fill images see a 0-height parent and warn.
            className="relative w-[2.8rem] h-[2.8rem]"
          >
            <Image
              src={"/logo.svg"}
              fill
              alt="logo"
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        <motion.div
          animate={{ width: isExpanded ? "11.5rem" : "3rem" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col w-[11.5rem] h-full justify-between items-start"
        >
          {/* First section */}
          <div className="flex flex-col items-start gap-2 w-full">
            {menuItems
              .filter((item) => !item.mobileOnly)
              .map((item) => (
                <div key={item.id} className="w-full flex">
                  <Link href={item.href} className="w-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex flex-col justify-center items-start gap-4 rounded-4xl w-full cursor-pointer transition-colors ${
                        isActive(item.href)
                          ? "bg-[#EDEDED]"
                          : "hover:bg-[#F5F5F5]"
                      }`}
                    >
                      <div className="flex p-[0.625rem] items-center gap-2 w-full">
                        <Image
                          src={item.icon}
                          alt={item.label}
                          className="h-6 w-6 flex-shrink-0"
                          height={24}
                          width={24}
                        />
                        <motion.span
                          initial={false}
                          animate={{
                            opacity: isExpanded ? 1 : 0,
                            x: isExpanded ? 0 : -10,
                          }}
                          transition={{
                            duration: 0.25,
                            ease: [0.4, 0, 0.2, 1],
                            delay: isExpanded ? 0.1 : 0,
                          }}
                          className="unageo-regular text-[0.875rem] font-medium leading-[1.25rem] whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ))}
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col w-full justify-center items-start gap-2">
            {bottomItems
              .filter((item) => !item.mobileOnly)
              .map((item) => (
                <div
                  key={item.id}
                  className="w-full flex flex-col justify-center items-start gap-4 rounded-4xl"
                >
                  <Link href={item.href} className="w-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex p-[0.625rem] items-center gap-2 w-full cursor-pointer rounded-4xl transition-colors ${
                        isActive(item.href)
                          ? "bg-[#EDEDED]"
                          : "hover:bg-[#F5F5F5]"
                      }`}
                    >
                      <Image
                        src={item.icon}
                        alt={item.label}
                        className="h-6 w-6 flex-shrink-0"
                        height={24}
                        width={24}
                      />
                      <motion.p
                        initial={false}
                        animate={{
                          opacity: isExpanded ? 1 : 0,
                          width: isExpanded ? "auto" : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                          opacity: { delay: isExpanded ? 0.15 : 0 },
                        }}
                        className="unageo-regular text-[0.875rem] font-medium leading-[1.25rem] whitespace-nowrap"
                        style={{ overflow: "hidden" }}
                      >
                        {item.label}
                      </motion.p>
                    </motion.div>
                  </Link>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DesktopSidebar;