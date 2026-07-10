import React from 'react'

const ForRiders = () => {
  return (
    <div className="flex flex-col items-start gap-[2.8rem] px-6 md:px-20 mb-[4.5rem] md:mb-[12rem]">
      <div className="h-[0.125rem] w-full bg-[#E8E8E8]"></div>
      <h2 className="text-[#FE581C] unageo-regular text-[2rem] md:text-[3.25rem] font-bold leading-[2.5rem] md:leading-[3.75rem]">
        For DispatchHub Riders
      </h2>
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            1. Delivery Conduct and Integrity
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            Riders are expected to carry out deliveries with utmost care and
            professionalism. Riders are fully liable for any loss, theft, or
            damage to the customer’s item(s) while in their possession. Any
            verified misconduct or negligence leading to item damage or theft
            may result in suspension, termination, and potential legal action.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            2. Exclusivity During Active Orders
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            Riders must not accept or perform deliveries outside the DispatchHub
            platform while actively handling a DispatchHub order. Mixing
            third-party or personal deliveries with active Dispatch Hub
            deliveries is strictly prohibited and may lead to permanent removal
            from the platform.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            3. Work Flexibility
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            Riders are free to choose their own work schedule and operate at
            times convenient for them. However, once a delivery is accepted, it
            must be completed promptly and professionally.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            4. Revenue Remittance
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            DispatchHub operates on a revenue-sharing model, where riders retain
            70% of each delivery fee, and 30% is remitted to the company. Riders
            are required to remit DispatchHub’s 30% share after every two
            completed deliveries before being assigned new orders. Failure to
            remit may result in temporary suspension from receiving new orders
            until the outstanding balance is cleared.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            5. Non-Payment and Credit Bureau Reporting
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            Riders who intentionally fail to remit DispatchHub’s share, abandon
            the platform, or default on payments may be reported to the Nigerian
            Credit Bureau. DispatchHub reserves the right to take necessary
            legal steps, including recovering owed amounts directly from the
            rider’s bank account via authorized financial mechanisms.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            6. Policy Compliance and Updates
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            All riders are required to comply with DispatchHub’s code of
            conduct, safety policies, and service guidelines at all times.
            DispatchHub reserves the right to update these Terms and Conditions
            at any time. Continued use of the platform after changes signifies
            acceptance of the updated terms.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            7. Termination of Engagement
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            Riders may stop working with Dispatch Hub at any time; however, all
            pending remittances must be settled. DispatchHub also reserves the
            right to terminate a rider’s access to the platform for policy
            violations, fraud, or misconduct.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="unageo-regular text-[1.5rem] font-semibold md:leading-[2rem]">
            8. Acceptance of Terms
          </h3>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            By accepting delivery tasks on the DispatchHub platform, you confirm
            that you have read, understood, and agreed to these Terms and
            Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForRiders