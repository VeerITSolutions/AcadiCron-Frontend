"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import {
  fetchCertificateData,
  createCertificate,
  editCertificateData,
  deleteCertificateData,
  viewCertificate,
} from "@/services/certificateService";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { fetchGetCustomFiledsData } from "@/services/customFiledsService";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StudentCertificate = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const { themType, setThemType } = useGlobalState();

  const [customFileds, setCustomFileds] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [certificate_name, setCertificateName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisibleHtml, setIsFormVisibleHtml] = useState<string>("");
  const [isFormVisibleHtmlId, setIsFormVisibleHtmlId] = useState<string>("");
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
    background_image: "",
    created_for: "",
    status: "",
    header_height: "",
    content_height: "",
    footer_height: "",
    content_width: "",
    enable_student_image: enabled,
    enable_image_height: "",
  });

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchCertificateData(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
      setLoading(false);

      const resultcutomFields = await fetchGetCustomFiledsData(
        currentPage + 1,
        rowsPerPage,
      );

      setCustomFileds(resultcutomFields.data);
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

  const handleEdit = (id: number, data: any) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      certificate_name: data.certificate_name,
      certificate_text: data.certificate_text,
      left_header: data.left_header,
      center_header: data.center_header,
      right_header: data.right_header,
      left_footer: data.left_footer,
      right_footer: data.right_footer,
      center_footer: data.center_footer,
      background_image: data.background_image,
      created_for: data.created_for,
      status: data.status,
      header_height: data.header_height,
      content_height: data.content_height,
      footer_height: data.footer_height,
      content_width: data.content_width,
      enable_student_image: data.enable_student_image,
      enable_image_height: data.enable_image_height,
    });
  };
  const fetchData2 = async () => {
    try {
      if (isFormVisible === true) {
        const result = await viewCertificate(isFormVisibleHtmlId);

        if (result && result.success) {
          setIsFormVisibleHtml(result.data); // Append returned HTML
          setIsFormVisible(true); // Show the HTML
        } else {
          console.error("Failed to load certificate preview");
        }
      }
    } catch (error: any) {}
  };
  useEffect(() => {
    fetchData2();
  }, [isFormVisible]);

  const handleButtonClick = (id: any) => {
    setIsFormVisible((prev) => !prev); // Toggle modal state
    setIsFormVisibleHtmlId(id); // Toggle modal state
  };

  const handleButtonClick2 = async () => {
    setIsFormVisible((prev) => !prev); // Toggle modal state
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.certificate_name || "N/A",
      student.background_image ? (
        <img
          src={
            process.env.NEXT_PUBLIC_BASE_URL +
            `/uploads/certificate/${student.background_image}`
          }
          width="40"
          alt={student.certificate_name || "Certificate Image"}
        />
      ) : (
        "N/A"
      ),
      <div key={student.id} className="flex">
        <IconButton aria-label="Show">
          <div className="" onClick={() => handleButtonClick(student.id)}>
            {" "}
            <Visibility />
          </div>
        </IconButton>

        <IconButton
          onClick={() => handleEdit(student.id, student)}
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
  }, [page, rowsPerPage]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;

    if (file && name) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: file, // Dynamically set the file in formData using the input's name attribute
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      let result;

      const data = {
        ...formData,
        enable_student_image: enabled,
      };

      // Check if we are editing an existing category
      if (isEditing && editCategoryId !== null) {
        result = await editCertificateData(editCategoryId, data);
      } else {
        result = await createCertificate(data);
      }

      // Handle the API response
      if (result.success) {
        toast.success(
          isEditing ? "Updated successfully" : "Saved successfully",
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
          background_image: "",
          created_for: "",
          status: "",
          header_height: "",
          content_height: "",
          footer_height: "",
          content_width: "",
          enable_student_image: enabled,
          enable_image_height: "",
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

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  const columns = ["Certificate Name", "Background Image", "Actions"];
  const options = {
    filter: false, // Disable filter,
    viewColumns: false, // Disable view columns button
    filterType: false,
    serverSide: true,
    responsive: "standard",
    search: false,
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
      background_image: "",
      created_for: "",
      status: "",
      header_height: "",
      content_height: "",
      footer_height: "",
      content_width: "",
      enable_student_image: enabled,
      enable_image_height: "",
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  return (
    <DefaultLayout>
      {isFormVisible && (
        <>
          <Dialog
            open={isFormVisible}
            onClose={handleButtonClick2}
            maxWidth="md"
            fullWidth={true}
          >
            <DialogTitle className="flex justify-end p-4">
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleButtonClick2}
                aria-label="close"
                className="text-gray-500 hover:text-gray-700"
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <div className="flex h-full w-full items-center justify-center">
              <DialogContent className="h-full w-full dark:bg-boxdark dark:drop-shadow-none">
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: isFormVisibleHtml }}
                />
              </DialogContent>
            </div>
          </Dialog>
        </>
      )}

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing
                  ? "Edit Student Certificate"
                  : "Add Student Certificate"}
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
                <textarea
                  name="certificate_text"
                  value={formData.certificate_text}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <span className="text-primary">
                  [name] [dob] [present_address] [guardian] [created_at]
                  [admission_no] [roll_no] [class] [section] [gender]
                  [admission_date] [category] [cast] [father_name] [mother_name]
                  [religion] [email] [phone]{" "}
                  {customFileds.map((field: any, index: any) => (
                    <span key={index}>[{field.name}]</span>
                  ))}{" "}
                </span>
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
                    type="number"
                    value={formData.header_height}
                    onChange={handleInputChange}
                    placeholder="Header Height"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <input
                    name="footer_height"
                    type="number"
                    value={formData.footer_height}
                    onChange={handleInputChange}
                    placeholder="Footer Height"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <input
                    name="content_height"
                    type="number"
                    value={formData.content_height}
                    onChange={handleInputChange}
                    placeholder="Body Height"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <input
                    name="content_width"
                    type="number"
                    value={formData.content_width}
                    onChange={handleInputChange}
                    placeholder="Body Width"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <h2 className="mb-5 text-sm font-medium text-black dark:text-white">
                  Student Photo
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {/* Toggle Switch */}
                  <div>
                    <label
                      htmlFor="toggle2"
                      className="flex select-none items-center"
                    >
                      <div className="relative">
                        <input
                          id="toggle2"
                          type="checkbox"
                          className="sr-only"
                          checked={enabled}
                          onChange={() => setEnabled(!enabled)}
                        />
                        {/* Toggle Background */}
                        <div
                          className={`h-5 w-14 cursor-pointer rounded-full shadow-inner transition ${
                            enabled
                              ? "bg-green-500"
                              : "bg-meta-9 dark:bg-[#5A616B]"
                          }`}
                        ></div>
                        {/* Toggle Handle */}
                        <div
                          className={`absolute -top-1 left-0 h-7 w-7 transform cursor-pointer rounded-full bg-white shadow-switch-1 transition ${
                            enabled
                              ? "translate-x-full bg-primary dark:bg-white"
                              : ""
                          }`}
                        ></div>
                      </div>
                    </label>
                  </div>

                  {/* Reserved Space for Input */}
                  <div>
                    <input
                      name="enable_image_height"
                      type="number"
                      value={enabled ? formData.enable_image_height : ""}
                      onChange={handleInputChange}
                      placeholder="Enter Image Height"
                      className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                        enabled ? "visible" : "invisible"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Background Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="file"
                  name="background_image"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
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
          {loading ? (
            <Loader />
          ) : (
            <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
              <MUIDataTable
                title={"Student Certificate List"}
                data={data}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StudentCertificate;
