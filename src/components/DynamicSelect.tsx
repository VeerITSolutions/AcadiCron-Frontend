"use client";

import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import apiClient from "@/services/apiClient";

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  name: string; // important for handleInputChange
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  apiEndpoint?: string; // optional prop to allow dynamic endpoint
};
import { StylesConfig } from "react-select";

const customStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#334155", // your dark:border-form-strokedark
    color: "#ffffff", // text-white
    padding: "0.75rem", // py-3 equivalent
    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : base.boxShadow, // focus:border-primary
    "&:hover": {
      borderColor: "#3b82f6", // hover border
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#ffffff", // ensure selected value text is white in dark
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1e293b", // dark:bg-form-input
    zIndex: 9999,
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#334155" : "#1e293b", // hover bg
    color: "#fff",
    cursor: "pointer",
  }),
};
const DynamicSelect: React.FC<Props> = ({
  name,
  value,
  onChange,
  apiEndpoint = "/fees-group", // default value if not passed
}) => {
  const [inputValue, setInputValue] = useState("");

  const loadOptions = async (
    search: string,
    loadedOptions: any,
    additional: { page: number } = { page: 1 },
  ) => {
    const { page } = additional;

    const response = await apiClient.get(apiEndpoint, {
      params: {
        page,
        perPage: 20,
        search,
      },
    });

    const data = response.data;

    const options: OptionType[] = data.data.map((item: any) => ({
      value: item.id,
      label:  item.name || item.label,
    }));

    return {
      options,
      hasMore: data.current_page * data.per_page < data.total,
      additional: { page: page + 1 },
    };
  };

  const handleSelectChange = (option: OptionType | null) => {
    const syntheticEvent = {
      target: {
        name,
        value: option?.value || "",
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(syntheticEvent);
  };

  return (
    <div className="mb-4">
      <AsyncPaginate
        value={
          value
            ? { value, label: value } // fallback label
            : null
        }
        loadOptions={loadOptions}
        onInputChange={setInputValue}
        onChange={handleSelectChange}
        placeholder="Select Fees Group"
        additional={{ page: 1 }}
        debounceTimeout={300}
        isClearable
        styles={customStyles}
      />
    </div>
  );
};

export default DynamicSelect;
