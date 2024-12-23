"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import "./not-found.css";

import { useGlobalState } from "@/context/GlobalContext";

export default function Home() {
  const { themType, setThemType } = useGlobalState(); //

  /* themType === "dark" ? darkTheme : lightTheme */
  return (
    <>
      <section
        className={`page_404 ${themType === "dark" ? "dark-theme" : ""}`}
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center">404</h1>
                </div>
                <div className="content_box_404">
                  <h3 className="h2">Looks like you're lost</h3>
                  <p>The page you are looking for is not available!</p>
                  <a href="/" className="link_404">
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
