import PackagesNumber from "../icons/package-form/PackagesNumber";
import UserIcon from "../icons/package-form/UserIcon";
import UserPhone from "../icons/package-form/UserPhone";

interface FormFieldsProps {
  description: string;
  numberOfPackages: string;
  senderName: string;
  senderPhone: string;
  onDescriptionChange: (value: string) => void;
  onNumberChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

const FormFields = ({
  description,
  numberOfPackages,
  senderName,
  senderPhone,
  onDescriptionChange,
  onNumberChange,
  onNameChange,
  onPhoneChange,
}: FormFieldsProps) => {
  return (
    <>
      {/* Package Description */}
      <div className="flex flex-col w-full h-[12.5rem] py-4 items-center gap-2 rounded-[1rem] border border-[#808080] bg-[#FDFDFD]">
        <div className="flex px-2 items-center justify-between w-full">
          <h4 className="text-[0.875rem] leading-[1.125rem] text-[#616161]">
            Package Description
          </h4>
        </div>
        <textarea
          rows={10}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-[90%] focus:outline-none text-[0.875rem] leading-[1.125rem]"
          placeholder="What type of package are you receiving"
        />
      </div>

      {/* Number of packages */}
      <div className="flex flex-col items-start gap-1 w-full">
        <label className="text-[0.875rem] leading-[1.5rem] text-[#616161]">
          Number of packages
        </label>
        <div className="flex w-full h-10 px-1 items-center gap-1 border-b border-[#808080]">
          <PackagesNumber />
          <input
            type="text"
            value={numberOfPackages}
            onChange={(e) => onNumberChange(e.target.value)}
            className="w-full py-1 focus:outline-none text-[0.875rem] leading-[1.125rem]"
            placeholder="eg: 3"
          />
        </div>
      </div>

      {/* Sender's full name */}
      <div className="flex flex-col items-start gap-1 w-full">
        <label className="text-[0.875rem] leading-[1.5rem] text-[#616161]">
          Sender's full name
        </label>
        <div className="flex w-full h-10 px-1 items-center gap-1 border-b border-[#808080]">
          <UserIcon />
          <input
            type="text"
            value={senderName}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full py-1 focus:outline-none text-[0.875rem] leading-[1.125rem]"
            placeholder="Enter full name of the sender"
          />
        </div>
      </div>

      {/* Sender's phone number */}
      <div className="flex flex-col items-start gap-1 w-full">
        <label className="text-[0.875rem] leading-[1.5rem] text-[#616161]">
          Sender's phone number
        </label>
        <div className="flex w-full h-10 px-1 items-center gap-1 border-b border-[#808080]">
          <UserPhone />
          <input
            type="tel"
            value={senderPhone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="w-full py-1 focus:outline-none text-[0.875rem] leading-[1.125rem]"
            placeholder="Enter contact of the sender"
          />
        </div>
      </div>
    </>
  );
};

export default FormFields;
