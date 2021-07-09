import { specToHex } from "luum"
import kegsReducer, { create } from "../src/store/kegs"
import initialState from "../src/store/kegs/initialState"

describe(`kegsReducer`, () => {
  it(`can create a new keg without a name`, () => {
    const { type } = create
    const action = { type, payload: {} }
    const newKegs = kegsReducer(
      initialState,
      action
    )
    const expectedColor = specToHex({
      hue: new Date().getSeconds() * 6,
      sat: 200,
      lum: 0.7,
      prefer: `lum`,
    })
    const expected = [
      {
        name: `Effervescent Brew`,
        brand: `Generic Brand`,
        price: 35,
        flavor: `Foamy Flavor`,
        color: `#0a9`,
        remaining: 20,
        total: 124,
      },
      {
        name: `Celestial Brew`,
        brand: `Name Brand`,
        price: 53,
        flavor: `Savory Flavor`,
        color: `#2af`,
        remaining: 56,
        total: 124,
      },
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
})
