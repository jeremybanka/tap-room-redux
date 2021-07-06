import { Link as _Link } from "react-router-dom"
import { css } from "@emotion/react"
import StatusBar from "../components/StatusBar"
import hs, { form, input, main, p, section } from "../util/hyperscript"
import { IKegListProps } from "../propTypes"
import Button from "../components/Button"

const Link = hs(_Link)

const KegList = ({
  kegs,
  newKegIsOpen,
  toggleNewKegIsOpen,
  createKeg,
  editNewKeg,
}) =>
  main(
    {
      css: css`
        section {
          display: flex;
          flex-direction: column;
          transition-property: all;
          transition-duration: 300ms;
          background-color: #eee;
          padding: 10px;
          width: auto;
          ~ section {
            margin-top: 10px;
          }
          > * ~ * {
            margin-top: 10px;
          }
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
      `,
    },
    ...[...kegs, null].map((keg, idx) =>
      keg
        ? section(...(() => {
          const {
            name,
            brand,
            price,
            flavor,
            remaining,
            total,
            color,
          } = keg
          return [
            {},
            Link({ to: `/keg/${idx}` }, name),
            p(brand),
            p(price ? `${price}¢` : `Free`),
            p(flavor),
            StatusBar({ remaining, total, color }),
          ]
        })())
        : newKegIsOpen
          ? (
            section(...(() => [
              {
                className: `new open`,
              },
              form(
                {
                  onSubmit: e => {
                    e.preventDefault()
                    createKeg()
                  },
                },
                ...[`Name`, `Brand`, `Price`, `Flavor`]
                  .map(attr => input({
                    type: attr === `Price` ? `number` : `text`,
                    placeholder: attr,
                    onChange: e => editNewKeg(e),
                  })
                  ),
                Button({
                  label: `Done`,
                  onClick: createKeg,
                }),
                Button(
                  { label: `Cancel`,
                    onClick: toggleNewKegIsOpen })
              ),
            ])())
          )
          : (
            section(...(() => [
              {
                onClick: toggleNewKegIsOpen,
                className: `new`,
              },
              `New Keg`,
            ])())
          )
    ),
  )

KegList.propTypes = IKegListProps

export default hs(KegList)
