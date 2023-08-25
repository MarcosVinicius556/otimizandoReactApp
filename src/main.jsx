import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    //Remover o <React.StrictMode> pois ele acaba renderizando 2 vezes um componente, montando e desmontado o componente
    <App />
)
