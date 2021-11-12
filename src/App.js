import { useState } from "react";
import "./style.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const searchForecastWeather = () => {
    fetch(`
    https://api.weatherapi.com/v1/current.json?key=71cb9d6ee141459c9c311223212110&q=${city}&lang=pt
    `)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setWeatherForecast(data);
      });
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md bg-dark mb-4">
        <h3 className="navbar-brand text-white" href="#search">
          EBAC Weather
        </h3>
      </nav>

      <main className="container" id="search">
        <div className="jumbotron text-center shadow-lg">
          <h2>Verifique agora a previsão do tempo na sua cidade</h2>
          <p className="lead">
            Digite a sua cidade no campo abaixo e em seguida clique em pesquisar
          </p>

          <div className="mb-4">
            <input
              type="text"
              className="form-control col-lg-4 col-md-6 col-sm-2 mx-auto"
              value={city}
              onChange={handleCityChange}
            />

            <button
              className="btn btn-md btn-primary mt-2"
              onClick={searchForecastWeather}
            >
              Pesquisar
            </button>
          </div>

          {weatherForecast ? (
            <div className="mt-4 d-flex align-itens-center">
              <div className="col-sm-8 mx-auto mr-5">
                <h2 className="lead">{weatherForecast.location.name}, {weatherForecast.location.region}</h2>
                <img
                  src={weatherForecast.current.condition.icon}
                  alt="Weather Icon"
                />
                <h3 className="mt-2">
                  Hoje o dia está: {weatherForecast.current.condition.text}
                </h3>
                <p className="lead">Temp: {weatherForecast.current.temp_c}ºC</p>
                <hr/>
                <h3 className="mt-2">Direção do Vento:</h3>
                <p className="lead">{weatherForecast.current.wind_dir}</p>
                <hr/>
                <h3 className="mt-2">Umidade:</h3>
                <p className="lead">{weatherForecast.current.humidity}%</p>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
