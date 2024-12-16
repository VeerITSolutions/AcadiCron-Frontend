"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
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
import { fetchStudentFeesData } from "@/services/studentFeesService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Import the Flatpickr theme
import "flatpickr/dist/flatpickr.css"; // You can use other themes too
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
  const { themType, setThemType } = useGlobalState(); //
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
      <div key={student.id} className="flex">
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
    class_name: "",

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
    section_name: "",
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
            const formattedData2 = await fetchStudentFeesData(id);
            /* setData(formattedData2); */
            setFormData({
              class_name: data.data.class_name,

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
              section_name: data.data.section_name,
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
      <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation4 tss-11quiee-MUIDataTable-paper tss-1x5mjc5-MUIDataTable-root StudentDetails_miui-box-shadow__1DvBS css-11mde6h-MuiPaper-root rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none">
        <div className="border-b border-stroke p-4 dark:bg-boxdark dark:drop-shadow-none">
          <div className="flex items-start">
            <div className="flex w-1/5 items-center justify-center">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${formData.image}`}
                alt="User Profile"
                className="mx-auto h-24 w-24 rounded-full"
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
                      {formData.class_name} ( {formData.section_name} )
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
                      {formData.category_name}
                    </td>
                    <th className="border-b border-stroke px-4 py-2 text-left font-semibold dark:border-strokedark dark:text-white">
                      RTE
                    </th>

                    <td className="border-b border-stroke px-4 py-2 dark:border-strokedark dark:text-white">
                      {formData.rte}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="pb-4 pl-4 pt-4 text-right dark:bg-boxdark dark:drop-shadow-none">
          <div className="flex space-x-4">
            <button className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]">
              Print Selected
            </button>
            <button
              className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
              onClick={handleClickOpen}
            >
              {editing ? "Edit Leave" : "Collect Selected"}
            </button>
          </div>
        </div>
        <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
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
          <DialogContent className="dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex items-center justify-between border-b border-stroke px-4.5 py-4 dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none">
              {/* Title */}
              <h3 className="font-medium text-black dark:text-white">
                {editing ? "Edit Leave" : "Collect Fees"}
              </h3>
              <svg
                onClick={handleClose}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="cursor-pointer text-black dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="grid gap-5.5 p-4.5 dark:bg-boxdark dark:drop-shadow-none">
              {/* Date Picker, Payment Mode, Note */}
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Date
                </label>
                <div className="relative">
                  <Flatpickr
                    options={{
                      dateFormat: "m/d/Y",
                    }}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="mm/dd/yyyy"
                  />
                  <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                        fill="#64748B"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Note
                </label>
                <input
                  name="reason"
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="dark:bg-boxdark dark:drop-shadow-none">
                <button
                  onClick={handleSubmit}
                  className="rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]"
                >
                  {editing ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DefaultLayout>
  );
};

export default StudentDetails;
