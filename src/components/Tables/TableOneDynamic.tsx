import { BRAND } from "@/types/brand";
import Image from "next/image";

const TableOneDynamic = ({ title, headers, brandData }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {title}
      </h4>

      <div className="flex flex-col">
        <div
          className={`grid grid-cols-${headers.length} rounded-sm bg-gray-2 dark:bg-meta-4`}
        >
          {headers.map((header, index) => (
            <div key={index} className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                {header}
              </h5>
            </div>
          ))}
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`${
              key === brandData.length - 1
                ? ""
                : "border-b dark:border-strokedark"
            } grid grid-cols-${headers.length} border-stroke`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.visitors}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">${brand.revenues}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.sales}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 17.25V21h3.75l11.89-11.89-3.75-3.75L3 17.25z" />
                  <path d="M14.12 4.88l3.75 3.75" />
                  <path d="M16.12 2.12l3.75 3.75" />
                </svg>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOneDynamic;
