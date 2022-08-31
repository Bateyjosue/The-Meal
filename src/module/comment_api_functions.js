const fetchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s';

const getMeals = async () => {
  const request = new Request(fetchUrl);
  const response = await fetch(request);
  const responseText = await response.json();
  return responseText;
};

export default getMeals;