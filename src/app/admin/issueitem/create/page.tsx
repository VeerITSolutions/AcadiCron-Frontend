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

import {
  fetchItemIssue,
  createItemIssue,
  deleteItemIssue,
  editItemIssue,
} from "@/services/ItemIssueService";
import { fetchRoleData } from "@/services/roleService";
import { fetchIteamCategory } from "@/services/ItemCategoryService";
import { fetchItemData } from "@/services/ItemService";
import { fetchStaffData } from "@/services/staffService";

const IssueItem = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<any>>([]);
  const [userTypeData, setuserTypeData] = useState<Array<any>>([]);
  const [employeeData, setEmployeeData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [colorMode, setColorMode] = useColorMode();
  const [editing, setEditing] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const [savedSessionstate, setSavedSession] = useState("");
  const { themType, setThemType } = useGlobalState(); // A
  const [categoryData, setCategoryData] = useState<Array<any>>([]);
  const [ItemData, setItemData] = useState<Array<any>>([]);
  const [selectedItemCategoryId, setSelectedItemCategoryId] = useState<string >('');
  const [selectedItemId, setSelectedItemId] = useState<string >('');
  const [selectedRoleTypeId, setSelectedRoleTypeId] = useState<string >('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string >('');
  const router = useRouter();
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
      const resultCategory = await fetchIteamCategory("", "");
      // const resultEmployeeData = await fetchStaffData("", "");
      if(selectedItemCategoryId){
        const resultItem = await fetchItemData("", "", "","",selectedItemCategoryId);
        setItemData(resultItem.data);
      }
    
      if(selectedRoleTypeId){
        const resultEmployeeData = await fetchStaffData("", "", "","",selectedRoleTypeId);
        setItemData(resultEmployeeData.data);
      }

      setTotalCount(result.total);
      setData(formatSubjectData(result.data));
      setCategoryData(resultCategory.data);
      setuserTypeData(resultUserType.data);
      // setEmployeeData(resultEmployeeData.data);

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
      subject.issue_type || "N/A",
      subject.issue_to || "N/A",
      subject.issue_by || "N/A",
      subject.issue_date || "N/A",
      subject.return_date || "N/A",
      subject.item_category_id || "N/A",
      subject.item_id || "N/A",
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
    fetchData(page, rowsPerPage,);
  }, [page, rowsPerPage, selectedItemCategoryId, selectedItemId, selectedRoleTypeId, selectedEmployeeId]);

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
        const data = {...formData, item_category_id: selectedItemCategoryId, item_id: selectedItemId};
        const result = await createItemIssue(data);

        if (result.success) {
          toast.success("Created successfully");
          router.push(`/admin/issueitem`);
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

      setSelectedItemCategoryId('');
      setSelectedItemId('');

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

  const handleItemCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItemCategoryId(event.target.value);
    
  };
  
  const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItemId(event.target.value);
  };
  const handleUserTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoleTypeId(event.target.value);
    
  };
  const handleEmployeeDataChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmployeeId(event.target.value);
  };


  return (
    <DefaultLayout>

      <div className="student_admission_form">

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
            Issue Item
            </h3>
          </div>
          <div className="grid gap-5.5 p-6.5 sm:grid-cols-3">
          <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  User Type <span className="required">*</span>{" "}
                </label>
                <select
                  name="issue_type"
                  value={selectedRoleTypeId}
                  onChange={handleUserTypeChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  {userTypeData.map((sec: any) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Issue To <span className="required">*</span>{" "}
                </label>
                <select
                  name="issue_to"
                  value={selectedEmployeeId}
                  onChange={handleEmployeeDataChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  {userTypeData.map((sec: any) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Issue By <span className="required">*</span>{" "}
                </label>
                <select
                  value={formData.issue_by}
                  name="issue_by"
                  onChange={handleSelectChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  <option value="Super Admin  (9000)">Super Admin  (9000)</option>
                  <option value="Priya Tendulkar (T0001)">Priya Tendulkar (T0001)</option>
                  <option value="Piyush Gauraha (ULIPSU)">Piyush Gauraha (ULIPSU)</option>
                  <option value="Rajiv  (123)">Rajiv  (123)</option>

                </select>
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Issue Date
                  <span className="required">*</span>{" "}
                </label>
                <input
                  id="issue_date"
                  name="issue_date"
                  value={formData.issue_date}
                  onChange={handleInputChange}
                  type="date"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Return Date
                </label>
                <input
                  id="return_date"
                  name="return_date"
                  value={formData.return_date}
                  onChange={handleInputChange}
                  type="date"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Note
                </label>
                <input
                  name="note"
                  type="text"
                  value={formData.note}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Item Category <span className="required">*</span>
                </label>
                <select
                  name="item_category_id"
                  value={selectedItemCategoryId}
                  onChange={handleItemCategoryChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  
                  >
                    <option value="">Select</option>
                    {categoryData.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.item_category}
                      </option>
                    ))}
                  </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Item <span className="required">*</span>
                </label>
                <select
                  name="item_id"
                   value={selectedItemId}
                   onChange={handleItemChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {ItemData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Quantity
                </label>
                <input
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="flex justify-end col-span-full">
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                >
                  Save
                </button>
              </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default IssueItem;
