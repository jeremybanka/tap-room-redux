import { Link as _Link } from "react-router-dom"
import StatusBar from "../components/StatusBar"
import hs, { h2, main, section } from "../util/hyperscript"

const Link = hs(_Link)

export default ({ kegs }) =>
  main({},
    h2(
      {},
      `Kegs`
    ),
    ...kegs.map(({ name, remaining, total, color }, idx) =>
      section({},
        Link(
          { to: `/keg/${idx}` },
          name
        ),
        StatusBar({ remaining, total, color })
      )
    ),
  )
