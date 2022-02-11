let weather = {
    apiKey: "ecf45c7a8aaf72ca8c300045e46763b6",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        ).then((response) => {
            if (!response.ok) {
                alert("No se encontro el clima");
                throw new Error("No se encontro el Clima");
            }
            return response.json();
        })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerText = "Clima en : " + name;
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + "°C";
        document.querySelector('.humidity').innerText = "Humedad: " + humidity + "%";
        document.querySelector('.wind').innerText = "Corriente de Aire: " + speed + "Km/H";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
};

document.querySelector('.search button').addEventListener('click', function () {
    weather.search();
});

document
.querySelector('.search-bar')
.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Cuaxomulco");