import {Button, Col, Container, Row} from "react-bootstrap";
import React from "react";

function Item({item, price, handleAddItemClick, handleItemClick}) {
	return (
		<Container style={{margin: '5px', boxShadow: "0 1px 2px 0 rgba(0,0,0,0.2)", padding: "5px 15px 5px 15px"}}>
			<Row style={{display: "flex", alignItems: "center"}} onClick={() => handleItemClick(item.id)}>
				<Col style={colStyle} className="text-center" xs={7}>
					<div style={{fontSize: "small"}}>{item.name}</div>
				</Col>
				<Col xs={2}>
					<div>{"£" + price.toFixed(2)}</div>
				</Col>
				<Col className="text-right" xs={3}>
					<Button name={item.id} onClick={handleAddItemClick} size="sm" className="my-auto">+</Button>
				</Col>
			</Row>
		</Container>

	);
}

const colStyle = {
	padding: '0'
};

export default Item;