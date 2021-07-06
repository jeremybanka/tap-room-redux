import hs, { h1, main } from "../util/hyperscript"

const NotFound = () => main(h1(`not found`))

export default hs(NotFound)
