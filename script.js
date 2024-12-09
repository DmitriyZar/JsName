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
