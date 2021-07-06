import React from 'react'
import ReactDOM from 'react-dom'
import './core.css'
import App from './App'
import hs from './util/hyperscript'
// import reportWebVitals from './reportWebVitals'

const StrictMode = hs(React.StrictMode)

ReactDOM.render(
  StrictMode(App()),
  document.getElementById(`root`)
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
