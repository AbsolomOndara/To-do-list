document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const descriptionInput = document.getElementById('description-input');
  const dueDateInput = document.getElementById('due-date-input');
  const taskList = document.getElementById('task-list');
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterCompleted = document.getElementById('filter-completed');

  let currentFilter = 'all';

  // Fetch tasks from API
  async function fetchTasks() {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const tasks = await response.json();
      renderTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  // Render tasks to the DOM
  function renderTasks(tasks) {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
      if (currentFilter === 'active') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      return true;
    });

    if (filteredTasks.length === 0) {
      taskList.innerHTML = '<p class="no-tasks">No tasks found. Add a new task!</p>';
      return;
    }

    filteredTasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
      
      taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task._id}">
        <div class="task-content">
          <div class="task-title">${task.title}</div>
          ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
          ${task.dueDate ? `<div class="task-due-date"><i class="far fa-calendar-alt"></i> ${new Date(task.dueDate).toLocaleDateString()}</div>` : ''}
        </div>
        <div class="task-actions">
          <button class="edit-btn" data-id="${task._id}"><i class="far fa-edit"></i></button>
          <button class="delete-btn" data-id="${task._id}"><i class="far fa-trash-alt"></i></button>
        </div>
      `;

      taskList.appendChild(taskItem);
    });

    // Add event listeners to checkboxes and buttons
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', toggleTaskComplete);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', deleteTask);
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', editTask);
    });
  }

  // Add new task
  async function addTask(e) {
    e.preventDefault();

    if (!taskInput.value.trim()) return;

    const newTask = {
      title: taskInput.value.trim(),
      description: descriptionInput.value.trim(),
      dueDate: dueDateInput.value || undefined
    };

    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        taskInput.value = '';
        descriptionInput.value = '';
        dueDateInput.value = '';
        fetchTasks();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  // Toggle task completion status
  async function toggleTaskComplete(e) {
    const taskId = e.target.dataset.id;
    const completed = e.target.checked;

    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });

      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  // Delete task
  async function deleteTask(e) {
    const taskId = e.target.closest('button').dataset.id;

    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  // Edit task (you would implement this similarly)
  function editTask(e) {
    const taskId = e.target.closest('button').dataset.id;
    // Implement edit functionality
    console.log('Edit task:', taskId);
  }

  // Filter tasks
  function setFilter(filter) {
    currentFilter = filter;
    fetchTasks();
    
    // Update active button
    [filterAll, filterActive, filterCompleted].forEach(btn => {
      btn.classList.remove('active');
    });
    document.getElementById(`filter-${filter}`).classList.add('active');
  }

  // Event listeners
  taskForm.addEventListener('submit', addTask);
  filterAll.addEventListener('click', () => setFilter('all'));
  filterActive.addEventListener('click', () => setFilter('active'));
  filterCompleted.addEventListener('click', () => setFilter('completed'));

  // Initial load
  fetchTasks();
});