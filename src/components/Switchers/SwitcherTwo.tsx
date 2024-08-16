import { useState } from "react";

const SwitcherTwo = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div x-data="{ switcherToggle: false }">
      <label
        htmlFor="toggle2"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            id="toggle2"
            type="checkbox"
            className="sr-only"
            onChange={() => {
              setEnabled(!enabled);
            }}
          />
          <div className="h-5 w-14 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]"></div>
          <div
            className={`dot ${enabled && "!right-0 dark:!bg-white"} absolute -top-1 left-0 h-7
              w-7 !translate-x-full rounded-full !bg-primary bg-white shadow-switch-1
            transition`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherTwo;
