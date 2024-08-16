import { useState } from "react";

const CheckboxOne = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor="checkboxLabelOne"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelOne"
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <div
            className={`${isChecked && "border-primary dark:bg-transparent"} mr-4 flex h-5
              w-5 items-center justify-center rounded border
            bg-gray`}
          >
            <span
              className={`${isChecked && "bg-primary"} h-2.5 w-2.5 rounded-sm`}
            ></span>
          </div>
        </div>
        Checkbox Text
      </label>
    </div>
  );
};

export default CheckboxOne;
