const _clean = (value, mask) => {
  const maskChars = mask.replace('_', '').split('')
  let raw = value
  for (let i = 0; i < maskChars.length; i++) {
    raw = raw.replace(maskChars[i], '')
  }
  return raw
}

/**
 * Fromats from "123456" with mask "__ __ __" to "12 34 56"
 * @param value{String}, mask{string}
 * @return {String}
 * @public
 */
export const format = (value, mask) => {
  const raw = _clean(value, mask)
  const replsCount = (mask.match(/_/g) || []).length
  let formatted = mask
  const rawLen = raw.length
  for (let i = 0; i < replsCount; i++) {
    if (i >= rawLen) {
      formatted = formatted.substr(0, formatted.lastIndexOf(raw[rawLen - 1]) + 1)
      break
    }
    formatted = formatted.replace('_', raw[i])
  }
  return formatted
}

const _allowLastCharDot = value => {
  const lastChar = value[value.length - 1]
  return lastChar === '.' ? '.' : lastChar === ',' ? '.' : ''
}

export const currencyFormat = value => {
  const formatter = new Intl.NumberFormat('ru', 'currency')
  return `${formatter.format(value)}${_allowLastCharDot(`${value}`)}`
}

export const isAllPropsFalse = object =>
  Object.values(object).filter(argument => argument === false).length ===
  Object.values(object).length

export const statusArray = [
  'Не создан',
  'Ожидает перевода',
  'Ожидает подтверждения',
  'Переведено',
]
