import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';


import Message from "../../../src/components/Messages/Message";

import messagesActions from '../../../src/redux/actions/message';


function MessagesAll (
	fetchMessages,
	currentDialog,
	actions
) {
	// console.log('currentDialog all: ', currentDialog.currentDialog);

	// const [allItems, setAllItems] = useState([{}])
	
	// useEffect(() => {
	// 	if(currentDialog) {
	// 		fetchMessages(currentDialog)
	// 	}
	// 	else{
	// 		console.log("not currentDialog: ");
	// 	}
	// }, [currentDialog])

	// useEffect(() => {
	// 	// setAllItems(items)
	// }, [items])

	return(
	<>
		<Message/>
	</>
)
}

export default connect(
	({ dialogs, message }) => 
	({
		currentDialog: dialogs.currentDialog,
		items: message.items
	}),
	messagesActions
)(MessagesAll)
