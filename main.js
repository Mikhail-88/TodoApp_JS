'use strict';

const section = document.querySelector('#todoApp');
const array = [
  { id: 1, title: 'HTML', completed: true },
  { id: 2, title: 'CSS', completed: true },
  { id: 3, title: 'JavaScript', completed: false },
];

createTodoApp(section, array);

function createTodoApp(element, todos = []) {
  element.innerHTML = `
    <div class='todo-app'>
      <form class='todo-app__form'>
        <input type='text' class='todo-app__field'>
      </form>
      <ul class='todo-app__list'></ul>
      <p class='todo-app__info'>Items left 0 of 0</p>
    </div>
  `;

  const listElem = element.querySelector('.todo-app__list');
  const infoElem = element.querySelector('.todo-app__info');
  const formElem = element.querySelector('.todo-app__form');
  const fieldElem = element.querySelector('.todo-app__field');

  formElem.addEventListener('submit', (e) => {
    e.preventDefault();

    addTodo(fieldElem.value);

    fieldElem.value = '';
  });

  listElem.addEventListener('change', (e) => {
    const todoElem = e.target.closest('.todo-app__item');
    const todoId = +todoElem.dataset.id;
    const todo = todos.find(todo => todo.id === todoId);

    todo.completed = e.target.checked;

    updateInfo();
  });

  listElem.addEventListener('dblclick', (e) => {
    const todoElem = e.target.closest('.todo-app__item');
    const todoId = +todoElem.dataset.id;

    todos = todos.filter(todo => todo.id !== todoId);
    todoElem.remove();

    updateInfo();
  });

  for (const todo of todos) {
    listElem.insertAdjacentHTML('beforeend', renderTodo(todo));
  }

  updateInfo();

  function updateInfo() {
    const unfinishedTodos = todos.filter(todo => !todo.completed);

    infoElem.innerHTML = `Items left ${unfinishedTodos.length} of ${todos.length}`;
  }

  function addTodo(title) {
    const todo = {
      id: todos.length + 1,
      title: title,
      completed: false,
    };

    todos.push(todo);

    listElem.insertAdjacentHTML('beforeend', renderTodo(todo));

    updateInfo();
  }

  function renderTodo(todo) {
    return `
    <li class='todo-app__item' data-id='${todo.id}'>
      <label>
        <input type='checkbox' ${todo.completed ? 'checked' : ''} />
        ${todo.title}
      </label>
    </li>
  `;
  }
}
