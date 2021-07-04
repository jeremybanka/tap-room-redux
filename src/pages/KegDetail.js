import { css } from "@emotion/react"
import StatusBar from "../components/StatusBar"
import { h2, main } from "../util/hyperscript"

export default ({ id, kegs }) => {
  const { name, color, remaining, total } = kegs[id]
  console.log(`|| remaining`, remaining)
  console.log(`|| total`, total)
  return main(
    {},
    h2(
      { css: css`
        color: var(--keg-color);
      ` },
      name
    ),
    StatusBar({ remaining, total, color })
  )
}
