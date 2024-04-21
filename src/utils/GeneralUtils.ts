export const stripNumbers = (value: string): string => {
  return value.replace(/\d+/g, '')
}
