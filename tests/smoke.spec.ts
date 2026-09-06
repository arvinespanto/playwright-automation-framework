import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('Smoke Tests', () => {

  test('Application loads successfully', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await test.step('Open Todo application', async () => {
      await todoPage.open();
    });

    await test.step('Verify application loaded', async () => {
      await expect(page).toHaveTitle(/TodoMVC/i);

      await expect(
        page.getByRole('heading', { name: 'todos' })
      ).toBeVisible();
    });
  });

  test('Todo input is available', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.open();

    await expect(todoPage.todoInput).toBeVisible();
    await expect(todoPage.todoInput).toBeEditable();
  });

});