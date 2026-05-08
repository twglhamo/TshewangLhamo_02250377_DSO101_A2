// Simple To-Do List Application

class TodoApp {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  /**
   * Add a new todo item
   * @param {string} title - The todo title
   * @returns {Object} The created todo item
   */
  addTodo(title) {
    if (!title || typeof title !== 'string') {
      throw new Error('Title must be a non-empty string');
    }

    const todo = {
      id: this.nextId++,
      title: title.trim(),
      completed: false,
      createdAt: new Date()
    };

    this.todos.push(todo);
    return todo;
  }

  /**
   * Mark a todo item as completed
   * @param {number} id - The todo id
   * @returns {Object} The updated todo item
   */
  completeTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }

    todo.completed = true;
    return todo;
  }

  /**
   * Delete a todo item
   * @param {number} id - The todo id
   * @returns {boolean} True if deleted, false otherwise
   */
  deleteTodo(id) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }

    this.todos.splice(index, 1);
    return true;
  }

  /**
   * Get all todos
   * @returns {Array} Array of all todo items
   */
  getAllTodos() {
    return this.todos;
  }
}

module.exports = TodoApp;
