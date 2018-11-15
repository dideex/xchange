import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'

// CommonItems component;
class CommonItems extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
  }

  render() {
    const {handleClick} = this.props
    return (
      <Fragment>
        <Link onClick={handleClick} to="/">
          <FormattedMessage id="home.nav.home" defaultMessage="Главная" />
        </Link>
        <Link onClick={handleClick} to="/reservi">
          <FormattedMessage id="home.nav.reserved" defaultMessage="Резервы" />
        </Link>
        <Link onClick={handleClick} to="/o-nas">
          <FormattedMessage id="home.nav.about" defaultMessage="О нас" />
        </Link>
        <Link onClick={handleClick} to="/faq">
          <FormattedMessage id="home.nav.faq" defaultMessage="FAQ" />
        </Link>
      </Fragment>
    )
  }
}

export default CommonItems
