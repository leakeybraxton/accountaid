import { useNavigate } from "react-router-dom";

export default function ManagementHome() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={() => navigate("user-registration")}>
        Register User
      </button>
      <button onClick={() => navigate("department-registration")}>
        Register Department
      </button>
      <button onClick={() => navigate("edit-variables")}>
        Company Variables
      </button>
    </div>
  );
}
