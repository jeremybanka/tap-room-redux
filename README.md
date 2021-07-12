# Tap Room

_by Jeremy Banka_

## Technologies Used

- ✨ JavaScript 🛠 Airbnb ESLint
- ⚛️ React via `create-react-app`
- ♻️ Redux with hooks
- 🏷 Typechecking with `prop-types`
- 🛣 Paths with `react-router`
- 👩‍🎤 Sass Styling with `emotion.js`
- 🎨 Colors and shading with `luum.js`
- 🧑‍🎨 Diagrams with Adobe Illustrator

## Description

This is a React.js+Redux demo showing a modern implementation of Redux using react hooks. It also employs a few setup functions that make redux a bit more clear and declarative to work with:

### 🪝 `useDispatch()` hook
Without `useDispatch()`, we would have to wrap our component in a redux helper function in order to receive the `dispatch()` function as a prop. It ends up looking like this:
```js
const myComponent = ({ dispatch, ... }) => {
  ...
}
...
export default connect(mapStateToProps)(MyComponent)
```
With `useDispatch()`, gaining access to the `dispatch()` function is simpler:
```js
import { useDispatch } from "react-redux"
...
myComponent = ({ ... }) => {
  const dispatch = useDispatch()
  ...
}
...
export default myComponent
```

### 🪝 `useSelector()` hook
`useSelector()` is like `useDispatch()`, but for getting, not setting, our state. `useSelector()` lets us grab a particular slice of state and give it a local name. Without it, we have to get redux state from our props, just like `dispatch()`.
```js
const App = ({ ..., kegs, ... }) => {
  ...
}
...
export default connect(mapStateToProps)(MyComponent)
```
The following `useSelector()` call is much more explicit, and therefore clearer. As a bonus, it allows us to select only a particular slice, rather than mapping everything.
```js
import { useSelector } from 'react-redux'
import * as kegsActions from "./store/kegs"

const App = () => {
  const kegs = {
    ...kegsActions,
    get: useSelector(kegsActions.select),
  }
  ...
}
```
In the example above, I'm creating a little bundle of tools for everything related to the "kegs" slice in my store. The `.get` property allows me to use the current state, while the other kegs actions defined in `./store/kegs/index.js` allow me to change it.
```js
export const select = state => state.kegs
```
`select` is defined like so in the same file. By passing this function to `useSelector` (and naming our slice "kegs"), we are able to get just the information we need.

### 🍰 `createSlice()`: selectivity and action constants under the hood
This is probably the coolest innovation in modern redux, which allows for actions to be defined as separate callable functions.
```js 
export const itemsSlice = createSlice({
  name: `items`,
  initialState: {},
  reducers: {
    create: (state, action) => {
      const id = nanoid()
      const { name, desc } = action.payload
      return {
        ...state,
        [id]: { name, desc, id },
      }
    },
    destroy: (state, action) => {
      const { id } = action.payload
      delete state[id]
      return state
    }
  },
})

export const select = state => state.items // pass to useSelector()

export const { create, destroy } = itemsSlice.actions // pass to dispatch()

export default itemsSlice.reducer // reducer is auto-generated and can be tested!
```

These actions can be imported and used where needed:
```js
import * as itemsActions from "./store/items.js"
...
<button onClick={() => dispatch(itemsActions.create({name: `foo`}))}>
  Create Item
</button>
```

These actions *do* have types stored as constants that can be accessed straightforwardly as properties of the function itself. They are named `{slice}/{action}`.

```js
> itemsActions.create.type
< `items/create`
```

### 🔧 configureStore() vs createStore()
Basically the same, except `configureStore()` eliminates the need for `combineReducers()`. Just pass it an object with a key `reducer`. Under that key, provide an object with a key for each reducer. It will combine them and return a store. See `store/index.js` for an example.

## Component Diagram

![Component Diagram](./diagram.png)

## Setup/Installation Requirements

#### 1: Download the Materials

- Clone this repo: `$ git clone https://github.com/jeremybanka/tap-room`
- Get your `node_modules` installed: `$ npm i`

#### 2: Build and Run

- Get things compiled and serving: `$ npm run start`
- This should prompt your browser to open the project on :3000.
- You can also `$ npm run build` to peep the built code.

#### Tooling: Getting ESLint Working

- Use VS Code.
- Install VS Code extension "ESLint" by Dirk Baeumer.
- Ensure that your VS Code settings.json has the following property set:
  ```
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
  ```
- Now, my meticulously selected formatting preferences will be applied to files in this repo any time you hit save!

## Known Bugs

- none identified

## License

Gnu Public License ^3.0. All rights reversed.

## Contact Information

hello at jeremybanka dot com
