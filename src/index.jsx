import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";

// import express from 'express'
// let cors = require('cors')

import { Provider } from 'react-redux';
import store from '../src/redux/store'

import App from './App';
import './index.css'

// const app = express()
// app.use(cors())

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
)
