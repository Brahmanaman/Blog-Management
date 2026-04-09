import { Navigate, Outlet } from "react-router";
import { useBlog } from "../context/BlogContext";

const AuthProtected = () => {
  const { blogCurrentUser } = useBlog();
  if (blogCurrentUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthProtected;
