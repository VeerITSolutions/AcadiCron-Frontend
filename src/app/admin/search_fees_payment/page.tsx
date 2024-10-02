"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";

const SearchFeesPayment = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [data, setData] = useState<Array<Array<string>>>([]);
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

  const handleInputChange = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto mt-8 p-6 bg-white dark:bg-boxdark rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
          Search Fees Payment
        </h1>
       
  <div className="flex items-center space-x-4">
    {/* Payment ID Field */}
    <div className="flex-grow">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
        Payment Id
      </label>
      <input
        name="firstName"
        className="w-full mt-2 rounded-md border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-shadow duration-300 ease-in-out shadow-sm"
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
        className="px-6 py-3 mt-6 rounded-md bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700"
      >
        Search
      </button>
    </div>




        </div>

        {/* MUI Data Table */}
        <div className="mt-12">
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
        </div>
        </div>
    
    </DefaultLayout>
  );
};

export default SearchFeesPayment;
