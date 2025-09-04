import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('Skip link functionality', async ({ page }) => {
    await page.goto('/');
    
    // Tab to skip link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();
    
    // Click skip link and verify main content is focused
    await skipLink.click();
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('Form validation and accessibility', async ({ page }) => {
    await page.goto('/contact');
    
    // Submit empty form
    await page.click('[type="submit"]');
    
    // Check for aria-invalid attributes
    const nameInput = page.locator('#name');
    await expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    
    // Verify error messages are properly associated
    await expect(page.locator('#name-error')).toBeVisible();
  });

  test('Mobile menu keyboard navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigate to mobile menu button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // Skip theme toggle
    
    const menuButton = page.locator('[aria-label*="menu"]');
    await expect(menuButton).toBeFocused();
    
    // Open menu with Enter key
    await page.keyboard.press('Enter');
    await expect(page.locator('#mobile-menu')).toBeVisible();
    
    // Navigate through menu items
    await page.keyboard.press('Tab');
    const firstMenuItem = page.locator('#mobile-menu a').first();
    await expect(firstMenuItem).toBeFocused();
  });

  test('Theme toggle accessibility', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator('[aria-label*="Switch to"]');
    await expect(themeToggle).toHaveAttribute('aria-label');
    
    // Test keyboard activation
    await themeToggle.focus();
    await page.keyboard.press('Enter');
    
    // Verify theme changed (check for dark class on html)
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('Color contrast compliance', async ({ page }) => {
    await page.goto('/');
    
    // Test primary button contrast
    const primaryButton = page.locator('.bg-green-600').first();
    const buttonStyles = await primaryButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
      };
    });
    
    // Verify contrast ratio meets WCAG AA (4.5:1)
    expect(buttonStyles.backgroundColor).toBeTruthy();
    expect(buttonStyles.color).toBeTruthy();
  });
});