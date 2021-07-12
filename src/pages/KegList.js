/** @jsxImportSource @emotion/react */
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { css } from "@emotion/react"
import StatusBar from "../components/StatusBar"
import { IKegListProps } from "../propTypes"
import Button from "../components/Button"

const KegList = ({
  kegs,
  newKeg,
}) => {
  const dispatch = useDispatch()
  return (
    <main
      css={css`
      section {
        &.new {
          width: fit-content;
          background: #e3e3e3;
          &.open {
            background: #eee;
          }
          form {
            display: flex;
            flex-direction: column;
            > * ~ * {
              margin-top: 10px;
            }
            input {
              font-size: 20px;
            }
          }
        }
      }
    `}
    >
      {[...kegs.get, null].map((keg, idx) =>
        keg
          ? (
            <section key={idx}>{(() => {
              const {
                name,
                brand,
                price,
                flavor,
                remaining,
                total,
                color,
              } = keg
              return (
                <>
                  <Link to={`/keg/${idx}`}>{name}</Link>
                  <p>{brand}</p>
                  {/* JSX be like: p(brand) 👎 <p>{brand}</p> 🤌 */}
                  <p>{price ? `${price}¢` : `Free`}</p>
                  <p>{flavor}</p>
                  <p>{`${remaining}/${total} Pints Remaining`}</p>
                  <StatusBar remaining={remaining} total={total} color={color} />
                  {/* JSX be like: remaining={remaining} 🥴 👌 */}
                </>
              )
            })()}
            </section>
          )
          : newKeg.get.isOpen
            ? (
              <section key={idx} className='new open'>
                <form onSubmit={e => {
                  e.preventDefault()
                  dispatch(newKeg.toggleOpen())
                }}
                >
                  {
                  [`name`, `brand`, `price`, `flavor`]
                    .map((attr, idx) => (
                      <input
                        key={idx}
                        type={attr === `price` ? `number` : `text`}
                        placeholder={attr}
                        onChange={e => {
                          const key = e.target.placeholder
                          const value = key === `price`
                            ? Number(e.target.value)
                            : e.target.value
                          dispatch(newKeg.edit({ key, value }))
                        }}
                      />
                    ))
                }
                  <Button
                    label='Done'
                    onClick={() => {
                      dispatch(kegs.create(newKeg.get))
                      dispatch(newKeg.toggleOpen())
                    }}
                  />
                  <Button
                    label='Cancel'
                    onClick={() => dispatch(newKeg.toggleOpen())}
                  />
                </form>
              </section>
            )
            : (
              <section
                key={idx}
                role='button'
                tabIndex={0}
                onKeyDown={() => dispatch(newKeg.toggleOpen())}
                onClick={() => dispatch(newKeg.toggleOpen())}
                className='new'
              >
                New Keg
              </section>
            )
      )
    }
    </main>
  )
}

KegList.propTypes = IKegListProps

export default KegList
