import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
promise.then(response => {
  console.log(response)
})
console.log(promise)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
