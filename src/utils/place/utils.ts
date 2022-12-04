export function isLocationFormatValid(location: string): boolean {
  if (!location.includes(',')) return false
  const p = location
    .split(',')
    .map((v) => v.trim())
    .map((v) => Number(v))
  if (p.length < 2 || p.length > 2) return false
  return p.filter((e) => typeof e === 'number' && !isNaN(e)).length === 2
}

export function locationConverter(location: string): string {
  const p = location
    .split(',')
    .map((v) => v.trim())
    .join(' ')
  return `POINT(${p})`
}
