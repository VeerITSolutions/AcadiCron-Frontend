"use client";

import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import apiClient from "@/services/apiClient";

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  apiEndpoint?: string;
  isDark?: boolean;
};

import { StylesConfig } from "react-select";

const DynamicSelectForSearch: React.FC<Props> = ({
  name,
  value,
  onChange,
  apiEndpoint = "/fees-group",
  isDark = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  // Fetch label for initial value (if value is set)

  useEffect(() => {
    const fetchInitialLabel = async () => {
      if (value) {
        try {
          const res = await apiClient.get(`${apiEndpoint}/${value}`);
          const item = res.data;
          const option: OptionType = {
            value: item.id.toString(),
            label: item.name || item.label,
          };
          setSelectedOption(option);
        } catch (error) {
          console.error("Failed to fetch label for selected value", error);
          setSelectedOption(null); // Optional: reset if failed
        }
      } else {
        setSelectedOption(null); // Clear when value is empty
      }
    };

    fetchInitialLabel();
  }, [value, apiEndpoint]);

  const customStyles: StylesConfig<OptionType, false> = {
    control: (base, state) => ({
      ...base,
      width: "200px", // Fixed width
      maxWidth: "200px",
      minWidth: "200px",
      backgroundColor: isDark ? "transparent" : "#fff",
      borderColor: isDark ? "#334155" : "#ccc",
      color: isDark ? "#ffffff" : "#000000",
      padding: "0.3rem 0.5rem",
      boxShadow: state.isFocused
        ? `0 0 0 1px ${isDark ? "#3b82f6" : "#2563eb"}`
        : base.boxShadow,
      "&:hover": {
        borderColor: isDark ? "#3b82f6" : "#2563eb",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#1e293b" : "#fff",
      zIndex: 9999,
      width: "200px",
    }),
    valueContainer: (base) => ({
      ...base,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "#ffffff" : "#000000",
      maxWidth: "180px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
    input: (base) => ({
      ...base,
      color: isDark ? "#ffffff" : "#000000",
      maxWidth: "160px",
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
    setSelectedOption(option);

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
        value={selectedOption}
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

export default DynamicSelectForSearch;
