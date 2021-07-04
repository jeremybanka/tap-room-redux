import { css } from "@emotion/react"
import { div } from "../util/hyperscript"

export default ({ remaining, total, color }) => {
  const arrayTotal = Array.from(Array(total))

  return (
    div(
      { css: css`
      --keg-color: ${color};
      display: flex;
      height: 50px;
      width: 100%;
      gap: 2px
    ` },
      ...arrayTotal.map((...args) => {
        const idx = args[1]
        const bgColor = idx <= remaining ? `keg-color` : `mg-color`
        return div(
          { css: css`
          height: 50px;
          flex-grow: 1;
          background-color: var(--${bgColor});
        ` }
        )
      }))
  )
}
