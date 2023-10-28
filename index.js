import Controller from "./controller.js";

const url = 'https://jsonplaceholder.typicode.com/posts';

const controller = new Controller(url);

const getDataButton = document.querySelector('.get-data-button');
const addDataButton = document.querySelector('.add-data-button');
const changeDataButton = document.querySelector('.change-data-button');
const changeTitleButton = document.querySelector('.change-title-button');
const deleteDataButton = document.querySelector('.delete-data-button');

getDataButton.addEventListener('click', displayData)
addDataButton.addEventListener('click', addData)
changeDataButton.addEventListener('click', changeData)
changeTitleButton.addEventListener('click', changeTitle)
deleteDataButton.addEventListener('click', deleteData)

const list = document.querySelector('.list');
console.log(list);

async function displayData() {
  list.innerHTML = '';
  const data = await controller.getData();
  console.log(data);
  data.map((post) => {
    const postElement = document.createElement('li');
    postElement.textContent = post.title;
    list.appendChild(postElement);
  })
}

async function addData() {
  list.innerHTML = '';
  const data = await controller.addData('Example title', 'Example body', 666);
  console.log(data);
  const postElement = document.createElement('li');
  postElement.textContent = `Created post with title "${data.title}", body "${data.body}", userId ${data.userId}. Post ID: ${data.id}`
  list.appendChild(postElement);
}

async function changeData() {
  list.innerHTML = '';
  const data = await controller.changeData(99, 'new example title', 'new body', 666);
  console.log(data);
  const postElement = document.createElement('li');
  postElement.textContent = `Changed post with ID ${data.id}. New title: "${data.title}", new body: "${data.body}", userId ${data.userId}.`
  list.appendChild(postElement);
}

async function changeTitle() {
  list.innerHTML = '';
  const data = await controller.changeDataPartially('new title partially changed', 50);
  console.log(data);
  const postElement = document.createElement('li');
  postElement.textContent = `Changed post with ID ${data.id}. New title: "${data.title}". User ID: ${data.userId}`
  list.appendChild(postElement);
}

async function deleteData() {
  list.innerHTML = '';
  const data = await controller.deleteData(50);
  console.log(data);
  const postElement = document.createElement('li');
  postElement.textContent = `Deleted post with ID 50`
  list.appendChild(postElement);
}