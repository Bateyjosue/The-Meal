const showReservations = (e) => {
  const popup = document.createElement('div');
  document.body.appendChild(popup);
  popup.classList.add('popUp', 'popUpContainer');

  const idMeal = e.target.parentElement.parentElement.children[0].children[0].innerHTML;
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  const lookup = getData();
  lookup.then((data) => {
    const mealName = data.meals[0].strMeal;
    const mealImage = data.meals[0].strMealThumb;
    const tags = data.meals[0].strTags.split(',');
    popup.classList.add('popup');
    popup.innerHTML = `
    <img class = "popup-Images" src="${mealImage}" alt="Food Image">
    <div class="popup-inner" id="start">
        <article class="popup-header">
            <button id="end"><svg class ="endALl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg></button>
        </article>
        <article class="popup-body">
            <h2 class ="mealName">${mealName}</h2>
            <div class="card-tags">
                <ul class = "popDet">
                <li>Country : ${data.meals[0].strArea}</li>
                <li>Catogory : ${data.meals[0].strCategory}</li>
                </ul>
                <ul class = "popDet2">
                 <div class = "popDet2Head">Tags</div>
                </ul>
            </div>
       </article>
       <article class = "popup-footer">
            <form class="form-inline" id = "makeRes">
                 <h3 id ="headForm"> Make a Reservation </h3>
                <input type="name" class="form-control" placeholder="Your Name" !required></input>
                <label for="date">Start Date</label>
                <input type="date" class="form-control" id="start-date" !required></input>
                <label for="date">End Date</label>
                <input type = "date" class="form-control" id="end-date" !required></input>
                <button type = "submit" class="btn btn-primary" id="submitReservation">Reserve!</button>
            </form>
        </article>
    `;
    const popDet2 = document.querySelector('.popDet2');
    tags.forEach((tag) => {
      const li = document.createElement('li');
      li.innerHTML = tag;
      popDet2.appendChild(li);
    });

    const currentReservations = document.createElement('ul');
    currentReservations.classList.add('res');
    const form = document.querySelector('.popup-footer');
    const inner = document.querySelector('.popup-inner');
    inner.insertBefore(currentReservations, form);
    const url2 = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/FXMctN9lLmEpmOxXkx1x/reservations?item_id=${idMeal}`;
    const getRes = async () => {
      const res = await fetch(url2);
      const info = await res.json();
      return info;
    };
    getRes().then((res) => res.forEach((item) => {
      if (item) {
        currentReservations.innerHTML += `
         <li class = "reservations-list">${item.username} Made a Reservation on ${item.date_start} till ${item.date_end}</li>
        `;
      }
    }));
    const from = document.querySelector('#makeRes');
    from.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#makeRes input[type="name"]').value;
      const start = document.querySelector('#makeRes input[type="date"]').value;
      const end = document.querySelector('#makeRes input[type="date"]').value;
      const url3 = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/FXMctN9lLmEpmOxXkx1x/reservations';
      const postRes = async () => {
        const res = await fetch(url3, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            item_id: idMeal,
            username: name,
            date_start: start,
            date_end: end,
          }),
        });
        const info = await res.json();
        return info;
      };
      postRes();
      const success = document.createElement('div');
      success.classList.add('successMessage');
      success.innerHTML = 'Your Reservation Was Made ';
      const form = document.querySelector('.form-inline');
      form.appendChild(success);
      setTimeout(() => {
        form.removeChild(success);
        window.location.reload();
      },
      3000);
    });
    const end = document.querySelector('#end');
    end.addEventListener('click', () => {
      document.querySelector('body').removeChild(popup);
    });
  });

  const url4 = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/FXMctN9lLmEpmOxXkx1x/reservations?item_id=${idMeal}`;
  const getTotalRes = async () => {
    const res = await fetch(url4);
    const info = await res.json();
    return info;
  };
  getTotalRes().then((res) => {
    const total = res.length;
    const totalReservationsOnMeal = document.createElement('div');
    totalReservationsOnMeal.classList.add('totalReservationsOnMeal');
    if (total === undefined) {
      totalReservationsOnMeal.classList.add('noReservation');
      totalReservationsOnMeal.innerHTML = '<h3> No Reservations On this Meal </h3>';
    } else {
      totalReservationsOnMeal.innerHTML = `
        <h3>Reservations : <span class ="Spani">${total}</span></h3>
        `;
    }
    const parentNode = document.querySelector('.popup-inner');
    const refrenceNode = document.querySelector('.res');
    parentNode.insertBefore(totalReservationsOnMeal, refrenceNode);
  });
};
const reservationCounter = (arr) => (Array.isArray(arr) ? arr.length : 0);
module.exports = { showReservations, reservationCounter };
