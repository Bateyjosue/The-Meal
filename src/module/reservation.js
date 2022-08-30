const showReservations = (e) => {
  const popup = document.createElement('div');
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
    <div class="popup-inner">
        <article class="popup-header">
            <h2 class ="mealName">${mealName}</h2>
            <span class="material-symbols-outlined">close</span>
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
  });
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
};
module.exports = showReservations;