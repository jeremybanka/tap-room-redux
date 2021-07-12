import { specToHex } from "luum"
import kegsReducer, { create, decrement } from "../src/store/kegs"
import initialState from "../src/store/kegs/initialState"

const colorFromSecondsHand = () => specToHex({
  hue: new Date().getSeconds() * 6,
  sat: 200,
  lum: 0.7,
  prefer: `lum`,
})

describe(`kegs/create`, () => {
  it(`can create a new keg with default values`, () => {
    const { type } = create
    const action = { type,
      payload: {
        name: undefined,
        brand: undefined,
        price: undefined,
        flavor: undefined,
      } }
    const newKegs = kegsReducer(
      initialState,
      action
    )
    const expectedColor = colorFromSecondsHand()
    const expected = [
      ...initialState,
      {
        name: `Unidentified Brew`,
        brand: `Generic Brand`,
        price: 0,
        flavor: `Regular Flavor`,
        color: expectedColor,
        total: 124,
        remaining: 124,
      },
    ]
    newKegs.forEach((keg, idx) => {
      expect(keg).toEqual(expected[idx])
    })
  })
  it(`can create a new keg with specified values`, () => {
    const { type } = create
    const action = { type,
      payload: {
        name: `Pirate`,
        brand: `Outlaw`,
        price: 562,
        flavor: `Acidic`,
      } }
    const newKegs = kegsReducer(
      initialState,
      action
    )
    const expectedColor = colorFromSecondsHand()
    const expected = [
      ...initialState,
      {
        name: `Pirate Brew`,
        brand: `Outlaw Brand`,
        price: 562,
        flavor: `Acidic Flavor`,
        color: expectedColor,
        total: 124,
        remaining: 124,
      },
    ]
    newKegs.forEach((keg, idx) => {
      expect(keg).toEqual(expected[idx])
    })
  })
})

describe(`kegs/decrement`, () => {
  it(`takes one away from the keg at the specified index`, () => {
    const targetIdx = 0
    const targetKegInitial = initialState[targetIdx]
    const { type } = decrement
    const payload = targetIdx
    const action = { type, payload }
    const newState = kegsReducer(initialState, action)
    const targetKegNew = newState[targetIdx]
    expect(targetKegNew.remaining)
      .toBe(targetKegInitial.remaining - 1)
  })
})
