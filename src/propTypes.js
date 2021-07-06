import { arrayOf, bool, func, number, shape, string } from 'prop-types'

const IBrew = {
  total: number.isRequired,
  remaining: number.isRequired,
  color: string.isRequired,
}

export const IStatusBarProps = IBrew

const IKeg = {
  ...IBrew,
  name: string.isRequired,
  flavor: string.isRequired,
  price: number.isRequired,
  brand: string.isRequired,
}

const IKegs = arrayOf(shape(IKeg))

const id = number.isRequired

export const IKegDetailProps = {
  id,
  kegs: IKegs,
  decrementKeg: func.isRequired,
}

export const IKegListProps = {
  kegs: IKegs,
  createKeg: func.isRequired,
  newKegIsOpen: bool.isRequired,
  toggleNewKegIsOpen: func.isRequired,
  editNewKeg: func.isRequired,
}

export const IButtonProps = {
  onClick: func.isRequired,
  label: string.isRequired,
}
