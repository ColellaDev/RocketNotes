import React from 'react'
import ReactDOM from 'react-dom/client'

import { Routes } from './routes'

import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'

import GlobalStyles from './styles/global.js'

import { MyContext } from './myContext.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>

      <GlobalStyles/>

      <MyContext.Provider value={{email:"marcos@gmail.com"}}>
        <Routes />
      </MyContext.Provider>

    </ThemeProvider>
  </React.StrictMode>,
)
