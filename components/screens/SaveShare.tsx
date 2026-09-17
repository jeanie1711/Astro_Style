import AppTopBar from "@/components/AppTopBar";

type Props = {
  onBack: () => void;
  onRestart: () => void;
};

const rowClass =
  "flex items-center justify-between rounded-xl bg-white px-4.5 py-4 text-sm font-medium text-ink";

export default function SaveShare({ onBack, onRestart }: Props) {
  return (
    <div className="flex h-full flex-col bg-ivory">
      <AppTopBar step={10} onBack={onBack} />
      <div className="flex flex-1 flex-col gap-3.5 overflow-auto px-6.5 pt-2.5 pb-7">
        <div className="mb-1.5 flex flex-col items-center gap-1.5 text-center">
          <span className="text-[10px] font-semibold tracking-[.2em] text-mushroom uppercase">
            All Done
          </span>
          <h2 className="font-serif text-2xl font-medium text-ink">Your style, aligned.</h2>
        </div>
        <button className={rowClass}>
          <span>Download palette</span>
          <span className="text-mushroom">↓</span>
        </button>
        <button className={rowClass}>
          <span>Download style board</span>
          <span className="text-mushroom">↓</span>
        </button>
        <button className={rowClass}>
          <span>Share result</span>
          <span className="text-mushroom">↗</span>
        </button>
        <button
          onClick={onRestart}
          className="mt-2 rounded-full bg-ink py-4 text-sm font-semibold text-ivory"
        >
          Generate Another Board
        </button>
      </div>
    </div>
  );
}
