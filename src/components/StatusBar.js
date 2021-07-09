/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { IStatusBarProps } from "../propTypes"

const arrayOfLength = int => Array.from(Array(int))

const autoMap = (int, cb) => arrayOfLength(int).map(cb)

const StatusBar = ({ remaining, total, color }) => (
  <div
    css={css`
      display: flex;
      width: 100%;
      gap: 1px;
      * {
        height: 50px;
        flex-grow: 1;
      }
      .full {
        background-color: ${color};
      }
      .empty {
        background-color: #ddd;
      }
    `}
  >
    {
      autoMap(
        total,
        (_, i) => (
          <div className={i <= remaining - 1 ? `full` : `empty`} />
        )
      )
    }
  </div>
)

StatusBar.propTypes = IStatusBarProps

export default StatusBar
