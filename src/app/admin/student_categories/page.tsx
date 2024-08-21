"use client"; // Add this at the top of the file

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { TabTwoTone } from "@mui/icons-material";
import TableOne from "@/components/Tables/TableOne";
import TableOneDynamic from "@/components/Tables/TableOneDynamic";
import MUIDataTable from "mui-datatables";
import { fetchStudentCategoryData } from "@/services/studentCategoryService";
const student_categories = () => {
  const [error, setError] = useState<string | null>(null);

  /* here for fetch logic  */
  const [data, setData] = useState<Array<Array<string>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const token = localStorage.getItem("authToken") || "";

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.category || "N/A", // Access category from the individual student object
      student.id,
      "View",
    ]);
  };

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchStudentCategoryData(
        currentPage + 1,
        rowsPerPage,
      );
      setTotalCount(result.totalCount);
      const formattedData = formatStudentCategoryData(result.data);
      setData(formattedData);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage, token]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    setPage(0); // Reset to first page on search
    fetchData(page, rowsPerPage);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  /* here for fetch logic end  */

  const columns = ["Category", "Category Id", "Action"];

  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
  };

  return (
    <DefaultLayout>
      <>
        {/* <Breadcrumb pageName="FormElements" /> */}

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            {/* <!-- Input Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Create Category
                </h3>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Category
                    </label>
                    <input
                      name="category"
                      type="text"
                      placeholder=""
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <button>Save</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            {/* <TableOneDynamic
              title="Category List
"
              headers={headers}
              brandData={brandData}
            />
            ; */}

            <MUIDataTable
              title={"Category List"}
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
      </>
    </DefaultLayout>
  );
};

export default student_categories;
