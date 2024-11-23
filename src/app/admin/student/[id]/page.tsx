"use client"; // Add this at the top of the file
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import User from "@/components/User/User";
import Image from "next/image";
import { fetchStudentSingleData } from "@/services/studentService";
import { fetchStudentFeesData } from "@/services/studentFeesService";
import { toast } from "react-toastify";
import { createStudentdoc } from "@/services/studentdocService";
import { createStudentTimeline } from "@/services/studentTimelineService";
interface FeeData {
  fees_group: string;
  fees_code: string;
  due_date: string;
  status: string;
  amount: number;
  payment_id?: string;
  mode?: string;
  date?: string;
  discount: number;
  fine: number;
  paid: number;
  balance: number;
}

interface DiscountData {
  code: string;
  amount: number;
  status: string;
  description?: string;
}

interface Props {
  feeData: {
    student_due_fees: FeeData[];
    student_discount_fees: DiscountData[];
    totals: {
      amount: number;
      paid: number;
      discount: number;
      fine: number;
      balance: number;
    };
    currency_symbol: string;
  };
}

const StudentDetails = () => {
  const router = useRouter();
  /* const { id } = useParams(); */

  const [activeTab, setActiveTab] = useState("activity");

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisible2, setIsFormVisible2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleButtonClick2 = () => {
    setIsFormVisible2(!isFormVisible2);
  };

  const [formDataTimeline, setFormDataTimeline] = useState<Record<string, any>>(
    {
      title: "",
      dob: "",
      description: "",
      doc: "",
    },
  );
  const [formData, setFormData] = useState<Record<string, any>>({
    class_name: "",
    section_name: "",
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
    route_id: "",
    school_house_id: "",
    blood_group: "",
    vehroute_id: "",
    hostel_room_id: "",
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
    notes: "",
    first_title: "",
    first_doc: "",
    second_title: "",
    third_title: "",
    fourth_title: "",
    category_name: "",
    // Add other initial fields as needed
  });
  const [feeData, setFeeData] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;

    if (file && name) {
      setFormDataTimeline((prevData) => ({
        ...prevData,
        [name]: file, // Dynamically set the file in formData using the input's name attribute
      }));
    }
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      const data = {
        ...formDataTimeline,
      };

      const response2 = await createStudentTimeline(data);

      if (response2.success == true) {
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormDataTimeline((prevData) => ({
      ...prevData,
      [name]: value, // For regular inputs like text or selects
    }));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = window.location.pathname.split("/").pop();
      if (id) {
        const getData = async () => {
          try {
            const data = await fetchStudentSingleData(id);
            const data2 = await fetchStudentFeesData(id);
            setFeeData(data2);

            setFormData({
              class_name: data.data.class_name,

              section_name: data.data.section_name,
              parent_id: data.data.parent_id,
              admission_no: data.data.admission_no,
              roll_no: data.data.roll_no,
              admission_date: data.data.admission_date,
              firstname: data.data.firstname,
              middlename: data.data.middlename,
              lastname: data.data.lastname,
              rte: data.data.rte,
              image: data.data.image,
              mobileno: data.data.mobileno,
              email: data.data.email,
              state: data.data.state,
              city: data.data.city,
              pincode: data.data.pincode,
              religion: data.data.religion,
              cast: data.data.cast,
              dob: data.data.dob,
              gender: data.data.gender,
              current_address: data.data.current_address,
              permanent_address: data.data.permanent_address,
              category_id: data.data.category_id,
              route_id: data.data.route_id,
              school_house_id: data.data.school_house_id,
              blood_group: data.data.blood_group,
              vehroute_id: data.data.vehroute_id,
              hostel_room_id: data.data.hostel_room_id,
              adhar_no: data.data.adhar_no,
              samagra_id: data.data.samagra_id,
              bank_account_no: data.data.bank_account_no,
              bank_name: data.data.bank_name,
              ifsc_code: data.data.ifsc_code,
              guardian_is: data.data.guardian_is,
              father_name: data.data.father_name,
              father_phone: data.data.father_phone,
              father_occupation: data.data.father_occupation,
              mother_name: data.data.mother_name,
              mother_phone: data.data.mother_phone,
              mother_occupation: data.data.mother_occupation,
              guardian_name: data.data.guardian_name,
              guardian_relation: data.data.guardian_relation,
              guardian_phone: data.data.guardian_phone,
              guardian_occupation: data.data.guardian_occupation,
              guardian_address: data.data.guardian_address,
              guardian_email: data.data.guardian_email,
              father_pic: data.data.father_pic,
              mother_pic: data.data.mother_pic,
              guardian_pic: data.data.guardian_pic,
              is_active: data.data.is_active,
              previous_school: data.data.previous_school,
              height: data.data.height,
              weight: data.data.weight,
              measurement_date: data.data.measurement_date,
              dis_reason: data.data.dis_reason,
              note: data.data.note,
              dis_note: data.data.dis_note,
              app_key: data.data.app_key,
              parent_app_key: data.data.parent_app_key,
              disable_at: data.data.disable_at,
              section_id: data.data.section_id,
              notes: "", // Add other fields as needed
              first_title: "",
              first_doc: "",
              second_title: "",
              third_title: "",
              fourth_title: "",
              category_name: data.data.category_name,
            });
          } catch (error) {
            console.error("Error fetching student data:", error);
          }
        };
        getData();
      }
    }
  }, []);
  let defaultImage = "/images/user/default_male.jpg";

  // Check for gender and default image conditions
  if (
    formData?.gender === "Female" &&
    formData?.image === "uploads/student_images/default_female.jpg"
  ) {
    defaultImage = "/images/user/default_female.jpg";
  } else if (
    formData?.gender === "Male" &&
    formData?.image === "uploads/student_images/default_male.jpg"
  ) {
    defaultImage = "/images/user/default_male.jpg";
  } else {
    defaultImage = `${process.env.NEXT_PUBLIC_BASE_URL}${formData?.image}`;
  }

  // Dynamically construct the image URL
  const imageUrl = `${defaultImage}`;

  let defaultFatherImage = "/images/user/default_male.jpg";

  let defaultFemalImage = "/images/user/default_female.jpg";

  /* let defaultImage = "/images/user/default_male.jpg";

  // Check for gender and default image conditions
  if (
    formData?.gender === "Female" &&
    formData?.image === "uploads/student_images/default_female.jpg"
  ) {
    defaultImage = "/images/user/default_female.jpg";
  } else if (
    formData?.gender === "Male" &&
    formData?.image === "uploads/student_images/default_male.jpg"
  ) {
    defaultImage = "/images/user/default_male.jpg";
  } else {
    defaultImage = `${process.env.NEXT_PUBLIC_BASE_URL}${formData?.image}`;
  } */
  const { student_due_fees, student_discount_fees, totals, currency_symbol } =
    feeData || {};

  return (
    <DefaultLayout>
      <div className="flex flex-wrap">
        {/* Profile Sidebar */}
        <div className="w-full p-2 md:w-1/4">
          <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
            <div className="text-center">
              <img
                src={imageUrl || defaultImage}
                alt="User Profile"
                className="mx-auto h-24 w-24 rounded-full"
              />
              <h3 className="mt-2 text-[20px] font-bold">
                {formData.firstname} {formData.lastname}
              </h3>
            </div>

            <ul className="mt-4 list-none border-stroke p-0 dark:border-strokedark">
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Admission No</b>{" "}
                <span className="text-aqua">{formData.admission_no}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Roll Number</b>{" "}
                <span className="text-aqua"> {formData.roll_no || "N/A"}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Class</b>{" "}
                <span className="text-aqua">
                  {formData.class_name} (2024-25)
                </span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Section</b>{" "}
                <span className="text-aqua">{formData.section_name}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>RTE</b> <span className="text-aqua">{formData.rte}</span>
              </li>
              <li className="flex justify-between border-b border-stroke py-3 dark:border-strokedark">
                <b>Gender</b>{" "}
                <span className="text-aqua">{formData.gender}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Profile Content */}
        <div className="w-full p-2 md:w-3/4">
          <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
            <ul className="mb-4 flex border-b border-stroke dark:border-strokedark">
              <li
                className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "activity" ? "border-b-2 border-blue-500" : ""}`}
                onClick={() => setActiveTab("activity")}
              >
                Profile
              </li>
              <li
                className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "fee" ? "border-b-2 border-blue-500" : ""}`}
                onClick={() => setActiveTab("fee")}
              >
                Fees
              </li>
              <li
                className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "exam" ? "border-b-2 border-blue-500" : ""}`}
                onClick={() => setActiveTab("exam")}
              >
                Exam
              </li>
              <li
                className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "documents" ? "border-b-2 border-blue-500" : ""}`}
                onClick={() => setActiveTab("documents")}
              >
                Documents
              </li>
              <li
                className={`mr-6 cursor-pointer px-4 py-2 ${activeTab === "timelineh" ? "border-b-2 border-blue-500" : ""}`}
                onClick={() => setActiveTab("timelineh")}
              >
                Timeline
              </li>
            </ul>

            {/* Tab Content */}
            {activeTab === "activity" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div
                    className="tab-pane active flex flex-col gap-9"
                    id="activity"
                  >
                    <div className="tshadow mb25 bozero rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-boxdark dark:drop-shadow-none">
                          <tbody>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Admission Date
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 col-md-5 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.admission_date}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Date of Birth
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.dob}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Category
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.category_name}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Mobile Number
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.mobileno}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Caste
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.cast}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Religion
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.religion}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Email
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                {formData.email}
                              </td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Place of Birth
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Nationality
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                Mother Tongue
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                TC Number
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
                            </tr>
                            <tr className="border-b border-stroke dark:border-strokedark">
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white">
                                StudentID CBSE
                              </td>
                              <td className="col-md-4 col-md-4 col-md-4 px-6 py-4 text-sm text-sm text-sm text-sm font-medium font-medium font-medium text-black text-black text-black text-black dark:text-white dark:text-white dark:text-white dark:text-white"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Address
                        </h3>
                      </div>
                      <div className="grid gap-5.5">
                        <div className="overflow-x-auto">
                          <table className="min-w-full border-b border-stroke bg-white dark:bg-boxdark">
                            <tbody>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Current Address
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.current_address}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  {formData.permanent_address}
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Parent / Guardian Details
                        </h3>
                      </div>
                      <div className="grid gap-5.5">
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white dark:bg-boxdark dark:drop-shadow-none">
                            <tbody>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Father Name
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.father_name}
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    className="h-[100px] w-[100px] rounded-full border border-stroke"
                                    src={
                                      formData?.father_pic
                                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${formData.father_pic}`
                                        : defaultFatherImage
                                    }
                                    alt="Profile"
                                  />
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Father Phone
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.father_phone}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Father Occupation
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.father_occupation}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Mother Name
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.mother_name}
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    className="h-[100px] w-[100px] rounded-full border border-stroke"
                                    src={
                                      formData?.father_pic
                                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${formData.mother_pic}`
                                        : defaultFemalImage
                                    }
                                    alt="Profile"
                                  />
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Mother Phone
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.mother_phone}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Mother Occupation
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.mother_occupation}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Guardian Name
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.guardian_name}
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    className="h-[100px] w-[100px] rounded-full border border-stroke"
                                    src={
                                      formData?.father_pic
                                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${formData.guardian_pic}`
                                        : defaultFemalImage
                                    }
                                    alt="Profile"
                                  />
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Guardian Email
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.guardian_email}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Guardian Relation
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.guardian_relation}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Guardian Phone
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.guardian_phone}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Guardian Occupation
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.guardian_occupation}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Guardian Address
                                </td>
                                <td className="px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.guardian_address}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Miscellaneous Details
                        </h3>
                      </div>
                      <div className="grid gap-5.5">
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white dark:bg-boxdark dark:drop-shadow-none">
                            <tbody>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Blood Group
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.blood_group}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Student House
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.school_house_id}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Height
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.height}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Weight
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.weight}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  As on Date
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.admission_date}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Previous School Details
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white"></td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  National Identification Number
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.adhar_no}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Local Identification Number
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.mobileno}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Bank Account Number
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.bank_account_no}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  Bank Name
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.bank_name}
                                </td>
                              </tr>
                              <tr className="border-b border-stroke dark:border-strokedark">
                                <td className="col-md-4 px-6 py-4 text-sm font-medium text-black dark:text-white">
                                  IFSC Code
                                </td>
                                <td className="col-md-5 px-6 py-4 text-sm text-black dark:text-white">
                                  {formData.ifsc_code}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* {activeTab === "fee" && (
              <div className="tab-content mx-auto max-w-screen-2xl p-4">
                <div
                  className="tab-pane active flex flex-col gap-9"
                  id="activity"
                >
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="grid gap-5.5">
                      <div className="overflow-x-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "exam" && (
              <div>
                <h2 className="text-xl font-semibold">Exam Results</h2>
                <div className="alert alert-danger">No Record Found</div>
              </div>
            )} */}

            {activeTab === "fee" && (
              <div className="fees-container">
                {student_due_fees?.length === 0 &&
                student_discount_fees?.length === 0 ? (
                  <div className="alert alert-danger">No record found</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table-hover table-striped table">
                      <thead>
                        <tr>
                          <th>Fees Group</th>
                          <th>Fees Code</th>
                          <th>Due Date</th>
                          <th>Status</th>
                          <th>Amount ({currency_symbol})</th>
                          <th>Payment ID</th>
                          <th>Mode</th>
                          <th>Date</th>
                          <th>Discount ({currency_symbol})</th>
                          <th>Fine ({currency_symbol})</th>
                          <th>Paid ({currency_symbol})</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {student_due_fees?.map((fee: any, index: any) => (
                          <tr
                            key={index}
                            className={
                              fee.balance > 0 &&
                              new Date(fee.due_date) < new Date()
                                ? "danger"
                                : ""
                            }
                          >
                            <td>{fee.fees_group}</td>
                            <td>{fee.fees_code}</td>
                            <td>{fee.due_date || "N/A"}</td>
                            <td>
                              {fee.balance === 0 ? (
                                <span className="label label-success">
                                  Paid
                                </span>
                              ) : fee.paid > 0 ? (
                                <span className="label label-warning">
                                  Partial
                                </span>
                              ) : (
                                <span className="label label-danger">
                                  Unpaid
                                </span>
                              )}
                            </td>
                            <td>{fee.amount?.toFixed(2) || "0.00"}</td>
                            <td>{fee.payment_id || "N/A"}</td>
                            <td>{fee.mode || "N/A"}</td>
                            <td>{fee.date || "N/A"}</td>
                            <td>{fee.discount?.toFixed(2) || "0.00"}</td>
                            <td>{fee.fine?.toFixed(2) || "0.00"}</td>
                            <td>{fee.paid?.toFixed(2) || "0.00"}</td>
                            <td>{fee.balance?.toFixed(2) || "0.00"}</td>
                          </tr>
                        ))}

                        {student_discount_fees?.map(
                          (discount: any, index: any) => (
                            <tr
                              key={`discount-${index}`}
                              className="dark-light"
                            >
                              <td>Discount</td>
                              <td>{discount.code}</td>
                              <td colSpan={3}></td>
                              <td>{discount.status}</td>
                              <td colSpan={5}>
                                {discount.description || "N/A"}
                              </td>
                            </tr>
                          ),
                        )}

                        <tr className="total-bg">
                          <td colSpan={4} className="text-right">
                            Totals
                          </td>
                          <td>
                            {currency_symbol}
                            {totals?.amount?.toFixed(2) || "0.00"}
                          </td>
                          <td colSpan={3}></td>
                          <td>
                            {currency_symbol}
                            {totals?.discount?.toFixed(2) || "0.00"}
                          </td>
                          <td>
                            {currency_symbol}
                            {totals?.fine?.toFixed(2) || "0.00"}
                          </td>
                          <td>
                            {currency_symbol}
                            {totals?.paid?.toFixed(2) || "0.00"}
                          </td>
                          <td>
                            {currency_symbol}
                            {totals?.balance?.toFixed(2) || "0.00"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "documents" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div
                    className="tab-pane active flex flex-col gap-9"
                    id="activity"
                  >
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="p-6">
                        <div className="mb-4 flex justify-end">
                          <button
                            onClick={handleButtonClick}
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
                          >
                            {isFormVisible ? "Close Form" : "Upload Documents"}
                          </button>
                        </div>

                        {/* Table */}
                        <table className="min-w-full border-b border-stroke bg-white dark:bg-boxdark dark:drop-shadow-none">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="border-b border-stroke px-4 py-2 text-left text-sm font-medium dark:border-strokedark">
                                Title
                              </th>
                              <th className="border-b border-stroke px-4 py-2 text-left text-sm font-medium dark:border-strokedark">
                                Name
                              </th>
                              <th className="border-b border-stroke px-4 py-2 text-right text-sm font-medium dark:border-strokedark">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                className="text-red-600 py-4 text-center"
                                colSpan={3}
                              >
                                No Record Found
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "timelineh" && (
              <div>
                <div className="tab-content mx-auto max-w-screen-2xl p-4">
                  <div
                    className="tab-pane active flex flex-col gap-9"
                    id="activity"
                  >
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="p-6">
                        <div className="mb-4 flex justify-end">
                          <button
                            onClick={handleButtonClick2}
                            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
                          >
                            {isFormVisible ? "Close Form" : "Add"}
                          </button>
                        </div>

                        {/* Table */}
                        <table className="mt-6 min-w-full border-b border-stroke bg-white dark:bg-boxdark dark:drop-shadow-none">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="border-b border-stroke px-4 py-2 text-left text-sm font-medium">
                                Title
                              </th>
                              <th className="border-b border-stroke px-4 py-2 text-left text-sm font-medium">
                                Name
                              </th>
                              <th className="border-b border-stroke px-4 py-2 text-right text-sm font-medium">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                className="text-red-600 py-4 text-center"
                                colSpan={3}
                              >
                                No Record Found
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal */}
      {isFormVisible && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={handleButtonClick}
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
              {/* Close Button */}
              <button
                onClick={handleButtonClick}
                className="text-gray-500 hover:text-gray-700 absolute right-2 top-2 text-2xl"
              >
                &times;
              </button>

              {/* Form Content */}
              <h2 className="mb-4 text-lg font-semibold">Upload Documents</h2>
              <form className="rounded-md border border-stroke bg-white p-4 shadow-md dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none">
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Title:
                  </label>
                  <input
                    aria-invalid="false"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                    type="text"
                    name="title"
                  />
                </div>
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Document:
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    name="doc" // Optional: Include name for form data
                    onChange={handleFileChange} // Handle file change separately
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal Popup */}
      {isFormVisible2 && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={handleButtonClick2} // Closes modal when clicking outside
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark dark:drop-shadow-none">
              {/* Close Button */}
              <button
                onClick={handleButtonClick2}
                className="text-gray-500 hover:text-gray-700 absolute right-2 top-2 text-2xl"
              >
                &times;
              </button>

              {/* Form Content */}
              <h2 className="mb-4 text-lg font-semibold">Add Timeline</h2>
              <form className="rounded-md border border-stroke bg-white p-4 shadow-md dark:border-strokedark dark:bg-boxdark dark:drop-shadow-none">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="field">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Title:
                    </label>
                    <input
                      aria-invalid="false"
                      id="title"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                      type="text"
                      name="title"
                      value={formDataTimeline.title}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="field">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Date <span className="required">*</span>
                    </label>
                    <input
                      id="date"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                      type="date"
                      name="dob"
                      value={formDataTimeline.dob}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="field">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Description:
                    </label>
                    <input
                      aria-invalid="false"
                      id="description"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:text-white dark:focus:border-primary"
                      type="text"
                      name="description"
                      value={formDataTimeline.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="field">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Document:
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      name="doc" // Optional: Include name for form data
                      onChange={handleFileChange} // Handle file change separately
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default StudentDetails;
