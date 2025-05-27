import { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";
import {
  fetchsectionByClassData,
  fetchsectionData,
} from "@/services/sectionsService";
import { getClasses } from "@/services/classesService";
import styles from "./User.module.css";
import { createStudent } from "@/services/studentService";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
const User = () => {
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);

  const [selectedClass, setSelectedClass] = useState<string | undefined>("1");
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedSessionstate, setSavedSession] = useState("");

  const [errors, setErrors] = useState<Record<string, any>>({});

  const [newErrors, setnewErrors] = useState<Record<string, any>>({
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

    route_id: 0,
    school_house_id: 0,
    blood_group: "",
    vehroute_id: 0,
    hostel_room_id: 0,
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

    first_title: "",
    first_doc: "",
    second_title: "",
    third_title: "",
    fourth_title: "",
    // Add other initial fields as needed
  });
  // State to hold all form inputs as a single object
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

    route_id: 0,
    school_house_id: 0,
    blood_group: "",
    vehroute_id: 0,
    hostel_room_id: 0,
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

    first_title: "",
    first_doc: "",
    second_title: "",
    third_title: "",
    fourth_title: "",
    // Add other initial fields as needed
  });
  const router = useRouter();
  const fetchClassesAndSections = async () => {
    try {
      const classesResult = await getClasses();
      setClassessData(classesResult.data);

      if (selectedClass) {
        const sectionsResult = await fetchsectionByClassData(selectedClass);
        setSections(sectionsResult.data);
      } else {
        setSections([]);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
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

    setErrors({ ...errors, [name]: false });
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(event.target.value);
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

  const handleSave = async () => {
    // if (!formData.firstname) newErrors.firstname = true;
    // if (!formData.lastname) newErrors.lastname = true;
    // if (!formData.gender) newErrors.gender = true;
    // if (!formData.dob) newErrors.dob = true;
    // if (!selectedClass) newErrors.class_id = true;
    // if (!selectedSection) newErrors.section_id = true;

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   toast.error("Fields are required!");
    //   return;
    // }

    try {
      setLoading(true);
      const data = {
        ...formData,
        class_id: selectedClass,
        section_id: selectedSection,
      };

      const response = await createStudent(data);

      if (response.status === 200) {
        toast.success("Added successfully");
        router.push(`/admin/student_details`);
      } else {
        toast.error("Error editing data");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const session_value = localStorage.getItem("selectedSessionId");
    if (session_value) {
      setSavedSession(session_value);
    }

    fetchClassesAndSections();
  }, [selectedClass]);

  return (
    <div className="student_admission_form ">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Student Admission
        </h2>
      </div>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Student Details
            </h3>
          </div>
          <div className="grid gap-5.5 p-6.5 sm:grid-cols-4">
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Admission No <span className="required">*</span>
              </label>
              <input
                type="text"
                name="admission_no"
                value={formData.admission_no}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Roll Number
              </label>
              <input
                type="text"
                name="roll_no"
                value={formData.roll_no}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Class:
              </label>
              <select
                name="class_id" // Adding name attribute for dynamic handling
                value={selectedClass}
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
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Section:
              </label>
              <select
                name="section_id"
                value={selectedSection}
                onChange={handleSectionChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                /* disabled={!selectedClass} */ // Disable section dropdown if no class is selected
              >
                <option value="">Select</option>
                {section.map((sec) => (
                  <option key={sec.section_id} value={sec.section_id}>
                    {sec.section_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                First Name <span className="required">*</span>
              </label>
              <input
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className={
                  "w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" +
                  (errors.firstname ? " border-red-500" : " border-stroke")
                }
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Last Name <span className="required">*</span>
              </label>
              <input
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Gender <span className="required">*</span>
              </label>
              <select
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Date of Birth <span className="required">*</span>
              </label>
              <input
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                type="date"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Category
              </label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select</option>
                <option value="1">Open</option>
                <option value="2">OBC</option>
                <option value="3">SC</option>
                <option value="4">ST</option>
                <option value="5">VJ</option>
                <option value="6">NT-B</option>
                <option value="7">Muslim</option>
                <option value="8">NT-C</option>
                <option value="9">SBC</option>
              </select>
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Religion
              </label>
              <input
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Caste
              </label>
              <input
                id="cast"
                name="cast"
                value={formData.cast}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mobile Number
              </label>
              <input
                id="mobileno"
                name="mobileno"
                value={formData.mobileno}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder=""
                type="email"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Admission Date
              </label>
              <input
                id="admission_date"
                name="admission_date"
                value={formData.admission_date}
                onChange={handleInputChange}
                placeholder=""
                type="date"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Student Photo
              </label>
              <input
                type="file"
                accept="image/*,video/*"
                name="image" // Optional: Include name for form data
                onChange={handleFileChange} // Handle file change separately
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Blood Group
              </label>
              <select
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="A+">A+</option>

                <option value="B+">B+</option>

                <option value="AB+">AB+</option>

                <option value="O-">O-</option>

                <option value="A-">A-</option>

                <option value="B-">B-</option>

                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Student House
              </label>
              <select
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                name="school_house_id"
                value={formData.school_house_id}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="1">Red</option>

                <option value="2">Green</option>

                <option value="3">Blue</option>

                <option value="4">Yellow</option>
              </select>
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Height
              </label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Weight
              </label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                As on Date
              </label>
              <input
                type="text"
                id="measurement_date"
                name="measurement_date"
                value={formData.measurement_date}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            {/* <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Sibling Class
              </label>
              <select
                id="sibiling_class_id"
                name="sibiling_class_id"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Nursery</option>
                <option value="12">K.G.-I</option>
                <option value="13">K.G. - II</option>
              </select>
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Sibling Section
              </label>
              <select
                id="sibiling_section_id"
                name="sibiling_section_id"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select</option>
              </select>
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Sibling Student
              </label>
              <select
                id="sibiling_student_id"
                name="sibiling_student_id"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select</option>
              </select>
            </div> */}
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Parent Guardian Detail
            </h3>
          </div>
          <div className="grid gap-5.5 p-6.5 sm:grid-cols-4">
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Father Name
              </label>
              <input
                id="father_name"
                name="father_name"
                value={formData.father_name}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Father Phone
              </label>
              <input
                id="father_phone"
                name="father_phone"
                value={formData.father_phone}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Father Occupation
              </label>
              <input
                id="father_occupation"
                name="father_occupation"
                value={formData.father_occupation}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Father Photo
              </label>
              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="file"
                accept="image/*,video/*"
                name="father_pic" // Optional: Include name for form data
                onChange={handleFileChange} // Handle file change separately
                id="file"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mother Name
              </label>

              <input
                id="mother_name"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mother Phone
              </label>
              <input
                id="mother_phone"
                name="mother_phone"
                value={formData.mother_phone}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mother Occupation
              </label>
              <input
                id="mother_occupation"
                name="mother_occupation"
                value={formData.mother_occupation}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mother Photo
              </label>
              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="file"
                accept="image/*,video/*"
                name="mother_pic"
                onChange={handleFileChange}
                id="file"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                If Guardian Is<span className="required">*</span>
                &nbsp;&nbsp;&nbsp;
              </label>

              <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                <input
                  type="radio"
                  className={`${styles["radio"]}`}
                  name="guardian_is"
                  value="Father" // Unique value for Father
                  checked={formData.guardian_is === "Father"}
                  onChange={handleInputChange}
                />{" "}
                Father
              </label>

              <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                <input
                  type="radio"
                  className={`${styles["radio"]}`}
                  name="guardian_is"
                  value="Mother" // Unique value for Mother
                  checked={formData.guardian_is === "Mother"}
                  onChange={handleInputChange}
                />{" "}
                Mother
              </label>

              <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
                <input
                  type="radio"
                  className={`${styles["radio"]}`}
                  name="guardian_is"
                  value="Other" // Unique value for Other
                  checked={formData.guardian_is === "Other"}
                  onChange={handleInputChange}
                />{" "}
                Other
              </label>

              <span className="text-danger"></span>
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Guardian Name <span className="required">*</span>
              </label>
              <input
                id="guardian_name"
                name="guardian_name"
                value={formData.guardian_name}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Guardian Relation
              </label>
              <input
                id="guardian_relation"
                name="guardian_relation"
                value={formData.guardian_relation}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Guardian Email
              </label>
              <input
                id="guardian_email"
                name="guardian_email"
                value={formData.guardian_email}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Guardian Photo
              </label>

              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="file"
                accept="image/*"
                name="guardian_pic"
                onChange={handleFileChange}
                id="file"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Guardian Phone <span className="required">*</span>
              </label>
              <input
                id="guardian_phone"
                name="guardian_phone"
                value={formData.guardian_phone}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Guardian Occupation
              </label>
              <input
                id="guardian_occupation"
                name="guardian_occupation"
                value={formData.guardian_occupation}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Guardian Address
              </label>
              <textarea
                id="guardian_address"
                name="guardian_address"
                value={formData.guardian_address}
                onChange={handleInputChange}
                placeholder=""
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${styles["h-50"]}`}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Student Address Details
            </h3>
          </div>
          <div className="grid gap-5.5 p-6.5 sm:grid-cols-2">
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Current Address
              </label>
              <textarea
                id="current_address"
                name="current_address"
                value={formData.current_address}
                onChange={handleInputChange}
                placeholder=""
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${styles["h-50"]}`}
              ></textarea>
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Permanent Address
              </label>
              <textarea
                id="permanent_address"
                name="permanent_address"
                value={formData.permanent_address}
                onChange={handleInputChange}
                placeholder=""
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${styles["h-50"]}`}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Miscellaneous Details
            </h3>
          </div>
          <div className="grid gap-5.5 p-6.5 sm:grid-cols-4">
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Bank Account Number
              </label>
              <input
                id="bank_account_no"
                name="bank_account_no"
                value={formData.bank_account_no}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Bank Name
              </label>
              <input
                id="bank_name"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                IFSC Code
              </label>
              <input
                id="ifsc_code"
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                National Identification Number
              </label>
              <input
                id="adhar_no"
                name="adhar_no"
                value={formData.adhar_no}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Local Identification Number
              </label>
              <input
                id="samagra_id"
                name="samagra_id"
                value={formData.samagra_id}
                onChange={handleInputChange}
                placeholder=""
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                RTE
              </label>
              <div className="radio">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  <input
                    className={`radio-inline ${styles["radio"]}`}
                    type="radio"
                    name="rte"
                    value="Yes"
                    checked={formData.rte === "Yes"} // Check if 'Yes' is selected
                    onChange={handleInputChange}
                  />
                  Yes
                </label>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  <input
                    className={`radio-inline ${styles["radio"]}`}
                    type="radio"
                    name="rte"
                    value="No"
                    checked={formData.rte === "No"} // Check if 'No' is selected
                    onChange={handleInputChange}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Previous School Details
              </label>
              <textarea
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${styles["h-50"]}`}
                placeholder=""
                name="previous_school"
                value={formData.previous_school}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Note
              </label>
              <textarea
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${styles["h-50"]}`}
                placeholder=""
                name="note"
                value={formData.note}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
        {/*    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Miscellaneous Details
            </h3>
          </div>
          <div className="grid gap-5.5 p-6.5 sm:grid-cols-4">
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Title 1
              </label>
              <input
                id="title1"
                name="first_title"
                value={formData.first_title}
                onChange={handleInputChange}
                placeholder="Enter title"
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                id="file1"
                name="first_doc"
                value={formData.first_doc}
                onChange={handleInputChange}
                type="file"
                className={`form-control mt-2 w-full ${styles["f-13"]}`}
              />
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Title 2
              </label>
              <input
                id="title2"
                name="second_title"
                value={formData.second_title}
                onChange={handleInputChange}
                placeholder="Enter title"
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                id="file2"
                name="second_doc"
                type="file"
                className={`form-control mt-2 w-full ${styles["f-13"]}`}
              />
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Title 3
              </label>
              <input
                id="title3"
                name="third_title"
                placeholder="Enter title"
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={formData.third_title}
                onChange={handleInputChange}
              />
              <input
                id="file3"
                name="third_doc"
                type="file"
                value={formData.dob}
                onChange={handleInputChange}
                className={`form-control mt-2 w-full ${styles["f-13"]}`}
              />
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Title 4
              </label>
              <input
                id="title4"
                name="fourth_title"
                value={formData.fourth_title}
                onChange={handleInputChange}
                placeholder="Enter title"
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                id="file4"
                name="fourth_doc"
                type="file"
                className={`form-control mt-2 w-full ${styles["f-13"]}`}
              />
            </div>
          </div>
        </div> */}
        <div className="flex">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
