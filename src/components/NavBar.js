import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const user = useContext(UserContext);

  return (
    <nav>
      <p>Welcome, {user?.name}</p>
      <Link to="/">Home</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/weather">Weather</Link>
    </nav>
  );
}

export default Navbar;