"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MUIDataTable from "mui-datatables";
import { useGlobalState } from "@/context/GlobalContext";
import { ThemeProvider } from "@mui/material/styles";
import useColorMode from "@/hooks/useColorMode";
import { darkTheme, lightTheme } from "@/components/theme/theme";
import {
  fetchVehicleRoutes,
  deleteVehicleRoutes,
  editVehicleRoutes,
  createVehicleRoutes,
} from "@/services/vehicleRouteService";
import { fetchTransportRouteData } from "@/services/transportRouteService";
import { fetchVehiclesData } from "@/services/vehicleService";

import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import styles from "./User.module.css";
import { useLoginDetails } from "@/store/logoStore";

const VehicleRoutes = () => {
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
  const [routeData, setRouteData] = useState<Array<Array<any>>>([]);
  const [vehicleData, setVehiclesData] = useState<Array<Array<any>>>([]);

  const [classes, setClasses] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>("1");
  const [selectedSection, setSelectedSection] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);

  const { themType, setThemType } = useGlobalState(); // A
  const [selectedVehicles, setSelectedVehicles] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    route_id: "",
    vehicle_id: selectedVehicles,
  });
  const getselectedSessionYear = useLoginDetails(
    (state) => state.selectedSessionName,
  );
  const [savedSessionstate, setSavedSession] = useState(getselectedSessionYear);
  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchVehicleRoutes(currentPage + 1, rowsPerPage);

      setTotalCount(result.total);
      setLoading(false);
      setData(formatSubjectData(result.data));
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }

    try {
      const result = await fetchTransportRouteData();
      setRouteData(result.data);
    } catch (error: any) {
      setError(error.message);
    }

    try {
      const result = await fetchVehiclesData();
      setVehiclesData(result.data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteVehicleRoutes(id);
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

    /* setSelectedVehicles(subject.vehicle_id); */

    setFormData({
      route_id: subject.route_id || "",
      vehicle_id: selectedVehicles,
    });
  };

  const handleCancel = () => {
    setFormData({
      route_id: "",
      vehicle_id: selectedVehicles,
    });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatSubjectData = (subjects: any[]) => {
    return subjects.map((subject: any) => [
      subject.route_title || "N/A",
      subject.vehicle_no || "N/A",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const id = parseInt(value, 10); // Convert the value to an integer

    if (checked) {
      // Add the selected ID to the array
      setSelectedVehicles((prev) => [...prev, id]);
    } else {
      // Remove the ID from the array
      setSelectedVehicles((prev) =>
        prev.filter((vehicleId) => vehicleId !== id),
      );
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing && editCategoryId !== null) {
        const result = await editVehicleRoutes(
          editCategoryId,
          formData,
          selectedVehicles,
        );
        if (result.success) {
          toast.success("Vehicle route updated successfully");
        } else {
          toast.error("Failed to update vehicle route");
        }
      } else {
        const result = await createVehicleRoutes(formData, selectedVehicles);

        if (result.success) {
          toast.success("Vehicle route created successfully");
        } else {
          toast.error("Failed to create vehicle route");
        }
      }
      // Reset form after successful action
      setSelectedVehicles([]);

      setFormData({
        route_id: "",
        vehicle_id: selectedVehicles,
      });

      setIsEditing(false);
      setEditCategoryId(null);
      fetchData(page, rowsPerPage);
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

  const columns = ["Route", "Vehicle", "Action"];
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
                {isEditing
                  ? "Edit Add Fees Master : " + savedSessionstate
                  : "Assign Vehicle On Route"}
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
                    Route
                  </label>
                  <select
                    name="route_id"
                    value={formData.route_id}
                    onChange={handleSelectChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select</option>
                    {routeData.map((route: any) => (
                      <option key={route.id} value={route.id}>
                        {route.route_title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Vehicle
                  </label>
                  <div className="flex gap-5">
                    {vehicleData.map((route: any) => (
                      <label
                        key={route.id}
                        className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white"
                      >
                        <input
                          value={route.id}
                          name="vehicle_id[]"
                          type="checkbox"
                          onChange={handleInputChange2}
                          className="mr-2"
                        />
                        {route.vehicle_no}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
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
                title={"Assign Vehicle On Route"}
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

export default VehicleRoutes;
