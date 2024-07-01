import { TestSSR } from 'pages/testSSR'
import React from 'react'
import ReactDOM from 'react-dom/server'

export const render = () => ReactDOM.renderToString(<TestSSR />)
