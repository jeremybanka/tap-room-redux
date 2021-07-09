/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom"
import { css } from "@emotion/react"
import StatusBar from "../components/StatusBar"
import { IKegListProps } from "../propTypes"
import Button from "../components/Button"

const KegList = ({
  kegs,
  newKegIsOpen,
  toggleNewKegIsOpen,
  createKeg,
  editNewKeg,
}) => (
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
    {[...kegs, null].map((keg, idx) =>
      keg
        ? <section>{(() => {
          const {
            name,
            brand,
            price,
            flavor,
            remaining,
            total,
            color,
          } = keg
          return (<>
            <Link to={`/keg/${idx}`}>{name}</Link>
            <p>{brand}</p>
            {/* JSX be like: p(brand) 👎 <p>{brand}</p> 🤌 */}
            <p>{price ? `${price}¢` : `Free`}</p>
            <p>{flavor}</p>
            <p>{`${remaining}/${total} Pints Remaining`}</p>
            <StatusBar remaining={remaining} total={total} color={color} />
            {/* JSX be like: remaining={remaining} 🥴 👌 */}
          </>)
        })()}
        </section>
        : newKegIsOpen
          ? (
            <section className='new open'>
              <form onSubmit={e => {
                e.preventDefault()
                createKeg()
              }}
              >
                {
                  [`Name`, `Brand`, `Price`, `Flavor`]
                    .map(attr => (
                      <input
                        type={attr === `Price` ? `number` : `text`}
                        placeholder={attr}
                        onChange={e => editNewKeg(e)}
                      />
                    ))
                }
                <Button
                  label='Done'
                  onClick={createKeg}
                />
                <Button
                  label='Cancel'
                  onClick={toggleNewKegIsOpen}
                />
              </form>
            </section>
          )
          : (
            <section
              role='button'
              tabIndex={0}
              onKeyDown={toggleNewKegIsOpen}
              onClick={toggleNewKegIsOpen}
              className='new'
            >
              New Keg
            </section>
          )
    )
    }
  </main>
)

KegList.propTypes = IKegListProps

export default KegList
