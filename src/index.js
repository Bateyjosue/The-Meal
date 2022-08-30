import './styles/styles.css';

import getData from './module/data.js';
import showReservations from './module/reservation.js';
const card = document.querySelector('.list-items .card');
getData().then((data) => {
  data.meals.forEach((item) => {
    card.innerHTML += `
    <li>
          <div class="card-image">
            <img src="${item.strMealThumb}" alt="">
          </div>
          <div class="card-title">
            <span><h2>${item.strMeal}</h2></span>
            <span class="material-symbols-outlined">favorite</span>
            <span>5 likes</span>
          </div>
          <div class="card-footer">
            <button>Comments<button>
            <button class = "Reserve btn btn-primary">Reservations</button>
          </div>
        </li>
    `;
  });
  const reservation = document.querySelectorAll('.btn-primary');
  reservation.forEach((item) => {
    item.addEventListener('click', showReservations);
  });
});
