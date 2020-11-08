import {Button} from "react-bootstrap";
import React from "react";
import './../App.css';

function ModifierButton({modifier, selectedItem, handleAddItemModifierButtonClick, handleRemoveItemModifierButtonClick}) {
	if (selectedItem.modifiers.some((m) => m.id === modifier.id)) {
		// Render blue button if modifier already exists in selected item
		return (
			<Button variant="primary" name={modifier.id} style={{margin: "3px"}}
					onClick={handleRemoveItemModifierButtonClick}>{modifier.description}</Button>
		);
	} else {
		// Otherwise gray button
		return (
			<Button variant="secondary" name={modifier.id} style={{margin: "3px"}}
					onClick={handleAddItemModifierButtonClick}>{modifier.description}</Button>
		);
	}
}

export default ModifierButton;