import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {observer, inject} from 'mobx-react'
import PropTypes from 'prop-types'

// LoginMenu component;
@inject('userStore')
@observer
class LoginMenu extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
  }

  render() {
    const {handleClick} = this.props
    const {token, isAdmin, login, signout} = this.props.userStore
    return token ? (
      <Fragment>
        {isAdmin && (
          <Link onClick={handleClick} to="/summary">
            Admin
          </Link>
        )}
        {isAdmin && (
          <Link onClick={handleClick} to="/settings">
            Settings
          </Link>
        )}
        <Link onClick={handleClick} to="/lichnii-kabinet">{login}</Link>
        <p
          onClick={e => {
            e.stopPropagation()
            signout()
          }}
        >
          Выйти
        </p>
      </Fragment>
    ) : (
      <Fragment>
        <Link onClick={handleClick} to="/lichnii-kabinet">Войти</Link>
        <Link onClick={handleClick} to="/registracya">Регистрация</Link>
      </Fragment>
    )
  }
}

export default LoginMenu
