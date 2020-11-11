export default async (lat, lng, currentDate) => {
  let today = '';
  var day = String(currentDate.getDate()).padStart(2, '0');
  var month = String(currentDate.getMonth() + 1).padStart(2, '0');
  var year = currentDate.getFullYear();
  today = `${year}-${month}-${day}`;

  return await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${today}`,
  )
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.results;
    })
    .catch((error) => {
      console.error(error);
    });
};
