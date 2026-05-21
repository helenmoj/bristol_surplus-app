export function formatTimestamp(date: Date): string {
  const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000)
  const minutesAgo = Math.floor(secondsAgo / 60)
  const hoursAgo = Math.floor(minutesAgo / 60)
  const daysAgo = Math.floor(hoursAgo / 24)

  if (secondsAgo < 60) return 'just now'
  if (minutesAgo < 60) return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`
  if (hoursAgo < 24) return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`
  return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
}

export function isRecent(date: Date): boolean {
  const daysSince = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
  return daysSince <= 7
}
