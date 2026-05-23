import { describe, it, expect } from 'vitest'
import { formatTimestamp } from './date'
import { isRecent } from './date'

describe('formatTimestamp', () => {
  it('returns "X hours ago" for timestamps within 24 hours', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)
    expect(formatTimestamp(twoHoursAgo)).toBe('2 hours ago')
  })

  it('returns "X days ago" for older timestamps', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    expect(formatTimestamp(threeDaysAgo)).toBe('3 days ago')
  })

  it('returns "just now" for very recent timestamps', () => {
    const now = new Date()
    expect(formatTimestamp(now)).toBe('just now')
  })
})

describe('isRecent', () => {
  it('returns true for dates within 7 days', () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    expect(isRecent(yesterday)).toBe(true)
  })

  it('returns false for dates older than 7 days', () => {
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    expect(isRecent(twoWeeksAgo)).toBe(false)
  })
})