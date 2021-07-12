import { arrayOf, bool, func, number, shape, string } from 'prop-types'

const IBrew = {
  total: number.isRequired,
  remaining: number.isRequired,
  color: string.isRequired,
}

const IKegLabel = {
  name: string.isRequired,
  flavor: string.isRequired,
  price: number.isRequired,
  brand: string.isRequired,
}

const IKeg = {
  ...IBrew,
  ...IKegLabel,
}

export const IStatusBarProps = IBrew

const IKegs = {
  get: arrayOf(shape(IKeg)),
  create: func.isRequired,
  decrement: func.isRequired,
}

const INewKeg = {
  get: shape({
    ...IKegLabel,
    isOpen: bool.isRequired,
  }),
  toggleOpen: func.isRequired,
  edit: func.isRequired,
  reset: func.isRequired,
}

const id = number.isRequired

export const IKegDetailProps = {
  id,
  kegs: shape(IKegs),
}

export const IKegListProps = {
  kegs: shape(IKegs),
  newKeg: shape(INewKeg),
}

export const IButtonProps = {
  onClick: func.isRequired,
  label: string.isRequired,
}
