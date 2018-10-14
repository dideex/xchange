import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {Route} from 'react-router-dom'
import PropTypes from 'prop-types'

import Input from '../common/Input'
import Button from '../common/Button'

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
    const {
      username,
      changeUsername,
      changeEmail,
      email,
      wallets,
      changeWallet,
    } = this.props.userStore
    return (
      <div>
        <Input value={username} handleChange={changeUsername} placeholder="username" />
        <Input value={email} handleChange={changeEmail} placeholder="email" />
        <Input
          value={wallets[this.props.walletIncome]}
          handleChange={val => changeWallet(this.props.walletIncome)(val)}
          placeholder="income"
        />
        <Input
          value={wallets[this.props.walletOutgo]}
          handleChange={val => changeWallet(this.props.walletOutgo)(val)}
          placeholder="income"
        />
        <Route
          render={({history}) => (
            <Button caption="Send" toggle={() => history.push('/podtverjdenie-oplati')} />
          )}
        />
      </div>
    )
  }
}

export default UserData
