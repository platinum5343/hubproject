interface FormActionProps {
  showBackButton: boolean
  onBack: () => void
}

const FormActions = ({ showBackButton, onBack }: FormActionProps) => {
  return (
    <div className="flex w-full gap-3 mt-16 mb-8 items-center">
      {/* Back button - only for multiple stops */}
      {showBackButton && (
        <button
          type="button"
          onClick={onBack}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="Go back"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Continue button */}
      <button
        type="submit"
        className="flex-1 px-8 py-4 flex items-center justify-center text-white rounded-[2rem] bg-[#FE581C] hover:bg-[#f54708] transition-colors leading-[1.5rem] text-[1rem] cursor-pointer"
      >
        Continue
      </button>
    </div>
  );
}

export default FormActions