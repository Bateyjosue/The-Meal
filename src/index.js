import './styles/styles.css';

import getData from './module/data.js';

const card = document.querySelector('.list-items .card');
getData().then((data) => {
  data.meals.forEach((item) => {
    console.log(item);
    card.innerHTML += `
    <li>
          <div class="card-image">
          <p class=hideMe>${item.idMeal}</p>
            <img src="${item.strMealThumb}" alt="${item.strMeal}">
          </div>
          <div class="card-title">
            <span><h2>${item.strMeal}</h2></span>
            <span class="material-symbols-outlined">favorite</span>
            <span>5 likes</span>
          </div>
          <div class="card-footer">
            <button id="comment">Comments<button>
            <button id = "Reserve">Reservations</button>
          </div>
        </li>
    `;
  });
});
