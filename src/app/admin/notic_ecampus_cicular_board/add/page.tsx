"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./User.module.css"; // Assuming this has your styles

import {
  createNotificationEcampusCircular,
  editNotificationEcampusCircularData,
  fetchNotificationEcampusCircularData,
  deleteNotificationEcampusCircularData,
} from "@/services/notificationEcampusCircularService";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useLoginDetails } from "@/store/logoStore";
import { useGlobalState } from "@/context/GlobalContext";
import { Editor } from "@tinymce/tinymce-react";
// Dynamic import for ReactQuill

const NoticeForm = () => {
  // Quill editor modules

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

  const [content, setContent] = useState("");

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
    console.log("Content was updated:", newContent);
  };

  const [error, setError] = useState<string | null>(null);

  const [roleId, setRoleId] = useState("");
  const [data, setData] = useState<Array<Array<any>>>([]);
  const { themType, setThemType } = useGlobalState();
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
    visible_student: "",
    visible_staff: "",
    visible_parent: "",
    created_by: "",
    created_id: "",
    is_active: "",
    created_at: "",
    updated_at: "",
    path: "",
    class_id: "",
    secid: "",
  });
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const fetchData = async (currentPage: number, rowsPerPage: number) => {
    try {
      const result = await fetchNotificationEcampusCircularData(
        currentPage + 1,
        rowsPerPage,
      );
      setTotalCount(result.totalCount);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };
  let roleIdget = useLoginDetails((state) => state.roleId);
  let username = useLoginDetails((state) => state.username);
  let surname = useLoginDetails((state) => state.surname);
  let roleNameget = useLoginDetails((state) => state.roleName);
  let isSuperAdmin = useLoginDetails((state) => state.isSuperAdmin);
  let selectedSessionId = useLoginDetails((state) => state.selectedSessionId);
  useEffect(() => {
    if (roleNameget) {
      setRoleName(roleNameget);
    }
    if (roleIdget) {
      setRoleId(roleIdget);
    }

    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const data = {
        ...formData,
        created_by: roleName,
        created_id: roleId,
      };

      const response = await createNotificationEcampusCircular(data);

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
                  <Editor
                    key={themType}
                    apiKey="3gpvx3o0o5bmecnx6svljl3kl3kgvnz24v0jt4x1k242uey4" // Replace with your TinyMCE API key
                    initialValue="<p>Start typing...</p>"
                    value={content}
                    onEditorChange={handleEditorChange}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
                      content_style:
                        themType === "dark"
                          ? "body { background-color: #24303F; color: #fff; font-family: Arial, sans-serif; }"
                          : "body { background-color: #fff; color: #000; font-family: Arial, sans-serif; }",
                      skin: themType === "dark" ? "oxide-dark" : "oxide", // Apply dark/light skin
                      content_css: themType === "dark" ? "oxide-dark" : "oxide", // Apply dark/light content styling
                    }}
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
                    value={
                      formData.date || new Date().toISOString().split("T")[0]
                    }
                    onChange={handleInputChange}
                    type="date"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="field mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Publish On
                  </label>
                  <input
                    id="publish_date"
                    name="publish_date"
                    value={
                      formData.publish_date ||
                      new Date().toISOString().split("T")[0]
                    }
                    onChange={handleInputChange}
                    type="date"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
