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

const User = () => {
  return (
    <>
      {/* <Breadcrumb pageName="FormElements" /> */}
      <div className="student_admission_form grid ">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Student Admission
              </h3>
            </div>
            <div className="grid gap-5.5 p-6.5 sm:grid-cols-4">
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Admission No <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Roll Number
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Class <span className="required">*</span>
                </label>
                <select
                  id="class_id"
                  name="class_id"
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
                  Section <span className="required">*</span>
                </label>
                <select
                  id="section_id"
                  name="section_id"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></select>
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
                  Last Name <span className="required">*</span>
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
                  Gender <span className="required">*</span>
                </label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="gender"
                >
                  <option value="">Select</option>
                </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Gender <span className="required">*</span>
                </label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="gender"
                >
                  <option value="">Select</option>
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
                  Category
                </label>
                <select
                  id="category_id"
                  name="category_id"
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
                  Admission Date
                </label>
                <input
                  id="admission_date"
                  name="admission_date"
                  placeholder=""
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value="23-08-2024"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Student Photo
                </label>
                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="file"
                  name="file"
                  id="file"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Blood Group
                </label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="blood_group"
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
                  name="house"
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
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  As on Date
                </label>
                <input
                  type="text"
                  id="measure_date"
                  value="23-08-2024"
                  name="measure_date"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Sibling Class
                </label>
                <select
                  id="sibiling_class_id"
                  name="sibiling_class_id"
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
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select</option>
                </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Place of Birth
                </label>
                <input
                  type="text"
                  id="custom_fields[students][4]"
                  name="custom_fields[students][4]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Nationality
                </label>
                <input
                  type="text"
                  id="custom_fields[students][3]"
                  name="custom_fields[students][3]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Mother Tongue
                </label>
                <input
                  type="text"
                  id="custom_fields[students][21]"
                  name="custom_fields[students][21]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  TC Number
                </label>
                <input
                  type="number"
                  id="custom_fields[students][20]"
                  name="custom_fields[students][20]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  StudentID CBSE
                </label>
                <input
                  type="number"
                  id="custom_fields[students][1]"
                  name="custom_fields[students][1]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Student Aadhar
                </label>
                <input
                  type="number"
                  id="custom_fields[students][19]"
                  name="custom_fields[students][19]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Last School Attended
                </label>
                <input
                  type="text"
                  id="custom_fields[students][2]"
                  name="custom_fields[students][2]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Date of Admission in School Class
                </label>
                <input
                  type="text"
                  id="custom_fields[students][5]"
                  name="custom_fields[students][5]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Class in which Pupil Last Studied
                </label>
                <input
                  type="text"
                  id="custom_fields[students][6]"
                  name="custom_fields[students][6]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Subject Studied
                </label>
                <input
                  type="text"
                  id="custom_fields[students][7]"
                  name="custom_fields[students][7]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Whether Qualified
                </label>
                <select
                  id="sibiling_class_id"
                  name="sibiling_class_id"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Promoted to Class
                </label>
                <input
                  type="text"
                  id="custom_fields[students][9]"
                  name="custom_fields[students][9]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Month Upto Pupil Paid Fees
                </label>
                <input
                  type="text"
                  id="custom_fields[students][10]"
                  name="custom_fields[students][10]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Total Working Days
                </label>
                <input
                  type="number"
                  id="custom_fields[students][11]"
                  name="custom_fields[students][11]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Total Present Days
                </label>
                <input
                  type="number"
                  id="custom_fields[students][12]"
                  name="custom_fields[students][12]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Whether NCC Scout
                </label>
                <input
                  type="text"
                  id="custom_fields[students][13]"
                  name="custom_fields[students][13]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Games Played Other Activity
                </label>
                <input
                  type="text"
                  id="custom_fields[students][14]"
                  name="custom_fields[students][14]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  General Conduct
                </label>
                <input
                  type="text"
                  id="custom_fields[students][15]"
                  name="custom_fields[students][15]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Certificate Issue Date
                </label>
                <input
                  type="text"
                  id="custom_fields[students][16]"
                  name="custom_fields[students][16]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Reason for Leaving School
                </label>
                <input
                  type="text"
                  id="custom_fields[students][17]"
                  name="custom_fields[students][17]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Any Other Remarks
                </label>
                <input
                  type="text"
                  id="custom_fields[students][18]"
                  name="custom_fields[students][18]"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Parent Guardian Detail
                </h3>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Father Name
                </label>
                <input
                  id="father_name"
                  name="father_name"
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
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="file"
                  name="father_pic"
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
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="file"
                  name="mother_pic"
                  id="file"
                />
              </div>
              <div className="field">
                <label>
                  If Guardian Is<span className="required">*</span>
                  &nbsp;&nbsp;&nbsp;
                </label>
                <label className="radio-inline">
                  <input type="radio" name="guardian_is" value="father" />{" "}
                  Father{" "}
                </label>
                <label className="radio-inline">
                  <input type="radio" name="guardian_is" value="mother" />{" "}
                  Mother{" "}
                </label>
                <label className="radio-inline">
                  <input type="radio" name="guardian_is" value="other" /> Other{" "}
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
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="file"
                  name="guardian_pic"
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
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Student Address Details
                </h3>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  <input type="checkbox" id="autofill_current_address" />
                  If Guardian Address is Current Address
                </label>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  <input type="checkbox" id="autofill_address" />
                  If Permanent Address is Current Address
                </label>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Current Address
                </label>
                <textarea
                  id="current_address"
                  name="current_address"
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Miscellaneous Details
                </h3>
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
                  National Identification Number
                </label>
                <input
                  id="adhar_no"
                  name="adhar_no"
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
                  <label>
                    <input
                      className="radio-inline"
                      type="radio"
                      name="rte"
                      value="Yes"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      className="radio-inline"
                      type="radio"
                      name="rte"
                      value="No"
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
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder=""
                  name="previous_school"
                ></textarea>
              </div>
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Note
                </label>
                <textarea
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder=""
                  name="note"
                ></textarea>
              </div>

              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Miscellaneous Details
                </h3>
              </div>
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
                  className="form-control mt-2"
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
                  className="form-control mt-2"
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
                  className="form-control mt-2"
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
                  className="form-control mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
