import React, {PureComponent, Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

// CommonItems component;
class CommonItems extends PureComponent {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
  }

  render() {
    const {handleClick} = this.props
    return (
      <Fragment>
        <Link onClick={handleClick} to="/">
          Главная
        </Link>
        <Link onClick={handleClick} to="/reservi">
          Резервы
        </Link>
        <Link onClick={handleClick} to="/o-nas">
          О нас
        </Link>
        <Link onClick={handleClick} to="/faq">
          FAQ
        </Link>
      </Fragment>
    )
  }
}

export default CommonItems
