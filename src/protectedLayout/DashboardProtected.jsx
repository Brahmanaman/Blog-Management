import { useBlog } from "../context/BlogContext";
import { Navigate, Outlet } from "react-router";

const DashboardProtected = () => {
  const { blogCurrentUser } = useBlog();
  if (!blogCurrentUser) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default DashboardProtected;
