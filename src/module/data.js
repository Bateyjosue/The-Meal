const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
const appID = '5oMRq53AE4mKSgi6ZQP7';
const baseUrlLikes = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}`;

const getData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const getLikesData = async () => {
  const response = await fetch(`${baseUrlLikes}/likes`);
  const data = await response.json();
  return data;
};

export default getData;