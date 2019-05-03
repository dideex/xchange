export const fakeCurrnecy = [
  {
    order: 1,
    _id: 1,
    icon: 'eth',
    id: 'eth',
    name: 'tether',
    label: 'tether label',
    source: 'tether source wallet'
  },
  {
    order: 2,
    _id: 2,
    icon: 'bitcoin',
    id: 'bitcoin',
    name: 'lisk',
    label: 'lisk label',
    source: 'lisk source wallet'
  },
  {
    order: 3,
    _id: 3,
    icon: 'rur',
    id: 'rur',
    name: 'litecoin',
    label: 'litecoin label',
    source: 'litecoin source wallet'
  },
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
  phone: '89145678901',
  fio: 'Fake fio',
  token: 'Fake token',
}

export const fakeBitcoinAddress = '3JQSigWTCHyBLRD979JWgEtWP5YiiFwcQB '
export const fakeCreditAddress = '1234 4321 5678 8765'

export const fakeWallets = {
  eth: 'Fake eth wallet',
  bitcoin: 'Fake bitcoin wallet',
  rur: 'Fake rur wallet'
}