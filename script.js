'use strict';

let headerInput = document.querySelector('.header-input'),
    plusButton = document.querySelector('.header-button'),
    toDoItem = document.querySelectorAll('.todo-item'),
    toDoRemove = document.querySelectorAll('.todo-remove'),
    toDoComplete = document.querySelectorAll('.todo-complete'),
    toDo = document.querySelector('.todo'),
    toDoCompleted = document.querySelector('.todo-completed'),
    toDoButtons = document.querySelectorAll('.todo-buttons');

let clone = toDoItem[0].cloneNode(true);
toDo.removeChild(toDoItem[0]);
toDoCompleted.removeChild(toDoItem[1]);
let info;
function getInfo () {
  event.preventDefault();
  if(headerInput.value !== ''){
  info = headerInput.value;
  let clons = info;
  localStorage.setItem(clons, info);
  addBusiness();
  headerInput.value = '';
  }
}
function addBusiness () {
  let clone2 = clone.cloneNode(true);
  clone2.innerHTML = info;
  let buttonsClone = toDoButtons[0].cloneNode(true);
  
  clone2.appendChild(buttonsClone);
  toDo.appendChild(clone2);
  buttonsClone.children[0].addEventListener('click', function () {
  if(clone2.parentNode === toDoCompleted) {
    toDoCompleted.removeChild(clone2);
  } else {
    toDo.removeChild(clone2);
  }
  toDoRemove = document.querySelectorAll('.todo-remove');
  })
  buttonsClone.children[1].addEventListener('click', function () {
    toDoRemove = document.querySelectorAll('.todo-remove');
    if(clone2.parentNode === toDo){
      toDoCompleted.appendChild(clone2);
    } else {
      toDo.appendChild(clone2);
    }
  
    })
}
plusButton.addEventListener('click', getInfo)