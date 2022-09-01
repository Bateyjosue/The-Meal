import './styles/styles.css';

import getData, { getLikesData } from './module/data.js';

const card = document.querySelector('.list-items .card');
const data = await getData();
data.meals.forEach((item) => {
  card.innerHTML += `
  <li id="${item.idMeal}">
        <div class="card-image">
          <img src="${item.strMealThumb}" alt="${item.strMeal}">
        </div>
        <div class="card-title">
          <span><h2>${item.strMeal}</h2></span>
          <span class="material-symbols-outlined">favorite</span>
          <span class="like">
          0 Like
          </span>
        </div>
        <div class="card-footer">
          <button type="button" class="comment">Comments<button>
          <button type="button" id="Reserve">Reservations</button>
        </div>
      </li>
  `;
});

const likes = await getLikesData();
const span = document.querySelectorAll('.like');

span.forEach((sp) => likes.filter((like) => {
  if (parseInt(sp.parentNode.parentNode.id, 10) === like.item_id) {
    sp.innerHTML = `
      <strong>${like.likes}</strong> Likes
    `;
  }
  return 0;
}));