"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { editSchSetting, fetchSchSetting } from "@/services/schSetting";
import { toast } from "react-toastify";

/* export const metadata: Metadata = {
  title: "Next.js Settings |",
  description:
    "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
}; */

const Settings = () => {
  // State to manage the uploaded image and its preview
  const [image, setImage] = useState<string | null>("/images/logo/logo2.png");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Set the uploaded image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cancel (reset to default image)
  const handleCancel = () => {
    setImage("/images/logo/logo2.png"); // Reset to default image
  };

  useEffect(() => {
    fetchClassesAndSections();
  }, []);

  const fetchClassesAndSections = async () => {
    try {
      const response = await fetchSchSetting();
      console.log("response", response);
      setFormData(response.data);

      setFormData({
        name: response.data.name,
        biometric: response.data.biometric,
        biometric_device: response.data.biometric_device,
        email: response.data.email,
        phone: response.data.phone,
        address: response.data.address,
        lang_id: response.data.lang_id,
        languages: response.data.languages,
        dise_code: response.data.dise_code,
        date_format: response.data.date_format,
        time_format: response.data.time_format,
        currency: response.data.currency,
        currency_symbol: response.data.currency_symbol,
        is_rtl: response.data.is_rtl,
        is_duplicate_fees_invoice: response.data.is_duplicate_fees_invoice,
        timezone: response.data.timezone,
        session_id: response.data.session_id,
        cron_secret_key: response.data.cron_secret_key,
        currency_place: response.data.currency_place,
        class_teacher: response.data.class_teacher,
        start_month: response.data.start_month,
        attendence_type: response.data.attendence_type,
        image: response.data.image,
        /* admin_logo: response.data.admin_logo, */
        /* admin_small_logo: response.data.admin_small_logo, */
        theme: response.data.theme,
        fee_due_days: response.data.fee_due_days,
        adm_auto_insert: response.data.adm_auto_insert,
        adm_prefix: response.data.adm_prefix,
        adm_start_from: response.data.adm_start_from,
        adm_no_digit: response.data.adm_no_digit,
        adm_update_status: response.data.adm_update_status,
        staffid_auto_insert: response.data.staffid_auto_insert,
        staffid_prefix: response.data.staffid_prefix,
        staffid_start_from: response.data.staffid_start_from,
        staffid_no_digit: response.data.staffid_no_digit,
        staffid_update_status: response.data.staffid_update_status,
        is_active: response.data.is_active,
        online_admission: response.data.online_admission,
        online_admission_payment: response.data.online_admission_payment,
        online_admission_amount: response.data.online_admission_amount,
        online_admission_instruction:
          response.data.online_admission_instruction,
        online_admission_conditions: response.data.online_admission_conditions,
        is_blood_group: response.data.is_blood_group,
        is_student_house: response.data.is_student_house,
        roll_no: response.data.roll_no,
        category: response.data.category,
        religion: response.data.religion,
        cast: response.data.cast,
        mobile_no: response.data.mobile_no,
        student_email: response.data.student_email,
        admission_date: response.data.admission_date,
        lastname: response.data.lastname,
        middlename: response.data.middlename,
        student_photo: response.data.student_photo,
        student_height: response.data.student_height,
        student_weight: response.data.student_weight,
        measurement_date: response.data.measurement_date,
        father_name: response.data.father_name,
        father_phone: response.data.father_phone,
        father_occupation: response.data.father_occupation,
        father_pic: response.data.father_pic,
        mother_name: response.data.mother_name,
        mother_phone: response.data.mother_phone,
        mother_occupation: response.data.mother_occupation,
        mother_pic: response.data.mother_pic,
        guardian_name: response.data.guardian_name,
        guardian_relation: response.data.guardian_relation,
        guardian_phone: response.data.guardian_phone,
        guardian_email: response.data.guardian_email,
        guardian_pic: response.data.guardian_pic,
        guardian_occupation: response.data.guardian_occupation,
        guardian_address: response.data.guardian_address,
        current_address: response.data.current_address,
        permanent_address: response.data.permanent_address,
        route_list: response.data.route_list,
        hostel_id: response.data.hostel_id,
        bank_account_no: response.data.bank_account_no,
        ifsc_code: response.data.ifsc_code,
        bank_name: response.data.bank_name,
        national_identification_no: response.data.national_identification_no,
        local_identification_no: response.data.local_identification_no,
        rte: response.data.rte,
        previous_school_details: response.data.previous_school_details,
        student_note: response.data.student_note,
        upload_documents: response.data.upload_documents,
        staff_designation: response.data.staff_designation,
        staff_department: response.data.staff_department,
        staff_last_name: response.data.staff_last_name,
        staff_father_name: response.data.staff_father_name,
        staff_mother_name: response.data.staff_mother_name,
        staff_date_of_joining: response.data.staff_date_of_joining,
        staff_phone: response.data.staff_phone,
        staff_emergency_contact: response.data.staff_emergency_contact,
        staff_marital_status: response.data.staff_marital_status,
        staff_photo: response.data.staff_photo,
        staff_current_address: response.data.staff_current_address,
        staff_permanent_address: response.data.staff_permanent_address,
        staff_qualification: response.data.staff_qualification,
        staff_work_experience: response.data.staff_work_experience,
        staff_note: response.data.staff_note,
        staff_epf_no: response.data.staff_epf_no,
        staff_basic_salary: response.data.staff_basic_salary,
        staff_contract_type: response.data.staff_contract_type,
        staff_work_shift: response.data.staff_work_shift,
        staff_work_location: response.data.staff_work_location,
        staff_leaves: response.data.staff_leaves,
        staff_account_details: response.data.staff_account_details,
        staff_social_media: response.data.staff_social_media,
        staff_upload_documents: response.data.staff_upload_documents,
        mobile_api_url: response.data.mobile_api_url,
        app_primary_color_code: response.data.app_primary_color_code,
        app_secondary_color_code: response.data.app_secondary_color_code,
        /* app_logo: response.data.app_logo, */
        student_profile_edit: response.data.student_profile_edit,
        start_week: response.data.start_week,
        my_question: response.data.my_question,
      });
    } catch (error: any) {}
  };
  const [formData, setFormData] = useState({
    name: "",
    biometric: 0,
    biometric_device: "",
    email: "",
    phone: "",
    address: "",
    lang_id: "",
    languages: "",
    dise_code: "",
    date_format: "",
    time_format: "",
    currency: "",
    currency_symbol: "",
    is_rtl: "disabled",
    is_duplicate_fees_invoice: 0,
    timezone: "UTC",
    session_id: "",
    cron_secret_key: "",
    currency_place: "before_number",
    class_teacher: "",
    start_month: "",
    attendence_type: 0,
    image: "",
    /* admin_logo: "",
    admin_small_logo: "", */
    theme: "default.jpg",
    fee_due_days: 0,
    adm_auto_insert: 1,
    adm_prefix: "ssadm19/20",
    adm_start_from: "",
    adm_no_digit: 6,
    adm_update_status: 0,
    staffid_auto_insert: 1,
    staffid_prefix: "staffss/19/20",
    staffid_start_from: "",
    staffid_no_digit: 6,
    staffid_update_status: 0,
    is_active: "no",
    online_admission: 0,
    online_admission_payment: "",
    online_admission_amount: 0,
    online_admission_instruction: "",
    online_admission_conditions: "",
    is_blood_group: 1,
    is_student_house: 1,
    roll_no: 1,
    category: "",
    religion: 1,
    cast: 1,
    mobile_no: 1,
    student_email: 1,
    admission_date: 1,
    lastname: 1,
    middlename: 1,
    student_photo: 1,
    student_height: 1,
    student_weight: 1,
    measurement_date: 1,
    father_name: 1,
    father_phone: 1,
    father_occupation: 1,
    father_pic: 1,
    mother_name: 1,
    mother_phone: 1,
    mother_occupation: 1,
    mother_pic: 1,
    guardian_name: 1,
    guardian_relation: 1,
    guardian_phone: 1,
    guardian_email: 1,
    guardian_pic: 1,
    guardian_occupation: 1,
    guardian_address: 1,
    current_address: 1,
    permanent_address: 1,
    route_list: 1,
    hostel_id: 1,
    bank_account_no: 1,
    ifsc_code: "",
    bank_name: "",
    national_identification_no: 1,
    local_identification_no: 1,
    rte: 1,
    previous_school_details: 1,
    student_note: 1,
    upload_documents: 1,
    staff_designation: 1,
    staff_department: 1,
    staff_last_name: 1,
    staff_father_name: 1,
    staff_mother_name: 1,
    staff_date_of_joining: 1,
    staff_phone: 1,
    staff_emergency_contact: 1,
    staff_marital_status: 1,
    staff_photo: 1,
    staff_current_address: 1,
    staff_permanent_address: 1,
    staff_qualification: 1,
    staff_work_experience: 1,
    staff_note: 1,
    staff_epf_no: 1,
    staff_basic_salary: 1,
    staff_contract_type: 1,
    staff_work_shift: 1,
    staff_work_location: 1,
    staff_leaves: 1,
    staff_account_details: 1,
    staff_social_media: 1,
    staff_upload_documents: 1,
    mobile_api_url: "",
    app_primary_color_code: "",
    app_secondary_color_code: "",
    /*   app_logo: "", */
    student_profile_edit: 0,
    start_week: "",
    my_question: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /*  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  }; */

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        ...formData,
        /* class_id: selectedClass,
        section_id: selectedSection, */
      };

      const response = await editSchSetting(data);

      if (response.success == true) {
        toast.success("Edit successful");
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
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          {/* new logic  */}

          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="p-7">
                {Object.keys(formData).map((key) => (
                  <div className="mb-3 w-full" key={key}>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor={key}
                    >
                      {key.replace(/_/g, " ").toUpperCase()}
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name={key}
                      id={key}
                      placeholder={key.replace(/_/g, " ").toUpperCase()}
                      value={formData[key as keyof typeof formData]}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                {/* new logic end  */}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Name
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="Username"
                      id="Username"
                      placeholder="Educron"
                      defaultValue="Educron"
                    />
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Email
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="Username"
                      id="Username"
                      placeholder="Educron@gmail.com"
                      defaultValue="Educron@gmail.com"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Logo</h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center justify-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                      <Image
                        src={image || "/images/logo/logo2.png"} // Show uploaded image or default
                        width={120}
                        height={120}
                        alt="Site Logo"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG, or GIF</p>
                      <p>(max 800 X 800px)</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                      onClick={handleCancel} // Reset to default image on cancel
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
