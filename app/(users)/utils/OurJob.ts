export interface OurJobData {
  id: number;
  title: string;
  description: string,
  image: string
}

export const ourJob: OurJobData[] = [
  {
    id: 0,
    title: "Local Delivery",
    description:
      "Need to send a package across town? Our same-day delivery option ensures your parcel gets to its destination within hours.",
    image: "/home/ourjob1.png",
  },
  {
    id: 1,
    title: "Schedule Deliveries",
    description:
      "Plan your deliveries in advance and let us handle the timing. Perfect for businesses needing regular dispatch services.",
    image: "/home/ourjob2.png",
  },
  {
    id: 2,
    title: "Bulk Deliveries",
    description:
      "We manage large-volume shipments with ease, making sure your packages reach their destinations quickly and securely.",
    image: "/home/ourjob3.png",
  },
];
