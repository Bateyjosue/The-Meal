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
  popup.style.height = '100%';
  popup.style.width = '100%';
  popup.style.position = 'fixed';
  popup.style.top = '0';
  popup.style.left = '0';
  popup.style.backgroundColor = 'rgba(0,0,0,0.5)';
  popup.style.zIndex = '1';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.justifyContent = 'center';
  popup.style.flexDirection = 'column';
  popup.style.padding = '20px';
  popup.style.borderRadius = '10px';
  popup.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
};
module.exports = showReservations;