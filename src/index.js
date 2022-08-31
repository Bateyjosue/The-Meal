import './styles/styles.css';

import getData from './module/data.js';
import createCommentPop from './module/comment_display_generation.js';
import getMeals from './module/comment_api_functions.js';

const card = document.querySelector('.list-items .card');
const body = document.querySelector('body');

getData().then((data) => {
  data.meals.forEach((item) => {
    card.innerHTML += `
    <li id="${item.idMeal}">
          <div class="card-image">
            <img src="${item.strMealThumb}" alt="${item.strMeal}">
          </div>
          <div class="card-title">
            <span><h2>${item.strMeal}</h2></span>
            <span class="material-symbols-outlined">favorite</span>
            <span>5 likes</span>
          </div>
          <div class="card-footer">
            <button type="button" class="comment">Comments<button>
            <button type="button" id="Reserve">Reservations</button>
          </div>
        </li>
    `;
  });
});

body.addEventListener('click', (event) => {
  if (event.target.classList.contains('comment')) {
    const mealCard = event.target.parentElement.parentElement;
    const mealId = mealCard.id;
    getMeals()
      .then((response) => {
        const data = response.meals;
        body.appendChild(createCommentPop(mealId, data));
      });
  } else if (event.target.classList.contains('close')) {
    const commentBox = document.querySelector('dialog');
    body.removeChild(commentBox);
  }
});
