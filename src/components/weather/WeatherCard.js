const WeatherCard = ({data}) => {
    return(
        <div className="card">
            <h2>{data.name}</h2>
            <p>Temperature:{data.main.temp}</p>
            <p>Humidity:{data.main.humidity}</p>
            <p>Wind:{data.wind.speed}</p>
            <p>Condition:{data.weather[0].description}</p>
        </div>
    )
}
export default WeatherCard;