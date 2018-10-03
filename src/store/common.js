export const isNumber = num => {
  return /^\d+[\.]?\d*$/.test(num) || ''
}