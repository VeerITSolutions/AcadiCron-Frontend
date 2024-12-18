"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import Loader from "@/components/common/Loader";

const SearchFeesPayment = () => {
  const [colorMode, setColorMode] = useColorMode();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [data, setData] = useState<Array<Array<string>>>([]);
  const { themType, setThemType } = useGlobalState(); //
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    selectedSubject: "",
    message: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const columns = [
    "Payment Id",
    "Date",
    "Name",
    "Class",
    "Fees Group",
    "Fees Type",
    "Mode",
    "Amount",
    "Discount",
    "Fine",
    "Action",
  ];

  const options = {
    filterType: "checkbox",
    serverSide: true,
   responsive: "standard",
search: false,
    selectableRows: "none",
    filter: false,
    viewColumns: false,
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <DefaultLayout>
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Search Fees Payment
      </h2>
      <div className="mx-auto mt-8 max-w-7xl rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark">
        <div className="flex items-center space-x-4">
          {/* Payment ID Field */}
          <div className="flex-grow">
            <label className="font-medium text-black dark:text-white">
              Payment Id
            </label>
            <input
              name="firstName"
              className="text-gray-900 mt-2 w-full rounded-md border border-stroke bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary active:border-primary dark:border-strokedark dark:text-white"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter Payment Id"
            />
          </div>

          {/* Search Button */}
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="mt-6 rounded-md bg-blue-600 px-6 py-3 font-medium text-white shadow-md hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* MUI Data Table */}
        <div className="mt-12">
          {loading ? (
            <Loader />
          ) : (
            <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
              <MUIDataTable
                title={"Payment Id Detail"}
                data={data}
                columns={columns}
                options={{
                  ...options,
                  count: totalCount,
                  page: page,
                  rowsPerPage: rowsPerPage,
                  onChangePage: handlePageChange,
                  onChangeRowsPerPage: handleRowsPerPageChange,
                }}
              />
            </ThemeProvider>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SearchFeesPayment;
