import {Button, Col, Modal, Row} from "react-bootstrap";
import React from "react";
import ModifierButton from "./ModifierButton";

function ItemCustomisationModal({
									modalShow, modifiers, handleModalClose, selectedItem,
									handleSelectedItemNameOnChange, handleAddItemModifierButtonClick,
									handleRemoveItemModifierButtonClick, handleAddCustomisedItemClick,
									handleItemNotesOnChange, handleSelectedItemPriceOnChange
								}) {
	return (
		// animation set to false to avoid "findDOMNode is deprecated in StrictMode" error
		<Modal show={modalShow} onHide={handleModalClose} animation={false} centered>
			<Modal.Header closeButton={true}>
				<Modal.Title>Item Customisation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className="mb-3">
					<Col>
						<input type="text" value={selectedItem.name} onChange={handleSelectedItemNameOnChange}
							   style={{width: "100%"}}/>
					</Col>

				</Row>
				<Row className="mb-3">
					<Col>
						{modifiers.map(modifier => <ModifierButton key={modifier.id}
																   modifier={modifier}
																   selectedItem={selectedItem}
																   handleAddItemModifierButtonClick={handleAddItemModifierButtonClick}
																   handleRemoveItemModifierButtonClick={handleRemoveItemModifierButtonClick}/>)}
					</Col>
				</Row>
				<Row>
					<Col>
						<input onChange={handleItemNotesOnChange} type="text" placeholder="Notes"
							   style={{marginTop: "5px", marginLeft: "3px"}}/>
					</Col>
					<Col>
						<input onChange={handleSelectedItemPriceOnChange} type="number"
							   value={selectedItem.price} placeholder="Hello" step="0.1"/>
					</Col>
				</Row>
				<hr style={{width: '95%'}}/>
				<Button onClick={handleAddCustomisedItemClick}>Add</Button>
			</Modal.Body>
		</Modal>
	);
}

export default ItemCustomisationModal;