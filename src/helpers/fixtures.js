export const fakeCurrnecy = [
  {order: 2, _id: 2, icon: 'bitcoin', id: 'bitcoin', name: 'lisk'},
  {order: 1, _id: 1, icon: 'eth', id: 'eth', name: 'tether'},
  {order: 3, _id: 3, icon: 'rur', id: 'rur', name: 'litecoin'},
]

export const fakeData = {
  id: 'Test id',
  inputValue: '1000',
  toWallet: 'Test wallet',
  currencyInputLabel: 'Test input label',
  currencyOutputLabel: 'Test output label',
  fromWallet: 'Tests fromWallet',
  outputValue: '2000',
  email: 'Tests email',
  username: 'Tests username',
  paymentStatus: 1,
  loading: false,
  wallets: {
    eth: 'eth wallet',
    bitcoint: 'bitcoint wallet',
    rur: 'rur wallet',
  },
  login: 'Test login',
  updatePaymentStatus() {},
}

export const fakeUser = {
  username: 'Fake username',
  password: 'Fake password',
  email: 'fake@email.com',
  fio: 'Fake fio',
  token: 'Fake token',
}

export const fakeBitcoinAddress = '3JQSigWTCHyBLRD979JWgEtWP5YiiFwcQB '
export const fakeCreditAddress = '1234 4321 5678 8765'
