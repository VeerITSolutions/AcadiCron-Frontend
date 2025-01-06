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
import { fetchSubjectData } from "@/services/subjectsService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import {
  fetchIteamCategory,
  createIteamCategory,
  deleteIteamCategory,
  editIteamCategory,
} from "@/services/ItemCategoryService";

const ItemCategory = () => {
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
    item_category: "",
    description: "",
  });
  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchIteamCategory(currentPage + 1, rowsPerPage);

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
      await deleteIteamCategory(id);
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
      item_category: subject?.item_category || "",
      description: subject?.description || "",
    });
  };
  

  const handleCancel = () => {
    setFormData({
      item_category: "",
      description: "",
     
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  const formatSubjectData = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.item_category || "N/A",
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
        const result = await editIteamCategory(editCategoryId, formData);
        if (result.success) {
          toast.success("Updated successfully");
        } else {
          toast.error("Failed to update");
        }
      } else {
        const result = await createIteamCategory(formData);

        setFormData({
          item_category: "",
          description: "",
       
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
        item_category: "",
        description: "",
      
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


  const columns = [
    "Item Category",
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

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing ? "Edit Expense Head" : "Add Item Category"}
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
                  Item Category <span className="required">*</span>
                  </label>
                  <input
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    type="text"
                    name="item_category"
                    onChange={handleInputChange}
                    value={formData.item_category}
                  />
                  </div>
        
              <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Description
            </label>
            <textarea
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              name="description"
              onChange={handleInputChange}
              value={formData.description}
            ></textarea>
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
          {loading ? (
            <Loader />
          ) : (
            <ThemeProvider theme={themType === "dark" ? darkTheme : lightTheme}>
              <MUIDataTable
                title={"Item Category List"}
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

export default ItemCategory;
