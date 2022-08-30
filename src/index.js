import './styles/styles.css';

import getData from './module/data.js';
import showReservations from './module/reservation.js';

const card = document.querySelector('.list-items .card');
getData().then((data) => {
  data.meals.forEach((item) => {
    card.innerHTML += `
    <li>
          <div class="card-image">
          <p class = "hideMe">${item.idMeal}</p>
            <img src="${item.strMealThumb}" alt="Food Image">
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
    item.addEventListener('click', (e) => {
      showReservations(e);
    });
  });
});
