type AppTopBarProps = {
  step: number;
  totalSteps?: number;
  onBack: () => void;
  dark?: boolean;
};

export default function AppTopBar({ step, totalSteps = 10, onBack, dark = false }: AppTopBarProps) {
  return (
    <div className="flex flex-shrink-0 items-center justify-between px-4.5 pt-4.5 pb-2">
      <button
        onClick={onBack}
        aria-label="Back"
        className={`flex h-8 w-8 items-center justify-center rounded-full text-base ${
          dark ? "bg-dark-card text-ivory" : "bg-white text-ink"
        }`}
      >
        ←
      </button>
      <span className="whitespace-nowrap text-[10px] font-semibold tracking-[.12em] text-mushroom uppercase">
        Step {step} of {totalSteps}
      </span>
      <div className="w-8" />
    </div>
  );
}
