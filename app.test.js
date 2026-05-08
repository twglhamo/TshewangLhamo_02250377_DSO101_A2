const TodoApp = require('./app');

describe('TodoApp', () => {
  let app;

  beforeEach(() => {
    app = new TodoApp();
  });

  describe('addTodo', () => {
    test('should add a todo item successfully', () => {
      const todo = app.addTodo('Buy groceries');

      expect(todo).toBeDefined();
      expect(todo.id).toBe(1);
      expect(todo.title).toBe('Buy groceries');
      expect(todo.completed).toBe(false);
      expect(app.getAllTodos().length).toBe(1);
    });

    test('should increment todo id for each new item', () => {
      const todo1 = app.addTodo('First task');
      const todo2 = app.addTodo('Second task');

      expect(todo1.id).toBe(1);
      expect(todo2.id).toBe(2);
      expect(app.getAllTodos().length).toBe(2);
    });
  });

  describe('completeTodo', () => {
    test('should mark a todo item as completed', () => {
      const todo = app.addTodo('Complete homework');
      const completedTodo = app.completeTodo(1);

      expect(completedTodo.completed).toBe(true);
      expect(completedTodo.title).toBe('Complete homework');
      expect(completedTodo.id).toBe(1);
    });

    test('should update completed status in todos array', () => {
      app.addTodo('Test task');
      app.completeTodo(1);

      const todos = app.getAllTodos();
      expect(todos[0].completed).toBe(true);
    });
  });

  describe('deleteTodo', () => {
    test('should delete a todo item successfully', () => {
      app.addTodo('Task to delete');
      expect(app.getAllTodos().length).toBe(1);

      const result = app.deleteTodo(1);

      expect(result).toBe(true);
      expect(app.getAllTodos().length).toBe(0);
    });

    test('should remove correct todo when multiple exist', () => {
      app.addTodo('Task 1');
      app.addTodo('Task 2');
      app.addTodo('Task 3');
      expect(app.getAllTodos().length).toBe(3);

      app.deleteTodo(2);

      const todos = app.getAllTodos();
      expect(todos.length).toBe(2);
      expect(todos.find(t => t.id === 1)).toBeDefined();
      expect(todos.find(t => t.id === 2)).toBeUndefined();
      expect(todos.find(t => t.id === 3)).toBeDefined();
    });
  });
});
