import React from "react";

const ForCustomers = () => {
  return (
    <div className="flex flex-col items-start gap-[2.8rem] px-6 md:px-20 mb-[2rem] md:mb-[4rem]">
      <div className="h-[0.125rem] w-full bg-[#E8E8E8]"></div>
      <h2 className="text-[#FE581C] unageo-regular text-[2rem] md:text-[3.25rem] font-bold leading-[2.5rem] md:leading-[3.75rem]">
        For DispatchHub Customers
      </h2>
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            1. Receiver/Sender Availability
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            Customers are responsible for confirming the availability of the
            receiver (when sending) or sender (when receiving) before placing a
            delivery order. If the assigned party is unavailable at the time of
            pickup or delivery, additional waiting time or return trip fees may
            apply.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            2. Location Accuracy
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            Customers must provide accurate pickup and delivery addresses. Our
            pricing is based strictly on distance. If the exact location is not
            available on the map, the customer must select or describe a nearby
            mapped location that closely represents the intended address. If our
            rider is required to travel beyond the mapped area to locate the
            address, the customer will bear any extra cost incurred as a result.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            3. Contact Verification
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            Customers must ensure that all phone numbers and contact details
            provided are accurate and reachable. Orders placed with invalid or
            unreachable contact information may be canceled or delayed, and
            DispatchHub will not be held responsible for such outcomes.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            4. Additional Charges
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            Any extra trips, extended waiting times, failed deliveries, or
            remapping efforts will result in additional charges. These charges
            will be automatically calculated and reflected in the app based on
            time and distance. Customers will be notified of any extra charges
            before they are applied, and such fees must be paid before the
            service is completed or at the time of delivery.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            5. Real-Time Tracking
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            Customers have the ability to track their deliveries in real time
            through the DispatchHub app. This provides full visibility of the
            delivery process, including the rider’s location and movement from
            pickup to drop-off.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            6. Liability Disclaimer
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            DispatchHub is not liable for incorrect information provided by the
            customer, including wrong addresses, unreachable contacts, or
            unconfirmed recipient/sender availability. DispatchHub shall not be
            responsible for any loss, delay, or additional cost arising from
            customer negligence or failure to comply with these terms.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            7. Policy Updates
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            DispatchHub reserves the right to update or amend these Terms and
            Conditions at any time. Customers will be notified of significant
            changes through the app or our official communication channels.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            8. Acceptance of Terms
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            By using our service, you confirm that you have read, understood,
            and agreed to abide by these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForCustomers;
