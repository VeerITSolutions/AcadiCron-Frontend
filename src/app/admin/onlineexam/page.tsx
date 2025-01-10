"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import Close from "@mui/icons-material/Close"; // Import the Close icon
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Import the Flatpickr theme
import "flatpickr/dist/flatpickr.css"; // You can use other themes too
import { fetchRoleData } from "@/services/roleService";
import {
  fetchOnlineExam,
  createOnlineExam,
  deleteOnlineExam,
  editOnlineExam,
} from "@/services/onlineExamService";

import styles from "./StudentDetails.module.css"; // Import CSS module
import Loader from "@/components/common/Loader";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";
import { fetchLeaveTypeData } from "@/services/leaveTypeService";
import { fetchStaffData } from "@/services/staffService";
import { useLoginDetails } from "@/store/logoStore";

const columns = [
  "Exam",
  "Quiz",
  "Questions",
  "Attempt",
  "Exam From",
  "Exam To",
  "Duration",
  "Exam Publish",
  "Result Publish",
  "Action",
];

const options = {
  filterType: false,
  serverSide: true,
  responsive: "standard",
  search: false,
  selectableRows: "none",
  filter: false,
  viewColumns: false,
};

const OnlineExam = () => {
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  const [dataOnlineExamHead, setDataOnlineExamHead] = useState<Array<any>>([]);

  const [dataSubject, setDataSubject] = useState<Array<any>>([]);
  const [createdata, setcreatedata] = useState<Array<any>>([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const [classes, setClasses] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const [savedSessionstate, setSavedSession] = useState("");
  const { themType, setThemType } = useGlobalState(); // A

  const [formData, setFormData] = useState({
    name: "",
    invoice_no: "",
    date: "",
    inc_head_id: "",
    amount: "",
    note: "",
    documents: "",
  });
  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchOnlineExam(currentPage + 1, rowsPerPage);

      setTotalCount(result.total);
      setData(formatSubjectData(result.data));

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteOnlineExam(id);
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

  const handleEdit = (id: number, subject: any) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      name: subject.name,
      invoice_no: subject.invoice_no,
      date: subject.date,
      inc_head_id: subject.inc_head_id,
      amount: subject.amount,
      note: subject.note,
      documents: subject?.documents || "",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      invoice_no: "",
      date: "",
      inc_head_id: "",
      amount: "",
      note: "",
      documents: "",
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  const formatSubjectData = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.name || "N/A",
      subject.invoice_no || "N/A",
      subject.date || "N/A",
      subject.OnlineExam_category || "N/A",
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

  const handleSubmit = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        const result = await editOnlineExam(editCategoryId, formData);
        if (result.success) {
          toast.success("OnlineExam updated successfully");
        } else {
          toast.error("Failed to update OnlineExam");
        }
      } else {
        const result = await createOnlineExam(formData);

        setFormData({
          name: "",
          invoice_no: "",
          date: "",
          inc_head_id: "",
          amount: "",
          note: "",
          documents: "",
        });

        setSelectedClass("");
        setSelectedSection([]);
        setSelectedSubject([]);

        if (result.success) {
          toast.success("OnlineExam created successfully");
        } else {
          toast.error("Failed to create OnlineExam");
        }
      }
      // Reset form after successful action
      setFormData({
        name: "",
        invoice_no: "",
        date: "",
        inc_head_id: "",
        amount: "",
        note: "",
        documents: "",
      });

      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

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
  const handleClose = () => {
    setFormData({
      date: null as Date | null,

      leave_type_id: "",
      leave_from: null as Date | null,
      leave_to: null as Date | null,
      employee_remark: "",
      admin_remark: "",
      status: "",
      document_file: null,
    });

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditCategoryId(null);
    // Clear the input field
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  /* if (loading) return <Loader />; */
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation4 tss-11quiee-MUIDataTable-paper tss-1x5mjc5-MUIDataTable-root StudentDetails_miui-box-shadow__1DvBS css-11mde6h-MuiPaper-root rounded-sm border border-stroke bg-[#F8F8F8] shadow-default dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none ">
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
            {editing ? "Edit Exam" : "Add Exam"}
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
            <MUIDataTable
              title={"Exams"}
              data={data}
              className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${styles["miui-box-shadow"]}`}
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
        <Dialog
          open={open}
          onClose={handleClose}
          className="dark:bg-boxdark dark:drop-shadow-none"
        >
          <DialogTitle className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-black dark:text-white">
                {editing ? "Edit Exam" : "Exam"}
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
                  <label className="checkbox-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      type="checkbox"
                      className="is_quiz"
                      value="1"
                      name="is_quiz"
                    />
                    Quiz
                  </label>
                  <p className="help-block dark:text-white">
                    In quiz result will be display to student immediately just
                    after exam submission (descriptive question type will be
                    disabled).
                  </p>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Exam Title <span className="required">*</span>{" "}
                  </label>
                  <input
                    value=""
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Exam From <span className="required">*</span>{" "}
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    value=""
                    onChange={handleInputChange}
                    type="date"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Exam To <span className="required">*</span>{" "}
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    value=""
                    onChange={handleInputChange}
                    type="date"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Auto Result Publish Date
                    <span className="required">*</span>{" "}
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    value=""
                    onChange={handleInputChange}
                    type="date"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Time Duration <span className="required">*</span>
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    value=""
                    onChange={handleInputChange}
                    type="time"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Attempt <span className="required">*</span>
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    value=""
                    onChange={handleInputChange}
                    type="number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Passing Percentage <span className="required">*</span>
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    value=""
                    onChange={handleInputChange}
                    type="number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="field">
                  <label className="checkbox-inline mb-3 block text-sm font-medium text-black dark:text-white ">
                    <input
                      type="checkbox"
                      className="is_active"
                      name="is_active"
                      value="1"
                    />
                    Publish Exam{" "}
                  </label>

                  <label className="checkbox-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      type="checkbox"
                      className="publish_result"
                      name="publish_result"
                      value="1"
                    />
                    Publish Result{" "}
                  </label>

                  <label className="checkbox-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      type="checkbox"
                      className="is_neg_marking"
                      name="is_neg_marking"
                      value="1"
                    />
                    Negative Marking{" "}
                  </label>

                  <label className="checkbox-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      type="checkbox"
                      className="is_marks_display"
                      name="is_marks_display"
                      value="1"
                    />
                    Display marks in Exam{" "}
                  </label>

                  <label className="checkbox-inline mb-3 block text-sm font-medium text-black dark:text-white">
                    <input
                      type="checkbox"
                      className="is_random_question"
                      name="is_random_question"
                      value="1"
                    />
                    Random Question Order{" "}
                  </label>
                </div>
                <div className="field">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description <span className="required">*</span>
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="col-span-full">
                  <button
                    onClick={handleSave}
                    className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
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

export default OnlineExam;
