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
import Link from "next/link";
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
import {
  fetchItemIssue,
  createItemIssue,
  deleteItemIssue,
  editItemIssue,
} from "@/services/ItemIssueService";
import { fetchRoleData } from "@/services/roleService";

const IssueItem = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<any>>([]);
  const [categoryData, setCategoryData] = useState<Array<any>>([]);
  const [ItemData, setItemData] = useState<Array<any>>([]);
  const [supplierData, setSupplierData] = useState<Array<any>>([]);
  const [storeData, setStoreData] = useState<Array<any>>([]);
  const [userTypeData, setuserTypeData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();
  const [editing, setEditing] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
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
    issue_type: "",
    issue_to: "",
    issue_by: "",
    issue_date: "",
    return_date: "",
    item_category_id: "",
    item_id: "",
    quantity: "",
    note: "",
  });
  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchItemIssue(currentPage + 1, rowsPerPage);
      const resultUserType = await fetchRoleData("", "");

      setTotalCount(result.total);
      setData(formatSubjectData(result.data));
      setuserTypeData(resultUserType.data);

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteItemIssue(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      toast.error("Delete failed");
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (id: number, subject: any) => {
    setIsEditing(true);
    setEditCategoryId(id);

    setFormData({
      issue_type: subject?.issue_type || "",
      issue_to: subject?.issue_to || "",
      issue_by: subject?.issue_by || "",
      issue_date: subject?.issue_date || "",
      return_date: subject?.return_date || "",
      item_category_id: subject?.item_category_id || "",
      item_id: subject?.item_id || "",
      quantity: subject?.quantity || "",
      note: subject?.note || "",
    });
  };

  const handleCancel = () => {
    setFormData({
      issue_type: "",
      issue_to: "",
      issue_by: "",
      issue_date: "",
      return_date: "",
      item_category_id: "",
      item_id: "",
      quantity: "",
      note: "",
    });
    setIsEditing(false);
    setEditCategoryId(null);
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

  const formatSubjectData = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.name || "N/A",
      subject.item_category || "N/A",
      `${subject.issue_date || "N/A"} / ${subject.return_date || "N/A"}`,
      subject.issue_to || "N/A",
      subject.issue_by || "N/A",
      subject.quantity || "N/A",
      subject.issue_type || "N/A",
      
      <div key={subject.id} className="flex">
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
        const result = await editItemIssue(editCategoryId, formData);
        if (result.success) {
          toast.success("Updated successfully");
        } else {
          toast.error("Failed to update");
        }
      } else {
        const result = await createItemIssue(formData);

        setFormData({
          issue_type: "",
          issue_to: "",
          issue_by: "",
          issue_date: "",
          return_date: "",
          item_category_id: "",
          item_id: "",
          quantity: "",
          note: "",
        });

        setSelectedClass("");
        setSelectedSection([]);
        setSelectedSubject([]);

        if (result.success) {
          toast.success("Created successfully");
        } else {
          toast.error("Failed to create expenses");
        }
      }
      // Reset form after successful action
      setFormData({
        issue_type: "",
        issue_to: "",
        issue_by: "",
        issue_date: "",
        return_date: "",
        item_category_id: "",
        item_id: "",
        quantity: "",
        note: "",
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

  const handleSave = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        const result = await editItemIssue(editCategoryId, formData);
        if (result.success) {
          toast.success("Subject group updated successfully");
        } else {
          toast.error("Failed to update subject group");
        }
      } else {
        const result = await createItemIssue(formData);

        setFormData({
          issue_type: "",
          issue_to: "",
          issue_by: "",
          issue_date: "",
          return_date: "",
          item_category_id: "",
          item_id: "",
          quantity: "",
          note: "",
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
        issue_type: "",
        issue_to: "",
        issue_by: "",
        issue_date: "",
        return_date: "",
        item_category_id: "",
        item_id: "",
        quantity: "",
        note: "",
      });

      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(page, rowsPerPage); 
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const columns = [
    "Item",
    "Item Category",
    "Issue - Return",
    "Issue To",
    "Issued By",
    "Quantity",
    "Status",
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
    selectableRows: "none",
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
    filter: false,
    viewColumns: false,
  };

  return (
    <DefaultLayout>
   <div className="bg-white dark:bg-boxdark dark:drop-shadow-none dark:text-white border border-stroke dark:border-strokedark">
      <div
        className="mb-4 pl-4 pt-4 text-right flex justify-end items-center">
        <Link href="/admin/issueitem/create">
                <button className="mr-4 rounded bg-[#1976D2] px-4 py-2 text-white hover:bg-[#155ba0]">
                  <i className="fa fa-plus mr-2" />
                  Add Issue Item
                </button>
              </Link>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
          <MUIDataTable
            title={"Issue Item List"}
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
        </ThemeProvider>
      )}
     </div>
    </DefaultLayout>
  );
};

export default IssueItem;
