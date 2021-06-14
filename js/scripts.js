const gallery = document.getElementById('gallery');
const body = document.body;

/**
* Fetches the data from https://randomuser.me/api
* @param (string) url
*/

fetch('https://randomuser.me/api/?results=12&nat=ca')
  .then(res => res.json())                  //parsing the data to json format
  .then(res => generateGallery(res))
  .then(res => searchEmployee())
  .catch(error => console.log('Oops! Sorry we are unable to fetch data at this moment...', error)) //catches error at console when the site is unavailable and data cannot be fetched

  /**
  * Generates 12 random employee cards and displays it to the browser
  * @param (object) data - data received in json format
  */

function generateGallery(data) {
  const employees = data.results;
  let html = '';
  console.log(employees);
  for(let i = 0; i < employees.length; i++ ) {
    html += `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${employees[i].picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="${employees[i].name}" class="card-name cap">${employees[i].name.first} ${employees[i].name.last}</h3>
            <p class="card-text">${employees[i].email}</p>
            <p class="card-text cap">${employees[i].location.city}, ${employees[i].location.state}</p>
        </div>
    </div>`
  }
  gallery.innerHTML = html;
  const cards = document.querySelectorAll('.card');
  for ( let i = 0; i < cards.length; i++ ) {
      cards[i].addEventListener("click", (e) => {
        console.log(e.target);
        generateModalWindow(employees[i]);
      });
    }
}

/**
* Generates modal window for the selected employee
* @param (object) employee - contains employee info
*/

function generateModalWindow(employee) {
  const modalDiv = document.createElement('div');
  const dob = employee.dob.date;
  const birthday = dob.replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, '$2/$3/$1');    //Regex replace method to get the correct date format
  modalDiv.classList = 'modal-container';
  const modalHtml = `<div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="modal-text">${employee.email}</p>
          <p class="modal-text cap">${employee.location.city}</p>
          <hr>
          <p class="modal-text">${employee.phone}</p>
          <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
          <p class="modal-text">Birthday: ${birthday}</p>
      </div>
  </div>`;
  modalDiv.innerHTML = modalHtml;
  body.appendChild(modalDiv);
  closeModalWindow();     //function call to close the window on button press
}

/**
* Contains event to close the modal window when the button is pressed
*/

function closeModalWindow() {
  document.getElementById('modal-close-btn').addEventListener('click', (e) => {
    body.removeChild(body.lastChild);         //removes the modal window from the dom
  });
}

/**
* Appends the search bar to the DOM
*/

function searchEmployee() {
  let searchHtml = `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
  const searchContainer = document.querySelector('.search-container');
  searchContainer.innerHTML = searchHtml;
}
