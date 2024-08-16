import { useState } from "react";

const SwitcherOne = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor="toggle1"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle1"
            className="sr-only"
            onChange={() => {
              setEnabled(!enabled);
            }}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`${enabled && "!right-1 dark:!bg-white"} absolute left-1 top-1
              h-6 w-6 !translate-x-full rounded-full !bg-primary bg-white
            transition`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherOne;
