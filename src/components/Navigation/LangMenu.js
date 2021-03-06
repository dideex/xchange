import React, {Component, Fragment} from 'react'
import {observer, inject} from 'mobx-react'

import {locales} from '../../locale'

// Component has language toggler
@inject('userStore')
@observer
class LangMenu extends Component {
  _handleLocaleChange = locale => {
    this.props.userStore.changeLocale(locale)
  }

  render() {
    return (
      <Fragment>
        {Object.values(locales).map(({short, locale}) => (
          <span
            key={short}
            onClick={() => this._handleLocaleChange(locale)}
            data-testid={locale}
          >
            {short}
          </span>
        ))}
      </Fragment>
    )
  }
}

export default LangMenu
