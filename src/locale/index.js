import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {IntlProvider, addLocaleData} from 'react-intl'

import fr from 'react-intl/locale-data/fr'
import ru from 'react-intl/locale-data/ru'
import en from 'react-intl/locale-data/en'
import cn from 'react-intl/locale-data/zh'
import cnMessages from './cn.json'
import frMessages from './fr.json'
import ruMessages from './ru.json'
import enMessages from './en.json'

// FIXME: add to fr en cn locale home.userDataError.phone
export const locales = {
  'ru-RU': {
    locale: 'ru-RU',
    title: 'Русский',
    short: 'Рус',
    data: ru,
    messages: ruMessages,
  },
  'en-US': {
    locale: 'en-US',
    title: 'English',
    short: 'Eng',
    data: en,
    messages: enMessages,
  },
  'fr-FR': {
    locale: 'fr-FR',
    title: 'French',
    short: 'Fr',
    data: fr,
    messages: frMessages,
  },
  'zh-ZH': {
    locale: 'zh-ZH',
    title: 'China',
    short: 'Cn',
    data: cn,
    messages: cnMessages,
  },
}
// CustomIntlProvider component; Returns custome intl provider 
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
