document.addEventListener('DOMContentLoaded', function() {
	'use strict';

	const form = document.querySelector('.todo-control');
	const headInput = document.querySelector(".header-input");
	const ulToDo = document.getElementById("todo");
	const ulToDoCompleted = document.querySelector(".todo-completed");

	let data = {
		todo: [],
		completed: []
	};

	if(localStorage.getItem('localData')) {
		data = JSON.parse(localStorage.getItem('localData'));
	}

	const renderItemsForUpdate = function() {
		if(!data.todo.length === 0 && !data.completed.lenght) return;

		for(let i = 0; i < data.todo.length; i++) {
			renderItem(data.todo[i]);
		}

		for(let i = 0; i < data.completed.length; i++) {
			renderItem(data.completed[i], true);
		}
	};

	const dataUpdateToLocalS = function() {
		localStorage.setItem('localData', JSON.stringify(data));
	};

	const addItem = function(text) {
		renderItem(text);
		headInput.value = '';
		data.todo.push(text);

		dataUpdateToLocalS();
	};

	const itemRemove = function(elem) {
		const item = elem.parentNode.parentNode;
		const itemParent = item.parentNode;
		const id = itemParent.id;
		const text = item.textContent;

		if(id === 'todo') {
			data.todo.splice(data.todo.indexOf(text), 1);
		} else {
			data.completed.splice(data.completed.indexOf(text), 1);
		}

		itemParent.removeChild(item);

		dataUpdateToLocalS();
	};

	const itemComplete = function(elem) {
		const item = elem.parentNode.parentNode;
		const itemParent = item.parentNode;
		const id = itemParent.id;
		const text = item.textContent;
		
		let target;

		if(id === 'todo') {
			target = ulToDoCompleted;
		} else {
			target = ulToDo;
		}

		if(id === 'todo') {
			data.todo.splice(data.todo.indexOf(text), 1);
			data.completed.push(text);
		} else {
			data.completed.splice(data.completed.indexOf(text), 1);
			data.todo.push(text);
		}
		
		itemParent.removeChild(item);
		target.insertBefore(item, target.childNodes[0]);

		dataUpdateToLocalS();
	};
	
	const renderItem = function(text, completed = false) {
		const itemLi = document.createElement('li');
		const btnBlock = document.createElement('div');
		const btnRemove = document.createElement('button');
		const btnComplete = document.createElement('button');
		
		let list = ulToDo;

		if(completed) {
			list = ulToDoCompleted;
		} else {
			list = ulToDo;
		}

		itemLi.classList.add('todo-item');
		btnBlock.classList.add('todo-buttons');
		btnRemove.classList.add('todo-remove');
		btnComplete.classList.add('todo-complete');

		itemLi.textContent = text;

		btnRemove.addEventListener('click', function(event) {
			itemRemove(event.target);
		});

		btnComplete.addEventListener('click', function(event) {
			itemComplete(event.target);
		});

		itemLi.textContent = text;

		btnBlock.appendChild(btnRemove);
		btnBlock.appendChild(btnComplete);
		itemLi.appendChild(btnBlock);

		list.insertBefore(itemLi, list.childNodes[0]);
	};

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		if(headInput.value !== "") {
			addItem(headInput.value.trim());
		}
	});

	renderItemsForUpdate();
});