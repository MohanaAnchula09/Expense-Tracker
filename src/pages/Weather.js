import { useState } from "react";
import WeatherCard from "../components/weather/WeatherCard";
import useFetch from "../hooks/useFetch";


const Weather = () =>{
    const [city, setCity] = useState("");
    const [searchCity, setSearchCity] = useState("");

    const apiKey = "686a476e03cb00c58305f76f8a5ec308";

    const url = searchCity
      ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      : null;
    const {data,loading,error} = useFetch(url);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(city.trim() === "") return;
        setSearchCity(city);
    }

    return(
        <div>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter a City"
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error&&<p>{error}</p>}
            {data && data.main && (
                <WeatherCard data={data} />
            )}
        </div>
    )
  
}
export default Weather;