import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODOS } from '../test-data/todos';

test.describe('Bulk Actions', () => {

  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.open();

    await todoPage.addTodos([
      TODOS.first,
      TODOS.second,
      TODOS.third,
    ]);
  });

  test('User can mark all todos as complete', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.markAllComplete();

    await expect(todoPage.todoItems).toHaveClass([
      'completed',
      'completed',
      'completed',
    ]);

    await expect(todoPage.todoCount)
      .toContainText('0');
  });

  test('User can clear completed todos', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.completeTodo(TODOS.first);
    await todoPage.completeTodo(TODOS.third);

    await todoPage.clearCompleted();

    await expect(todoPage.todoItems).toHaveCount(1);

    await expect(
      todoPage.getTodo(TODOS.second)
    ).toBeVisible();

    await expect(
      todoPage.getTodo(TODOS.first)
    ).not.toBeVisible();

    await expect(
      todoPage.getTodo(TODOS.third)
    ).not.toBeVisible();
  });

});