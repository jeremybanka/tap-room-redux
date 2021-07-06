import Button from "../components/Button"
import StatusBar from "../components/StatusBar"
import { IKegDetailProps } from "../propTypes"
import hs, { h2, main, p, section } from "../util/hyperscript"
import NotFound from "./NotFound"

const KegDetail = ({ id, kegs, decrementKeg }) => {
  const keg = kegs[id]
  if (!keg) return NotFound()
  const { name, brand, color, price, flavor, remaining, total } = keg
  return main(
    section(
      h2(name),
      p(brand),
      p(price ? `${price}¢` : `Free`),
      p(flavor),
      p(`${remaining}/${total} Pints Remaining`),
      StatusBar({ remaining, total, color }),
      Button({ label: `Sell Pint`, onClick: () => decrementKeg(id) })
    )
  )
}

KegDetail.propTypes = IKegDetailProps

export default hs(KegDetail)
