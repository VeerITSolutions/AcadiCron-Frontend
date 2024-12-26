"use client";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import {
  fetchSubjectGroupData,
  createSubjectGroup,
  deleteSubjectGroup,
  editSubjectGroup,
  createSubjectGroupAdd,
} from "@/services/subjectGroupService";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { fetchSubjectData } from "@/services/subjectsService";
import Close from "@mui/icons-material/Close";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./StudentDetails.module.css";

const Events = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<any>>([]);
  const [dataSubject, setDataSubject] = useState<Array<any>>([]);
  const [createdata, setcreatedata] = useState<Array<any>>([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);
  const [classes, setClasses] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const [savedSessionstate, setSavedSession] = useState("");
  const { themType, setThemType } = useGlobalState(); // A
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    session_id: savedSessionstate,
  });
  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchSubjectGroupData(currentPage + 1, rowsPerPage);

      const resultSubjectData = await fetchSubjectData();

      setTotalCount(result.total);
      setData(formatSubjectData(result.data));
      setDataSubject(resultSubjectData.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSubjectGroup(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      toast.error("Delete failed");
      console.error("Delete failed", error);
    }
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = (id: number, subject: any) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      name: subject.name,
      description: subject.description,
      session_id: savedSessionstate,
    });

    setSelectedSubject(subject.subjects.map((subject: any) => subject.id));
    setSelectedSection(
      subject.class_sections.map(
        (classSection: any) => classSection?.class_section?.section?.id,
      ),
    );

    setSelectedClass(
      subject.class_sections.map(
        (classSection: any) => classSection?.class_section?.class?.id,
      ),
    );
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      session_id: savedSessionstate,
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  const formatSubjectData = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.name || "N/A",
      subject.amount || "N/A",
      subject.amount || "N/A",
      subject.amount || "N/A",
      subject.amount || "N/A",
      <div key={subject.id} className="flex">
        <IconButton
          onClick={() => handleEdit(subject.id, subject)}
          aria-label="edit"
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(subject.id)}
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        const result = await editSubjectGroup(
          editCategoryId,
          formData,
          selectedSubject,
          selectedSection,
          savedSessionstate,
        );
        if (result.success) {
          toast.success("Subject group updated successfully");
        } else {
          toast.error("Failed to update subject group");
        }
      } else {
        const result = await createSubjectGroupAdd(
          formData,
          selectedSubject,
          selectedSection,
          savedSessionstate,
        );

        setFormData({
          name: "",
          description: "",
          session_id: savedSessionstate,
        });

        setSelectedClass("");
        setSelectedSection([]);
        setSelectedSubject([]);

        if (result.success) {
          toast.success("Subject group created successfully");
        } else {
          toast.error("Failed to create subject group");
        }
      }
      // Reset form after successful action
      setFormData({
        name: "",
        description: "",
        session_id: savedSessionstate,
      });

      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  const columns = [
    "Event Title",
    "Class",
    "Section",
    "Pass Out Session",
    "From",
    "To",
    "Action",
  ];
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
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing ? "Edit Add Expense" : "Select Date"}
              </h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Date <span className="required">*</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
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
                      onClick={handleCancel} // Call the cancel function
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
          <div
            className="mb-4 pl-4 pt-4 text-right"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <button
              type="submit"
              className="mr-4 rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
              onClick={handleClickOpen}
            >
              Add Event
            </button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
              <MUIDataTable
                title={"Event List"}
                data={data}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          )}
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          className="dialog-min-width dark:bg-boxdark dark:drop-shadow-none"
        >
          <DialogTitle className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                Add Event
              </h3>
              <IconButton
                onClick={handleClose}
                className="text-black dark:text-white"
              >
                <Close />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="grid gap-5.5 p-6.5">
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Event For <span className="required">*</span>
                    &nbsp;&nbsp;&nbsp;
                  </label>

                  <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      type="radio"
                      className={`${styles["radio"]}`}
                      name="guardian_is"
                      value="All Alumni" // Unique value for Father
                      onChange={handleInputChange}
                    />{" "}
                    All Alumni
                  </label>

                  <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      type="radio"
                      className={`${styles["radio"]}`}
                      name="guardian_is"
                      value="Class" // Unique value for Mother
                      onChange={handleInputChange}
                    />{" "}
                    Class
                  </label>
                </div>
                <div className="field sessionlist">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Pass Out Session <span className="required">*</span>
                  </label>
                  <select
                    name="class_id" // Adding name attribute for dynamic handling
                    value={selectedClass}
                    onChange={handleClassChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.class}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field classlist">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Select Class <span className="required">*</span>
                  </label>
                  <select
                    name="class_id" // Adding name attribute for dynamic handling
                    value={selectedClass}
                    onChange={handleClassChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.class}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field sectionlist">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Section <span className="required">*</span>
                  </label>
                  <select
                    name="class_id" // Adding name attribute for dynamic handling
                    value={selectedClass}
                    onChange={handleClassChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.class}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Event Title <span className="required">*</span>
                  </label>
                  <input
                    id="event_title"
                    name="event_title"
                    onChange={handleInputChange}
                    placeholder=""
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Event From Date <span className="required">*</span>
                  </label>
                  <input
                    id="event_from_date"
                    name="event_from_date"
                    onChange={handleInputChange}
                    type="date"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Event To Date <span className="required">*</span>
                  </label>
                  <input
                    id="event_to_date"
                    name="event_to_date"
                    onChange={handleInputChange}
                    type="date"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Note <span className="required">*</span>
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    placeholder=""
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${styles["h-50"]}`}
                  ></textarea>
                </div>

                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Event Notification Message{" "}
                    <span className="required">*</span>
                  </label>
                  <textarea
                    id="notification"
                    name="notification"
                    placeholder=""
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Event For <span className="required">*</span>
                    &nbsp;&nbsp;&nbsp;
                  </label>

                  <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      type="checkbox"
                      className={`${styles["checkbox"]}`}
                      name="email_sms"
                      value="All Alumni" // Unique value for Father
                      onChange={handleInputChange}
                    />{" "}
                    Email
                  </label>

                  <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      type="checkbox"
                      className={`${styles["checkbox"]}`}
                      name="email_sms"
                      value="Class" // Unique value for Mother
                      onChange={handleInputChange}
                    />{" "}
                    SMS
                  </label>
                </div>
                <div className="col-span-full">
                  <button className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DefaultLayout>
  );
};

export default Events;
