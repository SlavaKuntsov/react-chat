import  { combineReducers } from 'redux'

const reducers = ['dialogs', 'message', 'user']

export default combineReducers(
	reducers.reduce((initial, name) => {
		initial[name] = require(`./${name}`).default
		return initial
	}, {})
)