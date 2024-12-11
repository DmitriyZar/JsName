const testDiv = document.getElementById("test");

const createUserElement = (userName) => {
  const newElement = document.createElement("div");
  newElement.textContent = userName;
  return newElement;
};

const renderUsers = (users) => {
  const fragment = document.createDocumentFragment();
  users.forEach(user => {
    const newElement = createUserElement(user.name);
    fragment.appendChild(newElement);
  });
  testDiv.appendChild(fragment);
};

const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.statusText}`);
    }
    
    const data = await response.json();
    renderUsers(data);
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
};

fetchData();


const itemsPerPage = 10;
let items = [];
const contentDiv = document.getElementById('content');
const paginationDiv = document.getElementById('pagination');

async function fetchDat() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    items = await response.json();
    renderPage(1);
  } catch (error) {
    contentDiv.innerHTML = `<p>Error loading data: ${error.message}</p>`;
  }
}

function renderPage(page) {
  contentDiv.innerHTML = '';

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  currentItems.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.textContent = item.title;
    contentDiv.appendChild(itemDiv);
  });

  updatePagination(page);
}

function updatePagination(currentPage) {
  paginationDiv.innerHTML = '';

  const totalPages = Math.ceil(items.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = i === currentPage ? 'active' : '';
    button.addEventListener('click', () => renderPage(i));
    paginationDiv.appendChild(button);
  }
}

fetchDat();