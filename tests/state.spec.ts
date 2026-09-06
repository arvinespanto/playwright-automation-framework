import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { TODOS } from '../test-data/todos';

test.describe('Todo State', () => {

  test('Correct remaining item count is displayed', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.open();

    await todoPage.addTodos([
      TODOS.first,
      TODOS.second,
      TODOS.third,
    ]);

    await expect(todoPage.todoCount)
      .toContainText('3');

    await todoPage.completeTodo(TODOS.first);

    await expect(todoPage.todoCount)
      .toContainText('2');
  });

  test('Todo state persists after page reload', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.open();

    await todoPage.addTodos([
      TODOS.first,
      TODOS.second,
    ]);

    await todoPage.completeTodo(TODOS.first);

    await test.step('Reload application', async () => {
      await page.reload();
    });

    await test.step('Verify todos persisted', async () => {
      await expect(todoPage.todoItems).toHaveCount(2);

      await expect(
        todoPage.getTodo(TODOS.first)
      ).toHaveClass(/completed/);

      await expect(
        todoPage.getTodo(TODOS.second)
      ).not.toHaveClass(/completed/);

      await expect(todoPage.todoCount)
        .toContainText('1');
    });
  });

});