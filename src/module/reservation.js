const showReservations = (e) => {
  const popup = document.createElement('div');
  document.body.appendChild(popup);

  popup.style.height = '100%';
  popup.style.width = '100%';
  popup.style.position = 'fixed';
  popup.style.top = '0';
  popup.style.left = '0';
  popup.style.backgroundColor = 'rgba(0,0,0,0.3)';
  popup.style.zIndex = '1';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.style.flexDirection = 'row';
  popup.style.padding = '20px';
  popup.style.borderRadius = '10px';
  popup.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.3)';
  popup.style.overflowY = 'auto';

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
    const tags = data.meals[0].strTags;
    popup.classList.add('popup');
    popup.innerHTML = `
    <img class = "popup-Images" src="${mealImage}" alt="Food Image">
    <div class="popup-inner" id="start">
        <article class="popup-header">
            <button id="end">close</button>
        </article>
        <article class="popup-body">
            <h2 class ="mealName">${mealName}</h2>
            <div class="card-tags">
                <ul class = "popDet">
                <li>Country : ${data.meals[0].strArea}</li>
                <li>Catogory : ${data.meals[0].strCategory}</li>
                </ul>
                <ul class = "popDet2">
                <li class = "popup-Tags"> MealTags : ${tags}</li>
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
      totalReservationsOnMeal.innerHTML = '<h3> No Reservations On this Meal </h3>';
    } else {
      totalReservationsOnMeal.innerHTML = `
        <h3>Total Reservations on this Meal : ${total}</h3>
        `;
    }
    const parentNode = document.querySelector('.popup-body');
    const refrenceNode = document.querySelector('.card-tags');
    parentNode.insertBefore(totalReservationsOnMeal, refrenceNode);
  });
};
module.exports = showReservations;