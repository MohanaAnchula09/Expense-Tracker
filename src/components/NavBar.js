// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { UserContext } from "../context/UserContext";

// function Navbar() {
//   const user = useContext(UserContext);

//   return (
//     <nav>
//       <p>Welcome, {user?.name}</p>
//       <Link to="/">Home</Link>
//       <Link to="/expenses">Expenses</Link>
//       <Link to="/movies">Movies</Link>
//       <Link to="/weather">Weather</Link>
//     </nav>
//   );
// }

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {user && <Link to="/dashboard">Dashboard</Link>}

      {!user ? (
        <Link to="/login">Login</Link>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
}

export default Navbar;