import Cookie from 'js-cookie'
import ru from 'react-intl/locale-data/ru'
import en from 'react-intl/locale-data/en'
import ruMessages from './ru.json'
import enMessages from './en.json'

import {addLocaleData} from 'react-intl'

class Locale {
  setIntl(intl) {
    this.intl = intl
  }


  locales() {
    return {
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
  }

  getLocale() {
    return this.locales()[this.get()]
  }

  get() {
    const locale = Cookie.get('locale')
    const locales = this.locales()
    return locale in locales ? locale : locales['en-US'].locale
  }

  set(locale) {
    Cookie.set('locale', locale)
  }

  addLocaleData() {
    let l = this.getLocale()
    addLocaleData(l.data)
  }

  getAntdLocale() {
    return this.getLocale().antd
  }

  getMessages(local) {
    console.log(" LOG ___ local ", local )
    return local? this.locales()[local].messages: this.locales()['ru-RU'].messages
  }
}

export default new Locale()
