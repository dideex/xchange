import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'core-js/es6/map'
import 'core-js/es6/set'
import 'raf/polyfill'

configure({adapter: new Adapter()})

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    }
  }

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  function(callback) {
    setTimeout(callback, 0)
  }
