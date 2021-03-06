import React, {Fragment} from 'react'
import {coinColors} from './Styles'

// CurrencyIcons component;
export const CurrencyIcons = ({id, style = {}, className = ''}) => {
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
    Ethereum: (
      <Fragment>
        <polygon
          style={coinColors.label}
          points="199,73.7 116.9,208.9 199,258.3 282.2,209.3 	"
        />
        <polygon
          style={coinColors.label}
          points="116.9,225.6 199,341.2 282.2,225.6 198.9,273.7 	"
        />
      </Fragment>
    ),
    Dash: (
      <Fragment>
        <path
          style={coinColors.label}
          d="M115.9,169.9l9.9-28.7c0.8-2.3,3-3.8,5.4-3.8h170c19.4,0,32.8,19.2,26.2,37.4l-25.8,71
  c-8.1,22.3-29.3,37.1-53.1,37l-166.9-1.1c-2.4,0-4-2.4-3.2-4.6l9.7-25.8c1.2-3.2,4.2-5.3,7.6-5.3h150.4l25.7-72H118.8
  C116.7,174,115.2,171.9,115.9,169.9z"
        />
        <path
          style={coinColors.label}
          d="M81.5,195.5l-9.4,27.4c-0.6,1.9,0.7,3.8,2.7,3.8H161c2.6,0,4.9-1.6,5.8-4l9.3-25.3c0.7-1.8-0.7-3.7-2.6-3.7H84
  C82.9,193.7,81.9,194.4,81.5,195.5z"
        />
      </Fragment>
    ),
    TRON: (
      <path
        style={coinColors.label}
        d="M280.5,126.9l-4.5-1.1L96.1,84l95.8,258.8L317.8,163l4.3-6.2L280.5,126.9z M302,157.1l-70,32.7l46.7-49.4
      L302,157.1z M266.4,135.9l-60.1,63.6l-84.2-97.2L266.4,135.9z M199.9,210.5l-9.6,93.4l-67.6-182.6L199.9,210.5z M201.9,307.7
      l9.9-95.2l84.4-39.4L201.9,307.7z"
      />
    ),
    EOS: (
      <path
        style={coinColors.label}
        d="M292.9,275.6L263,145.3l-0.2-1.1l-63.2-89.9l-62.6,89.9l-30.7,131.4l-1.1,4.8l4.9,3l84.8,52l4.8,2.9l4.8-2.9
	l84.8-52l4.9-3L292.9,275.6z M199.5,312.6l-9-29.2h18.2L199.5,312.6z M187,272.1l-22.8-73.5l35.3-60.6l35.6,61l-22.9,73.1H187z
	 M175.1,272.1h-53.7l35.1-60.2L175.1,272.1z M242.8,212.3l34.8,59.8h-53.5L242.8,212.3z M273.7,242.6l-26.3-45l9.2-29.4L273.7,242.6
	z M239.7,184.3l-34.5-59.2v-43l46,65.4L239.7,184.3z M193.8,82.3v42.8l-34.2,58.7l-11.2-36.3L193.8,82.3z M142.9,168.2l9,28.9
	l-26.3,45.1L142.9,168.2z M131.6,283.4h47l11,35.6L131.6,283.4z M209.4,318.9l11.1-35.5h46.8L209.4,318.9z"
      />
    ),
    Stellar: (
      <path
        style={coinColors.label}
        d="M283.9,91c-45.6-2.2-90.3,10.7-131.4,90.3c-39.8,1.7-64.9,17.3-78.5,43.8c18.4-7.1,35.4-5.8,51.3,2.1
	c-4.1,8.9-0.3,16.1,7.5,23c-50,68.1,0.2,105,50.2,36.9c9.5,5.6,17.9,5.8,24.6-3.2c13.2,11.7,19.1,29.2,21.9,49.1
	c20.9-25.2,25.7-54.6,13.9-88.1C279.7,203.7,310.7,160.4,283.9,91z M141.6,256.3l35.5,26.4C146.5,323.8,111,297.4,141.6,256.3z
	 M226,194.1c-16.2,0-29.4-13.2-29.4-29.4s13.2-29.4,29.4-29.4s29.4,13.2,29.4,29.4S242.2,194.1,226,194.1z"
      />
    ),
    Litecoin: (
      <polygon
        style={coinColors.label}
        points="166.8,83.5 134.8,208.8 106.8,218.4 99.3,247.6 125.9,238.8 106.8,311 296.2,311 307.8,269.4 
189.3,269.4 205.9,210.2 238.3,198.6 245.8,167.3 213.1,178.8 237.6,83.5 "
      />
    ),
    'Bitcoin Cash': (
      <path
        style={coinColors.label}
        d="M259.3,182c38-47.7-16.1-73.1-51.1-64.1l-7.8-37.2L175,86.1l7.9,37.7l-13.3,2.8l-7.9-37.7l-23.7,5l7.8,37.2
	l-44.1,9.2l4.6,22.1l28-5.9l24.6,117.4l-28,5.9l4.7,22.6l44.1-9.2l7.7,36.6l23.2-4.9l-7.8-37.1l13.8-2.9l7.8,37.1l23.4-4.9
	l-7.8-37.1C294,266.9,324.2,214.2,259.3,182z M174.6,150.5l33.7-7c13.2-1.3,31.4,21.9,8.6,41.2l-33.7,7L174.6,150.5z M236.6,256.2
	l-38.3,8l-10.2-48.6l38.3-8C255.4,210.3,263.1,237.7,236.6,256.2z"
      />
    ),
    XRP: (
      <path
        style={coinColors.label}
        d="M239.6,219.2c-1.6,0-3.2,0.1-4.8,0.2l0,0c-21.6,1.4-24.1-36.7-2.4-38.1l0,0c2,0.3,4.1,0.4,6.2,0.4
c26.8,0,48.4-21.7,48.4-48.4s-21.7-48.4-48.4-48.4s-48.4,21.7-48.4,48.4c0,10.4,3.3,20,8.8,27.8c12.4,17.2-18.3,39.3-30.7,22.2v0
c-7.3-17.5-24.6-29.9-44.8-29.9c-26.8,0-48.4,21.7-48.4,48.4s21.7,48.4,48.4,48.4c20.2,0,37.5-12.3,44.8-29.9v0
c11.2-19,43.3,0,32,18.9l0,0c-5.7,8-9.1,17.7-9.1,28.2c0,26.8,21.7,48.4,48.4,48.4s48.4-21.7,48.4-48.4S266.3,219.2,239.6,219.2z"
      />
    ),
    Tether: (
      <path
        style={coinColors.label}
        d="M323,204.5c0-12.8-40.9-23.5-95.1-25.9v-28.4h66.4v-43H114.6v43h65.3v28.5c-53.3,2.6-93.2,13.1-93.2,25.8
	c0,12.7,39.9,23.3,93.2,25.8v91.9h48v-91.8C282.1,228,323,217.4,323,204.5z M204.8,222.1c-57.6,0-104.4-8.9-104.4-19.9
	c0-9.4,33.8-17.2,79.5-19.3v31.6h48v-31.7c46.5,2,81.3,9.9,81.3,19.4C309.2,213.2,262.5,222.1,204.8,222.1z"
      />
    ),
    VTB: (
      <path
        style={coinColors.label}
        d="M134.7,115.6C98.6,142.8,72,177.8,72,206.3s42.8,80.7,62.7,90.7H295c-4.4-27.9-17.3-57.2-54.1-90.7H102
      c3.4,12,4.7,14.6,8.9,20.1h123.6c15.7,16.1,27.1,33.2,34.5,51.2H141c-24.8-18-39.2-40.2-50.2-71.3l3.7-10.2h146.4
      c7.8-5.6,14.9-12.2,21-20.1H104.1l7.3-10.5l158.9,0c5.1-4.8,9-11.7,12.5-19.6l-153.9,0l12-11.2h146.8c3.6-4.1,5.7-11,7.2-19.1H134.7
      z"
      />
    ),
    Alfabank: (
      <path
        style={coinColors.label}
        d="M309,289.7l-74.7-208c-10.3-27.2-53.6-31.2-67.3,0l-75.3,208L135,307l17.5-50.4h95.7l17.4,50.4L309,289.7z
	 M167.1,214.8l33.4-96.2l33.3,96.2H167.1z"
      />
    ),
    Yandex: (
      <path
        style={coinColors.label}
        d="M281.8,155.8l-15.2-0.1v77.9c-1,9-6.6,14.2-13.7,16.3L140.9,282c-9.2,3.3-14-9.8-4.7-13.2l97.3-38.9
	c8.5-4,13.9-11.2,16.3-21.4V88.9c-0.8-8.8-9.2-11.3-20.5-5.8l-113.1,64.2c-6.4,4.6-10.9,10.7-12.6,18.9V282
	c2.9,9.5,8.6,16,18.2,18.2h160.2c6.6,0,13.5-5.3,13.5-13.6V169.4C295.5,161.3,290.7,155.8,281.8,155.8z M197,152.3
	c5.8-7.3,14.2-10.2,18.9-6.5c4.6,3.7,3.7,12.6-2,19.8c-5.8,7.3-14.2,10.2-18.9,6.5C190.3,168.5,191.2,159.6,197,152.3z"
      />
    ),
    PMS: (
      <Fragment>
        <path
          style={coinColors.label}
          d="M122.7,125.4v93.7c1.4,39.7,22,57.4,57.6,57.6h96.1c-8.7,26.4-25.2,39.8-52.8,42.3h-87.6
      c-29.8-1.7-51.2-21-54.6-54.6v-89.4C85.9,146.9,102.2,131.3,122.7,125.4z"
        />
        <path
          style={coinColors.label}
          d="M122.7,125.4h93.7c39.7,1.4,58.9,21.7,59.2,57.4l0.8,94c26.4-8.7,37.4-22.9,40-50.5v-87.6
      c-1.7-29.8-21-51.2-54.6-54.6h-89.4C144.3,88.5,128.6,104.8,122.7,125.4z"
        />
        <path
          style={coinColors.label}
          d="M244.7,173c13.1-5.3,13.1-28.5-9.4-28.5h-22v24.8h-15.7c-9.2,0-15.2,8.7-15.2,16.4c0,21.2,43.2,20.2,20.5,35
      l-15.4-0.2c0,0,3.3-3.9,2-11.4c-4.2-14.6-9.8-18-41.2-16.9c0,0,0,59.1,0,59.8h12.1v-25.6l4.6,4.3h40c8.9,0,22.7-10.2,15.7-25.3
      h14.5C263.1,205.3,260.4,176.1,244.7,173z M170,220.5h-9.6v-18.9h9.6C178.7,201.6,178.7,220.5,170,220.5z M213.2,183.4v14.3
      c-10.8-2.5-26.2-13.8-11.8-19h16.6L213.2,183.4z M226.3,154.1h9.5c6.9,0,6.9,14.6,0,14.6h-9.5V154.1z M235.8,195.8h-9.5v-17.2h9.5
      C246.1,178.6,246.1,195.8,235.8,195.8z"
        />
      </Fragment>
    ),
    Tinkoff: (
      <Fragment>
        <path
          style={coinColors.label}
          d="M126.9,136.8c-10.4,0.9-18-2.7-21-14c-11.3,14.6-7.3,26.3,7,36c-27.8,7.5-29.8,44-62,39
      c3.6,13.2,11.4,19.3,25,15c0.3,16.9-6,28.2-19,34c5.6,9.9,14.6,12.3,27.5,6c-1.2,15.7,12.8,24.3,3,39.5c7.6,3.7,14.6,3.1,20.7-3.7
      c4.4,17.2,16.1,24.6,35.5,21.5c-11.8-12.2,3.5-27-16.5-38.7c6.6-2.5,11.2-6.7,11-15.5c-17.1,0.7-25.1-7.5-29.3-19.5
      c13.7,5,24.5,5.6,29.5-2.5c-48.8-44.3,28.3-78.2,29-88.8c1.5-14-28.5-6.7-10.2-32.7C139,109.9,126.1,117,126.9,136.8z"
        />
        <path
          style={coinColors.label}
          d="M97.1,156.7c-20.7,5.5-20.7,33.8-41.4,9.1C74.4,168.1,77.8,141.1,97.1,156.7z"
        />
        <path
          style={coinColors.label}
          d="M271.3,137.7c10.4,0.9,18-2.7,21-14c11.3,14.6,7.3,26.3-7,36c27.8,7.5,29.8,44,62,39
      c-3.6,13.2-11.4,19.3-25,15c-0.3,16.9,6,28.2,19,34c-5.6,9.9-14.6,12.3-27.5,6c1.2,15.7-12.8,24.3-3,39.5
      c-7.6,3.7-14.6,3.1-20.7-3.7c-4.4,17.2-16.1,24.6-35.5,21.5c11.8-12.2-3.5-27,16.5-38.7c-6.6-2.5-11.2-6.7-11-15.5
      c17.1,0.7,25.1-7.5,29.3-19.5c-13.7,5-24.5,5.6-29.5-2.5c48.8-44.3-28.3-78.2-29-88.8c-1.5-14,28.5-6.7,10.2-32.7
      C259.2,110.8,272.1,117.9,271.3,137.7z"
        />
        <path
          style={coinColors.label}
          d="M301,157.6c20.7,5.5,20.7,33.8,41.4,9.1C323.8,169,320.4,142,301,157.6z"
        />
        <path
          style={coinColors.label}
          d="M175.1,105.2c0-7.3,47.7-7.3,47.7,0l6.2-14.2l-9.2,1.8l-3.8-9.5l-8.3,5.7l-8.7-8.5l-7.8,8.5l-9-5.7l-4,9.5
      l-9-1.8L175.1,105.2z"
        />
        <path
          style={coinColors.label}
          d="M216.1,183.1c7.3-9.9,11.7-21.6,31.3-7.3l-30-21.9l4.5-34.5c0-16-46.3-16-46.3,0l5,34.5l-30.3,21.9
      c19.7-14.3,24.6-2.6,32.1,7.3h-39.8l7.8,17l0,84.8c2.4,16,8.1,20.6,16.9,22h23.9c7.8,10.5,7.8,10.5,15.3,0h18.8
      c13.2-0.8,20.5-8.8,23.5-22v-84.8l6.8-17H216.1z"
        />
      </Fragment>
    ),
    Qiwi: (
      <Fragment>
        <path
          style={coinColors.label}
          d="M313.3,320.2c-15.6-17.2-29-33.7-63.9-39.8c-15.4-2.4-28.3-9.3-39-20c-5.8-6.3-10.7-12.7-14.7-19.3
      c-2.1,6.7-1.9,14,0,21.5c-0.9,0-1.9,0.1-2.9,0.1c-37.6,0-68.2-30.5-68.2-68.2s30.5-68.2,68.2-68.2s68.2,30.5,68.2,68.2
      c0,2.8-0.2,5.6-0.5,8.3c-7.8-1.3-15.7-0.9-23.6,0.5c7.7,1.5,15,4.3,21.8,8.8c11.8,7.9,19.1,20.1,21.3,37
      c9.9-15.8,15.7-34.5,15.7-54.6c0-56.8-46-102.8-102.8-102.8s-102.8,46-102.8,102.8s46,102.8,102.8,102.8c4.7,0,9.4-0.3,14-1l0,0
      c53.8-6.1,77.3,3.3,103.5,26.9C311.8,324.6,314.7,321.5,313.3,320.2z"
        />
        <path
          style={coinColors.label}
          d="M254.9,269.9c7.4-6.6-7.8-21.5-14.8-13.9C233.5,263.9,246.5,276.4,254.9,269.9z"
        />
        <path
          style={coinColors.label}
          d="M271.7,253.9c5.6-3.6,0.1-18.5-7.1-16.6C258.8,240.5,265.5,254.1,271.7,253.9z"
        />
      </Fragment>
    ),
    Sberbank: (
      <Fragment>
        <path
          style={coinColors.label}
          d="M266.1,80.1l-119.2,68.8l-55-31.8c2.9-3.9,6-7.7,9.2-11.3l45.8,26.5l103.7-59.8
      C255.9,74.7,261.1,77.3,266.1,80.1z"
        />
        <path
          style={coinColors.label}
          d="M291.1,98.9l-144.3,83.2L77.5,142c1.9-4.3,4-8.5,6.4-12.6l63,36.5l132.8-76.7
      C283.7,92.2,287.5,95.5,291.1,98.9z"
        />
        <path
          style={coinColors.label}
          d="M310.5,121.9l-163.6,94.4L68.6,171c0.9-5,2.1-10,3.6-14.8l74.6,43.2l154.8-89.3
      C304.8,113.9,307.7,117.8,310.5,121.9z"
        />
        <path
          style={coinColors.label}
          d="M332.6,195.4c0,73.5-59.6,133.1-133.1,133.1S66.4,268.9,66.4,195.4c0-2.9,0.1-5.8,0.3-8.6l80.2,46.4l171-98.7
      C327.3,152.8,332.6,173.5,332.6,195.4z"
        />
      </Fragment>
    ),
    Zcash: (
      <polygon
        style={coinColors.label}
        points="220.5,76.5 179,76.5 179,109.9 133.7,109.9 133.7,154.7 207.2,154.7 128,260.1 128,293.5 179,293.5 
	179,325.5 220.5,325.5 220.5,293.5 272,293.5 272,248.2 191.9,248.2 269.1,145.2 269.1,109.9 220.5,109.9 "
      />
    ),
    OmiseGO: (
      <Fragment>
        <path
          style={coinColors.label}
          d="M149.3,205.7c-29.2,0-52.9,23.7-52.9,52.9s23.7,52.9,52.9,52.9c29.2,0,52.9-23.7,52.9-52.9
      S178.5,205.7,149.3,205.7z M149.3,295.7c-20.4,0-37-16.6-37-37c0-20.4,16.6-37,37-37c20.4,0,37,16.6,37,37
      C186.3,279.1,169.7,295.7,149.3,295.7z"
        />
        <path
          style={coinColors.label}
          d="M262.3,93c-29.2,0-52.9,23.7-52.9,52.9s23.7,52.9,52.9,52.9c29.2,0,52.9-23.7,52.9-52.9S291.6,93,262.3,93z
      M262.3,182.9c-20.4,0-37-16.6-37-37s16.6-37,37-37c20.4,0,37,16.6,37,37S282.8,182.9,262.3,182.9z"
        />
        <path
          style={coinColors.label}
          d="M202.2,93h-52.9c-29.2,0-52.9,23.7-52.9,52.9s23.7,52.9,52.9,52.9c29.2,0,52.9-23.7,52.9-52.9
      c0-14.4-5.8-27.4-15.1-37h15.1V93z M149.3,182.9c-20.4,0-37-16.6-37-37s16.6-37,37-37c20.4,0,37,16.6,37,37
      S169.7,182.9,149.3,182.9z"
        />
      </Fragment>
    ),
    NEM: (
      <Fragment>
        <path
          style={coinColors.label}
          d="M78.8,136.9c0.3,14.7,1.6,28.9,3.8,42.7c0.2,1.6,0.4,3.1,0.7,4.6c0,0,0,0,0,0l0,0c5.4,26,28.4,45.6,56,45.6
      c31.6,0,57.2-25.6,57.2-57.2c2.4-36.6,22.2-55.5,46.4-65.2C168.8,98.2,120,113.8,78.8,136.9z"
        />
        <path
          style={coinColors.label}
          d="M326,138c-13-7-26-12.8-39-17.7c-1.5-0.6-2.9-1.2-4.4-1.6c0,0,0,0,0,0l0,0c-25.3-8.2-53.7,2.3-67.3,26.3
      c-15.6,27.5-5.9,62.4,21.6,78c30.6,20.1,37.4,46.6,33.9,72.5C315.3,235.4,325.8,185.2,326,138z"
        />
        <path
          style={coinColors.label}
          d="M204.1,351c12.5-7.7,24.1-16.1,34.9-24.9c1.3-1,2.5-1.9,3.6-3c0,0,0,0,0,0l0,0c19.7-17.8,24.9-47.6,10.9-71.4
      c-16-27.2-51.1-36.3-78.4-20.3c-32.7,16.5-59.1,9.1-79.7-6.9C125,293.1,163.3,327.2,204.1,351z"
        />
      </Fragment>
    ),
    Monero: (
      <Fragment>
        <path
          style={coinColors.label}
          d="M260.4,271.8h59.1c-24.3,40.2-68.5,67.2-119,67.2s-94.6-26.9-119-67.2h58.3v-73.1l60.7,60.2l60.3-60.2
        L260.4,271.8z"
        />
        <path
          style={coinColors.label}
          d="M339.4,200c0,15.1-2.4,29.7-6.9,43.3h-42.3V128l-90.1,88.7L110,128v115.3H68.5c-4.5-13.6-6.9-28.2-6.9-43.3
        c0-76.7,62.2-138.9,138.9-138.9S339.4,123.3,339.4,200z"
        />
      </Fragment>
    ),
    Dogecoin: (
      <path
        style={coinColors.label}
        d="M228.5,99H128v82.8h-26.5v37.8H128V303h100.5C339.8,303,339.8,99,228.5,99z M224.5,265.5H174v-46h35.5v-37.8
        H174V137h50.5C280.5,137,280.5,265.5,224.5,265.5z"
      />
    ),
    Lisk: (
      <path
        style={coinColors.label}
        d="M200,74.5L126,142l10,42.5c-1.8,9.7,0.3,18.9,4.5,28c-2.4,9.7-0.7,16.9,4,22V249l-15,5.5l-6.5,11V290l77,36
	l75-37.5V269l-6.5-13.5l-15-7l2.5-31l8.5-6.5c0,0,0.4-19.8-1-20.5c-2.9-1.5,0.5-48,2.5-48L252.5,132l-6.5-13.5L200,74.5z"
      />
    ),
    'Binance Coin': (
      <Fragment>
        <polygon
          style={coinColors.label}
          points="200.4,231 169.5,200.2 200.4,169.3 231.9,200.2 	"
        />
        <polygon
          style={coinColors.label}
          points="285.1,252.2 200.4,337 116.5,253.1 147.6,222 200.4,274.5 254.1,221.9 	"
        />
        <polygon
          style={coinColors.label}
          points="94.2,168.9 125.6,200.2 94.5,231.1 63.2,199.9 	"
        />
        <polygon
          style={coinColors.label}
          points="285.4,147.8 254.1,178.4 200.4,125.8 147.6,178.3 116.2,146.9 200.4,62.7 	"
        />
        <polygon
          style={coinColors.label}
          points="337.5,199.9 307,230.3 276.2,200.2 307.3,169.7 	"
        />
      </Fragment>
    ),
    IOTA: (
      <Fragment>
        <circle style={coinColors.label} cx="77.8" cy="212.1" r="16.1" />
        <circle style={coinColors.label} cx="111.3" cy="187" r="13.7" />
        <circle style={coinColors.label} cx="98.7" cy="154.3" r="13.7" />
        <circle style={coinColors.label} cx="126.3" cy="111" r="11.7" />
        <circle style={coinColors.label} cx="131" cy="140.7" r="11.7" />
        <circle style={coinColors.label} cx="144" cy="173.3" r="11.7" />
        <circle style={coinColors.label} cx="155.8" cy="105.6" r="9.8" />
        <circle style={coinColors.label} cx="160.6" cy="135.3" r="9.8" />
        <circle style={coinColors.label} cx="174.1" cy="168" r="9.8" />
        <circle style={coinColors.label} cx="181.3" cy="107.3" r="8" />
        <circle style={coinColors.label} cx="185.8" cy="136.8" r="8" />
        <circle style={coinColors.label} cx="199.5" cy="169.6" r="8" />
        <circle style={coinColors.label} cx="202.9" cy="112.6" r="7.1" />
        <circle style={coinColors.label} cx="206.7" cy="142.6" r="7.1" />
        <circle style={coinColors.label} cx="220.9" cy="175.6" r="7.1" />
        <circle style={coinColors.label} cx="218.8" cy="121.3" r="6.3" />
        <circle style={coinColors.label} cx="224" cy="151.7" r="6.5" />
        <circle style={coinColors.label} cx="231" cy="132.8" r="5.3" />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 54.9049 269.2831)"
          style={coinColors.label}
          cx="260.1"
          cy="87.2"
          rx="16.1"
          ry="16.1"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 21.3214 294.5038)"
          style={coinColors.label}
          cx="265.1"
          cy="128.8"
          rx="13.7"
          ry="13.7"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 34.1804 327.1988)"
          style={coinColors.label}
          cx="299.8"
          cy="134.1"
          rx="13.7"
          ry="13.7"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 6.5749 370.7435)"
          style={coinColors.label}
          cx="323.6"
          cy="179.7"
          rx="11.7"
          ry="11.7"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 1.7895 341.0496)"
          style={coinColors.label}
          cx="295.5"
          cy="169"
          rx="11.7"
          ry="11.7"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -11.3374 308.3666)"
          style={coinColors.label}
          cx="260.7"
          cy="164"
          rx="11.7"
          ry="11.7"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -22.9333 376.2943)"
          style={coinColors.label}
          cx="313.6"
          cy="208"
          rx="9.8"
          ry="9.8"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -27.825 346.5074)"
          style={coinColors.label}
          cx="285.4"
          cy="197.3"
          rx="9.8"
          ry="9.8"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -41.4859 313.782)"
          style={coinColors.label}
          cx="250.3"
          cy="192.7"
          rx="9.8"
          ry="9.8"
        />
        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -48.5363 374.5913)"
          style={coinColors.label}
          cx="299.4"
          cy="229.2"
          rx="8"
          ry="8"
        />
        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -53.1359 345.0567)"
          style={coinColors.label}
          cx="271.5"
          cy="218.4"
          rx="8"
          ry="8"
        />
        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -66.9706 312.2799)"
          style={coinColors.label}
          cx="236.3"
          cy="214"
          rx="8"
          ry="8"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -70.1351 369.3804)"
          style={coinColors.label}
          cx="284.1"
          cy="245.3"
          rx="7.1"
          ry="7.1"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -74.0303 339.2917)"
          style={coinColors.label}
          cx="256.1"
          cy="233.6"
          rx="7.1"
          ry="7.1"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -88.3987 306.2607)"
          style={coinColors.label}
          cx="220.4"
          cy="229.5"
          rx="7.1"
          ry="7.1"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -86.0796 360.7221)"
          style={coinColors.label}
          cx="268.6"
          cy="254.7"
          rx="6.3"
          ry="6.3"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -91.386 330.2682)"
          style={coinColors.label}
          cx="239.6"
          cy="244.1"
          rx="6.5"
          ry="6.5"
        />

        <ellipse
          transform="matrix(0.4982 -0.8671 0.8671 0.4982 -98.4145 349.2476)"
          style={coinColors.label}
          cx="252.5"
          cy="259.6"
          rx="5.3"
          ry="5.3"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -116.4498 181.3288)"
          style={coinColors.label}
          cx="278.5"
          cy="306.9"
          rx="16.1"
          ry="16.1"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -113.4008 159.7849)"
          style={coinColors.label}
          cx="240"
          cy="290.5"
          rx="13.7"
          ry="13.7"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -130.0787 152.4677)"
          style={coinColors.label}
          cx="218.1"
          cy="317.8"
          rx="13.7"
          ry="13.7"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -135.966 126.3867)"
          style={coinColors.label}
          cx="166.7"
          cy="315.7"
          rx="11.7"
          ry="11.7"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -123.2941 135.5125)"
          style={coinColors.label}
          cx="190"
          cy="296.7"
          rx="11.7"
          ry="11.7"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -106.465 142.727)"
          style={coinColors.label}
          cx="211.8"
          cy="269.1"
          rx="11.7"
          ry="11.7"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -127.164 113.5142)"
          style={coinColors.label}
          cx="147.2"
          cy="292.9"
          rx="9.8"
          ry="9.8"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -114.4045 122.6607)"
          style={coinColors.label}
          cx="170.6"
          cy="273.8"
          rx="9.8"
          ry="9.8"
        />
        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -97.4252 129.616)"
          style={coinColors.label}
          cx="192"
          cy="245.7"
          rx="9.8"
          ry="9.8"
        />
        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -117.1993 104.7553)"
          style={coinColors.label}
          cx="135.9"
          cy="270"
          rx="8"
          ry="8"
        />
        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -104.6457 113.9157)"
          style={coinColors.label}
          cx="159.2"
          cy="251.3"
          rx="8"
          ry="8"
        />
        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -87.5051 120.8091)"
          style={coinColors.label}
          cx="180.6"
          cy="222.9"
          rx="8"
          ry="8"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -107.2889 98.7228)"
          style={coinColors.label}
          cx="129.7"
          cy="248.6"
          rx="7.1"
          ry="7.1"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -94.8586 108.3151)"
          style={coinColors.label}
          cx="153.7"
          cy="230.3"
          rx="7.1"
          ry="7.1"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -77.452 115.1492)"
          style={coinColors.label}
          cx="175.1"
          cy="201.4"
          rx="7.1"
          ry="7.1"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -98.3078 96.0506)"
          style={coinColors.label}
          cx="129.2"
          cy="230.6"
          rx="6.3"
          ry="6.3"
        />

        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -85.1675 105.2803)"
          style={coinColors.label}
          cx="152.9"
          cy="210.8"
          rx="6.5"
          ry="6.5"
        />
        <ellipse
          transform="matrix(0.8648 -0.5021 0.5021 0.8648 -89.5627 95.7333)"
          style={coinColors.label}
          cx="133"
          cy="214.2"
          rx="5.3"
          ry="5.3"
        />
      </Fragment>
    ),
    Cardano: (
      <Fragment>
        <circle style={coinColors.label} cx="156.7" cy="200.7" r="18.4" />
        <circle style={coinColors.label} cx="178.3" cy="238.2" r="18.4" />
        <circle style={coinColors.label} cx="243" cy="201" r="18.4" />
        <circle style={coinColors.label} cx="221.7" cy="238.2" r="18.4" />
        <circle style={coinColors.label} cx="178.1" cy="163" r="18.4" />
        <circle style={coinColors.label} cx="221.5" cy="163" r="18.4" />
        <circle style={coinColors.label} cx="103.6" cy="200.9" r="9.2" />
        <circle style={coinColors.label} cx="296.2" cy="201" r="9.2" />
        <circle style={coinColors.label} cx="152" cy="117.1" r="9.2" />
        <circle style={coinColors.label} cx="247.8" cy="117.1" r="9.2" />
        <circle style={coinColors.label} cx="151.9" cy="284.3" r="9.2" />
        <circle style={coinColors.label} cx="247.7" cy="284.3" r="9.2" />
        <circle style={coinColors.label} cx="69.6" cy="200.8" r="5.9" />
        <circle style={coinColors.label} cx="330.4" cy="200.5" r="5.9" />
        <circle style={coinColors.label} cx="134.9" cy="87.5" r="5.9" />
        <circle style={coinColors.label} cx="264.6" cy="87.5" r="5.9" />
        <circle style={coinColors.label} cx="134.9" cy="314.1" r="5.9" />
        <circle style={coinColors.label} cx="264.6" cy="314.1" r="5.9" />
        <circle style={coinColors.label} cx="135.9" cy="163.6" r="10.8" />
        <circle style={coinColors.label} cx="199.8" cy="126.3" r="10.8" />
        <circle style={coinColors.label} cx="199.8" cy="275.2" r="10.8" />
        <circle style={coinColors.label} cx="264.1" cy="163.4" r="10.8" />
        <circle style={coinColors.label} cx="135.7" cy="238.2" r="10.8" />
        <circle style={coinColors.label} cx="263.9" cy="238.1" r="10.8" />
        <circle style={coinColors.label} cx="97.4" cy="141.4" r="7.6" />
        <circle style={coinColors.label} cx="199.8" cy="81.6" r="7.6" />
        <circle style={coinColors.label} cx="199.8" cy="319.4" r="7.6" />
        <circle style={coinColors.label} cx="302.2" cy="141.4" r="7.6" />
        <circle style={coinColors.label} cx="97.4" cy="260" r="7.6" />
        <circle style={coinColors.label} cx="302.2" cy="260" r="7.6" />
      </Fragment>
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
    <svg
      className={className}
      style={style}
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 400 400"
    >
      <title>{id}</title>
      <circle style={coinColors.label} cx="199.5" cy="200.5" r="199.5" />
      <circle style={coinColors.body} cx="199.5" cy="200.5" r="168.3" />
      {currencyLabel[id] || <text>{id}</text>}
    </svg>
  )
}

export default CurrencyIcons
