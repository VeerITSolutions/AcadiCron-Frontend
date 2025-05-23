"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import { fetchSubjectData } from "@/services/subjectsService";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import {
  createAdmitCard,
  deleteAdmitCard,
  editAdmitCard,
  fetchAdmitCard,
  viewAdmitCard,
} from "@/services/TemplateAdmitcardService";
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchGetCustomFiledsData } from "@/services/customFiledsService";
import Image from "next/image";

const AdmitCard = () => {
  const [customFileds, setCustomFileds] = useState<Array<Array<any>>>([]);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const { themType, setThemType } = useGlobalState();
  const [certificate_name, setCertificateName] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisibleHtml, setIsFormVisibleHtml] = useState<string>("");
  const [isFormVisibleHtmlId, setIsFormVisibleHtmlId] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dataSubject, setDataSubject] = useState<Array<any>>([]);
  const [createdata, setcreatedata] = useState<Array<any>>([]);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [savedSessionstate, setSavedSession] = useState("");
  const [isNameEnabled, setIsNameEnabled] = useState(false);
  const [isFatherNameEnabled, setIsFatherNameEnabled] = useState(false);
  const [isMotherNameEnabled, setIsMotherNameEnabled] = useState(false);
  const [isExamSessionEnabled, setIsExamSessionEnabled] = useState(false);
  const [isAdmissionNoEnabled, setIsAdmissionNoEnabled] = useState(false);
  const [isDivisionEnabled, setIsDivisionEnabled] = useState(false);
  const [isRollNoEnabled, setIsRollNoEnabled] = useState(false);
  const [isPhotoEnabled, setIsPhotoEnabled] = useState(false);
  const [isClassEnabled, setIsClassEnabled] = useState(false);
  const [isSectionEnabled, setIsSectionEnabled] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const [isDOBEnabled, setIsDOBEnabled] = useState(false);
  const [isAddressEnabled, setIsAddressEnabled] = useState(false);
  const [isGenderEnabled, setIsGenderEnabled] = useState(false);

  const [formData, setFormData] = useState({
    template: "",
    heading: "",
    title: "",
    left_logo: "",
    right_logo: "",
    exam_name: "",
    school_name: "",
    exam_center: "",
    sign: "",
    background_img: "",
    is_name: false,
    is_father_name: false,
    is_mother_name: false,
    is_dob: false,
    is_admission_no: false,
    is_roll_no: false,
    is_address: false,
    is_gender: false,
    is_photo: false,
    is_class: false,
    is_section: false,
    content_footer: "",
  });

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchAdmitCard(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setData(formatAdmitCardData(result.data));
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
      await deleteAdmitCard(id);
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
      template: data.template || "",
      heading: data.heading || "",
      title: data.title || "",
      left_logo: data.left_logo || "",
      right_logo: data.right_logo || "",
      exam_name: data.exam_name || "",
      school_name: data.school_name || "",
      exam_center: data.exam_center || "",
      sign: data.sign || "",
      background_img: data.background_img || "",
      is_name: data.is_name || false,
      is_father_name: data.is_father_name || false,
      is_mother_name: data.is_mother_name || false,
      is_dob: data.is_dob || false,
      is_admission_no: data.is_admission_no || false,
      is_roll_no: data.is_roll_no || false,
      is_address: data.is_address || false,
      is_gender: data.is_gender || false,
      is_photo: data.is_photo || false,
      is_class: data.is_class || false,
      is_section: data.is_section || false,
      content_footer: data.content_footer || "",
    });
  };

  const fetchData2 = async () => {
    try {
      if (isFormVisible === true) {
        const result = await viewAdmitCard(isFormVisibleHtmlId);

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

  const formatAdmitCardData = (students: any[]) => {
    return students.map((student: any) => [
      student.template || "N/A",
      student.background_img ? (
        <Image
          src={
            process.env.NEXT_PUBLIC_BASE_URL +
            `/uploads/marksheet/${student.background_img}`
          }
          width="40"
          height="40"
          alt={student.certificate_name || "Marksheet Image"}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40" fill="currentColor">
                <rect x="10" y="10" width="44" height="32" rx="4" ry="4" fill="#cbd5e0" />
                <text x="32" y="30" text-anchor="middle" font-size="10" fill="#4a5568" font-weight="bold">
                  CERTIFICATE
                </text>
                <circle cx="32" cy="45" r="5" fill="#4a5568" />
              </svg>
            `);
          }}
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

  useEffect(() => {
    const savedSession = localStorage.getItem("selectedSessionId");
    if (savedSession) {
      setSavedSession(savedSession);
      // Use this value in your logic
    }
  }, []);

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
        result = await editAdmitCard(editCategoryId, data);
      } else {
        result = await createAdmitCard(data);
      }

      // Handle the API response
      if (result.success) {
        toast.success(
          isEditing ? "Updated successfully" : "Saved successfully",
        );
        // Reset form data
        setFormData({
          template: "",
          heading: "",
          title: "",
          left_logo: "",
          right_logo: "",
          exam_name: "",
          school_name: "",
          exam_center: "",
          sign: "",
          background_img: "",
          is_name: false,
          is_father_name: false,
          is_mother_name: false,
          is_dob: false,
          is_admission_no: false,
          is_roll_no: false,
          is_address: false,
          is_gender: false,
          is_photo: false,
          is_class: false,
          is_section: false,
          content_footer: "",
        });
        setIsEditing(false);
        setEditCategoryId(null);
        fetchData(page, rowsPerPage); // Refresh data after submit
        resetFileInput(); // Reset the file input
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

  const handleCancel = () => {
    setFormData({
      template: "",
      heading: "",
      title: "",
      left_logo: "",
      right_logo: "",
      exam_name: "",
      school_name: "",
      exam_center: "",
      sign: "",
      background_img: "",
      is_name: false,
      is_father_name: false,
      is_mother_name: false,
      is_dob: false,
      is_admission_no: false,
      is_roll_no: false,
      is_address: false,
      is_gender: false,
      is_photo: false,
      is_class: false,
      is_section: false,
      content_footer: "",
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the value of the file input
    }
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  const columns = ["Certificate Name", "Background Image", "Action"];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    search: false,
    count: totalCount,
    page,
    rowsPerPage,
    selectableRows: "none", // Disable row selection

    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
    filter: false,
    viewColumns: false,
  };

  return (
    <DefaultLayout>
      {isFormVisible && (
        <>
          <Dialog
            open={isFormVisible}
            onClose={handleButtonClick2}
            className="w-full"
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
                {isEditing ? "Edit Add Admit Card" : "Add Admit Card"}
              </h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Template <span className="required">*</span>
                  </label>
                  <input
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="text"
                    name="template"
                    value={formData.template}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Heading
                  </label>
                  <input
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="text"
                    name="heading"
                    value={formData.heading}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Title
                  </label>
                  <input
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Exam Name
                  </label>
                  <input
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="text"
                    name="exam_name"
                    value={formData.exam_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    School Name
                  </label>
                  <input
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="text"
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Exam Center
                  </label>
                  <input
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="text"
                    name="exam_center"
                    value={formData.exam_center}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Footer Text
                  </label>
                  <input
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="text"
                    name="content_footer"
                    value={formData.content_footer}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Left Logo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      id="file"
                      name="left_logo"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Right Logo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      id="file"
                      name="right_logo"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Sign
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      id="file"
                      name="sign"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
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
                      name="background_img"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="field grid grid-cols-3 gap-4">
                  {[
                    {
                      label: "Name",
                      state: isNameEnabled,
                      setState: setIsNameEnabled,
                    },
                    {
                      label: "Father Name",
                      state: isFatherNameEnabled,
                      setState: setIsFatherNameEnabled,
                    },
                    {
                      label: "Mother Name",
                      state: isMotherNameEnabled,
                      setState: setIsMotherNameEnabled,
                    },
                    {
                      label: "Date of Birth",
                      state: isDOBEnabled,
                      setState: setIsDOBEnabled,
                    },
                    {
                      label: "Admission No",
                      state: isAdmissionNoEnabled,
                      setState: setIsAdmissionNoEnabled,
                    },
                    {
                      label: "Roll No",
                      state: isRollNoEnabled,
                      setState: setIsRollNoEnabled,
                    },
                    {
                      label: "Address",
                      state: isAddressEnabled,
                      setState: setIsAddressEnabled,
                    },
                    {
                      label: "Gender",
                      state: isGenderEnabled,
                      setState: setIsGenderEnabled,
                    },
                    {
                      label: "Photo",
                      state: isPhotoEnabled,
                      setState: setIsPhotoEnabled,
                    },
                    {
                      label: "Class",
                      state: isClassEnabled,
                      setState: setIsClassEnabled,
                    },
                    {
                      label: "Section",
                      state: isSectionEnabled,
                      setState: setIsSectionEnabled,
                    },
                  ].map(({ label, state, setState }, index) => (
                    <div key={index} className="flex flex-col">
                      <h2 className="mb-5 text-sm font-medium text-black dark:text-white">
                        {label}
                      </h2>
                      <div className="flex items-center">
                        <label
                          htmlFor={`toggle-${label.toLowerCase().replace(/\s+/g, "-")}`}
                          className="flex select-none items-center"
                        >
                          <div className="relative">
                            <input
                              id={`toggle-${label.toLowerCase().replace(/\s+/g, "-")}`}
                              type="checkbox"
                              className="sr-only"
                              checked={state}
                              onChange={() => setState(!state)}
                            />
                            <div
                              className={`h-5 w-14 cursor-pointer rounded-full shadow-inner transition ${
                                state
                                  ? "bg-green-500"
                                  : "bg-meta-9 dark:bg-[#5A616B]"
                              }`}
                            ></div>
                            <div
                              className={`absolute -top-1 left-0 h-7 w-7 transform cursor-pointer rounded-full bg-white shadow-switch-1 transition ${
                                state
                                  ? "translate-x-full bg-primary dark:bg-white"
                                  : ""
                              }`}
                            ></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                  >
                    {isEditing ? "Update" : "Save"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {loading ? (
            <Loader />
          ) : (
            <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
              <MUIDataTable
                title={"Admit card list"}
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

export default AdmitCard;
