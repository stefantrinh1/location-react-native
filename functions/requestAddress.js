export default async (lat, lng) => {
  return await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDUgi7jZAwaj0hozqCYURzW5nCKmn11B6U`,
  )
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.results[0]);
      //   return responseJson.results[0].formatted_address;
      return {
        formatted_address: responseJson.results[0].formatted_address,
        postalCode: responseJson.results[0].address_components
          .map((component) => {
            return component.types.includes('postal_code')
              ? component.short_name
              : '';
          })
          .filter((el) => el)[0],
      };
    })
    .catch((error) => {
      console.error(error);
      return '';
    });
};
