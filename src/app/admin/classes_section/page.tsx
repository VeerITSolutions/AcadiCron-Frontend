"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import {
  createFeesMaster,
  deleteFeesMasterData,
  editFeesMasterData,
  fetchStudentFeesMasterData,
} from "@/services/studentFeesMasterService";

import { createclassesAdd } from "@/services/classesService";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import { fetchsectionData } from "@/services/sectionsService";
import { fetchclassesSectionData } from "@/services/classesSectionService";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";

interface Section {
  id: number;
  section: string;
}

interface FormData {
  class_id: any;
  section_id: any;
}

const FeesMaster = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sections, setSections] = useState<Section[]>([]);
  const [colorMode] = useColorMode();
  const [formData, setFormData] = useState<FormData>({
    class_id: "",
    section_id: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<string[]>([]);

  const { themType, setThemType } = useGlobalState(); // A

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    setLoading(true);
    try {
      const result = await fetchclassesSectionData(
        currentPage + 1,
        rowsPerPage,
      );
      setTotalCount(result.totalCount);
      setData(formatStudentCategoryData(result.data));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

    try {
      const sectionResult = await fetchsectionData(
        currentPage + 1,
        rowsPerPage,
      );
      setSections(sectionResult.data);
    } catch (error) {
      console.error("Failed to fetch sections", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFeesMasterData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEdit = (id: number, fees_group_value: string) => {
    setIsEditing(true);
    setEditCategoryId(id);
    setFormData({
      ...formData,
    });
  };

  const handleSectionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    sectionId: string,
  ) => {
    setSelectedSection((prev) => [...prev, sectionId]);
  };

  const formatStudentCategoryData = (students: any[]) =>
    students.map((student: any) => [
      student.class_name,
      student.section_name || "N/A",
      <div key={student.id} className="flex">
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

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

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
      } else {
        const result = await createclassesAdd(
          formData.class_id,
          formData.section_id,
        );
        if (result.success) {
          toast.success("updated successfully");
        } else {
          toast.error("Failed to update subject group");
        }

        setFormData({
          class_id: "",
          section_id: selectedSection,
        });

        setSelectedSection([]);

        if (result.success) {
          toast.success("created successfully");
        } else {
          toast.error("Failed to create subject group");
        }
      }
      // Reset form after successful action

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

  const columns = ["Class", "Section", "Action"];
  const options = {
    filterType: "checkbox",
    serverSide: true,
    responsive: "standard",
    search: false,
    count: totalCount,
    selectableRows: "none",
    page,
    rowsPerPage,
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
    filter: false,
    viewColumns: false,
  };

  const handleCancel = () => {
    setFormData({
      class_id: "",
      section_id: selectedSection,
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {isEditing ? "Edit Class" : "Add Class"}
              </h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-black dark:text-white">
                    Class<span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    name="class_id"
                    value={formData.class_id}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-black dark:text-white">
                    Sections<span className="text-red-500"> *</span>
                  </label>
                  <div className="flex flex-col gap-2">
                    {isEditing
                      ? sections.map((sec: any) => (
                          <label
                            key={sec.id}
                            className="flex items-center gap-2 text-black dark:text-white"
                          >
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleSectionChange(e, sec.section_id)
                              }
                              checked={selectedSection.includes(sec.section_id)}
                              className="rounded border-stroke text-primary focus:ring-primary dark:border-form-strokedark dark:bg-boxdark dark:text-white"
                            />

                            {sec.section}
                          </label>
                        ))
                      : sections.map((sec: any) => (
                          <label
                            key={sec.id}
                            className="flex items-center gap-2 text-black dark:text-white"
                          >
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleSectionChange(e, sec.section_id)
                              }
                              className="rounded border-stroke text-primary focus:ring-primary dark:border-form-strokedark dark:bg-boxdark dark:text-white"
                            />

                            {sec.section}
                          </label>
                        ))}
                    {}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded bg-primary px-5 py-2 font-medium text-white hover:bg-opacity-80"
                  >
                    {isEditing ? "Update" : "Save"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                      onClick={handleCancel}
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
                title={"Class List"}
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

export default FeesMaster;
