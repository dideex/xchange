import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {IntlProvider, addLocaleData} from 'react-intl'

import Cookie from 'js-cookie'
import ru from 'react-intl/locale-data/ru'
import en from 'react-intl/locale-data/en'
import ruMessages from './ru.json'
import enMessages from './en.json'

export const locales = {
  'en-US': {
    locale: 'en-US',
    title: 'English',
    short: 'Eng',
    data: en,
    messages: enMessages,
  },
  'ru-RU': {
    locale: 'ru-RU',
    title: 'Русский',
    short: 'Рус',
    data: ru,
    messages: ruMessages,
  },
}
// CustomIntlProvider component;
@inject('userStore')
@observer
class CustomIntlProvider extends Component {
  render() {
    const {locale} = this.props.userStore
    addLocaleData(locales[locale].data)
    return (
      <IntlProvider locale={locale} messages={locales[locale].messages}>
        {this.props.children}
      </IntlProvider>
    )
  }
}

export default CustomIntlProvider
