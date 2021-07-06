import { Component } from "react"
import { css } from "@emotion/react"
import {
  Route as _Route,
  Switch as _Switch,
  BrowserRouter as _Router,
  Link as _Link,
} from "react-router-dom"
import luum, { specToHex } from "./extra"
import hs, { div, footer, h1, header } from "./util/hyperscript"
import { KegDetail, KegList, NotFound } from "./pages"
import kegs from "./static/kegs"

const Router = hs(_Router)
const Switch = hs(_Switch)
const Route = hs(_Route)
const Link = hs(_Link)

class App extends Component {
  constructor() {
    super()
    this.state = {
      kegs,
      newKegIsOpen: false,
      newKegName: ``,
      newKegBrand: ``,
      newKegPrice: 0,
      newKegFlavor: ``,
    }
  }

  createKeg = () => {
    this.setState(state => ({
      kegs: [
        ...state.kegs,
        {
          name: `${state.newKegName || `Unidentified`} Brew`,
          brand: `${state.newKegBrand || `Generic`} Brand`,
          price: state.newKegPrice || 0,
          flavor: `${state.newKegFlavor || `Regular`} Flavor`,
          color: specToHex({
            hue: new Date().getSeconds() * 6,
            sat: 200,
            lum: 0.7,
            prefer: `lum`,
          }),
          total: 124,
          remaining: 124,
        },
      ],
    }))
    this.toggleNewKegIsOpen()
    this.resetNewKeg()
  }

  resetNewKeg = () => {

  }

  editNewKeg = e => {
    const key = `newKeg${e.target.placeholder}`
    const value = key === `newKegPrice`
      ? Number(e.target.value)
      : e.target.value
    this.setState(({ [key]: value }))
  }

  toggleNewKegIsOpen = () =>
    this.setState(state => ({ newKegIsOpen: !state.newKegIsOpen }))

  decrementKeg = i =>
    this.setState(state => ({
      kegs: state.kegs.map((keg, j) =>
        j === i && keg.remaining ? { ...keg, remaining: keg.remaining - 1 } : keg
      ),
    }))

  render = () =>
    Router(
      div(
        {
          css: css`
            ${luum(`f0eae6`)}
            height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: #ddd;
            > * {
              width: calc(100% - 20px);
              position: relative;
              margin: auto;
            }
            > main {
              flex-grow: 1;
            }
            > header {
              display: flex;
              height: 100px;
              align-items: center;
            }
          `,
        },
        header(Link({ to: `/` }, h1(`Tap Room`))),
        Switch(
          Route({
            exact: true,
            path: `/`,
            render: () =>
              KegList({
                kegs: this.state.kegs,
                newKegIsOpen: this.state.newKegIsOpen,
                newKegName: this.state.newKegName,
                createKeg: this.createKeg,
                editNewKeg: this.editNewKeg,
                toggleNewKegIsOpen: this.toggleNewKegIsOpen,
              }),
          }),
          Route({
            exact: true,
            path: `/keg/:id`,
            render: props =>
              KegDetail({
                id: Number(props.match.params.id),
                kegs: this.state.kegs,
                decrementKeg: this.decrementKeg,
              }),
          }),
          Route({ component: NotFound })
        ),
        footer(`sup`)
      )
    )
}

export default hs(App)
