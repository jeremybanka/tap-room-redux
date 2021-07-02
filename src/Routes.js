// betterprogramming.pub/8-basic-and-advanced-react-router-tips-6993ece8f57a

import {
  Route as _Route,
  Switch as _Switch,
} from "react-router-dom"
import Page404 from "./pages/404"
import Home from "./pages/Home"
import Sub from "./pages/Sub"
import hs from "./util/hyperscript"

const Switch = hs(_Switch)
const Route = hs(_Route)

const Routes = () => (
  Switch({},
    Route(
      { exact: true,
        path: `/`,
        component: Home }
    ),
    Route(
      { exact: true,
        path: `/sub-page`,
        component: Sub }
    ),
    Route(
      { component: Page404 }
    ),
  )

)

// <Route exact path='/' component={HomePage} />
// <Route exact path='/sub-page' component={SubPage} />

// <Route component={Page404} />
// </Switch>

export default Routes
