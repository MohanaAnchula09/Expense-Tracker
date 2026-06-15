import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (username, password) => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (data.token) {
        const userData = {
          username,
          token: data.token,
          role: username === "mor_2314" ? "admin" : "user",
        };
      
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      
        return true;
      }
  
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}