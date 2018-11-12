import React, {PureComponent, Fragment} from 'react'
import PropTypes from 'prop-types'

// LangMenu component;
class LangMenu extends PureComponent {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
  }
  render() {
    const {handleClick} = this.props
    return (
      <Fragment>
        <span onClick={handleClick}>Eng</span>
        <span onClick={handleClick}>Rus</span>
      </Fragment>
    )
  }
}

export default LangMenu
