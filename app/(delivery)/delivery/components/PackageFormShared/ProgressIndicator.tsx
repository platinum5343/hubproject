interface ProgressIndicatorProp {
  currentMajorStep: number;
}

const ProgressIndicator = ({ currentMajorStep }: ProgressIndicatorProp) => {
  const majorSteps = [
    { id: 1, label: "Package Details" },
    { id: 2, label: "Payment Method" },
    { id: 3, label: "Delivery Summary" },
  ];
  return (
    <div className="flex py-[0.125rem] px-1 justify-center items-center w-full">
      <div className="flex items-center gap-[1.125rem]">
        {majorSteps.map((step, index) => (
          <div
            key={step.id}
            className={`w-[0.625rem] h-[0.625rem] rounded-full ${
              index + 1 === currentMajorStep
                ? "bg-[#FE581C]"
                : index + 1 < currentMajorStep
                  ? "bg-[#FE581C] opacity-50"
                  : "bg-[#E8E8E8]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
