const showReservations = () => {
  // create a popup to show Reservations on a particular ID
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `
    <div class="popup-inner">
        <div class="popup-header">
            <h2>Reservations</h2>
            <span class="material-symbols-outlined">close</span>
        </div>
        <div class="popup-body">
       </div>
       <article class"popup-footer">
         <h3> Make a Reservation </h3>
         <form class="form-inline">
         <input type="name" class="form-control" placeholder="Your Name"></input>
         <label for="date">Start Date</label>
            <input type="date" class="form-control" id="start-date"></input>
            <label for="date">End Date</label>
            <input type = "date" class="form-control" id="end-date"></input>
            <button type = "submit" class="btn btn-primary" id="submitReservation">Reserve!</button>

    `;
  document.body.appendChild(popup);
};
module.exports = showReservations;