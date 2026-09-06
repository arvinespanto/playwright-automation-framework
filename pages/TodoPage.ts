import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TodoPage extends BasePage {
  readonly todoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;
  readonly toggleAllCheckbox: Locator;

  readonly allFilter: Locator;
  readonly activeFilter: Locator;
  readonly completedFilter: Locator;

  constructor(page: Page) {
    super(page);

    this.todoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
    this.todoCount = page.locator('.todo-count');

    this.clearCompletedButton = page.locator('.clear-completed');
    this.toggleAllCheckbox = page.locator('.toggle-all');

    this.allFilter = page.getByRole('link', { name: 'All' });
    this.activeFilter = page.getByRole('link', { name: 'Active' });
    this.completedFilter = page.getByRole('link', {
      name: 'Completed',
    });
  }

  async open() {
    await this.navigate();
  }

  async addTodo(todo: string) {
    await this.todoInput.fill(todo);
    await this.todoInput.press('Enter');
  }

  async addTodos(todos: string[]) {
    for (const todo of todos) {
      await this.addTodo(todo);
    }
  }

  getTodo(todo: string) {
    return this.todoItems.filter({
      hasText: todo,
    });
  }

  async completeTodo(todo: string) {
    await this.getTodo(todo)
      .locator('.toggle')
      .check();
  }

  async editTodo(currentTodo: string, newTodo: string) {
    const todo = this.getTodo(currentTodo);

    await todo.dblclick();

    const editInput = todo.locator('.edit');

    await editInput.fill(newTodo);
    await editInput.press('Enter');
  }

  async deleteTodo(todoText: string) {
    const todo = this.getTodo(todoText);

    await todo.hover();
    await todo.locator('.destroy').click();
  }

  async showActive() {
    await this.activeFilter.click();
  }

  async showCompleted() {
    await this.completedFilter.click();
  }

  async showAll() {
    await this.allFilter.click();
  }

  async markAllComplete() {
    await this.toggleAllCheckbox.check();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }
}