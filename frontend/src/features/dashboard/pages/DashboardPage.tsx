import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth.store";

const DashboardPage = () => {
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="p-10">
      <h1 className="mb-8 text-3xl font-bold">
        🎉 Welcome to TeamFusion AI Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;