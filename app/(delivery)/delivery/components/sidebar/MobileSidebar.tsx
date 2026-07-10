import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeSidebar } from '../../store/sidebarSlice';
import { bottomItems, menuItems } from '../../utils/menuItems';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileSidebar = () => {
  const dispatch = useAppDispatch();
    const pathname = usePathname();
  const mobileSidebar = useAppSelector((state) => state.sidebar.mobileSidebar);

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
    <AnimatePresence>
      {mobileSidebar && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => dispatch(closeSidebar())}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
          />

          {/* Mobile Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden h-full px-[1.2rem] flex flex-col justify-center items-center delivery-sidebar bg-white fixed z-50 w-[80%] max-w-[300px]"
          >
            <div className="flex flex-col justify-center gap-3 w-full h-full my-24">
              {/* Logo/Avatar Section */}
              <div className="flex items-start justify-between">
                <div className="flex p-2 items-center gap-2">
                  <Image
                    src={"/delivery/avatar.svg"}
                    width={32}
                    height={32}
                    alt="avatar"
                    className="w-8 h-8"
                  />
                  <p className="unageo-regular text-[0.875rem] font-medium leading-[1.25rem]">
                    Theophilus Confidence
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full h-full justify-between items-start">
                {/* First section */}
                <div className="flex flex-col items-start gap-2 w-full">
                  {menuItems.map((item) => (
                    <div key={item.id} className="w-full flex">
                      <Link href={item.href} className="w-full">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => dispatch(closeSidebar())}
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
                            <span className="unageo-regular text-[0.875rem] font-medium leading-[1.25rem] whitespace-nowrap">
                              {item.label}
                            </span>
                          </div>
                        </motion.div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col w-full justify-center items-start gap-2">
                  {bottomItems
                    .filter((item) => !item.desktopOnly)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="w-full flex flex-col justify-center items-start gap-4 rounded-4xl"
                      >
                        <Link href={item.href} className="w-full">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => dispatch(closeSidebar())}
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
                            <p className="unageo-regular text-[0.875rem] font-medium leading-[1.25rem] whitespace-nowrap">
                              {item.label}
                            </p>
                          </motion.div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileSidebar