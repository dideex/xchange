class Noty {
  show() {}
}

Noty.__proto__.constructor = jest.fn()
export default Noty
