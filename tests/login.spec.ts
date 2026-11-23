import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const VALID_USERNAME = 'student';
const VALID_PASSWORD = 'Password123';

test.describe('Login functionality', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
  });

  test('Valid login reaches the dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      VALID_USERNAME,
      VALID_PASSWORD
    );

    await expect(page).toHaveURL(
      /\/app\/dashboard\.html$/
    );

    await expect(
      page.getByText('Welcome, student!')
    ).toBeVisible();
  });


  test('Empty fields show required validation messages', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickLogin();

    await expect(
      loginPage.usernameError
    ).toBeVisible();

    await expect(
      loginPage.passwordError
    ).toBeVisible();

    await expect(
      loginPage.usernameError
    ).toHaveText('Username is required');

    await expect(
      loginPage.passwordError
    ).toHaveText('Password is required');

    await loginPage.expectLoginPage();
  });


  test('Wrong password shows invalid credentials message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.enterUsername(
      VALID_USERNAME
    );

    await loginPage.enterPassword(
      'WrongPassword123'
    );

    await loginPage.clickLogin();

    await expect(
      loginPage.errorMessage
    ).toBeVisible();

    await expect(
      loginPage.errorMessage
    ).toContainText(
      'Your username or password is invalid!'
    );

    await loginPage.expectLoginPage();
  });


  test('Account locks after 3 incorrect login attempts', async ({ page }) => {
    const loginPage = new LoginPage(page);

    for (let attempt = 1; attempt <= 3; attempt++) {

      await loginPage.enterUsername(
        VALID_USERNAME
      );

      await loginPage.enterPassword(
        `WrongPassword${attempt}`
      );

      await loginPage.clickLogin();
    }

    await expect(
      loginPage.errorMessage
    ).toBeVisible();

    await expect(
      loginPage.errorMessage
    ).toContainText(/locked/i);

    await expect(
      loginPage.loginButton
    ).toBeDisabled();

    await loginPage.expectLoginPage();
  });


  test('Show and Hide password toggle works', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await expect(
      loginPage.passwordInput
    ).toHaveAttribute(
      'type',
      'password'
    );

    await loginPage.togglePassword();

    await expect(
      loginPage.passwordInput
    ).toHaveAttribute(
      'type',
      'text'
    );

    await loginPage.togglePassword();

    await expect(
      loginPage.passwordInput
    ).toHaveAttribute(
      'type',
      'password'
    );
  });

});