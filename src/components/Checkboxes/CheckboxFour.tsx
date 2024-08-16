import { useState } from "react";

const CheckboxFour = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor="checkboxLabelFour"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelFour"
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <div
            className={`${isChecked && "border-primary"} mr-4 flex h-5 w-5
              items-center justify-center rounded-full
            border`}
          >
            <span
              className={`${isChecked && "!bg-primary"}
                h-2.5 w-2.5 rounded-full
              bg-transparent`}
            >
              {" "}
            </span>
          </div>
        </div>
        Checkbox Text
      </label>
    </div>
  );
};

export default CheckboxFour;
