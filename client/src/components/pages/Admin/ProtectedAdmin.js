import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AutContext";

function Admin() {
  const { user } = useAuth();
  return (
    <>
      {user.role !== "admin" && <Navigate to="/" />}
      <Outlet />
    </>
  );
}

export default Admin;
