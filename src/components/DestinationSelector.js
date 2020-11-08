import React from "react";
import {Button, Container, Row} from "react-bootstrap";

function DestinationSelector({isCollection, onclickHandler, onAddressInputChange}) {

	// Conditionally render the address input (only if isCollection is false)
	let addressInput;
	if (!isCollection) {
		addressInput =
			<input onChange={onAddressInputChange} autoComplete="none" placeholder="Address" style={{width: '100%'}}/>;
	}

	return (
		<Container>
			<Row>
				<Button name="collection" variant={isCollection ? "primary" : "secondary"} onClick={onclickHandler}
						style={buttonStyle}>Collection</Button>
				<Button name="delivery" variant={isCollection ? "secondary" : "primary"} onClick={onclickHandler}
						style={buttonStyle}>Delivery</Button>
			</Row>
			<Row>
				{addressInput}
			</Row>
		</Container>
	);
}

const buttonStyle = {
	margin: '5px'
};

export default DestinationSelector;