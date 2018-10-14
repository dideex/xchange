import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'

import Input from '../common/Input'

// UserData component;
@inject('userStore')
@observer
class UserData extends Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired,
    // mobx
    walletIncome: PropTypes.number.isRequired,
    walletOutgo: PropTypes.number.isRequired,
  }

  render() {
    const {username, changeUsername} = this.props.userStore
    return (
      <div>
        <Input value={username} handleChange={changeUsername} placeholder="username" />
      </div>
    )
  }
}

export default UserData
