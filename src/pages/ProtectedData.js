import { useEffect, useState } from "react";
import { getAuthHeaders } from "../utils/api";

function ProtectedData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const response = await fetch("https://fakestoreapi.com/products", {
        headers: getAuthHeaders(),
      });

      const result = await response.json();
      setData(result);
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Protected API Data</h1>

      {data?.slice(0, 5).map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProtectedData;