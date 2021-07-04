import { css } from "@emotion/react"
import { Component } from 'react'
import {
  Route as _Route,
  Switch as _Switch,
  BrowserRouter as _Router,
  Link as _Link,
} from "react-router-dom"
import hs, {
  div,
  footer,
  h1,
  header,
} from "./util/hyperscript"
import Page404 from "./pages/404"
import KegList from "./pages/KegList"
import KegDetail from "./pages/KegDetail"
import kegs from "./static/kegs"

const Router = hs(_Router)
const Switch = hs(_Switch)
const Route = hs(_Route)
const Link = hs(_Link)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { kegs }
  }

render = () => (
  Router({},
    div(
      { css: css`
         height: 100vh;
         display: flex;
         flex-direction: column;
         &, * {
           background-color: var(--bg-color);
           color: var(--fg-color);
         }
         > main {
           flex-grow: 1;
        }
      ` },
      header(
        {},
        Link(
          { to: `/` },
          h1(`Tap Room`),
        )
      ),
      Switch({},
        Route(
          { exact: true,
            path: `/`,
            render: () => KegList(
              { kegs: this.state.kegs }
            ) }
        ),
        Route(
          { exact: true,
            path: `/keg/:id`,
            render: props =>
              KegDetail(
                { id: props.match.params.id,
                  kegs: this.state.kegs }
              ) }
        ),
        Route(
          { component: Page404 }
        )
      ),
      footer(
        `sup`,
      )
    )
  )
)
}
