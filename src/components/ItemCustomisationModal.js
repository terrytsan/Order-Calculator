import {Button, Modal} from "react-bootstrap";
import React from "react";
import ModifierButton from "./ModifierButton";

function ItemCustomisationModal({modalShow, modifiers, handleModalClose, selectedItem, handleAddItemModifierButtonClick, handleRemoveItemModifierButtonClick, handleAddCustomisedItemClick, handleItemNotesOnChange}) {
	return (
		// animation set to false to avoid "findDOMNode is deprecated in StrictMode" error
		<Modal show={modalShow} onHide={handleModalClose} animation={false} centered>
			<Modal.Header closeButton={true}>
				<Modal.Title>Item Customisation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{selectedItem.name}</p>
				{modifiers.map(modifier => <ModifierButton key={modifier.id}
														   modifier={modifier}
														   selectedItem={selectedItem}
														   handleAddItemModifierButtonClick={handleAddItemModifierButtonClick}
														   handleRemoveItemModifierButtonClick={handleRemoveItemModifierButtonClick}/>)}
				<input onChange={handleItemNotesOnChange} type="text" placeholder="Notes"
					   style={{marginTop: "5px", marginLeft: "3px"}}/>
				<hr style={{width: '95%'}}/>
				<Button onClick={handleAddCustomisedItemClick}>Add</Button>
			</Modal.Body>
		</Modal>
	);
}

export default ItemCustomisationModal;