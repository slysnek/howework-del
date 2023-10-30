import Controller from './controller';
import Fetch from './fetchApi';
import { AddTaskForm, IAddTask } from './types';
import XMLHTTP from './xmlHTTP';

const url = new URL('http://37.220.80.108/tasks');

let controller = new Controller(url, new XMLHTTP());

const select = document.querySelector('.select') as HTMLSelectElement;
const getDataButton = document.querySelector('.get-data-button') as Element;
const addDataButton = document.querySelector('.add-data-button') as Element;
const changeDataButton = document.querySelector('.change-data-button') as Element;
const changeInfoButton = document.querySelector('.change-info-button') as Element;
const deleteDataButton = document.querySelector('.delete-data-button') as Element;

const list = document.querySelector('.list') as Element;

select.addEventListener('change', (e) => {
  if (e.target) {
    changeFetcher((e.target as HTMLSelectElement).value);
  }
});
getDataButton.addEventListener('click', displayTask);
addDataButton.addEventListener('click', addTask);
changeDataButton.addEventListener('click', changeTask);
changeInfoButton.addEventListener('click', changeTaskPartially);
deleteDataButton.addEventListener('click', deleteTask);

function changeFetcher(fetchType: string): void {
  console.log(fetchType);
  controller = fetchType === 'Fetch' ? new Controller(url, new Fetch()) : new Controller(url, new XMLHTTP());
  console.log(controller);
}

function displayTaskInfo(innerList: HTMLUListElement): void {
  innerList.classList.contains('hidden') ? innerList.classList.remove('hidden') : innerList.classList.add('hidden');
}

async function displayTask(): Promise<void> {
  list.innerHTML = '';
  const data = await controller.getData();
  console.log(data);
  data.map((task) => {
    const taskElement = document.createElement('li');
    const innerList = document.createElement('ul');
    const info = document.createElement('li');
    const isCompleted = document.createElement('li');
    const isImportant = document.createElement('li');
    const id = document.createElement('li');

    taskElement.classList.add('list-element');
    innerList.classList.add('hidden');

    taskElement.textContent = task.name;
    info.textContent = `Info: ${task.info}`;
    isCompleted.textContent = `Completed: ${task.isCompleted}`;
    isImportant.textContent = `Important: ${task.isImportant}`;
    id.textContent = `Id: ${task.id}`;

    taskElement.appendChild(innerList);
    innerList.appendChild(info);
    innerList.appendChild(isCompleted);
    innerList.appendChild(isImportant);
    innerList.appendChild(id);

    taskElement.addEventListener('click', () => {
      displayTaskInfo(innerList);
    });

    list.appendChild(taskElement);
  });
}

async function addTask(): Promise<void> {
  const form = document.querySelector('.add-form') as HTMLFormElement;
  if (form.checkValidity()) {
    list.innerHTML = '';

    form.addEventListener('submit', (e) => e.preventDefault());
    const formData = new FormData(form);
    const isImportant = document.querySelector('#isImportant') as HTMLInputElement;
    const isCompleted = document.querySelector('#isCompleted') as HTMLInputElement;

    formData.append('isImportant', isImportant.checked ? 'true' : 'false');
    formData.append('isCompleted', isCompleted.checked ? 'true' : 'false');

    const formDataObject: AddTaskForm = {};

    formData.forEach((val, key) => {
      formDataObject[key as keyof AddTaskForm] = String(val);
    });

    const data = await controller.addData(formDataObject);

    console.log(data);
    const taskElement = document.createElement('p');
    taskElement.textContent = `Created task with title "${data.name}", body "${data.info}", id ${data.id}. Important: ${data.isImportant}. Completed: ${data.isCompleted}`;
    list.appendChild(taskElement);

    form.reset();
  }
}

async function changeTask() {
  const form = document.querySelector('.change-form');
  if (form.checkValidity()) {
    list.innerHTML = '';

    form.addEventListener('submit', (e) => e.preventDefault());
    const formData = new FormData(form);
    const isImportant = document.querySelector('#isStillImportant');
    const isCompleted = document.querySelector('#isStillCompleted');

    formData.append('isImportant', isImportant.checked ? true : false);
    formData.append('isCompleted', isCompleted.checked ? true : false);

    const formDataObject = {};

    formData.forEach((val, key) => {
      formDataObject[key] = val;
    });

    const data = await controller.changeData(
      formDataObject.id,
      formDataObject.name,
      formDataObject.info,
      formDataObject.isCompleted,
      formDataObject.isImportant
    );

    console.log(data);
    const taskElement = document.createElement('p');
    taskElement.textContent = `Changed task with id "${data.id}". New name: "${data.name}", new info:  "${data.info}". Important: ${data.isImportant}. Completed: ${data.isCompleted}`;
    list.appendChild(taskElement);

    form.reset();
  }
}

async function changeTaskPartially() {
  const form = document.querySelector('.change-partially-form');
  if (form.checkValidity()) {
    list.innerHTML = '';

    form.addEventListener('submit', (e) => e.preventDefault());
    const formData = new FormData(form);

    const formDataObject = {};

    formData.forEach((val, key) => {
      formDataObject[key] = val;
    });

    const data = await controller.changeDataPartially(formDataObject.info, formDataObject.id);

    console.log(data);
    const taskElement = document.createElement('p');
    taskElement.textContent = `Changed info for task with id "${data.id} partially". New info: "${data.info}".`;
    list.appendChild(taskElement);

    form.reset();
  }
}

async function deleteTask() {
  const form = document.querySelector('.delete-form');
  if (form.checkValidity()) {
    list.innerHTML = '';

    form.addEventListener('submit', (e) => e.preventDefault());

    const formData = new FormData(form);
    const taskIdToDelete = formData.get('id');
    const data = await controller.deleteData(taskIdToDelete);
    console.log(data);

    const taskElement = document.createElement('p');
    taskElement.textContent = `Task with id ${taskIdToDelete} is deleted`;
    list.appendChild(taskElement);
  }
}
