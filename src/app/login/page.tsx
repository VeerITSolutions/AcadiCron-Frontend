"use client"; // Add this at the top of the file
import { useState } from "react";
import { useRouter } from "next/navigation"; // This replaces `useRouter` from 'next/router' in the app directory
import LogoutButton from "@/components/LogoutButton";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Fade, Slide } from "react-awesome-reveal";
import styled from "styled-components";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
/* import { Metadata } from "next"; */
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Cookies from "js-cookie";
import { checkLogin } from "@/services/loginService";
import styles from "./page.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const StyledWrapper = styled.div`
    .button {
      --h-button: 48px;
      --w-button: 102px;
      --round: 0.75rem;
      cursor: pointer;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: all 0.25s ease;
      background: radial-gradient(
          65.28% 65.28% at 50% 100%,
          rgba(223, 113, 255, 0.8) 0%,
          rgba(223, 113, 255, 0) 100%
        ),
        linear-gradient(0deg, #7a5af8, #7a5af8);
      border-radius: var(--round);
      border: none;
      outline: none;
      padding: 12px 18px;
    }
    .button::before,
    .button::after {
      content: "";
      position: absolute;
      inset: var(--space);
      transition: all 0.5s ease-in-out;
      border-radius: calc(var(--round) - var(--space));
      z-index: 0;
    }
    .button::before {
      --space: 1px;
      background: linear-gradient(
        177.95deg,
        rgba(255, 255, 255, 0.19) 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    .button::after {
      --space: 2px;
      background: radial-gradient(
          65.28% 65.28% at 50% 100%,
          rgba(223, 113, 255, 0.8) 0%,
          rgba(223, 113, 255, 0) 100%
        ),
        linear-gradient(0deg, #7a5af8, #7a5af8);
    }
    .button:active {
      transform: scale(0.95);
    }

    .fold {
      z-index: 1;
      position: absolute;
      top: 0;
      right: 0;
      height: 1rem;
      width: 1rem;
      display: inline-block;
      transition: all 0.5s ease-in-out;
      background: radial-gradient(
        100% 75% at 55%,
        rgba(223, 113, 255, 0.8) 0%,
        rgba(223, 113, 255, 0) 100%
      );
      box-shadow: 0 0 3px black;
      border-bottom-left-radius: 0.5rem;
      border-top-right-radius: var(--round);
    }
    .fold::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 150%;
      height: 150%;
      transform: rotate(45deg) translateX(0%) translateY(-18px);
      background-color: #e8e8e8;
      pointer-events: none;
    }
    .button:hover .fold {
      margin-top: -1rem;
      margin-right: -1rem;
    }

    .points_wrapper {
      overflow: hidden;
      width: 100%;
      height: 100%;
      pointer-events: none;
      position: absolute;
      z-index: 1;
    }

    .points_wrapper .point {
      bottom: -10px;
      position: absolute;
      animation: floating-points infinite ease-in-out;
      pointer-events: none;
      width: 2px;
      height: 2px;
      background-color: #fff;
      border-radius: 9999px;
    }
    @keyframes floating-points {
      0% {
        transform: translateY(0);
      }
      85% {
        opacity: 0;
      }
      100% {
        transform: translateY(-55px);
        opacity: 0;
      }
    }
    .points_wrapper .point:nth-child(1) {
      left: 10%;
      opacity: 1;
      animation-duration: 2.35s;
      animation-delay: 0.2s;
    }
    .points_wrapper .point:nth-child(2) {
      left: 30%;
      opacity: 0.7;
      animation-duration: 2.5s;
      animation-delay: 0.5s;
    }
    .points_wrapper .point:nth-child(3) {
      left: 25%;
      opacity: 0.8;
      animation-duration: 2.2s;
      animation-delay: 0.1s;
    }
    .points_wrapper .point:nth-child(4) {
      left: 44%;
      opacity: 0.6;
      animation-duration: 2.05s;
    }
    .points_wrapper .point:nth-child(5) {
      left: 50%;
      opacity: 1;
      animation-duration: 1.9s;
    }
    .points_wrapper .point:nth-child(6) {
      left: 75%;
      opacity: 0.5;
      animation-duration: 1.5s;
      animation-delay: 1.5s;
    }
    .points_wrapper .point:nth-child(7) {
      left: 88%;
      opacity: 0.9;
      animation-duration: 2.2s;
      animation-delay: 0.2s;
    }
    .points_wrapper .point:nth-child(8) {
      left: 58%;
      opacity: 0.8;
      animation-duration: 2.25s;
      animation-delay: 0.2s;
    }
    .points_wrapper .point:nth-child(9) {
      left: 98%;
      opacity: 0.6;
      animation-duration: 2.6s;
      animation-delay: 0.1s;
    }
    .points_wrapper .point:nth-child(10) {
      left: 65%;
      opacity: 1;
      animation-duration: 2.5s;
      animation-delay: 0.2s;
    }

    .inner {
      z-index: 2;
      gap: 6px;
      position: relative;
      width: 100%;
      color: white;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
      transition: color 0.2s ease-in-out;
    }

    .inner svg.icon {
      width: 18px;
      height: 18px;
      transition: fill 0.1s linear;
    }

    .button:focus svg.icon {
      fill: white;
    }
    .button:hover svg.icon {
      fill: transparent;
      animation:
        dasharray 1s linear forwards,
        filled 0.1s linear forwards 0.95s;
    }
    @keyframes dasharray {
      from {
        stroke-dasharray: 0 0 0 0;
      }
      to {
        stroke-dasharray: 68 68 0 0;
      }
    }
    @keyframes filled {
      to {
        fill: white;
      }
    }
  `;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const data = await checkLogin(email, password);

    if (data.token) {
      // Save token and redirect to dashboard
      localStorage.setItem("token", data.token);

      localStorage.setItem("username", data.users.name);
      localStorage.setItem("surname", data.users.surname);

      // Access the first role in the roles array
      const role = data.users.roles[0];

      Cookies.set("token", data.token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      Cookies.set("erp", "true", {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      if (role) {
        localStorage.setItem("user_id", data.users.user_id);
        localStorage.setItem("user_data", JSON.stringify(data.users.user_data));
        localStorage.setItem("role_id", role.id);

        localStorage.setItem("role_name", role.name);
        localStorage.setItem("is_superadmin", role.is_superadmin);
      }

      router.push("/");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className="login-box flex flex-wrap items-center dark:bg-boxdark">
        <div className=" w-full ">
          <div className="text-center">
            <Link className="mb-5.5 inline-block" href="/">
              <Image
                className="hidden dark:block"
                src={"/images/logo/logo.svg"}
                alt="Logo"
                width={176}
                height={32}
              />
              <Image
                className="dark:hidden"
                src={"/images/logo/logo3.png"}
                alt="Logo"
                width={176}
                height={32}
              />
            </Link>
            <div className="col-md-6">
              {/* <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Admin Login
              </h2> */}

              <form
                onSubmit={handleSubmit}
                className={`${styles.login} dark:bg-boxdark`}
              >
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your email Or Username"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      /* value="pranay.l@veerit.com" */
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder=""
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      /* value={12345} */
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <StyledWrapper>
                    <button
                      type="submit"
                      className="button w-full cursor-pointer rounded-lg"
                    >
                      <span className="fold" />
                      <div className="points_wrapper">
                        <i className="point" />
                        <i className="point" />
                        <i className="point" />
                        <i className="point" />
                        <i className="point" />
                        <i className="point" />
                        <i className="point" />
                        <i className="point" />
                        <i className="point" />
                        <i className="point" />
                      </div>
                      <span className="inner">
                        <svg
                          className="icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                        >
                          <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37" />
                        </svg>
                        Login
                      </span>
                    </button>
                  </StyledWrapper>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
