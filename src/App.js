/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { BrowserRouter as _Router } from 'react-router-dom'
import hs, {
  article,
  footer,
  header,
  nav,
} from "./util/hyperscript"
import Routes from "./Routes"

const Router = hs(_Router)

export default () => (
  article(
    { css: css`
        height: 100vh;
        display: flex;
        background-color: #eee;
      ` },
    header(
      {},
      nav(`hi`)
    ),
    Router(
      {},
      Routes()
    ),
    footer(
      `sup`,
    )
  )
)
