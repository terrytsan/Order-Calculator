import {Col, Container, Row} from "react-bootstrap";
import React from "react";

function OrderSummary({totalPrice, totalNumItems, handleOrderSummaryClick}) {
	return (
		<Container onClick={handleOrderSummaryClick}>
			<Row>
				<Col>
					<p className="summary-text">{"Number of items: " + totalNumItems}</p>
				</Col>
				<Col>
					<p className="summary-text">{"Total cost: £" + totalPrice.toFixed(2)}</p>
				</Col>
			</Row>
		</Container>

	);
}

export default OrderSummary;