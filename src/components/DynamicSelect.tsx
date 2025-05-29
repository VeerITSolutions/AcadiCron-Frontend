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
  isDark?: boolean; // optional prop to allow dynamic endpoint
};
import { StylesConfig } from "react-select";

const DynamicSelect: React.FC<Props> = ({
  name,
  value,
  onChange,
  apiEndpoint = "/fees-group", // default value if not passed
  isDark = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  const customStyles: StylesConfig<OptionType, false> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: isDark ? "transparent" : "#fff",
      borderColor: isDark ? "#334155" : "#ccc",
      color: isDark ? "#ffffff" : "#000000",
      padding: "0.75rem",
      boxShadow: state.isFocused
        ? `0 0 0 1px ${isDark ? "#3b82f6" : "#2563eb"}`
        : base.boxShadow,
      "&:hover": {
        borderColor: isDark ? "#3b82f6" : "#2563eb",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "#ffffff" : "#000000",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#1e293b" : "#fff",
      zIndex: 9999,
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused
        ? isDark
          ? "#334155"
          : "#e0e7ff"
        : isDark
          ? "#1e293b"
          : "#fff",
      color: isDark ? "#fff" : "#000",
      cursor: "pointer",
    }),
  };
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
      label: item.name || item.label,
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
