import React from "react";
import {Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";

function DestinationSelector({isCollection, onclickHandler, onAddressInputChange, onDeliveryChargeInputChange}) {

	// Conditionally render the address input (only if isCollection is false)
	let addressInput;
	if (!isCollection) {
		addressInput =

			<Row style={{paddingTop: "3px", paddingBottom: "3px"}}>
				<Col xs={7} style={{paddingLeft: "0", paddingRight: "0"}}>
					<FormControl onChange={onAddressInputChange} autoComplete="none" placeholder="Address"
								 style={{width: "100%"}}/>
				</Col>

				<Col style={{paddingLeft: "0", paddingRight: "0"}}>
					<Row style={{display: "flex", justifyContent: "flex-end"}}>
						<Col xs={11}>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>£</InputGroup.Text>
								</InputGroup.Prepend>
								<FormControl onChange={onDeliveryChargeInputChange} type="number" step="0.1"
											 placeholder="Charge"
								/>
							</InputGroup>
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