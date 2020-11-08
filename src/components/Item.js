import {Button, Col, Container, Row} from "react-bootstrap";
import React from "react";

function Item({item, price, handleAddItemClick, handleItemClick}) {
	return (
		<Container style={{margin: '5px', boxShadow: "0 1px 2px 0 rgba(0,0,0,0.2)"}}>
			<Row>
				<Col onClick={() => {
					handleItemClick(item.id);
				}} className="text-center" xs={7}>
					<p style={{fontSize: "small"}}>{item.name}</p>
				</Col>
				<div className="d-flex align-items-center">
					<Col onClick={() => {
						handleItemClick(item.id);
					}} className="text-center" xs={2}>
						<p>{"£" + price.toFixed(2)}</p>
					</Col>
				</div>
				<Col className="text-center" xs={2}>
					<Button name={item.id} onClick={handleAddItemClick}>Add</Button>
				</Col>
			</Row>
		</Container>

	);
}

export default Item;