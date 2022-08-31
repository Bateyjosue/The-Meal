const fetchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
const apiID = 'FXMctN9lLmEpmOxXkx1x';

const addCommentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiID}/comments`;

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