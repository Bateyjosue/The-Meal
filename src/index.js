import './styles/styles.css';

import getData from './module/data.js';
import createCommentPop from './module/comment_display_generation.js';
import { getMeals, postComment } from './module/comment_api_functions.js';
import { commentAddSuccess, commentAddError } from './module/comment_response_messages.js';

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
        const addComment = document.querySelector('.comment-btn');
        addComment.addEventListener('click', (event) => {
          event.preventDefault();
          postComment()
            .then((response) => {
              if (response.status === 201) {
                commentAddSuccess();
              } else if (response === 0) {
                commentAddError();
              }
            });
        });
      });
  } else if (event.target.classList.contains('close')) {
    const commentBox = document.querySelector('.modal-container');
    body.removeChild(commentBox);
  }
});
