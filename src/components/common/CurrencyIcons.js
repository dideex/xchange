import React from 'react'
import {coinColors} from './Styles'

// Svg component;
export const Svg = ({disabled, id, style = {}}) => {
  if (!id) return null
  const currencyLabel = {
    Bitcoin: (
      <path
        style={coinColors.label}
        d="M262.5,193.9c47-38.9-0.7-74.8-36.9-73.2v-38h-26.1v38.5H186V82.8h-24.2v38h-45.1v22.5h28.6v119.9h-28.6v23.1
   h45.1v37.4h23.7v-37.9h14.1v37.9h23.9v-37.9C279,284.1,319.4,238.7,262.5,193.9z M186,145.8h34.4c13.2,1.4,26.2,27.8,0,42.1H186
   V145.8z M225.1,261.9H186v-49.6h39.1C252.9,220.8,254.8,249.2,225.1,261.9z"
      />
    ),
    Dollar: (
      <path
        style={coinColors.label}
        d="M233.1,192.2c-9.5-5.2-19.5-9.2-29.5-13.3c-5.8-2.4-11.3-5.2-16.2-9.1c-9.6-7.7-7.8-20.1,3.5-25
  c3.2-1.4,6.5-1.8,9.9-2c13-0.7,25.4,1.7,37.2,7.4c5.9,2.8,7.8,1.9,9.8-4.2c2.1-6.5,3.8-13,5.8-19.6c1.3-4.4-0.3-7.3-4.4-9.1
  c-7.6-3.3-15.3-5.7-23.5-7c-10.7-1.6-10.7-1.7-10.7-12.4c0-15.1,0-15.1-15.2-15.1c-2.2,0-4.4,0-6.6,0c-7.1,0.2-8.3,1.4-8.5,8.6
  c-0.1,3.2,0,6.4,0,9.6c0,9.5-0.1,9.3-9.2,12.6c-21.9,8-35.4,22.9-36.9,46.8c-1.3,21.2,9.8,35.4,27.1,45.8
  c10.7,6.4,22.5,10.2,33.9,15.2c4.4,1.9,8.7,4.2,12.3,7.3c10.9,9,8.9,24-4,29.7c-6.9,3-14.2,3.8-21.8,2.8
  c-11.6-1.4-22.7-4.5-33.1-9.9c-6.1-3.2-7.9-2.3-10,4.3c-1.8,5.7-3.4,11.5-5,17.3c-2.1,7.8-1.3,9.6,6.1,13.2
  c9.5,4.6,19.6,6.9,29.9,8.6c8.1,1.3,8.3,1.6,8.4,10c0,3.8,0,7.6,0.1,11.4c0,4.8,2.3,7.6,7.3,7.7c5.6,0.1,11.2,0.1,16.8,0
  c4.6-0.1,6.9-2.6,6.9-7.2c0-5.2,0.2-10.4,0-15.6c-0.2-5.3,2-8,7.1-9.4c11.7-3.2,21.7-9.5,29.3-18.8
  C271.3,246.8,263.2,208.9,233.1,192.2z"
      />
    ),
    Ruble: (
      <path
        style={coinColors.label}
        d="M96.5,285.4h38.3v32.9c0,1.6,0.5,2.9,1.5,3.9c1,1,2.3,1.5,3.9,1.5h28.6c1.5,0,2.8-0.5,3.9-1.5
			c1.1-1,1.6-2.3,1.6-3.9v-32.9h86.4c1.6,0,2.9-0.5,3.9-1.5c1-1,1.5-2.3,1.5-3.9V258c0-1.6-0.5-2.9-1.5-3.9c-1-1-2.3-1.5-3.9-1.5
			h-86.4v-20.2h58.2c22.8,0,41.4-7,55.9-20.9c14.4-13.9,21.7-31.9,21.7-53.9c0-22-7.2-40-21.7-53.9c-14.4-13.9-33.1-20.9-55.9-20.9
			h-92.3c-1.6,0-2.9,0.5-3.9,1.5c-1,1-1.5,2.3-1.5,3.9v107.7H96.5c-1.6,0-2.9,0.5-3.9,1.6c-1,1.1-1.5,2.4-1.5,3.9v25.5
			c0,1.6,0.5,2.9,1.5,3.9c1,1,2.3,1.5,3.9,1.5h38.3v20.2H96.5c-1.6,0-2.9,0.5-3.9,1.5c-1,1-1.5,2.3-1.5,3.9v21.9
			c0,1.6,0.5,2.9,1.5,3.9C93.6,284.9,94.9,285.4,96.5,285.4z M174.4,119.2h54.8c12.1,0,21.8,3.5,29.3,10.6
			c7.4,7.1,11.1,16.3,11.1,27.7c0,11.4-3.7,20.7-11.1,27.7c-7.4,7.1-17.2,10.6-29.3,10.6h-54.8V119.2z"
      />
    ),
    Euro: (
      <path
        style={coinColors.label}
        d="M287.6,297.4c-2.7-6.5-5.4-13-8.3-19.4c-2.6-5.7-6-7.4-12.2-6c-7.9,1.8-15.7,4.2-23.6,5.9
		c-15.3,3.2-30.7,3.5-45.8-1.3c-19-6-29.1-19.7-35.3-37.4h51.4c4,0,7.3-3.3,7.3-7.3v-16.2c0-4-3.3-7.3-7.3-7.3h-56.3
		c0-4.5,0-8.9,0-13.2h56.3c4,0,7.3-3.3,7.3-7.3v-16.2c0-4-3.3-7.3-7.3-7.3h-49.3c0-0.2,0-0.4,0.1-0.5c5.9-13.4,14.5-24.2,28.7-29.8
		c16.5-6.5,33.2-6.4,50.2-2.9c8,1.6,15.9,4.1,23.9,5.9c5.9,1.3,9.3-0.4,11.8-5.9c2.9-6.3,5.6-12.7,8.2-19.2c2.5-6.1,1-10.3-4.7-13.7
		c-1.4-0.8-2.9-1.5-4.4-2.1c-23.7-9.3-48.2-12.7-73.5-8.7c-17.8,2.9-34.4,9-48.7,20.1c-18.1,14-29.8,32.5-36.6,54.2l-0.8,2.5H93.3
		c-4,0-7.3,3.3-7.3,7.3v16.2c0,4,3.3,7.3,7.3,7.3h19.9c0,4.4,0,8.7,0,13.2H93.3c-4,0-7.3,3.3-7.3,7.3v16.2c0,4,3.3,7.3,7.3,7.3h24
		c1.8,5.9,3.3,11.9,5.7,17.6c12.2,29.4,32.6,50.2,63.2,60.2c25.4,8.2,50.9,8,76.5,0.9c6.6-1.8,13.2-4.2,19.6-7.1
		C288.4,308,290,303.3,287.6,297.4z"
      />
    ),
  }

  return (
    <svg style={style} version="1.1" x="0px" y="0px" viewBox="0 0 400 400">
      <circle style={coinColors.label} cx="199.5" cy="200.5" r="199.5" />
      <circle style={coinColors.body} cx="199.5" cy="200.5" r="168.3" />
      {currencyLabel[id] || <text>{id}</text>}
    </svg>
  )
}

export default Svg
