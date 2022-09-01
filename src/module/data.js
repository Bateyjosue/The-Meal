const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
const appID = 'lrtXrGQjVDOjVbLsfzj1';
const baseUrlLikes = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}`;

const getData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const postDataLikes = async (idMeal) => {
  const like = { 'item_id': idMeal };
  const set = await fetch(baseUrlLikes,
    {
      method: 'POST',
      body: JSON.stringify(like),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  const result = await set.json();
  return result;
};

export const getLikesData = async () => {
  const response = await fetch(`${baseUrlLikes}/likes/`);
  const data = await response.json();
  return data;
};

export default getData;