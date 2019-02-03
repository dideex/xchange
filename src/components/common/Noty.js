import Noty from 'noty'

// notification settings
export const noty = (text, type = 'success') => {
  new Noty({
    text,
    type,
    theme: 'metroui',
    timeout: 10000,
    layout: 'bottomRight'
  }).show()
}
export default noty