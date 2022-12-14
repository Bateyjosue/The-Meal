import { appID } from './data.js';

const fetchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s';

const addCommentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments`;

export const getMeals = async () => {
  const request = new Request(fetchUrl);
  const response = await fetch(request);
  const responseText = await response.json();
  return responseText;
};

export const postComment = async () => {
  const userName = document.querySelector('.user-name').value;
  const userComment = document.querySelector('.insight').value;
  if (userName.length > 1 && userComment.length > 2) {
    const mealID = document.querySelector('.modal-content').id;
    const response = await fetch(
      addCommentUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: mealID,
          username: userName,
          comment: userComment,
        }),
      },
    );
    return response;
  }
  return (0);
};

export const getComment = async (mealID) => {
  const getCommentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments?item_id=${mealID}`;
  const request = new Request(getCommentUrl);
  const response = await fetch(request);
  const responseText = await response.json();
  return responseText;
};

export const commentCounter = (arr) => (Array.isArray(arr) ? arr.length : 0);