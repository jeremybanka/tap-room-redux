/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { IButtonProps } from "../propTypes"

const Button = ({ onClick, label }) => (
  <button
    type='button'
    onClick={onClick}
    css={css`
      font-size: 20px;
      padding: 5px;
      border: 1px solid var(--fg-color);
      border-radius: 5px;
    `}
  >
    {label}
  </button>
)

Button.propTypes = IButtonProps

export default Button
