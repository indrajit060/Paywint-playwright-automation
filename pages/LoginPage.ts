import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly errorMessage: Locator;

  readonly passwordToggle: Locator;

  constructor(page: Page) {
    this.page = page;

    // Login page locators
    this.usernameInput = page.getByLabel('Username');

    this.passwordInput = page.getByLabel('Password');

    this.loginButton = page.getByRole('button', {
      name: 'Log in'
    });

    this.usernameError = page.getByTestId('username-error');

    this.passwordError = page.getByTestId('password-error');

    this.errorMessage = page.getByTestId('error-message');

    this.passwordToggle = page.getByTestId('toggle-password');
  }

  async goto() {
  await this.page.goto(
    'https://paywint-qa.netlify.app/app/login.html'
  );
}

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async togglePassword() {
    await this.passwordToggle.click();
  }

  async expectLoginPage() {
    await expect(this.page).toHaveURL(
      /\/app\/login\.html$/
    );
  }
}