import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODOS } from '../test-data/todos';

test.describe('Todo Filtering', () => {

  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.open();

    await todoPage.addTodos([
      TODOS.first,
      TODOS.second,
      TODOS.third,
    ]);

    await todoPage.completeTodo(TODOS.second);
  });

  test('User can show active todos', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.showActive();

    await expect(page).toHaveURL(/#\/active/);

    await expect(
      todoPage.getTodo(TODOS.first)
    ).toBeVisible();

    await expect(
      todoPage.getTodo(TODOS.third)
    ).toBeVisible();

    await expect(
      todoPage.getTodo(TODOS.second)
    ).not.toBeVisible();
  });

  test('User can show completed todos', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.showCompleted();

    await expect(page).toHaveURL(/#\/completed/);

    await expect(
      todoPage.getTodo(TODOS.second)
    ).toBeVisible();

    await expect(
      todoPage.getTodo(TODOS.first)
    ).not.toBeVisible();
  });

  test('User can show all todos', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.showActive();
    await todoPage.showAll();

    await expect(todoPage.todoItems).toHaveCount(3);

    await expect(todoPage.todoItems).toHaveText([
      TODOS.first,
      TODOS.second,
      TODOS.third,
    ]);
  });

});