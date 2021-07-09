/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Component } from "react"
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Link,
} from "react-router-dom"
import luum, { specToHex } from "luum"
import { KegDetail, KegList, NotFound } from "./pages"
import kegs from "./static/kegs"

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

  render = () => (
    <Router>
      <div css={css`
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
        main {
          flex-grow: 1;
          section {
            display: flex;
            flex-direction: column;
            transition-property: all;
            transition-duration: 300ms;
            background-color: #eee;
            padding: 10px;
            width: auto;
            ~ section {
              margin-top: 10px;
            }
            > * ~ * {
              margin-top: 10px;
            }
          }
        }
        header, footer {
          display: flex;
          height: 100px;
          align-items: center;
        }
      `}
      >
        <header>
          <Link to='/'><h1>Tap Room</h1></Link>
        </header>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <KegList
                kegs={this.state.kegs}
                newKegIsOpen={this.state.newKegIsOpen}
                newKegName={this.state.newKegName}
                createKeg={this.createKeg}
                editNewKeg={this.editNewKeg}
                toggleNewKegIsOpen={this.toggleNewKegIsOpen}
              />)}
          />
          <Route
            exact
            path='/keg/:id'
            render={
              props => (
                <KegDetail
                  id={Number(props.match.params.id)}
                  kegs={this.state.kegs}
                  decrementKeg={this.decrementKeg}
                />)
            }
          />
          <Route component={NotFound} />
        </Switch>
        <footer>footer</footer>
      </div>
    </Router>
  )
}

export default App
