import { test, expect } from '@playwright/test'

test.describe('Bristol Larder E2E Tests', () => {
  
  // Navigate to app with test mode BEFORE each test
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/?test=true')
    await page.waitForLoadState('networkidle')
  })

  test('should display listings on page load', async ({ page }) => {
    const listings = page.locator('[class*="listing-card"]')
    const count = await listings.count()
    
    expect(count).toBeGreaterThan(0)
  })

  test('should display listing cards with required information', async ({ page }) => {
    // Check first listing has required fields
    const firstCard = page.locator('[class*="listing-card"]').first()
    
    await expect(firstCard.locator('h3')).toContainText('Loads of fresh mint')
    await expect(firstCard.locator('[class*="location"]')).toContainText('BS7')
    await expect(firstCard.locator('span[class*="badge"]').first()).toContainText('Other')
  })

  test('should filter listings by Veg category', async ({ page }) => {
    // Click Veg category button
    await page.click('button:has-text("Veg")')
    await page.waitForTimeout(300)

    const listings = page.locator('[class*="listing-card"]')
    const count = await listings.count()
    
    // Should show at least 1 Veg listing
    expect(count).toBeGreaterThan(0)
    await expect(listings.first().locator('h3')).toContainText('Loads of fresh bay leaves')
  })

  test('should filter listings by Garden category', async ({ page }) => {
    // Click Garden category button
    await page.click('button:has-text("Garden")')
    await page.waitForTimeout(300)

    const listings = page.locator('[class*="listing-card"]')
    const count = await listings.count()
    
    // Should show at least 1 Garden listing
    expect(count).toBeGreaterThan(0)
    await expect(listings.first().locator('h3')).toContainText('Satin pothos (Scindapsus pictus) cuttings - going to propagate')
  })

  test('should reset filters when clicking All', async ({ page }) => {
    // Filter by category
    await page.click('button:has-text("Veg")')
    await page.waitForTimeout(300)
    let listings = page.locator('[class*="listing-card"]')
    const vegCount = await listings.count()
    expect(vegCount).toBeGreaterThan(0)

    // Reset to All
    await page.click('button:has-text("All")')
    await page.waitForTimeout(300)
    listings = page.locator('[class*="listing-card"]')
    const allCount = await listings.count()
    expect(allCount).toBeGreaterThanOrEqual(vegCount)
  })

  test('should filter listings when typing in search', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]')
    await searchInput.fill('Loads of fresh bay leaves')
    await page.waitForTimeout(300)

    const listings = page.locator('[class*="listing-card"]')
    const count = await listings.count()
    expect(count).toBeGreaterThan(0)
    await expect(listings.first().locator('h3')).toContainText('Loads of fresh bay leaves')
  })

  test('should clear search and show all listings', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]')
    
    // Search
    await searchInput.fill('Bay')
    await page.waitForTimeout(300)
    let listings = page.locator('[class*="listing-card"]')
    const searchCount = await listings.count()
    expect(searchCount).toBeGreaterThan(0)

    // Clear search
    await searchInput.fill('')
    await page.waitForTimeout(300)
    listings = page.locator('[class*="listing-card"]')
    const allCount = await listings.count()
    expect(allCount).toBeGreaterThanOrEqual(searchCount)
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    const listings = page.locator('[class*="listing-card"]')
    const count = await listings.count()
    expect(count).toBeGreaterThan(0)

    // Should still be visible on mobile
    await expect(listings.first()).toBeVisible()
  })

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    
    const listings = page.locator('[class*="listing-card"]')
    const count = await listings.count()
    expect(count).toBeGreaterThan(0)

    // Should still be visible on tablet
    await expect(listings.first()).toBeVisible()
  })

  test.skip('should display offering and wanted badges', async ({ page }) => {
    // Check for offering badge (Courgettes)
    const listings = page.locator('[class*="listing-card"]')
      expect(await listings.count()).toBeGreaterThan(0)


    // Filter to find wanted listing
    await page.click('button:has-text("Garden")')
    await page.waitForTimeout(300)
    
    const gardenCard = page.locator('[class*="listing-card"]').first()
    await expect(gardenCard.locator('text=Looking for this')).toBeVisible()
  })
})
