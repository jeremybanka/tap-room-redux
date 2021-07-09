import newKegReducer, { initialState, toggleOpen } from "../src/store/newKeg"

describe(`new Keg Reducer`, () => {
  it(`can toggle the open state of the newKeg interface`, () => {
    const { type } = toggleOpen
    const action = { type }
    const newState = newKegReducer(initialState, action)
    expect(newState.isOpen).toBe(!initialState.isOpen)
  })
})
