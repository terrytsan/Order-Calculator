import {Button, Col, Modal} from "react-bootstrap";
import React from "react";
import {XCircleIcon} from '@primer/octicons-react';

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
function createItemSummary(itemCountObj, handleRemoveItemOnClick) {
	// Holds a list of summarised items (in human readable form)
	let itemSummary = [];
	Object.keys(itemCountObj).forEach((item) => {
		let num = itemCountObj[item];
		// parse into object
		let object = JSON.parse(item);
		let test = object.notes !== undefined ? object.notes : "";
		itemSummary = itemSummary.concat(num + "x " + object.name + " " + object.modifiers.reduce((result, modifier) => {
			return `${result} ${modifier.description}`;
		}, "") + test);
	});
	return (
		<div>
			{itemSummary.map((item, i) =>
				<div key={i + "div"} className="row" style={{paddingTop: "3px", paddingBottom: "3px"}}>
					<Col xs={10} style={{paddingRight: "0", display: "flex", alignItems: "center"}}>
						<p key={i + "itemText"}
						   style={{fontSize: "small", verticalAlign: "middle", marginBottom: "0"}}>{item}</p>
					</Col>
					<Col style={{
						paddingLeft: "0", paddingRight: "5px", display: "flex", flexDirection: "column",
						justifyContent: "center"
					}}>
						<Button key={i} variant={"danger"} style={removeButtonStyle} onClick={() => {
							// Pass the item that should be removed
							handleRemoveItemOnClick(JSON.parse(Object.keys(itemCountObj)[i]));
						}}> <XCircleIcon size={16}/></Button>
					</Col>
				</div>
			)}
		</div>
	);
}

function OrderSummaryModal({modalShow, handleModalClose, selectedItems, contactNumber, address, deliveryCharge, handleRemoveItemOnClick}) {
	let countedItems = countUniqueItems(selectedItems);

	// Conditionally render delivery charge component
	let deliveryChargeOutput;
	if (deliveryCharge !== 0) {
		deliveryChargeOutput = <p style={{marginBottom: "0"}}>Delivery Charge £{deliveryCharge.toFixed(2)}</p>;
	}

	return (
		// animation set to false to avoid "findDOMNode is deprecated in StrictMode" error
		<Modal show={modalShow} onHide={handleModalClose} animation={false} centered>
			<Modal.Header closeButton={true}>
				<Modal.Title>Order Summary</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p style={{fontWeight: "bold"}}>{contactNumber}</p>
				<p style={{fontWeight: "bold"}}>{address}</p>

				{createItemSummary(countedItems, handleRemoveItemOnClick)}
				<hr style={{width: '95%'}}/>
				{deliveryChargeOutput}
				<p style={{fontWeight: "bold", fontSize: "large", marginTop: "0", marginBottom: "0"}}>Total Cost
					£{(selectedItems.reduce((total, item) => total + item.price, 0) + deliveryCharge).toFixed(2)}</p>
			</Modal.Body>
		</Modal>
	);
}

const removeButtonStyle = {
	fontSize: 'small',
	paddingLeft: '5px',
	paddingRight: '5px',
	alignItems: 'center',
	alignSelf: 'flex-end',
	verticalAlign: 'middle'
};
export default OrderSummaryModal;
