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

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';



const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const NoticeForm = () => {
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
    ],
  };

  
  return (
    <>
      {/* <Breadcrumb pageName="FormElements" /> */}
      <div className="student_admission_form ">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
         
        </div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Student Details
              </h3>
            </div>
            <div className="grid gap-5.5 p-6.5 sm:grid-cols-2">
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              
              <div className="field">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Publish On
                </label>
                <input
                  id="publishon"
                  name="publishon"
                  placeholder=""
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value="23-08-2024"
                />
              </div>

       

              <div className="field">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Message
                </label>
   
      <ReactQuill
        value={value}
        onChange={setValue}
        modules={modules}
        style={{ height: '300px' }}
      />
    </div>


    <div className="grid gap-6">
 
  <div className="field">
    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      Message To<span className="required">*</span>&nbsp;&nbsp;&nbsp;
    </label>
    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
      <input className="User_radio__Zd0k2" type="checkbox" value="student" name="student" /> Student
    </label>
    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
      <input className="User_radio__Zd0k2" type="checkbox" value="parent" name="parent" /> Parent
    </label>
    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
      <input className="User_radio__Zd0k2" type="checkbox" value="admin" name="admin" /> Admin
    </label>
    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
      <input className="User_radio__Zd0k2" type="checkbox" value="teacher" name="teacher" /> Teacher
    </label>
    <span className="text-danger"></span>
  </div>

 
  <div className="field">
    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      Multiple Select<span className="required">*</span>&nbsp;&nbsp;&nbsp;
    </label>
    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
      <input className="User_radio__Zd0k2" type="checkbox" value="class1" name="class1" /> Class 1 to 2
    </label>
    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
      <input className="User_radio__Zd0k2" type="checkbox" value="class2" name="class2" /> Class 3 to 4
    </label>
    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
      <input className="User_radio__Zd0k2" type="checkbox" value="class3" name="class3" /> Class 5 to 7
    </label>
    <label className="radio-inline mb-3 block text-sm font-medium text-black dark:text-white">
      <input className="User_radio__Zd0k2" type="checkbox" value="class4" name="class4" /> Class 8 to 9
    </label>
    <span className="text-danger"></span>
  </div>
</div>



<div className="field pt-5">
  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
    Upload File
  </label>
  <input
    className={`form-control mt-2 w-full ${styles["f-13"]}`}
    type="file"
    name="file"
    id="file"
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

export default NoticeForm;
