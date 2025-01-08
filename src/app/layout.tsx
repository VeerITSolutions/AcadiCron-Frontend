"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "@/css/globals.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import ReactDOM from "react-dom";
import { GlobalProvider } from "@/context/GlobalContext";
import { useInitializeLoginDetails } from "@/store/logoStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  if (typeof window !== "undefined") {
    const originalFindDOMNode = ReactDOM.findDOMNode;

    ReactDOM.findDOMNode = function (component) {
      if (component instanceof Element) {
        return component;
      }
      return originalFindDOMNode ? originalFindDOMNode(component) : null;
    };
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1);
  }, []);
  useInitializeLoginDetails();

  return (
    <>
      <GlobalProvider>
        <html lang="en">
          <body suppressHydrationWarning={true}>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {loading ? (
                <>
                  <div className="fullscreen-loader">
                    <div className="loader-spinner"></div>
                  </div>
                  <style jsx>{`
                    .fullscreen-loader {
                      position: fixed;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      background: rgba(
                        0,
                        0,
                        0,
                        0.5
                      ); /* Semi-transparent background */
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      z-index: 1000; /* Ensure it's above all other content */
                    }

                    .loader-spinner {
                      border: 4px solid rgba(0, 0, 0, 0.1);
                      border-left: 4px solid #3498db; /* Spinner color */
                      border-radius: 50%;
                      width: 50px;
                      height: 50px;
                      animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                      0% {
                        transform: rotate(0deg);
                      }
                      100% {
                        transform: rotate(360deg);
                      }
                    }
                  `}</style>
                </>
              ) : (
                children
              )}
            </div>
          </body>
        </html>
      </GlobalProvider>
    </>
  );
}
