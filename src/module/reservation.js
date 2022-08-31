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
  popup.style.flexDirection = 'column';
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
    <div class="popup-inner" id="start">
        <article class="popup-header">
            <h2 class ="mealName">${mealName}</h2>
            <button id="end">close</button>
        </article>
        <article class="popup-body">
            <img class = "popup-Images" src="${mealImage}" alt="Food Image">
            <p class = "popup-Tags"> -Tags : ${tags}</p>

       </article>
       <article class"popup-footer">
         <h3 id ="headForm"> Make a Reservation </h3>
         <form class="form-inline">
         <input type="name" class="form-control" placeholder="Your Name"></input>
         <label for="date">Start Date</label>
            <input type="date" class="form-control" id="start-date"></input>
            <label for="date">End Date</label>
            <input type = "date" class="form-control" id="end-date"></input>
            <button type = "submit" class="btn btn-primary" id="submitReservation">Reserve!</button>

    `;
    const currentReservations = document.createElement('ul');
    currentReservations.classList.add('res');
    popup.appendChild(currentReservations);
    const url2 = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/FXMctN9lLmEpmOxXkx1x/reservations?item_id=${idMeal}`;
    const getRes = async () => {
      const res = await fetch(url2);
      const info = await res.json();
      return info;
    };
    getRes().then((res) => res.forEach((item) => {
      if (item) {
        currentReservations.innerHTML += `
         <li>${item.username} Made a Reservation on ${item.date_start} till ${item.date_end}</li>
        `;
      } else {
        currentReservations.innerHTML += `
            <div class="Throw-Error">
             <h3> There are no Current Reservations For this Item!</h3>
             </div>
             `;
      }
    }));
    const end = document.querySelector('#end');
    end.addEventListener('click', () => {
      document.querySelector('body').removeChild(popup);
    });
  });
};
module.exports = showReservations;