import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODOS } from '../test-data/todos';

test.describe('Todo Management', () => {

  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.open();
  });

  test('User can create a todo', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await test.step('Create todo', async () => {
      await todoPage.addTodo(TODOS.first);
    });

    await test.step('Verify todo was created', async () => {
      await expect(
        todoPage.getTodo(TODOS.first)
      ).toBeVisible();

      await expect(todoPage.todoCount)
        .toContainText('1');
    });
  });

  test('User can create multiple todos', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.addTodos([
      TODOS.first,
      TODOS.second,
      TODOS.third,
    ]);

    await expect(todoPage.todoItems).toHaveCount(3);

    await expect(todoPage.todoItems).toHaveText([
      TODOS.first,
      TODOS.second,
      TODOS.third,
    ]);
  });

  test('User can edit a todo', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.addTodo(TODOS.first);

    await todoPage.editTodo(
      TODOS.first,
      'Master Playwright'
    );

    await expect(
      todoPage.getTodo('Master Playwright')
    ).toBeVisible();

    await expect(
      todoPage.getTodo(TODOS.first)
    ).not.toBeVisible();
  });

  test('User can delete a todo', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.addTodo(TODOS.first);

    await todoPage.deleteTodo(TODOS.first);

    await expect(
      todoPage.getTodo(TODOS.first)
    ).not.toBeVisible();

    await expect(todoPage.todoItems).toHaveCount(0);
  });

  test('User can complete a todo', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.addTodo(TODOS.first);

    await todoPage.completeTodo(TODOS.first);

    const todo = todoPage.getTodo(TODOS.first);

    await expect(todo).toHaveClass(/completed/);

    await expect(
      todo.locator('.toggle')
    ).toBeChecked();
  });

});