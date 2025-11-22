// Mantenha sua chave original ou use esta variável
const apiKey = "e4aeace8b9deda691ff644cf3026acac"; 

function buscarTempo() {
    const city = document.getElementById("city").value;
    const result = document.getElementById("result");
    const errorDiv = document.getElementById("error");

    if (!city) {
        errorDiv.innerHTML = "DIGITE O NOME DE UMA CIDADE.";
        result.innerHTML = "";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                errorDiv.innerHTML = "CIDADE NÃO ENCONTRADA.";
                result.innerHTML = "";
                return;
            }

            errorDiv.innerHTML = "";

            const nomeCidade = data.name;
            const pais = data.sys.country;
            let temp = Math.round(data.main.temp);
            const descricao = data.weather[0].description;
            const humidade = data.main.humidity;
            const nuvens = data.clouds.all; 
            const weatherMain = data.weather[0].main;

            let unidade = "°C";
            if (pais !== "BR") {
                temp = Math.round((temp * 1.8) + 32);
                unidade = "°F";
            }

            let emoji = "☁️";
            switch(weatherMain.toLowerCase()) {
                case 'clear': emoji = "☀️"; break;
                case 'clouds': emoji = "☁️"; break;
                case 'rain': emoji = "🌧️"; break;
                case 'drizzle': emoji = "🌦️"; break;
                case 'thunderstorm': emoji = "⚡"; break;
                case 'snow': emoji = "❄️"; break;
                case 'mist': 
                case 'fog': emoji = "🌫️"; break;
                default: emoji = "🌡️";
            }

            result.innerHTML = `
                <h3>${nomeCidade}, ${pais}</h3>
                <div class="weather-icon">${emoji}</div>
                <div class="temp">${temp}${unidade}</div>
                <div class="details">
                    <p>${descricao.toUpperCase()}</p>
                    <p>UMIDADE: ${humidade}%</p>
                    <p>NUVENS: ${nuvens}%</p>
                </div>
            `;
        })
        .catch(() => {
            errorDiv.innerHTML = "ERRO AO CONECTAR.";
            result.innerHTML = "";
        });
}