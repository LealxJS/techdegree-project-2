/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const header = document.querySelector('.header');
const paginationList = document.querySelector('.link-list');
const ul = document.querySelector('.student-list');

const itemsPerPage = 9;

// createElement() creates the element to be used that accepts a property and a value.

function createElement(elementName, property = null, value = null) {
   const element = document.createElement(elementName);
   element[property] = value;

   return element;
}

function createSearchBar(field) {

   const label = createElement('label', 'className', 'student-search');
   label.htmlFor = 'search';

   const searchSpan = createElement('span', 'textContent', 'Search by name');
   const searchBar = createElement('input', 'placeholder', 'Search by name...');
   searchBar.id = 'search';

   const button = createElement('button', 'type', 'button');
   button.innerHTML = '<img src="img/icn-search.svg" alt="Search icon">';

   label.appendChild(searchSpan);
   label.appendChild(searchBar);
   label.appendChild(button);

   field.appendChild(label);
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {

   const firstItem = (page * itemsPerPage) - itemsPerPage;
   const lastItem = (page * itemsPerPage);
   

   for (i = 0; i < list.length; i++) {

      if (i >= firstItem && i < lastItem ) {
        
         const li = createElement('li', 'className', 'student-item cf');
        
         const studentDiv = createElement('div', 'className', 'student-details');
         const img = createElement('img', 'className', 'avatar');
         const name = createElement('h3');
         const email = createElement('span', 'className', 'email');

         const fullName = `${list[i].name.first} ${list[i].name.last}`;

         img.src = list[i].picture.thumbnail;
         name.textContent = fullName;
         email.textContent = list[i].email;

         studentDiv.appendChild(img);
         studentDiv.appendChild(name);
         studentDiv.appendChild(email);

         const joinDiv = createElement('div', 'className', 'joined-details');
         const joinSpan = createElement('span', 'className', 'date');

         joinSpan.textContent = list[i].registered.date;
         joinDiv.appendChild(joinSpan);

         li.appendChild(studentDiv);
         li.appendChild(joinDiv);

         ul.appendChild(li);
      }
   }
}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {

   const numberOfBtn = Math.ceil(list.length/itemsPerPage);
   

   for (let i = 1; i <= numberOfBtn; i++) {
      const li = createElement('li');
      const button = createElement('button', 'type', 'button');

      button.textContent = i;
      li.appendChild(button);
      paginationList.appendChild(li);
   }
   document.querySelector('li').firstChild.className = 'active';

}

function paginationListener(value) {
   paginationList.addEventListener('click', (e) => {
      const activeBTN = document.querySelector('button.active');
   
      if(e.target.tagName === 'BUTTON') {
         const button = e.target;
         activeBTN.className = '';
         button.className = 'active';
         ul.innerHTML = '';
   
         showPage(value, button.textContent);
      }
   
   })
}

// Call functions
createSearchBar(header);

header.addEventListener('keyup', () => {
   const searchBar = document.querySelector('input#search');

   const userInput = searchBar.value.toLowerCase();
   ul.innerHTML = '';
   paginationList.innerHTML = '';

   const newData = [];

   for (i = 0; i < data.length; i++) {
      const fullName = `${data[i].name['first']} ${data[i].name['last']}`;

      const testName = fullName.toLowerCase();

      if (testName.includes(userInput)) {
         newData.push(data[i]);
      }
   }

   if (newData.length > 0) {
      
      addPagination(newData);
      showPage(newData, 1);
      paginationListener(newData);

   } else {
      const html = `<h3> NO RESULTS FOUND...`;
      ul.innerHTML += html;
      paginationList.innerHTML = '';
   }

})

addPagination(data);
showPage(data, 1);
paginationListener(data);



