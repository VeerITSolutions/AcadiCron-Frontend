import { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";
import {
  fetchsectionByClassData,
  fetchsectionData,
} from "@/services/sectionsService";
import { getClasses } from "@/services/classesService";
import styles from "./User.module.css";
import { createStaff } from "@/services/staffService";
import { toast } from "react-toastify";
import UploadIcon from '@mui/icons-material/Upload';


import { useRouter } from "next/navigation";
const User = () => {
  const [classes, setClassessData] = useState<Array<any>>([]);
  const [section, setSections] = useState<Array<any>>([]);

  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    undefined,
  );
  const [selectedSection, setSelectedSection] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedSessionstate, setSavedSession] = useState("");
  // State to hold all form inputs as a single object
  const [formData, setFormData] = useState<Record<string, any>>({
    employee_id: "",
    lang_id: "",
    department: "",
    designation: "",
    qualification: "",
    work_exp: "",
    name: "",
    surname: "",
    father_name: "",
    mother_name: "",
    contact_no: "",
    emergency_contact_no: "",
    email: "",
    dob: "",
    marital_status: "",
    date_of_joining: "",
    date_of_leaving: "",
    local_address: "",
    permanent_address: "",
    note: "",
    image: "",
    password: "",
    gender: "",
    account_title: "",
    bank_account_no: "",
    bank_name: "",
    ifsc_code: "",
    bank_branch: "",
    payscale: "",
    basic_salary: "",
    epf_no: "",
    contract_type: "",
    shift: "",
    location: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    resume: "",
    joining_letter: "",
    resignation_letter: "",
    other_document_name: "",
    other_document_file: "",
    user_id: "",
    is_active: "",
    verification_code: "",
    disable_at: "",
    role_id: "",
    user_type: ""
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
    try {
      setLoading(true);
      const data = {
        ...formData,
        class_id: selectedClass,
        section_id: selectedSection,
      };

      const response = await createStaff(data);

      if (response.status == 200) {
        toast.success("Added successful");
        router.push(`/admin/student_details`);
      } else {
        toast.error("Error Edit data");
      }
    } catch (error: any) {
      setError(error.message);
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
       
      </div>
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 flex justify-between items-center dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
          Basic Information
          </h3>
          <button 
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none"
          onClick={() => console.log('Import button clicked!')}
        >
          <UploadIcon />
          Import Staff
        </button>
        </div>

          <div className="grid gap-5.5 p-6.5 sm:grid-cols-4">
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Staff ID <span className="required">*</span>
              </label>
              <input
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Role <span className="required">*</span>
              </label>
              <select
                name="user_type"
                value={formData.user_type}
                onChange={handleInputChange} 
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                <option value="">Select</option>
                <option value="">Admin</option>
                <option value="">Teacher</option>
                <option value="">Accountant</option>
                <option value="">Librarian</option>
               
              </select>
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Designation
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select</option>
                <option value="">Principal</option>
                <option value="">Faculty</option>
                <option value="">Director</option>
                <option value="">TGT</option>
                <option value="">PRT</option>
                <option value="">Account</option>
               
              </select>
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select</option>
                <option value="">Teaching</option>
                <option value="">Non Teaching</option>
              </select>
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                First Name <span className="required">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Last Name 
              </label>
              <input
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
               Father Name
              </label>
              <input
                id="father_name"
                name="father_name"
                value={formData.father_name}
                onChange={handleInputChange}
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Mother Name
              </label>
              <input
                id="mother_name"
                name="mother_name"
                type="text"
                value={formData.mother_name}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Email (Login Username) 
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select</option>
                <option value="">Male</option>
                <option value="">Female</option>
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
              Date Of Joining
              </label>
              <input
                id="date_of_joining"
                name="date_of_joining"
                type="date"
                value={formData.date_of_joining}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                 Phone
              </label>
              <input
                id="contact_no"
                name="contact_no"
                type="text"
                value={formData.contact_no}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">          
Emergency Contact Number
              </label>
              <input
                id="emergency_contact_no"
                name="emergency_contact_no"
                type="text"
                value={formData.emergency_contact_no}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Marital Status
              </label>
              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select</option>
                <option value="">Single</option>
                <option value="">Married</option>
                <option value="">Widowed</option>
                <option value="">Separated</option>
                <option value="">Not Specified</option>
              </select>
            </div>

            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                 Photo
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleFileChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

           
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Current Address
              </label>
              <input
                id="local_address"
                name="local_address"
                type="text"
                value={formData.local_address}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Permanent Address
              </label>
              <input
                id="permanent_address"
                name="permanent_address"
                type="text"
                value={formData.permanent_address}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Qualification
              </label>
              <input
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Work Experience
              </label>
              <input
                id="work_exp"
                name="work_exp"
                type="text"
                value={formData.work_exp}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Note
              </label>
              <input
                id="note"
                name="note"
                type="text"
                value={formData.note}
                onChange={handleInputChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
    <h3 className="font-medium text-black dark:text-white">Payroll</h3>
  </div>
  <div className="grid gap-5.5 p-6.5 sm:grid-cols-3">
    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        EPF No
      </label>
      <input
        id="epf_no"
        name="epf_no"
        type="text"
        value={formData.epf_no}
                onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Basic Salary
      </label>
      <input
        id="basic_salary"
        name="basic_salary"
        type="text"
        value={formData.basic_salary}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Contract Type
      </label>
      <select
        name="contract_type"
        value={formData.contract_type}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option value="">Select</option>
        <option value="permanent">Permanent</option>
        <option value="probation">Probation</option>
      </select>
    </div>
    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Work Shift
      </label>
      <input
        id="shift"
        name="shift"
        type="text"
        value={formData.shift}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Location
      </label>
      <input
        id="location"
        name="location"
        type="text"
        value={formData.location}
        onChange={handleInputChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
  </div>
</div>


        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
    <h3 className="font-medium text-black dark:text-white">
      Leaves
    </h3>
  </div>

  <div className="px-6.5 py-4">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="field">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Medical
        </label>
        <input
          id="medical"
          name="medical"
          type="text"
          placeholder="Number of Leaves"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="field">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Personal
        </label>
        <input
          id="personal"
          name="personal"
          type="text"
          placeholder="Number of Leaves"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="field">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Maternity
        </label>
        <input
          id="maternity"
          name="maternity"
          type="text"
          placeholder="Number of Leaves"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
    </div>
  </div>
</div>


 <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
    <h3 className="font-medium text-black dark:text-white">
    Bank Account Details
    </h3>
  </div>

  <div className="px-6.5 py-4">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="field">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Account Title
        </label>
        <input
          id="account_title"
          name="account_title"
          type="text"
          value={formData.account_title}
          onChange={handleInputChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="field">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
Bank Account Number
        </label>
        <input
          id="bank_account_no"
          name="bank_account_no"
          type="text"
          value={formData.bank_account_no}
          onChange={handleInputChange}
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
          type="text"
          value={formData.bank_name}
          onChange={handleInputChange}
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
          type="text"
          value={formData.ifsc_code}
          onChange={handleInputChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
      <div className="field">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">    
       Bank Branch Name
        </label>
        <input
          id="bank_branch"
          name="bank_branch"
          type="text"
          value={formData.bank_branch}
          onChange={handleInputChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
    </div>
  </div>
</div>

<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
    <h3 className="font-medium text-black dark:text-white">
      Social Media Link
    </h3>
  </div>

  <div className="px-6.5 py-4">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="field">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Facebook URL
        </label>
        <input
          id="facebook"
          name="facebook"
          type="text"
          value={formData.facebook}
          onChange={handleInputChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="field">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Twitter URL
        </label>
        <input
          id="twitter"
          name="twitter"
          type="text"
          value={formData.twitter}
          onChange={handleInputChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="field">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">    
          LinkedIn URL
        </label>
        <input
          id="linkedin"
          name="linkedin"
          type="text"
          value={formData.linkedin}
          onChange={handleInputChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="field">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">    
          Instagram URL
        </label>
        <input
          id="instagram"
          name="instagram"
          type="text"
          value={formData.instagram}
          onChange={handleInputChange}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
    </div>
  </div>
</div>


<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
    <h3 className="font-medium text-black dark:text-white">
      Upload Documents
    </h3>
  </div>
  <div className="grid grid-cols-1 gap-5.5 p-6.5 md:grid-cols-3">
    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Resume
      </label>
      <input
        type="file"
        accept="image/*"
        name="resume"
        onChange={handleFileChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Joining Letter
      </label>
      <input
        type="file"
        accept="image/*"
        name="joining_letter"
        onChange={handleFileChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Other Documents
      </label>
      <input
        type="file"
        accept="image/*"
        name="other_document_file"
        onChange={handleFileChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
  </div>
</div>


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
