/** @jsxImportSource @emotion/react */
import { useDispatch } from "react-redux"
import Button from "../components/Button"
import StatusBar from "../components/StatusBar"
import { IKegDetailProps } from "../propTypes"
import NotFound from "./NotFound"

const KegDetail = ({ id, kegs }) => {
  const keg = kegs.get[id]
  if (!keg) return NotFound()
  const dispatch = useDispatch()
  const { name, brand, color, price, flavor, remaining, total } = keg
  return (
    <main>
      <section>
        <h2>{name}</h2>
        <p>{brand}</p>
        <p>{price ? `${price}¢` : `Free`}</p>
        <p>{flavor}</p>
        <p>{`${remaining}/${total} Pints Remaining`}</p>
        <StatusBar remaining={remaining} total={total} color={color} />
        <Button label='Sell Pint' onClick={() => dispatch(kegs.decrement(id))} />
      </section>
    </main>
  )
}

KegDetail.propTypes = IKegDetailProps

export default KegDetail
