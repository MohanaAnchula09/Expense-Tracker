import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Username: {user?.username}</p>
      <p>Token: {user?.token}</p>
      <p>Token Length: {user?.token.length}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;