// pages/dashboard.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import LogoutButton from "../components/LogoutButton";
const Dashboard: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, redirect to login page
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the protected dashboard page!</p>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
