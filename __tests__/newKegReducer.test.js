import newKegReducer, {
  edit,
  initialState,
  reset,
  toggleOpen,
} from "../src/store/newKeg"

describe(`newKeg/toggleOpen`, () => {
  it(`toggles the open state of the newKeg slice`, () => {
    const { type } = toggleOpen
    const action = { type }
    const newState = newKegReducer(initialState, action)
    expect(newState.isOpen).toBe(!initialState.isOpen)
  })
})

describe(`newKeg/edit`, () => {
  it(`can change the name of the new keg`, () => {
    const { type } = edit
    const payload = {
      key: `name`,
      value: `Orange`,
    }
    const action = { type, payload }
    const newState = newKegReducer(initialState, action)
    expect(newState.name).toBe(`Orange`)
  })
  it(`can change the brand of the new keg`, () => {
    const { type } = edit
    const payload = {
      key: `brand`,
      value: `Fancy`,
    }
    const action = { type, payload }
    const newState = newKegReducer(initialState, action)
    expect(newState.brand).toBe(`Fancy`)
  })
  it(`can change the price of the new keg`, () => {
    const { type } = edit
    const payload = {
      key: `price`,
      value: 23,
    }
    const action = { type, payload }
    const newState = newKegReducer(initialState, action)
    expect(newState.price).toBe(23)
  })
  it(`can change the flavor of the new keg`, () => {
    const { type } = edit
    const payload = {
      key: `flavor`,
      value: `Bitter`,
    }
    const action = { type, payload }
    const newState = newKegReducer(initialState, action)
    expect(newState.flavor).toBe(`Bitter`)
  })
})

describe(`newKeg/reset`, () => {
  it(`resets new keg to defaults`, () => {
    const { type } = edit
    const payload = {
      key: `name`,
      value: `Orange`,
    }
    const action = { type, payload }
    const newState = newKegReducer(initialState, action)
    const resetState = newKegReducer(newState, { type: reset })
    expect(resetState.name).toBe(``)
  })
})
