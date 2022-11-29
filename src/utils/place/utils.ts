export function locationConverter(location: string): string {
  const p = location
    .split(',')
    .map((v) => v.trim())
    .join(' ')
  return `POINT(${p})`
}
