/** @jsxImportSource @emotion/react */
import Button from "../components/Button"
import StatusBar from "../components/StatusBar"
import { IKegDetailProps } from "../propTypes"
import NotFound from "./NotFound"

const KegDetail = ({ id, kegs, decrementKeg }) => {
  const keg = kegs[id]
  if (!keg) return NotFound()
  const { name, brand, color, price, flavor, remaining, total } = keg
  return (
    <main>
      <section>
        <h2>{name}</h2>,
        <p>{brand}</p>
        <p>{price ? `${price}¢` : `Free`}</p>
        <p>{flavor}</p>
        <p>{`${remaining}/${total} Pints Remaining`}</p>
        <StatusBar remaining={remaining} total={total} color={color} />
        <Button label='Sell Pint' onClick={() => decrementKeg(id)} />
      </section>
    </main>
  )
}

KegDetail.propTypes = IKegDetailProps

export default KegDetail
