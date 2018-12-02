import React from 'react'

/**
* clean value from the mask, like from 1234 1234 1234 to 123412341234
* @param value{String}, mask{String}
* @return ReactDOM Object{JSX}
* @private
*/
const _clean = (value = '', mask = '') => {
  const maskChars = mask.replace('_', '').split('')
  let raw = value
  for (let i = 0; i < maskChars.length; i++) {
    raw = raw.replace(maskChars[i], '')
  }
  return raw
}

/**
 * Format value from "123456" with mask "__ __ __" to "12 34 56"
 * @param value{String}, mask{string}
 * @return {String}
 * @public
 */
export const format = (value, mask) => {
  if (!mask) return value
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

/**
* Check has string a comma or dot in the end. And return a dot
* @param value{String}
* @return '.'|''{String}
* @private
*/
const _allowLastCharDot = value => {
  const lastChar = value[value.length - 1]
  return lastChar === '.' ? '.' : lastChar === ',' ? '.' : ''
}

/**
* Foramt nubmer to currencie format, from 1123.123123 to '1 123,123'
* @param value{Number}
* @return formattedString{String}
* @public
*/
export const currencyFormat = value => {
  const formatter = new Intl.NumberFormat('ru', 'currency')
  return `${formatter.format(value)}${_allowLastCharDot(`${value}`)}`
}

/**
* Check all object's fields for not been a 'false'
* @param object{Object}
* @return Bool
* @public
*/
export const isAllPropsFalse = object =>
  Object.values(object).filter(argument => argument === false).length ===
  Object.values(object).length


export const ScrollTo = top => {
  const V = 0.3
  const w = window.pageYOffset
  let start = null
  requestAnimationFrame(step)
  function step(time) {
    if (start === null) start = time
    let progress = time - start
    let r =
      top < 0 ? Math.max(w - progress / V, w + top) : Math.min(w + progress / V, w + top)
    window.scrollTo(0, r)
    if (r !== w + top) {
      requestAnimationFrame(step)
    }
  }
}

export const parseOrders = orders =>
  orders &&
  orders.map(
    ({
      _id,
      created,
      inputValue,
      currencyInputLabel,
      outputValue,
      currencyOutputLabel,
      paymentStatus,
      toWallet,
    }) => {
      const date = new Date(Date.parse(created))
      return {
        id: _id,
        paymentStatus,
        toWallet,
        created: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
        inputValue: `${currencyFormat(inputValue)}, ${currencyInputLabel}`,
        outputValue: `${currencyFormat(outputValue)}, ${currencyOutputLabel}`,
      }
    },
  )

// replace \n to line break in FormattedMessage text
export const linesToParagraphs = (...nodes) =>
  nodes
    .map(node =>
      typeof node === 'string'
        ? node.split('\n').map((text, key) => (
            <span key={key}>
              {text}
              <br />
            </span>
          ))
        : node,
    )
    .reduce((nodes, node) => nodes.concat(node), [])
