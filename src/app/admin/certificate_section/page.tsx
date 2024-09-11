"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import {
  fetchCertificateData,
  createCertificate,
  editCertificateData,
  deleteCertificateData,
} from "@/services/certificateService";

import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";

const StudentCategories = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [certificate_name, setCertificateName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const token = localStorage.getItem("authToken") || "";

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchCertificateData(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCertificateData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (id: number, categoryName: string) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setCertificateName(categoryName);
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.certificate_name || "N/A",
      student.background_image ? (
        <img
          src={`https://erp.erabesa.co.in/uploads/certificate/${student.background_image}`}
          width="40"
          alt={student.certificate_name || "Certificate Image"}
        />
      ) : (
        "N/A"
      ),
      <div key={student.id}>
        <IconButton
          onClick={() => handleEdit(student.id, student.certificate_name)}
          aria-label="edit"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(student.id)}
          aria-label="delete"
        >
          <Delete />
        </IconButton>
      </div>,
    ]);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage, token]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertificateName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        // If editing an existing category
        const result = await editCertificateData(
          editCategoryId,
          certificate_name,
        );
        if (result.success) {
          toast.success("Certificated updated successfully");
        } else {
          toast.error("Failed to update certificated");
        }
      } else {
        // Creating a new category
        const result = await createCertificate(certificate_name);
        if (result.success) {
          toast.success("certificated added successfully");
        } else {
          toast.error("Failed to save category");
        }
      }
      setCertificateName("");
      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const columns = ["Certificate Name", "Background Image", "Actions"];
  const options = {
    filterType: false,
    serverSide: true,
    responsive: "standard",
    selectableRows: "none", // Disable row selection
    count: totalCount,
    page: page,
    rowsPerPage: rowsPerPage,
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing
                  ? "Edit Student Certificate"
                  : "Add Student Certificate"}
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Certificate Name
                    </label>
                    <input
                      name="certificate_name"
                      type="text"
                      value={certificate_name}
                      onChange={handleCategoryChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Header Left Text
                    </label>
                    <input
                      name="header_left_text"
                      type="text"
                      value={certificate_name}
                      onChange={handleCategoryChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Header Center Text
                    </label>
                    <input
                      name="certificate_name"
                      type="text"
                      value={certificate_name}
                      onChange={handleCategoryChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Header Right Text
                    </label>
                    <input
                      name="certificate_name"
                      type="text"
                      value={certificate_name}
                      onChange={handleCategoryChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Body Text *
                    </label>
                    <input
                      name="certificate_name"
                      type="text"
                      value={certificate_name}
                      onChange={handleCategoryChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Footer Left Text
                    </label>
                    <input
                      name="certificate_name"
                      type="text"
                      value={certificate_name}
                      onChange={handleCategoryChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Footer Center Text
                    </label>
                    <input
                      name="certificate_name"
                      type="text"
                      value={certificate_name}
                      onChange={handleCategoryChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Footer Right Text
                    </label>
                    <input
                      name="certificate_name"
                      type="text"
                      value={certificate_name}
                      onChange={handleCategoryChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Certificate Design
                    </label>
                    <input
                      name="certificate_name"
                      type="text"
                      value={certificate_name}
                      onChange={handleCategoryChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Student Photo
                    </label>
                    <div x-data="{ switcherToggle: false }">
                      <label
                        htmlFor="toggle2"
                        className="flex cursor-pointer select-none items-center"
                      >
                        <div className="relative">
                          <input
                            id="toggle2"
                            type="checkbox"
                            className="sr-only"
                            onChange={() => {
                              setEnabled(!enabled);
                            }}
                          />
                          <div className="h-5 w-14 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]"></div>
                          <div
                            className={`dot ${enabled && "!right-0 dark:!bg-white"} absolute -top-1 left-0 h-7
              w-7 !translate-x-full rounded-full !bg-primary bg-white shadow-switch-1
            transition`}
                          ></div>
                        </div>
                      </label>
                    </div>
                    {/* <input
                      name="certificate_name"
                      type="text"
                      value={certificate_name}
                      onChange={handleCategoryChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    /> */}
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Background Image
                    </label>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <button type="submit" className="">
                    {isEditing ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <MUIDataTable
            title={"Student Certificate List"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StudentCategories;
