import './styles/styles.css';

import { getData } from './module/data.js';

const card = document.querySelector('.list-items .card');
getData().then((data) => {
  data.meals.forEach((item) => {
    card.innerHTML += `
    <li>
          <div class="card-image">
            <img src="${item.strMealThumb}" alt="">
          </div>
          <div class="card-title">
            <span><h3>${item.strMeal}</h3></span>
            <span class="material-symbols-outlined">favorite</span>
            <span>5 likes</span>
          </div>
          <div class="card-footer">
            <span>Comments</span>
            <span>Reservations</span>
          </div>
        </li>
    `;
  });
});
