import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import styled from 'react-emotion'
import {Route} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Input, Button} from '../common'

const StyledUserData = styled('div')`
  & {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    input {
      max-width: 37%;
      flex: 37% 0 0;
      margin-bottom: 50px;
    }
  }
`

const ButtonWrap = styled('div')`
  & {
    flex: 100% 0 0;
    text-align: center;
    button {
      width: 37%;
    }
  }
`

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
      <StyledUserData>
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
        <ButtonWrap>
          <Route
            render={({history}) => (
              <Button
                caption="Send"
                toggle={() => history.push('/podtverjdenie-oplati')}
              />
            )}
          />
        </ButtonWrap>
      </StyledUserData>
    )
  }
}

export default UserData
