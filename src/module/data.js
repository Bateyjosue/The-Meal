const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
export const appID = 'lrtXrGQjVDOjVbLsfzj1';
const baseUrlLikes = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes/`;

const getData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const postDataLikes = async (idMeal) => {
  const like = { item_id: idMeal };
  const response = await fetch(`${baseUrlLikes}`,
    {
      method: 'POST',
      body: JSON.stringify(like),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  return response;
};

export const getLikesData = async () => {
  const response = await fetch(`${baseUrlLikes}`);
  const data = await response.json();
  return data;
};

export default getData;
