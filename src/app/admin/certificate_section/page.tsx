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
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import { Edit, Delete, Visibility } from '@mui/icons-material';


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
  

  const [colorMode, setColorMode] = useColorMode();

  const [formData, setFormData] = useState({
    certificate_name: "",
    certificate_text: "",
    left_header: "",
    center_header: "",
    right_header: "",
    left_footer: "",
    right_footer: "",
    center_footer: "",
    header_height: "",
    content_height: "",
    footer_height: "",
    content_width: "",
    background_image: "",
  });


  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchCertificateData(
        currentPage + 1,
        rowsPerPage,
      );
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

  const handleEdit = (
    id: number,
    certificate_name: string,
    certificate_text: string,
    left_header: string,
    center_header: string,
    right_header: string,
    left_footer: string,
    right_footer: string,
    center_footer: string,
    header_height: string,
    content_height: string,
    footer_height: string,
    content_width: string,
    background_image: string,
  ) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      certificate_name,
      certificate_text,
      left_header,
      center_header,
      right_header,
      left_footer,
      right_footer,
      center_footer,
      header_height,
      content_height,
      footer_height,
      content_width,
      background_image

    });
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
          <IconButton aria-label="Show">
          <Visibility />
        </IconButton>
        
  <IconButton
    onClick={() => handleEdit(
      student.id, 
      student.certificate_name,
      student.certificate_text,
      student.left_header,
      student.center_header,
      student.right_header,
      student.left_footer,
      student.right_footer,
      student.center_footer,
      student. header_height,
      student. content_height,
      student. footer_height,
      student. content_width,
      student.background_image
    )}
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
</div>
,
    ]);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   const handleSubmit = async () => {
    try {
      let result;

      // Check if we are editing an existing category
      if (isEditing && editCategoryId !== null) {
        result = await editCertificateData(
          editCategoryId,
          formData.certificate_name,
          formData.certificate_text,
          formData.left_header,
          formData.center_header,
          formData.right_header,
          formData.left_footer,
          formData.center_footer,
          formData.header_height,
          formData.content_height,
          formData.footer_height,
          formData.content_width,
          formData.background_image,

        );
      } else {
        result = await createCertificate(
          formData.certificate_name,
          formData.certificate_text,
          formData.left_header,
          formData.center_header,
          formData.right_header,
          formData.left_footer,
          formData.center_footer,
          formData.header_height,
          formData.content_height,
          formData.footer_height,
          formData.content_width,
          formData.background_image,
         
        );
      }

      // Handle the API response
      if (result.success) {
        toast.success(
          isEditing
            ? "Student House updated successfully"
            : "Student House saved successfully",
        );
        // Reset form data
        setFormData({
          certificate_name: "",
          certificate_text: "",
          left_header: "",
          center_header: "",
          right_header: "",
          left_footer: "",
          right_footer: "",
          center_footer: "",
          header_height: "",
          content_height: "",
          footer_height: "",
          content_width: "",
          background_image: "",
        });
        setIsEditing(false);
        setEditCategoryId(null);
        fetchData(page, rowsPerPage); // Refresh data after submit
      } else {
        // Handle errors
        const errorMessage = result.message || "An error occurred";
        const errors = result.errors || {};

        toast.error(errorMessage); // Show the main error message

        // Optionally display individual field errors
        if (errors.name) {
          toast.error(`Name: ${errors.name.join(", ")}`);
        }
        if (errors.code) {
          toast.error(`Code: ${errors.code.join(", ")}`);
        }
        if (errors.amount) {
          toast.error(`Amount: ${errors.amount.join(", ")}`);
        }
        if (errors.description) {
          toast.error(`Description: ${errors.description.join(", ")}`);
        }
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An unexpected error occurred. Please try again.");
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
    filter: false, // Disable filter,
    viewColumns: false, // Disable view columns button
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

const handleCancel = () => {
  setFormData({
    certificate_name: "",
    certificate_text: "",
    left_header: "",
    center_header: "",
    right_header: "",
    left_footer: "",
    right_footer: "",
    center_footer: "",
    header_height: "",
    content_height: "",
    footer_height: "",
    content_width: "",
    background_image: "",
  });
  setIsEditing(false);
  setEditCategoryId(null);
};


  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
    <h3 className="font-medium text-black dark:text-white">
      {isEditing ? "Edit Student Certificate" : "Add Student Certificate"}
    </h3>
  </div>
  <div className="flex flex-col gap-5.5 p-6.5">
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Certificate Name
      </label>
      <input
        name="certificate_name"
        type="text"
        value={formData.certificate_name}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Header Left Text
      </label>
      <input
        name="left_header"
        type="text"
        value={formData.left_header}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Header Center Text
      </label>
      <input
        name="center_header"
        type="text"
        value={formData.center_header}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Header Right Text
      </label>
      <input
        name="right_header"
        type="text"
        value={formData.right_header}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Body Text *
      </label>
      <input
        name="certificate_text"
        type="text"
        value={formData.certificate_text}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Footer Left Text
      </label>
      <input
        name="left_footer"
        type="text"
        value={formData.left_footer}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Footer Center Text
      </label>
      <input
        name="center_footer"
        type="text"
        value={formData.center_footer}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Footer Right Text
      </label>
      <input
        name="right_footer"
        type="text"
        value={formData.right_footer}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div>
  <label className="block text-sm font-medium text-black dark:text-white">
    Certificate Design
  </label>
</div>

<div className="grid grid-cols-2 gap-4">
  <div>
    <input
      name="header_height"
      type="text"
      value={formData.header_height}
      onChange={handleInputChange}
      placeholder="Header Height"
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
  </div>

  <div>
    <input
      name="footer_height"
      type="text"
      value={formData.footer_height}
      onChange={handleInputChange}
      placeholder="Footer Height"
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
  </div>

  <div>
    <input
      name="content_height"
      type="text"
      value={formData.content_height}
      onChange={handleInputChange}
      placeholder="Body Height"
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
  </div>

  <div>
    <input
      name="content_width"
      type="text"
      value={formData.content_width}
      onChange={handleInputChange}
      placeholder="Body Width"
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
  </div>
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
              className={`dot ${enabled && "!right-0 dark:!bg-white"} absolute -top-1 left-0 h-7 w-7 !translate-x-full rounded-full !bg-primary bg-white shadow-switch-1 transition`}
            ></div>
          </div>
        </label>
      </div>
    </div>

    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Background Image
      </label>
      <input
        type="file"
        name="background_image"
        
        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
      />
    </div>
    
    <div className="flex gap-2">
      <button
        type="submit"
        className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
        onClick={(e) => {
          e.preventDefault(); // Prevent default form submission
          handleSubmit();
        }}
      >
        {isEditing ? "Update" : "Save"}
      </button>
      {isEditing && (
    <button
      type="button"
      className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
      onClick={handleCancel}
    >
      Cancel
    </button>
  )}
    </div>
  </div>
</div>

        </div>

        <div className="flex flex-col gap-9">
          <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
            <MUIDataTable
              title={"Student Certificate List"}
              data={data}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StudentCategories;
