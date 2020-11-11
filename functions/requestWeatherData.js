export default async (lat, lon) => {
  // Variables
  const openWeatherMapsAPIKey = '13402ef7e5719c1591bf1d869b65e359';

  const OpenWeatherMapsRequestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${openWeatherMapsAPIKey}`;
  console.log(OpenWeatherMapsRequestURL);

  return await fetch(OpenWeatherMapsRequestURL)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
};
