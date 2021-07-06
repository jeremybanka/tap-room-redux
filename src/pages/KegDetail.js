import { css } from "@emotion/react"
import Button from "../components/Button"
import StatusBar from "../components/StatusBar"
import { IKegDetailProps } from "../propTypes"
import hs, { h2, main, section } from "../util/hyperscript"
import NotFound from "./NotFound"

const KegDetail = ({ id, kegs, decrementKeg }) => {
  const keg = kegs[id]
  if (!keg) return NotFound()
  const { name, color, remaining, total } = keg
  return main(
    {
      css: css`
        color: var(--keg-color);
      `,
    },
    section(
      h2(name),
      StatusBar({ remaining, total, color }),
      Button({ label: `Decrement`, onClick: () => decrementKeg(id) })
    )
  )
}

KegDetail.propTypes = IKegDetailProps

export default hs(KegDetail)
