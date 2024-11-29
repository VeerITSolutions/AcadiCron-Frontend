"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./User.module.css"; // Assuming this has your styles
import {
  createNotification,
  editNotificationData,
  fetchNotificationData,
  deleteNotificationData,
} from "@/services/notificationService";
import "react-quill/dist/quill.snow.css";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";

// Dynamic import for ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NoticeForm = () => {
  // Quill editor modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | { target: { name: string; value: string } }, // Extend type to include Quill's custom events
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle file input changes
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

  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Array<Array<any>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roleName, setRoleName] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [value, setValue] = useState<string>(""); // State for message content
  const [formData, setFormData] = useState({
    title: "",
    publish_date: "",
    date: "",
    message: "",
    message_to: [],
    path: null,
  });
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const token = localStorage.getItem("authToken") || "";

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchNotificationData(currentPage + 1, rowsPerPage);
      setTotalCount(result.totalCount);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNotificationData(id);
      toast.success("Delete successful");
      fetchData(page, rowsPerPage);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  // Handle edit action
  // const handleEdit = (id: number, title_value: string, publish_date: string, message: string, date:string, message_to:string) => {
  //   setIsEditing(true);
  //   setEditCategoryId(id);
  //   setFormData({ ...formData, title: title_value, publish_date: publish_date, message: message, date: date, message_to: message_to});
  // };

  useEffect(() => {
    const roleName = localStorage.getItem("role_name");
    if (roleName) {
      setRoleName(roleName);
    }

    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage, token]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const data = {
        ...formData,
        created_by: roleName,
      };

      const response = await createNotification(data);

      if (response.status == 200) {
        toast.success("Added successful");
        router.push(`/admin/notic_board`);
      } else {
        toast.error("Error Edit data");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="student_admission_form">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"></div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Compose New Message
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-6 pl-6 pr-6 pt-6">
              {/* First Column */}
              <div className="col-span-2">
                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Title <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Message
                  </label>
                  <ReactQuill
                    className="dark:border-strokedark dark:bg-boxdark dark:text-white dark:drop-shadow-none"
                    value={formData.message} // Controlled value
                    onChange={
                      (content) =>
                        handleInputChange({
                          target: { name: "message", value: content },
                        }) // Custom event shape
                    }
                    modules={modules}
                    style={{ height: "300px" }}
                  />
                </div>

                <div className="field mb-6 pt-9">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Upload File
                  </label>
                  <input
                    className="form-control mt-2 w-full"
                    type="file"
                    accept="image/*"
                    name="path"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Second Column */}
              <div className="col-span-1">
                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Notice Date <span className="required">*</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    type="date"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Publish On
                  </label>
                  <input
                    id="publish_date"
                    name="publish_date"
                    value={formData.publish_date}
                    onChange={handleInputChange}
                    type="date"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Message To
                  </label>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="student"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Student
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="parent"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Parent
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="admin"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Admin
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="teacher"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Teacher
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="accountant"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Accountant
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="librarian"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Librarian
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="receptionist"
                        name="message_to"
                        onChange={handleInputChange}
                      />{" "}
                      Receptionist
                    </label>
                  </div>
                </div>

                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Multiple Select
                  </label>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="class1"
                        name="classes"
                        onChange={handleInputChange}
                      />{" "}
                      Class 1 to 2
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="class2"
                        name="classes"
                        onChange={handleInputChange}
                      />{" "}
                      Class 3 to 4
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="class3"
                        name="classes"
                        onChange={handleInputChange}
                      />{" "}
                      Class 5 to 7
                    </label>
                  </div>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="checkbox"
                        value="class4"
                        name="classes"
                        onChange={handleInputChange}
                      />{" "}
                      Class 8 to 9
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6.5 py-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NoticeForm;
