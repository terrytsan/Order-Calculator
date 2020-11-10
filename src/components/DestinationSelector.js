import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";

function DestinationSelector({isCollection, onclickHandler, onAddressInputChange, onDeliveryChargeInputChange}) {

	// Conditionally render the address input (only if isCollection is false)
	let addressInput;
	if (!isCollection) {
		addressInput =

			<Row style={{paddingTop: "3px", paddingBottom: "3px"}}>
				<Col xs={8} style={{paddingLeft: "0", paddingRight: "0"}}>
					<input onChange={onAddressInputChange} autoComplete="none" placeholder="Address"
						   style={{width: "100%"}}/>
				</Col>

				<Col style={{paddingRight: "0", textAlign: "right"}}>
					<Row>
						<Col style={{padding: "0"}}>
							<p>£</p>
						</Col>
						<Col xs={11} style={{paddingLeft: "3px"}}>
							<input onChange={onDeliveryChargeInputChange} type="number" step="0.1" placeholder="Charge"
								   style={{width: "100%"}}/>
						</Col>
					</Row>
				</Col>
			</Row>;
	}

	return (
		<Container className="container-fluid">
			<Row>
				<Button name="collection" variant={isCollection ? "primary" : "secondary"} onClick={onclickHandler}
						style={buttonStyle}>Collection</Button>
				<Button name="delivery" variant={isCollection ? "secondary" : "primary"} onClick={onclickHandler}
						style={buttonStyle}>Delivery</Button>
			</Row>
			{addressInput}
		</Container>
	);
}

const buttonStyle = {
	margin: '5px'
};

export default DestinationSelector;