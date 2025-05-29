// components/FeeGroupSelect.tsx
"use client";

import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import axios from "axios";
import apiClient from "@/services/apiClient";

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  value: OptionType | null;
  onChange: (value: OptionType | null) => void;
};

const FeeGroupSelect: React.FC<Props> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const loadOptions = async (
    search: string,
    loadedOptions: import("react-select").OptionsOrGroups<
      OptionType,
      import("react-select").GroupBase<OptionType>
    >,
    additional: { page: number } = { page: 1 },
  ) => {
    const { page } = additional;
    const response = await apiClient.get(`/fees-group`, {
      params: {
        page,
        perPage: 20,
      },
    });

    const data = response.data;

    const options: OptionType[] = data.data.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));

    return {
      options,
      hasMore: data.current_page * data.per_page < data.total,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <div className="mb-4">
      <AsyncPaginate
        value={value}
        loadOptions={loadOptions}
        onInputChange={setInputValue}
        onChange={onChange}
        placeholder="Select Fees Group"
        additional={{ page: 1 }}
        debounceTimeout={300}
        isClearable
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "transparent",
            borderColor: "#ccc",
            padding: "4px",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
      />
    </div>
  );
};

export default FeeGroupSelect;
