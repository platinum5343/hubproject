"use client";
export const dynamic = "force-dynamic";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { openSidebar } from "../store/sidebarSlice";
import AuthGuard from "../components/AuthGuard";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationItem {
  id: string | number;
  status: string;
  from: string;
  to: string;
  date: string;
  time: string;
  read?: boolean;
}

// ── Empty state ───────────────────────────────────────────────────────────────
const EmptyNotifications = () => (
  <div className="flex flex-col items-center justify-center w-full py-24 gap-4">
    <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center">
      <Image
        src="/delivery/icons/notification.png"
        alt="empty"
        width={28}
        height={28}
        className="w-7 h-7 opacity-30"
      />
    </div>
    <div className="flex flex-col items-center gap-1 text-center">
      <h3 className="unageo-regular text-[1rem] font-semibold text-[#333]">
        All clear! No updates right now
      </h3>
      <p className="unageo-regular text-[0.875rem] text-[#A5A5A5] max-w-[18rem]">
        Once there&apos;s activity on your delivery it will appear here.
      </p>
    </div>
  </div>
);

const Notification = () => {
  const dispatch = useAppDispatch();
  const isExpanded = useAppSelector((state) => state.sidebar.expanded);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setNotifications(data);
        }
      } catch {
        // API not connected yet — empty state shows
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <AuthGuard>
      <div
        className={`md:bg-[#FAFAFA] inline-flex md:pr-8 items-center w-full transition-all duration-500 ease-in-out ${
          isExpanded ? "md:pl-[16rem]" : "md:pl-20"
        }`}
      >
        <div className="flex w-full flex-col items-start gap-4 mx-8 mt-[3.5rem] mb-[0.81rem]">
          {/* Header */}
          <div className="w-full flex md:justify-between items-center gap-2">
            <Image
              onClick={() => dispatch(openSidebar())}
              src="/delivery/icons/arrow-square-left.png"
              alt="back"
              className="w-6 h-6 md:hidden cursor-pointer"
              width={24}
              height={24}
            />
            <h2 className="unageo-regular text-[1.25rem] md:text-[2rem] font-semibold leading-8 md:leading-10">
              Notification
            </h2>
            <div className="md:flex hidden px-2 items-center gap-6">
              <Image
                src="/delivery/icons/notification.png"
                alt="notification"
                width={30}
                height={30}
                className="h-[1.9rem] w-[1.9rem]"
              />
              <Image
                src="/delivery/icons/profile.png"
                alt="profile"
                width={30}
                height={30}
                className="h-[1.9rem] w-[1.9rem] rounded-full"
              />
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col items-start md:items-center gap-4 md:pl-[2.56rem] md:pr-[0.94rem] md:pt-[0.56rem] md:bg-white md:rounded-[1.25rem] w-full">
            {loading ? (
              <div className="flex items-center justify-center w-full py-16 gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-[#FE581C] rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <EmptyNotifications />
            ) : (
              <AnimatePresence>
                {notifications.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex flex-col lg:flex-row w-full p-[0.625rem] justify-between items-start lg:items-end gap-1 rounded-[1.25rem] border-b border-b-[#F0F0F0] ${
                      !item.read ? "bg-[#FFF8F6]" : ""
                    }`}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        <Image
                          src="/delivery/icons/package.png"
                          className="w-[1.0625rem] h-[1.0625rem]"
                          alt="package"
                          width={17}
                          height={17}
                        />
                        <h3 className="unageo-regular text-[0.875rem] md:text-[1.25rem] font-medium leading-5 md:leading-8">
                          {item.status}
                        </h3>
                        {!item.read && (
                          <div className="w-2 h-2 rounded-full bg-[#FE581C] ml-1" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src="/delivery/icons/location.png"
                          className="w-3 h-3"
                          alt="location"
                          width={12}
                          height={12}
                        />
                        <div className="flex items-center gap-1 leading-5 text-[0.75rem] unageo-regular">
                          <p>from</p>
                          <p className="font-semibold">{item.from}</p>
                          <p>to</p>
                          <p className="font-semibold">{item.to}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-1 unageo-regular text-[0.75rem] font-normal md:font-medium leading-5 lg:items-end text-[#A5A5A5]">
                      <p>{item.date}</p>
                      <p>{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Notification;