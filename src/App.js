/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useSelector } from 'react-redux'
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Link,
} from "react-router-dom"
import luum from "luum"
import * as kegsActions from "./store/kegs"
import * as newKegActions from "./store/newKeg"
import { KegDetail, KegList, NotFound } from "./pages"

const App = () => {
  const kegs = {
    ...kegsActions,
    get: useSelector(kegsActions.select),
  }
  const newKeg = {
    ...newKegActions,
    get: useSelector(newKegActions.select),
  }
  return (
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
                kegs={kegs}
                newKeg={newKeg}
              />)}
          />
          <Route
            exact
            path='/keg/:id'
            render={
              props => (
                <KegDetail
                  id={Number(props.match.params.id)}
                  kegs={kegs}
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
