import './styles/styles.css';
import createCommentPop from './module/comment_display_generation.js';
import getMeals from './module/comment_api_functions.js';

const body = document.querySelector('body');

body.addEventListener('click', (event) => {
  if (event.target.classList.contains('comment')) {
    const mealCard = event.target.parentElement.parentElement;
    const mealId = mealCard.id;
    getMeals()
      .then((response) => {
        const data = response.meals;
        body.appendChild(createCommentPop(mealId, data));
      });
  }
});