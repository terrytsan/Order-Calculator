import {Modal} from "react-bootstrap";
import React from "react";

// Return an object. key: JSON.stringify(item) value: count of the item
function countUniqueItems(items) {
	let itemCount = {};
	items.forEach((item) => {
		let key = JSON.stringify(item);
		// let key = item;
		itemCount[key] = (itemCount[key] || 0) + 1;
	});
	return itemCount;
}

// Given an object (with item and count), create the text summary of items
function createItemSummary(itemCountObj) {
	let itemSummary = [];
	Object.keys(itemCountObj).forEach((item) => {
		let num = itemCountObj[item];
		// parse into object
		let object = JSON.parse(item);
		itemSummary = itemSummary.concat(num + "x " + object.name + " " + object.modifiers.reduce((result, item) => {
			return `${result} ${item.description}`;
		}, ""));
	});
	return (
		<div>
			{itemSummary.map((item, i) => <p key={i}>{item}</p>)}
		</div>
	);
}

function OrderSummaryModal({modalShow, handleModalClose, selectedItems, contactNumber, address}) {
	let countedItems = countUniqueItems(selectedItems);
	return (
		// animation set to false to avoid "findDOMNode is deprecated in StrictMode" error
		<Modal show={modalShow} onHide={handleModalClose} animation={false} centered>
			<Modal.Header closeButton={true}>
				<Modal.Title>Order Summary</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p style={{fontWeight: "bold"}}>{contactNumber}</p>
				<p style={{fontWeight: "bold"}}>{address}</p>

				{createItemSummary(countedItems)}
				<hr style={{width: '95%'}}/>
				<p style={{fontWeight: "bold", fontSize: "large"}}>Total Cost
					£{selectedItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
			</Modal.Body>
		</Modal>
	);
}

export default OrderSummaryModal;
