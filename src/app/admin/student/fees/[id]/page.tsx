"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import {
  fetchLeaveData,
  createLeave,
  deleteLeaveData,
  editLeaveData,
} from "@/services/leaveService";
import styles from "./StudentDetails.module.css";
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
import { fetchStudentSingleData } from "@/services/studentService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
const columns = [
  "Fees Group",
  "Fees Code",
  "Due Date",
  "Status",
  "Amount (₹)",
  "Payment Id",
  "Mode",
  "Date",
  "Discount (₹)",
  "Fine (₹)",
  "Paid (₹)",
  "Balance (₹)",
  "Action",
];

const options = {
  filterType: false,
  serverSide: true,
  responsive: "standard",
  selectableRows: "multiple",
  filter: false,
  viewColumns: false,
};

const StudentDetails = () => {
  const [data, setData] = useState<Array<Array<string>>>([]);
  const [dataleavetype, setLeaveTypeData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [colorMode, setColorMode] = useColorMode();
  const [keyword, setKeyword] = useState<string>("");
  /* const [formData, setFormData] = useState({
    date: "",
    leave_type_id: "",
    leave_from: "",
    leave_to: "",
    reason: "",
    document_file: "",
  }); */
  const [editing, setEditing] = useState(false);
  const [currentLeaveId, setCurrentLeaveId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      await deleteLeaveData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Delete failed");
    }
  };

  const handleEdit = (id: number, leaveData: any) => {
    setEditing(true);
    setCurrentLeaveId(id);
    setFormData({
      date: leaveData.date || "",
      leave_type_id: leaveData.leave_type_id || "",
      leave_from: leaveData.leave_from || "",
      leave_to: leaveData.leave_to || "",
      reason: leaveData.reason || "",
      document_file: "",
    });
    setOpen(true);
  };

  const formatStudentData = (students: any[]) => {
    return students.map((student: any) => [
      student.name || "N/A",
      student.leave_type_id || "N/A",
      student.leave_from + "-" + student.leave_to || "N/A",
      student.leave_days || "N/A",
      student.date || "N/A",
      student.status || "N/A",
      <div key={student.id}>
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

  const [formData, setFormData] = useState<Record<string, any>>({
    parent_id: "",
    admission_no: "",
    roll_no: "",
    admission_date: "",
    firstname: "",
    middlename: "",
    lastname: "",
    rte: "",
    image: "",
    mobileno: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    religion: "",
    cast: "",
    dob: "",
    gender: "",
    current_address: "",
    permanent_address: "",
    category_id: "",
    route_id: "",
    school_house_id: "",
    blood_group: "",
    vehroute_id: "",
    hostel_room_id: "",
    adhar_no: "",
    samagra_id: "",
    bank_account_no: "",
    bank_name: "",
    ifsc_code: "",
    guardian_is: "",
    father_name: "",
    father_phone: "",
    father_occupation: "",
    mother_name: "",
    mother_phone: "",
    mother_occupation: "",
    guardian_name: "",
    guardian_relation: "",
    guardian_phone: "",
    guardian_occupation: "",
    guardian_address: "",
    guardian_email: "",
    father_pic: "",
    mother_pic: "",
    guardian_pic: "",
    is_active: "",
    previous_school: "",
    height: "",
    weight: "",
    measurement_date: "",
    dis_reason: "",
    note: "",
    dis_note: "",
    app_key: "",
    parent_app_key: "",
    disable_at: "",

    section_id: "",

    notes: "",
    first_title: "",
    first_doc: "",
    second_title: "",
    third_title: "",
    fourth_title: "",
    // Add other initial fields as needed
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = window.location.pathname.split("/").pop();
      if (id) {
        const getData = async () => {
          try {
            const data = await fetchStudentSingleData(id);
            console.log("data", data);
            setFormData({
              parent_id: data.data.parent_id,
              admission_no: data.data.admission_no,
              roll_no: data.data.roll_no,
              admission_date: data.data.admission_date,
              firstname: data.data.firstname,
              middlename: data.data.middlename,
              lastname: data.data.lastname,
              rte: data.data.rte,
              image: data.data.image,
              mobileno: data.data.mobileno,
              email: data.data.email,
              state: data.data.state,
              city: data.data.city,
              pincode: data.data.pincode,
              religion: data.data.religion,
              cast: data.data.cast,
              dob: data.data.dob,
              gender: data.data.gender,
              current_address: data.data.current_address,
              permanent_address: data.data.permanent_address,
              category_id: data.data.category_id,
              route_id: data.data.route_id,
              school_house_id: data.data.school_house_id,
              blood_group: data.data.blood_group,
              vehroute_id: data.data.vehroute_id,
              hostel_room_id: data.data.hostel_room_id,
              adhar_no: data.data.adhar_no,
              samagra_id: data.data.samagra_id,
              bank_account_no: data.data.bank_account_no,
              bank_name: data.data.bank_name,
              ifsc_code: data.data.ifsc_code,
              guardian_is: data.data.guardian_is,
              father_name: data.data.father_name,
              father_phone: data.data.father_phone,
              father_occupation: data.data.father_occupation,
              mother_name: data.data.mother_name,
              mother_phone: data.data.mother_phone,
              mother_occupation: data.data.mother_occupation,
              guardian_name: data.data.guardian_name,
              guardian_relation: data.data.guardian_relation,
              guardian_phone: data.data.guardian_phone,
              guardian_occupation: data.data.guardian_occupation,
              guardian_address: data.data.guardian_address,
              guardian_email: data.data.guardian_email,
              father_pic: data.data.father_pic,
              mother_pic: data.data.mother_pic,
              guardian_pic: data.data.guardian_pic,
              is_active: data.data.is_active,
              previous_school: data.data.previous_school,
              height: data.data.height,
              weight: data.data.weight,
              measurement_date: data.data.measurement_date,
              dis_reason: data.data.dis_reason,
              note: data.data.note,
              dis_note: data.data.dis_note,
              app_key: data.data.app_key,
              parent_app_key: data.data.parent_app_key,
              disable_at: data.data.disable_at,
              section_id: data.data.section_id,
              notes: "", // Add other fields as needed
              first_title: "",
              first_doc: "",
              second_title: "",
              third_title: "",
              fourth_title: "",
            });
          } catch (error) {
            console.error("Error fetching student data:", error);
          }
        };
        getData();
      }
    }
  }, []);

  const fetchData = async (
    currentPage: number,
    rowsPerPage: number,
    selectedClass?: string,
    selectedSection?: string,
    keyword?: string,
  ) => {
    try {
      const result = await fetchLeaveData(
        currentPage + 1,
        rowsPerPage,
        selectedClass,
        selectedSection,
        keyword,
      );
      setTotalCount(result.totalCount);
      const formattedData = formatStudentData(result.data);
      setData(formattedData);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    try {
      const result = await fetchLeaveTypeData();
      setLeaveTypeData(result.data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      let result;
      if (editing) {
        result = await editLeaveData(
          currentLeaveId!,
          formData.date,
          formData.leave_type_id,
          formData.leave_from,
          formData.leave_to,
          formData.reason,
          formData.document_file,
        );
      } else {
        result = await createLeave(
          formData.date,
          formData.leave_type_id,
          formData.leave_from,
          formData.leave_to,
          formData.reason,
          formData.document_file,
        );
      }
      if (result.success) {
        toast.success(
          editing ? "Leave updated successfully" : "Leave applied successfully",
        );
        setFormData({
          date: "",
          leave_type_id: "",
          leave_from: "",
          leave_to: "",
          reason: "",
          document_file: "",
        });
        setOpen(false);
        setEditing(false);
        fetchData(page, rowsPerPage);
      } else {
        toast.error("Failed to save leave");
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An error occurred while saving leave");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(false);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage, selectedClass, selectedSection, keyword);
  }, [page, rowsPerPage, selectedClass, selectedSection, keyword]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <DefaultLayout>
      <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation4 tss-11quiee-MUIDataTable-paper tss-1x5mjc5-MUIDataTable-root StudentDetails_miui-box-shadow__1DvBS css-11mde6h-MuiPaper-root rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
        <div className="border-b border-stroke p-4 dark:bg-boxdark dark:drop-shadow-none">
          <div className="flex items-start">
            <div className="flex w-1/5 items-center justify-center">
              <img
                width="115"
                height="115"
                className="rounded-full"
                src="https://erp.erabesa.co.in/uploads/student_images/default_female.jpg"
                alt="No Image"
              />
            </div>

            <div className="ml-4 w-4/5">
              <table className="w-full table-auto border-collapse">
                <tbody>
                  <tr>
                    <th className="border-b border-b border-stroke p-4 px-4 py-2 text-left font-semibold dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none">
                      Name
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      {formData.firstname} {formData.lastname}
                    </td>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      Class Section
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      {formData.section_id}
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      Father Name
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      {formData.father_name}
                    </td>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      Admission No
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      {formData.admission_no}
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      Mobile Number
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      {formData.mobileno}
                    </td>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      Roll Number
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      {formData.roll_no}
                    </td>
                  </tr>
                  <tr>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      Category
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      {formData.category_id}
                    </td>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      RTE
                    </th>
                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      <span className="text-red-500 font-bold dark:text-white">
                        {formData.rte}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className="pb-4 pl-4 pt-4 text-right dark:bg-boxdark dark:drop-shadow-none
"
        >
          <div className="flex space-x-4">
            <Button
              variant="contained"
              className="inline-flex rounded-lg bg-white px-3 py-1 font-medium lowercase text-white sm:px-6 sm:py-2.5"
              style={{ textTransform: "capitalize" }}
            >
              Print Selected
            </Button>
            <Button
              variant="contained"
              className="inline-flex rounded-lg bg-white px-3 py-1 font-medium lowercase text-white sm:px-6 sm:py-2.5"
              onClick={handleClickOpen}
              style={{ textTransform: "capitalize" }}
            >
              {editing ? "Edit Leave" : "Collect Selected"}
            </Button>
          </div>
        </div>
        <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
          <MUIDataTable
            title={""}
            data={data}
            className={`${styles["miui-box-shadow"]}`}
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none">
              <h3 className="font-medium text-black dark:text-white">
                {editing ? "Edit Leave" : "Collect Fees"}
              </h3>
            </div>
          </DialogTitle>
          <DialogContent className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="grid gap-5.5 p-6.5 dark:bg-boxdark dark:drop-shadow-none">
              <div className="field">
                <label className="mb-3 block text-sm font-medium dark:text-white">
                  Date
                </label>
                <TextField
                  name="date"
                  type="date"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition active:border-primary dark:border-form-strokedark dark:text-white"
                />
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:border-strokedark dark:text-white">
                  {" "}
                  Payment Mode
                </label>
                <label className="mr-4 inline-flex items-center">
                  <input
                    type="radio"
                    name="payment_mode_fee"
                    value="Cash"
                    className="form-radio dark:text-white"
                  />
                  <span className="ml-2 dark:text-white"> Cash</span>
                </label>
                <label className="mr-4 inline-flex items-center dark:text-white">
                  <input
                    type="radio"
                    name="payment_mode_fee"
                    value="Cheque"
                    className="form-radio dark:text-white"
                  />
                  <span className="ml-2">Cheque</span>
                </label>
                <label className="mr-4 inline-flex items-center dark:text-white">
                  <input
                    type="radio"
                    name="payment_mode_fee"
                    value="DD"
                    className="form-radio dark:text-white"
                  />
                  <span className="ml-2">DD</span>
                </label>
                <label className="mr-4 inline-flex items-center dark:text-white">
                  <input
                    type="radio"
                    name="payment_mode_fee"
                    value="bank_transfer"
                    className="form-radio dark:text-white"
                  />
                  <span className="ml-2">Bank Transfer</span>
                </label>
                <label className="mr-4 inline-flex items-center dark:text-white">
                  <input
                    type="radio"
                    name="payment_mode_fee"
                    value="upi"
                    className="form-radio"
                  />
                  <span className="ml-2 dark:text-white">UPI</span>
                </label>
                <label className="mr-4 inline-flex items-center dark:text-white">
                  <input
                    type="radio"
                    name="payment_mode_fee"
                    value="card"
                    className="form-radio dark:text-white"
                  />
                  <span className="ml-2 dark:text-white">Card</span>
                </label>
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:border-strokedark dark:text-white">
                  Note
                </label>
                <TextField
                  name="note"
                  type="text"
                  className="w-full dark:text-white"
                  value={formData.reason}
                  /* onChange={handleChange} */
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions className="dark:bg-boxdark dark:drop-shadow-none">
            <Button
              onClick={handleClose}
              variant="contained"
              className="hover:bg-gray-700 inline-flex rounded bg-black px-3 py-1 font-medium text-white hover:text-white sm:px-6 sm:py-2.5"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              variant="contained"
              className="hover:bg-gray-700 inline-flex rounded bg-black px-3 py-1 font-medium text-white hover:text-white sm:px-6 sm:py-2.5"
            >
              {editing ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
