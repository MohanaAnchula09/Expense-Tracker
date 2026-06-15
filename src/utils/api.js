export const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    };
  };