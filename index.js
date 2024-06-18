fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((countries) => {
    countries.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.className = "col-lg-4 col-sm-12";

      const card = document.createElement("div");
      card.className = "card mb-3";

      const cardHeader = document.createElement("div");
      cardHeader.className = "card-header";
      cardHeader.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.common} flag" width="100px" height="100px"> ${country.name.common}`;

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const capital = document.createElement("p");
      capital.textContent = `Capital: ${
        country.capital ? country.capital[0] : "N/A"
      }`;

      const region = document.createElement("p");
      region.textContent = `Region: ${country.region}`;

      const latlng = document.createElement("p");
      latlng.textContent = `Latlng: ${
        country.latlng
          ? country.latlng[0].toLocaleString() +
            ", " +
            country.latlng[1].toLocaleString()
          : "N/A"
      }`;

      const name = document.createElement("p");
      name.textContent = `Name: ${country.name.common}`;

      const countryCode = document.createElement("p");
      countryCode.textContent = `Country Code: ${country.cca2}`;

      const weatherButton = document.createElement("button");
      weatherButton.className = "btn btn-primary";
      weatherButton.textContent = "Click for Weather";

      weatherButton.addEventListener("click", () => {
        const location = country.capital
          ? country.capital[0]
          : country.name.common;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=aaa84a4ee3352573a12eae082ebeb0d3&units=metric`,
          { mode: "cors" }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((weatherData) => {
            const weatherInfo = document.createElement("p");
            weatherInfo.textContent = `Weather: ${weatherData.weather[0].description}, Temperature: ${weatherData.main.temp}°C`;
            cardBody.appendChild(weatherInfo);
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
            const errorInfo = document.createElement("p");
            errorInfo.textContent = `Weather data not available for this location: ${error.message}`;
            cardBody.appendChild(errorInfo);
          });
      });

      cardBody.appendChild(capital);
      cardBody.appendChild(region);
      cardBody.appendChild(latlng);
      cardBody.appendChild(name);
      cardBody.appendChild(countryCode);
      cardBody.appendChild(weatherButton);

      card.appendChild(cardHeader);
      card.appendChild(cardBody);

      countryCard.appendChild(card);

      document.getElementById("country-cards").appendChild(countryCard);
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
