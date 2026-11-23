import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

const VALID_USERNAME = 'student';
const VALID_PASSWORD = 'Password123';

test.describe('Dashboard functionality', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();

    await loginPage.login(
      VALID_USERNAME,
      VALID_PASSWORD
    );

    await dashboardPage.expectDashboard();
  });


  test('Products table contains exactly 5 products', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await expect(
      dashboardPage.productRows
    ).toHaveCount(5);

    await expect(
      dashboardPage.productCount
    ).toHaveText(
      'Showing 5 of 5 products'
    );
  });


  test('Search filters products by product name', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.searchProduct(
      'keyboard'
    );

    await expect(
      dashboardPage.productRows
    ).toHaveCount(1);

    const keyboardRow =
      dashboardPage.getProductRow(
        'Mechanical Keyboard'
      );

    await expect(
      keyboardRow
    ).toBeVisible();
  });


  test('Add a new product', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.addProduct(
      'Webcam'
    );

    await expect(
      dashboardPage.productRows
    ).toHaveCount(6);

    const webcamRow =
      dashboardPage.getProductRow(
        'Webcam'
      );

    await expect(
      webcamRow
    ).toBeVisible();
  });


  test('Logout returns to login page', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.logout();

    await expect(page).toHaveURL(
      /\/app\/login\.html$/
    );

    await expect(
      page.getByLabel('Username')
    ).toBeVisible();

    await expect(
      page.getByLabel('Password')
    ).toBeVisible();

    await expect(
      page.getByRole('button', {
        name: 'Log in'
      })
    ).toBeVisible();
  });

});