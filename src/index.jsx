import React from 'react'

import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import ApiProvider  from './context/DataWeatherContent'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiProvider>
       <App />
    </ApiProvider>
  </React.StrictMode>,
)
