"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { fetchContentForUploadData } from "@/services/contentForUploadService";
import { createContentForUpload } from "@/services/contentForUploadService";
import {
  deleteConetentForUpload,
  editConententForUpload,
} from "@/services/contentForUploadService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./StudentDetails.module.css"; // Import CSS module
import { getClasses } from "@/services/classesService";
import { fetchsectionByClassData } from "@/services/sectionsService";

const StudentCategories = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [categorynew, setCategorynew] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  
const [classes, setClassessData] = useState<Array<any>>([]);
const [section, setSections] = useState<Array<any>>([]);
const [selectedClass, setSelectedClass] = useState<string | undefined>(
  undefined,
);
const [selectedSection, setSelectedSection] = useState<string | undefined>(
  undefined,
);


  // State for modal visibility
  const [open, setOpen] = useState<boolean>(false);

  const token = localStorage.getItem("authToken") || "";

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchContentForUploadData(
        currentPage + 1,
        rowsPerPage,
      );
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteConetentForUpload(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (id: number, categoryName: string) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setCategorynew(categoryName);
    setOpen(true); // Open the modal
  };

  const formatStudentCategoryData = (students: any[]) => {
    return students.map((student: any) => [
      student.category || "N/A",
      student.id,
      <div key={student.id}>
        <IconButton
          onClick={() => handleEdit(student.id, student.category)}
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
  }, [page, rowsPerPage, token]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleEditCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorynew(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const result = await createContentForUpload(category, category);
      if (result.success) {
        toast.success("Content for upload  successfully");
      } else {
        toast.error("Failed to save Content for upload");
      }
      setCategory("");
      setIsEditing(false);
      setEditCategoryId(null);
      setOpen(false); // Close the modal
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        // Edit existing category
        const result = await editConententForUpload(
          editCategoryId,
          categorynew,
        );
        if (result.success) {
          toast.success("Category updated successfully");
        } else {
          toast.error("Failed to update category");
        }
      } else {
      }
      setCategory("");
      setIsEditing(false);
      setEditCategoryId(null);
      setOpen(false); // Close the modal
      fetchData(page, rowsPerPage); // Refresh data after submit
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };
  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
    setPage(0);
  };

 
  useEffect(() => {
    fetchClassesAndSections(); // Fetch classes and sections on initial render
  }, [selectedClass]);
  
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
  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const columns = [
    "Content Title",
    "Type",
    "Date",
    "Available For",
    "Class",
    "Action",
  ];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    count: totalCount,
    page: page,
    rowsPerPage: rowsPerPage,
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
    filter: false, // Disable filter,
    viewColumns: false, // Disable view columns button
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Upload Content
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Content Title *
                    </label>
                    <input
                      name="content_title"
                      type="text"
                      value={category}
                      onChange={handleCategoryChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Content Type *
                    </label>
                    <select
                      name="fees_group"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Select</option>
                      <option value="assignments">Assignments</option>
                      <option value="studymaterial">Study Material</option>
                      <option value="syllabus">Syllabus</option>
                      <option value="otherdownload">Other Download</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Available For *{" "}
                    </label>
                    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                      <input
                        className=" User_radio__EmAK7"
                        type="checkbox"
                        value="superadmin"
                        name="superadmin"
                      />{" "}
                      All Super Admin{" "}
                    </label>
                    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                      <input
                        className=" User_radio__EmAK7"
                        type="checkbox"
                        value="add_student"
                        name="add_student"
                      />{" "}
                      All Student{" "}
                    </label>
                    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                      <input
                        className=" User_radio__EmAK7"
                        type="checkbox"
                        value="allclasses"
                        name="allclasses"
                      />{" "}
                      Available For All Classes{" "}
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-5.5 p-6.5">
                    <div className="field">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Class:
                      </label>
                      <select
                        value={selectedClass || ""}
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
                  </div>

                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div className="field">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Section:
                      </label>
                      <select
                        value={selectedSection || ""}
                        onChange={handleSectionChange}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        disabled={!selectedClass} // Disable section dropdown if no class is selected
                      >
                        <option value="">Select</option>
                        {section.map((sec) => (
                          <option key={sec.section_id} value={sec.section_id}>
                            {sec.section_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Upload Date
                    </label>
                    <input
                      id="admission_date"
                      placeholder=""
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      type="text"
                      value="23-08-2024"
                      name="upload_date"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Description
                    </label>
                    <input
                      name="description"
                      type="text"
                      value={category}
                      onChange={handleCategoryChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Student Photo
                    </label>
                    <input
                      className="form-control User_f-13__35loD mt-2 w-full"
                      id="file"
                      type="file"
                      name="file"
                    />
                  </div>
                </div>

                <div>
                  <button type="submit" className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <MUIDataTable
            title={"Content List"}
            data={data}
            className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${styles["miui-box-shadow"]}`}
            columns={columns}
            options={options}
          />
        </div>
      </div>

      {/* Edit Category Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {isEditing ? "Edit Category" : "Create Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={categorynew}
            onChange={handleEditCategoryChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </DefaultLayout>
  );
};

export default StudentCategories;
