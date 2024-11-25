"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/Switchers/SwitcherFour";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/MultiSelect";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import styles from "./User.module.css";

const Staff = () => {
  return (
    <>
      {/* <Breadcrumb pageName="FormElements" /> */}
      <div className="student_admission_form ">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Edit Staff Admission
          </h2>
        </div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Edit Basic Information
              </h3>
            </div>
            <div className="grid gap-5.5 p-6.5 sm:grid-cols-4">
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Staff ID <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
             
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Role <span className="required">*</span>
                </label>
                <select
                  id="class_id"
                  name="class_id"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  <option value="1">Admin</option>
                  <option value="2">Teacher</option>
                  <option value="3">Accountant</option>
                  <option value="4">Librarian</option>
                  <option value="5">Receptionist</option>
                  <option value="6">Super Admin</option>
                </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Designation
                </label>
                <select
                  id="class_id"
                  name="class_id"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  <option value="1">Principal</option>
                  <option value="2">Faculty</option>
                  <option value="3">Director</option>
                  <option value="4">TGT</option>
                  <option value="5">PRT</option>
                  <option value="6">Account</option>
                  <option value="7">Admin A/c</option>
                  <option value="8">Admin</option>
                </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Department
                </label>
                <select
                  id="section_id"
                  name="section_id"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                      <option value="">Select</option>
                  <option value="1">Teaching</option>
                  <option value="2">Non Teaching</option>
                </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  First Name <span className="required">*</span>
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  placeholder=""
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Last Name
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  placeholder=""
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Father Name
                </label>
                <input
                  id="fathername"
                  name="fathername"
                  placeholder=""
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  
Mother Name
                </label>
                <input
                  id="mothername"
                  name="mothername"
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
                  id="gender"
                  name="gender"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Date of Birth <span className="required">*</span>
                </label>
                <input
                  id="dob"
                  name="dob"
                  placeholder=""
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Date Of Joining 
                </label>
                <input
                  id="dob"
                  name="dob"
                  placeholder=""
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Phone
                </label>
                <input
                  id="phoneno"
                  name="phoneno"
                  placeholder=""
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Emergency Contact Number
                </label>
                <input
                  id="econtactno"
                  name="econtactno"
                  placeholder=""
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Marital Status
                </label>
                <select
                  id="maretial_status"
                  name="maretial_status"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  <option value="1">Single</option>
                  <option value="2">Married</option>
                  <option value="3">Widowed</option>
                  <option value="4">Separated</option>
                  <option value="5">Not Specified</option>
                </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Photo
                </label>
                <input
                  className={`form-control mt-2 w-full ${styles["f-13"]}`}
                  type="file"
                  name="file"
                  id="file"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Current Address
                </label>
                <textarea
                  id="current_address"
                  name="current_address"
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
                  placeholder=""
                  className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${styles["h-50"]}`}
                ></textarea>
              </div>
              
            
             
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Qualification
                </label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="qualification"
                >
                  <option value="">Select</option>
                  <option value="1">MCM</option>
                  <option value="2">B.ed</option>
                  <option value="2">M.Com</option>
                </select>
              </div>

             
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Work Experience
                </label>
                <input
                  type="text"
                  name="work_experience"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Note
                </label>
                <textarea
                  id="note"
                  name="note"
                  placeholder=""
                  className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${styles["h-50"]}`}
                ></textarea>
              </div>
             
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Payroll
              </h3>
            </div>
            <div className="grid gap-5.5 p-6.5 sm:grid-cols-3">
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                EPF No
                </label>
                <input
                  id="epfno"
                  name="epfno"
                  placeholder=""
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Contract Type
                </label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="qualification"
                >
                  <option value="">Select</option>
                  <option value="permanent">Permanent</option>
                  <option value="probation">Probation</option>
                 
                </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Basic Salary
                </label>
                <input
                  id="basic_salary"
                  name="basic_salary"
                  placeholder=""
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Work Shift
                </label>
                <input
                  id="worf_shift"
                  name="worf_shift"
                  placeholder=""
                  type="text"
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
                  placeholder=""
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Date Of Leaving 
                </label>
                <input
                  id="dol"
                  name="dol"
                  placeholder=""
                  type="text"
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
  
  <div className="grid gap-5.5 p-6.5 sm:grid-cols-3"> 
    
    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Medical
      </label>
      <input
        id="medical"
        name="medical"
        placeholder="Number of leaves"
        type="text"
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
        placeholder="Number of leaves"
        type="text"
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
        placeholder="Number of leaves"
        type="text"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

  </div>
</div>

<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
    <h3 className="font-medium text-black dark:text-white">
      Bank Account Details
    </h3>
  </div>
  <div className="grid gap-5.5 p-6.5 sm:grid-cols-3">
    
    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Account Title
      </label>
      <input
        id="account_title"
        name="account_title"
        placeholder=""
        type="text"
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
        placeholder=""
        type="text"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Bank Branch Name
      </label>
      <input
        id="branch_name"
        name="branch_name"
        placeholder=""
        type="text"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

  </div>
</div>

<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
  <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
    <h3 className="font-medium text-black dark:text-white">
    Social Media Link
    </h3>
  </div>
  <div className="grid gap-5.5 p-6.5 sm:grid-cols-2">
    
    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      Facebook URL
      </label>
      <input
        id="facebookurl"
        name="facebookurl"
        placeholder=""
        type="text"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">   
Twitter URL
      </label>
      <input
        id="twitterurl"
        name="twitterurl"
        placeholder=""
        type="text"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      Linkedin URL
      </label>
      <input
        id="linkedinurl"
        name="linkedinurl"
        placeholder=""
        type="text"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div className="field">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">     
Instagram URL
      </label>
      <input
        id="instagramurl"
        name="instagramurl"
        placeholder=""
        type="text"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

  </div>
</div>




          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Upload Documents
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
                  placeholder="Enter title"
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value=""
                />
                <input
                  id="file1"
                  name="first_doc"
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
                  placeholder="Enter title"
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value=""
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
                  value=""
                />
                <input
                  id="file3"
                  name="third_doc"
                  type="file"
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
                  placeholder="Enter title"
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value=""
                />
                <input
                  id="file4"
                  name="fourth_doc"
                  type="file"
                  className={`form-control mt-2 w-full ${styles["f-13"]}`}
                />
              </div>
            </div>
          </div>
          <div className="flex">
            <button className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-80">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staff;
