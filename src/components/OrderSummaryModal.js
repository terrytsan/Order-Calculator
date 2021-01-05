import {Button, Col, Modal} from "react-bootstrap";
import React, {Component} from "react";
import {ChevronDownIcon, ChevronUpIcon, CopyIcon} from '@primer/octicons-react';
import * as PropTypes from "prop-types";

class OrderSummaryModal extends Component {
	// Text that will be copied to the clipboard (holds the order summary and total cost)
	copyText = "";

	// Return an object. key: JSON.stringify(item) value: count of the item
	countUniqueItems(items) {
		let itemCount = {};
		items.forEach((item) => {
			let key = JSON.stringify(item);
			// let key = item;
			itemCount[key] = (itemCount[key] || 0) + 1;
		});
		return itemCount;
	}

	// Given an object (with item and count), create the text summary of items
	createItemSummary(itemCountObj, handleRemoveItemOnClick, handleDuplicateItemOnClick) {
		// Holds a list of summarised items (in human readable form)
		let itemSummary = [];
		let clipboardSummary = "";
		Object.keys(itemCountObj).forEach((item) => {
			let num = itemCountObj[item];
			// parse into object
			let object = JSON.parse(item);
			let notes = object.notes !== undefined ? object.notes : "";
			let itemLine = num + `x ` + object.name + ` ` + object.modifiers.reduce((result, modifier) => {
				return `${result} ${modifier.description}`;
			}, "") + ` ` + notes;
			clipboardSummary += itemLine + "\n";
			itemSummary = itemSummary.concat(itemLine);
		});
		this.copyText = clipboardSummary;
		return (
			<div>
				{itemSummary.map((item, i) =>
					<div key={i + "div"} className="row" style={{paddingTop: "3px", paddingBottom: "3px"}}>
						<Col xs={9} style={{paddingRight: "0", display: "flex", alignItems: "center"}}>
							<p key={i + "itemText"}
							   style={{fontSize: "small", verticalAlign: "middle", marginBottom: "0"}}>{item}</p>
						</Col>
						<Col style={{
							paddingLeft: "0", display: "flex", flexDirection: "row", justifyContent: "space-between"
						}}>
							<Button key={"duplicate" + i} style={addButtonStyle} onClick={() => {
								handleDuplicateItemOnClick(JSON.parse(Object.keys(itemCountObj)[i]));
							}}>
								<ChevronUpIcon size={16}/>
							</Button>
							<Button key={"remove" + i} style={removeButtonStyle} variant={"danger"} onClick={() => {
								// Pass the item that should be removed
								handleRemoveItemOnClick(JSON.parse(Object.keys(itemCountObj)[i]));
							}}>
								<ChevronDownIcon size={16}/>
							</Button>
						</Col>
					</div>
				)}
			</div>
		);
	}

	// Calculate the total cost and also append to copyText
	calculateTotalCost(selectedItems, deliveryCharge) {
		let totalCost = (selectedItems.reduce((total, item) => total + item.price, 0) + deliveryCharge).toFixed(2);
		this.copyText += "\n£" + totalCost;
		return totalCost;
	}

	handleCopyToClipboardClick = (contactNumber, address) => {
		let contactNumberText = (contactNumber === "") ? "" : `${contactNumber}\n`;
		let addressText = (address === "") ? "" : `${address}\n`;
		// Add the contact number and address before writing to clipboard
		if ((navigator.clipboard)) {
			navigator.clipboard.writeText(`${contactNumberText}${addressText}\n${this.copyText}`);
		}
	};

	render() {
		let {
			modalShow, handleModalClose, selectedItems, contactNumber, address, deliveryCharge, handleRemoveItemOnClick,
			handleDuplicateItemOnClick
		} = this.props;
		let countedItems = this.countUniqueItems(selectedItems);

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
					<Button onClick={() => this.handleCopyToClipboardClick(contactNumber, address)}
							style={{marginLeft: "10px"}}>
						<CopyIcon size={20}/>
					</Button>
				</Modal.Header>
				<Modal.Body>
					<p style={{fontWeight: "bold"}}>{contactNumber}</p>
					<p style={{fontWeight: "bold"}}>{address}</p>

					{this.createItemSummary(countedItems, handleRemoveItemOnClick, handleDuplicateItemOnClick)}
					<hr style={{width: '95%'}}/>
					{deliveryChargeOutput}
					<p style={{fontWeight: "bold", fontSize: "large", marginTop: "0", marginBottom: "0"}}>Total Cost
						£{this.calculateTotalCost(selectedItems, deliveryCharge)}</p>
				</Modal.Body>
			</Modal>
		);
	}
}

OrderSummaryModal.propTypes = {
	modalShow: PropTypes.any,
	handleModalClose: PropTypes.any,
	selectedItems: PropTypes.any,
	contactNumber: PropTypes.any,
	address: PropTypes.any,
	deliveryCharge: PropTypes.any,
	handleRemoveItemOnClick: PropTypes.any
};

const removeButtonStyle = {
	fontSize: 'small',
	paddingLeft: '5px',
	paddingRight: '5px',
};
const addButtonStyle = {
	fontSize: 'small',
	paddingLeft: '5px',
	paddingRight: '5px',
};
export default OrderSummaryModal;
