export const CompanyDetailCardPlaceholder = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center transition-all duration-300">
      <h3 className="text-slate-800 font-bold text-lg mb-2">Vyberte firmu</h3>
      <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
        Klikněte na řádek v tabulce pro zobrazení podrobných informací o firmě.
      </p>
    </div>
  );
};
