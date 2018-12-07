import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'

// Component has link items
const CommonItems = ({handleClick}) => (
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

CommonItems.propTypes = {
  handleClick: PropTypes.func.isRequired,
}
export default CommonItems
