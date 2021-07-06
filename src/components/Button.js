import { css } from "@emotion/react"
import { IButtonProps } from "../propTypes"
import hs, { button } from "../util/hyperscript"

const Button = ({ onClick, label }) =>
  button(
    {
      type: `button`,
      onClick,
      css: css`
          font-size: 20px;
          padding: 5px;
          border: 1px solid var(--fg-color);
          border-radius: 5px;
      `,
    },
    label
  )

Button.propTypes = IButtonProps

export default hs(Button)
