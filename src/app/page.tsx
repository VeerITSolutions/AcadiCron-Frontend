import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import "../css/globals.css";
import { GlobalProvider } from "@/context/GlobalContext";
export const metadata: Metadata = {
  title: "Era International School",
  description: "Era International School",
};

export default function Home() {
  return (
    <>
      <GlobalProvider>
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      </GlobalProvider>
    </>
  );
}
