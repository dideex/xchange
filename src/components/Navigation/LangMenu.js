import React, {Component, Fragment} from 'react'
import {observer, inject} from 'mobx-react'
import PropTypes from 'prop-types'

import {locales} from '../../locale'

// LangMenu component;
@inject('userStore')
@observer
class LangMenu extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
  }

  _handleLocaleChange = locale => {
    this.props.userStore.changeLocale(locale)
  }

  render() {
    return (
      <Fragment>
        {Object.values(locales).map(({short, locale}) => (
          <span key={short} onClick={() => this._handleLocaleChange(locale)}>
            {short}
          </span>
        ))}
      </Fragment>
    )
  }
}

export default LangMenu
