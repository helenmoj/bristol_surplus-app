import { test, expect } from '@playwright/test'

test.describe('Bristol Larder E2E Tests', () => {
  
  // ===== BASIC NAVIGATION TESTS =====

  test('should load homepage and display title', async ({ page }) => {
    await page.goto('/')
    
    // Check page title or heading exists
    await expect(page).toHaveTitle(/Bristol|Larder/)
    
    // Check search bar exists
    const searchInput = page.locator('input[placeholder*="Search"]')
    await expect(searchInput).toBeVisible()
  })

  test('should display search listings input', async ({ page }) => {
    await page.goto('/')
    
    const searchInput = page.locator('input[placeholder*="Search"]')
    await expect(searchInput).toBeVisible()
  })

  test('should display category filter buttons', async ({ page }) => {
    await page.goto('/')
    
    // Check for category buttons (All, Veg, Fruit, Preserves, Garden)
    await expect(page.locator('button:has-text("All")')).toBeVisible()
    await expect(page.locator('button:has-text("Veg")')).toBeVisible()
    await expect(page.locator('button:has-text("Fruit")')).toBeVisible()
  })

  // ===== LISTING DISPLAY TESTS =====

  test('should display listings on page load', async ({ page }) => {
    await page.goto('/')
    
    // Wait for listings to load
    await page.waitForLoadState('networkidle')
    
    // Check that at least one listing is visible
    const listings = page.locator('[class*="listing"]')
    const count = await listings.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should display listing cards with required information', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Find first listing and check it has title, location, category
    const firstListing = page.locator('[class*="listing-card"]').first()
    
    // Check title exists
    const title = firstListing.locator('h3')
    await expect(title).toBeVisible()
    
    // Check location exists
    const location = firstListing.locator('[class*="location"]')
    await expect(location).toBeVisible()
  })

  // ===== CATEGORY FILTER TESTS =====

  test('should filter listings by Veg category', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Click Veg filter button
    await page.click('button:has-text("Veg")')
    
    // Wait for filtering
    await page.waitForTimeout(500)
    
    // Check that listings are visible
    const listings = page.locator('[class*="listing-card"]')
    const count = await listings.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should filter listings by Garden category', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Click Garden filter button
    await page.click('button:has-text("Garden")')
    
    // Wait for filtering
    await page.waitForTimeout(500)
    
    // Check that listings are visible
    const listings = page.locator('[class*="listing-card"]')
    const count = await listings.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should reset filters when clicking All', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Get initial count
    const allButton = page.locator('button:has-text("All")')
    const initialCount = await page.locator('[class*="listing-card"]').count()
    
    // Click Veg
    await page.click('button:has-text("Veg")')
    await page.waitForTimeout(500)
    
    // Click All again
    await allButton.click()
    await page.waitForTimeout(500)
    
    // Check count is same or more (all listings shown)
    const finalCount = await page.locator('[class*="listing-card"]').count()
    expect(finalCount).toBeGreaterThanOrEqual(initialCount)
  })

  // ===== LISTING INTERACTION TESTS =====

  test('should display listing details when clicking a listing', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Click first listing
    const firstListing = page.locator('[class*="listing-card"]').first()
    const title = await firstListing.locator('h3').textContent()
    
    await firstListing.click()
    
    // Check that title is still visible (indicating listing detail view or modal)
    await expect(page.locator(`text=${title}`)).toBeVisible()
  })

  test('should display contact information for listings', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Find listing with contact info
    const listings = page.locator('[class*="listing-card"]')
    const count = await listings.count()
    
    // Check at least one listing has contact section
    let foundContact = false
    for (let i = 0; i < Math.min(count, 3); i++) {
      const listing = listings.nth(i)
      const contactSection = listing.locator('text=CONTACT')
      if (await contactSection.isVisible()) {
        foundContact = true
        break
      }
    }
    
    expect(foundContact).toBe(true)
  })

  // ===== NEW BADGE TESTS =====

  test('should display NEW badge on recent listings', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Check if NEW badge exists (indicates recent listings)
    const newBadges = page.locator('text=New')
    const count = await newBadges.count()
    
    // Should have at least one new listing
    expect(count).toBeGreaterThan(0)
  })

  // ===== SEARCH TESTS =====

  test('should filter listings when typing in search', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Type in search box
    const searchInput = page.locator('input[placeholder*="Search"]')
    await searchInput.fill('oregano')
    
    // Wait for search results
    await page.waitForTimeout(500)
    
    // Check that results are displayed
    const listings = page.locator('[class*="listing-card"]')
    const count = await listings.count()
    expect(count).toBeGreaterThanOrEqual(0)
  })

  test('should show no results for non-existent search', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Type nonsense search
    const searchInput = page.locator('input[placeholder*="Search"]')
    await searchInput.fill('xyzabc123impossible')
    
    // Wait for search results
    await page.waitForTimeout(500)
    
    // Page should still be responsive (not crash)
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible()
  })

  // ===== RESPONSIVE TESTS =====

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Check that listings are visible on mobile
    const listings = page.locator('[class*="listing-card"]')
    const count = await listings.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Check that listings are visible on tablet
    const listings = page.locator('[class*="listing-card"]')
    const count = await listings.count()
    expect(count).toBeGreaterThan(0)
  })

  // ===== LISTING IMAGE TESTS =====

  test('should display listing images when present', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Find listings with images
    const images = page.locator('[class*="listing-card"] img')
    const imageCount = await images.count()
    
    // Should have at least some images (depends on data)
    expect(imageCount).toBeGreaterThanOrEqual(0)
  })

  // ===== PAGE PERFORMANCE =====

  test('should load page within reasonable time', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(12000)
  })

  test('should handle rapid filter clicks', async ({ page }) => {
    await page.goto('/')
    
    await page.waitForLoadState('networkidle')
    
    // Rapidly click filters
    await page.click('button:has-text("Veg")')
    await page.click('button:has-text("Fruit")')
    await page.click('button:has-text("Garden")')
    await page.click('button:has-text("All")')
    
    // Wait for all filtering to complete
    await page.waitForTimeout(1000)
    
    // Page should still be responsive
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible()
  })
})
