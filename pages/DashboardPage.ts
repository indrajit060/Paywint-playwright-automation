import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  readonly welcomeMessage: Locator;
  readonly searchInput: Locator;
  readonly newProductInput: Locator;
  readonly addProductButton: Locator;
  readonly productCount: Locator;
  readonly productRows: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Dashboard locators confirmed from the application DOM
    this.welcomeMessage = page.getByText('Welcome, student!');

    this.searchInput = page.getByTestId('search');

    this.newProductInput = page.getByTestId('new-product');

    this.addProductButton = page.getByTestId('add-button');

    this.productCount = page.getByTestId('count');

    // Product table rows
    this.productRows = page.locator('tbody tr');

    this.logoutButton = page.getByRole('button', {
      name: 'Log out'
    });
  }

  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
  }

  async addProduct(productName: string) {
    await this.newProductInput.fill(productName);
    await this.addProductButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  getProductRow(productName: string): Locator {
    return this.productRows.filter({
      hasText: productName
    });
  }

  async expectDashboard() {
    await expect(this.page).toHaveURL(
      /\/app\/dashboard\.html$/
    );
  }

  async expectWelcomeMessage() {
    await expect(
      this.welcomeMessage
    ).toBeVisible();
  }
}