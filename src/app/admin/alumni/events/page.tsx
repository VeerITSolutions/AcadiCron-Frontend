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
  fetchAlumniEventData,
  createAlumniEventData,
  deleteAlumniEventData,
  editAlumniEventData,
} from "@/services/AlumniEventService";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

import Close from "@mui/icons-material/Close";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./StudentDetails.module.css";
import { fetchSession } from "@/services/session";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
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
  const [selectedValue, setSelectedValue] = useState("");

  const [IsEmail, setIsEmail] = useState(0);
  const [IsSms, setIsSms] = useState(0);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>("1");
  const [selectedSession, setSelectedSession] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [allSession, setAllSession] = useState<Array<any>>([]);
  const [savedSessionstate, setSavedSession] = useState("");
  const { themType, setThemType } = useGlobalState(); // A
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    event_for: "",
    session_id: "",
    class_id: "",
    section: "",
    from_date: "",
    to_date: "",
    note: "",
    photo: "",
    is_active: false,
    event_notification_message: "",
    is_email: 0,
    is_sms: 0,
    show_onwebsite: false,
  });
  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchAlumniEventData(currentPage + 1, rowsPerPage);
      const resultSession = await fetchSession();
      setTotalCount(result.total);
      setData(formatSubjectData(result.data));
      setAllSession(resultSession.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchClassesAndSections = async () => {
    try {
      const classesResult = await getClasses();
      setClassessData(classesResult.data);

      // Fetch sections if a class is selected
      if (selectedClass) {
        const sectionsResult = await fetchsectionByClassData(selectedClass);
        setSections(sectionsResult.data);
      } else {
        setSections([]); // Clear sections if no class is selected
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass]);

  const handleDelete = async (id: number) => {
    try {
      await deleteAlumniEventData(id);
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
      title: subject.title || "",
      event_for: subject.event_for || "",
      session_id: subject.session_id || "",
      class_id: subject.class_id || "",
      section: subject.section || "",
      from_date: subject.from_date || "",
      to_date: subject.to_date || "",
      note: subject.note || "",
      photo: subject.photo || "",
      is_active: subject.is_active ?? false,
      event_notification_message: subject.event_notification_message || "",
      is_email: subject.is_email,
      is_sms: subject.is_sms,
      show_onwebsite: subject.show_onwebsite ?? false,
    });
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setFormData({
      ...formData,
      class_id: event.target.value, // For regular inputs like text or selects
    });
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
    setFormData({
      ...formData,
      section: event.target.value, // For regular inputs like text or selects
    });
  };
  const handleSessionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSession(event.target.value);
    setFormData({
      ...formData,
      session_id: event.target.value, // For regular inputs like text or selects
    });
  };

  const handleIsEmailChangeforcheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({
      ...formData,
      is_email: e.target.checked ? 1 : 0,
    });
  };

  const handleIsSmsChangeforcheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({
      ...formData,
      is_sms: e.target.checked ? 1 : 0,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    setFormData({
      ...formData,
      event_for: event.target.value, // For regular inputs like text or selects
    });
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      event_for: "",
      session_id: "",
      class_id: "",
      section: "",
      from_date: "",
      to_date: "",
      note: "",
      photo: "",
      is_active: false,
      event_notification_message: "",
      is_email: 0,
      is_sms: 0,
      show_onwebsite: false,
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  const formatDate = (date: any) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const formatSubjectData = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.title || "N/A",
      subject.eventclass || "N/A",
      subject.eventsection || "N/A",
      subject.session_id || "N/A",
      `${formatDate(subject.from_date) || "N/A"}`,
      `${formatDate(subject.to_date) || "N/A"}`,
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // For regular inputs like text or selects
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        const result = await editAlumniEventData(editCategoryId, formData);
        if (result.success) {
          toast.success("Updated successfully");
        } else {
          toast.error("Failed to update");
        }
      } else {
        const result = await createAlumniEventData(formData);

        if (result.success) {
          toast.success("Created successfully");
        } else {
          toast.error("Failed to create");
        }
      }
      // Reset form after successful action
      setFormData({
        title: "",
        event_for: "",
        session_id: savedSessionstate,
        class_id: "",
        section: "",
        from_date: "",
        to_date: "",
        note: "",
        photo: "",
        is_active: false,
        event_notification_message: "",
        is_email: 0,
        is_sms: 0,
        show_onwebsite: false,
      });

      setIsEditing(false);
      setEditCategoryId(null);
      setSelectedSession("");
      setSelectedClass("");
      setSelectedSection("");
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="calendar-container">
                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={data}
                    height="auto"
                    aspectRatio={1.5}
                  />
                </div>
                <style jsx>{`
                  .calendar-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 80vh;
                    width: 100%;
                    padding: 20px;
                  }
                  .legend {
                    display: flex;
                    gap: 10px;
                    margin-top: 10px;
                  }
                  .legend-item {
                    padding: 5px 10px;
                    border-radius: 5px;
                    color: white;
                    font-weight: bold;
                  }
                  :global(.fc) {
                    max-width: 800px;
                    width: 100%;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    padding: 10px;
                  }
                `}</style>
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
                {editing ? "Edit Event" : "Add Event"}
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
                      name="event_for"
                      value="All Alumni"
                      checked={selectedValue === "All Alumni"}
                      onChange={handleChange}
                    />{" "}
                    All Alumni
                  </label>

                  <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      type="radio"
                      className={`${styles["radio"]}`}
                      name="event_for"
                      value="Class"
                      checked={selectedValue === "Class"}
                      onChange={handleChange}
                    />{" "}
                    Class
                  </label>
                </div>

                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Event Title <span className="required">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    onChange={handleInputChange}
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Event From Date <span className="required">*</span>
                  </label>
                  <input
                    id="from_date"
                    name="from_date"
                    value={formData.from_date}
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
                    id="to_date"
                    name="to_date"
                    value={formData.to_date}
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
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${styles["h-50"]}`}
                  ></textarea>
                </div>

                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Event Notification Message{" "}
                    <span className="required">*</span>
                  </label>
                  <textarea
                    name="event_notification_message"
                    value={formData.event_notification_message}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
                <div className="field">
                  <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      type="checkbox"
                      className={`${styles["checkbox"]}`}
                      onChange={handleIsEmailChangeforcheckbox}
                      value={formData.is_email}
                      name="is_email"
                      checked={formData.is_email === 1}
                    />{" "}
                    Email
                  </label>

                  <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      type="checkbox"
                      className={`${styles["checkbox"]}`}
                      onChange={handleIsSmsChangeforcheckbox}
                      value={formData.is_sms}
                      name="is_sms"
                      checked={formData.is_sms === 1}
                    />{" "}
                    SMS
                  </label>
                </div>
                <div className="col-span-full">
                  <button
                    onClick={handleSubmit}
                    className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  >
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
