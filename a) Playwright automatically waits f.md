a) Playwright automatically waits for elements to be ready before performing actions like clicking or typing, and it also waits for conditions in assertions to become true. This is better than using a fixed sleep because the test doesn't waste time waiting unnecessarily and is less likely to fail when the application takes a little longer to load.



b) Role, label, and **data-testid** locators are easier to read and understand, and they usually represent how a user interacts with the application. Long XPath selectors depend heavily on the page's HTML structure, so they can easily break when the UI changes, whereas these locators are generally more stable and maintainable.

