interface ServiceData {
  id: number
  title: string
  highlight: string
  description: string
  image: string
}

export const service: ServiceData[] = [
  {
    id: 0,
    title: "Track your deliveries in",
    highlight: "Real Time",
    description:
      "Our user-friendly platform lets you monitor your package journey in real-time, from pickup to drop-off. Receive instant updates and precise location details, ensuring you know exactly when and where your delivery will arrive.",
    image: "/service/service.png",
  },
  {
    id: 1,
    title: "Deliver your Logistics",
    highlight: "Quickly",
    description:
      "We transform your local delivery experience with our fast bike-based delivery with the convenience of our web app. Our team of couriers ensures quick, reliable service while you manage your orders effortlessly.",
    image: "/service/service2.png",
  },
  {
    id: 2,
    title: "Earn with us as a",
    highlight: "Dispatch Rider",
    description:
      "As a dispatch rider, you’ll enjoy flexible working hours, competitive pay, and the satisfaction of providing essential delivery services. Start earning with us today!",
    image: "/service/service1.png",
  },
];