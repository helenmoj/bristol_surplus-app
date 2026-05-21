import { describe, it, expect } from 'vitest'
import { formatTimestamp, isRecent } from './date'

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
