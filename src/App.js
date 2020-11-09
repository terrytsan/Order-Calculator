import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";
import './App.css';
import OrderSummary from "./components/OrderSummary";
import Item from "./components/Item";
import ItemCustomisationModal from "./components/ItemCustomisationModal";
import OrderSummaryModal from "./components/OrderSummaryModal";
import SearchBar from "./components/SearchBar";
import ContactNumberInput from "./components/ContactNumberInput";
import DestinationSelector from "./components/DestinationSelector";
import items from "./items.json";

class App extends Component {
	state = {
		selectedItems: [],
		originalItems: items.items,
		// List of items for search bar
		filteredItems: [],
		itemModifiers: [{"id": 1, "description": "No Veg"}, {"id": 2, "description": "No Pork"}, {
			"id": 3, "description": "Add Mushrooms"
		}],
		showItemCustomisationModal: false,
		// The item that's about to be modified
		currentItem: {"id": "0", "name": "", "price": 0, "modifiers": []},
		showOrderSummaryModal: false,
		contactNumber: "",
		// If false, order is a delivery
		isCollection: true,
		address: ""
	};

	componentDidMount() {
		// Set the filtered items to the original items when the component is first mounted
		this.setState({
			filteredItems: this.state.originalItems
		});
	}

	// Handles when the user clicks add on a specific item (on the main page)
	handleAddItemClick = (event) => {
		let itemId = event.target.name;

		// Find the actual item
		let desiredItem = this.state.originalItems.find(item => item.id === itemId);
		// find returns a reference, so make a copy of the object
		desiredItem = JSON.parse(JSON.stringify(desiredItem));

		// Add the item to array
		this.setState({selectedItems: this.state.selectedItems.concat(desiredItem)});
	};

	// Pass id directly - could be clicking on any element within container, so event.target.name might be undefined
	handleItemCustomisationModalShow = (itemId) => {
		let selectedItem = this.state.originalItems.find(item => item.id === itemId);
		// find returns a reference, so make a copy of the object
		selectedItem = JSON.parse(JSON.stringify(selectedItem));

		this.setState({currentItem: selectedItem});

		this.setState({showItemCustomisationModal: true});
	};

	handleItemCustomisationModalClose = () => this.setState({showItemCustomisationModal: false});

	// Handle the click of a modifier button for a modifier that is not present on the current item (need to add the modifier)
	handleAddItemModifierButtonClick = (event) => {
		let modifierId = parseInt(event.target.name);
		// Get the modifier
		let desiredModifier = this.state.itemModifiers.find(modifier => modifier.id === modifierId);
		// find returns a reference, so make a copy of the object
		desiredModifier = JSON.parse(JSON.stringify(desiredModifier));

		// Add the modification to the item's list of modifications
		let updatedCurrentItem = this.state.currentItem;
		updatedCurrentItem.modifiers = updatedCurrentItem.modifiers.concat(desiredModifier);
		this.setState({currentItem: updatedCurrentItem});
	};

	// Handle the click of a modifier button for a modifier that is already present on the current item (need to remove the modifier)
	handleRemoveItemModifierButtonClick = (event) => {
		let modifierId = parseInt(event.target.name);

		// Remove the modification to the item's list of modifications
		let updatedCurrentItem = this.state.currentItem;
		updatedCurrentItem.modifiers = updatedCurrentItem.modifiers.filter(modifier => modifier.id !== modifierId);
		this.setState({currentItem: updatedCurrentItem});
	};

	// Handle the user clicking the add button on the customisation modal
	handleAddCustomisedItemClick = () => {
		// Add the currentItem to the list of selected items
		let updatedSelectedItems = this.state.selectedItems;
		updatedSelectedItems = updatedSelectedItems.concat(this.state.currentItem);
		this.setState({selectedItems: updatedSelectedItems});

		// Reset the current item
		this.setState({currentItem: {"id": 0, "name": "", "price": 0, "modifiers": []}});

		// Close the modal
		this.setState({showItemCustomisationModal: false});
	};

	// Handles the user clicking the order summary footer bar
	handleOrderSummaryFooterClick = () => {
		this.handleOrderSummaryModalShow();
	};

	handleOrderSummaryModalShow = () => {
		this.setState({showOrderSummaryModal: true});
	};

	handleOrderSummaryModalClose = () => this.setState({showOrderSummaryModal: false});

	// Handles when the search bar is changed - filters the list of items
	handleSearchBarChange = (event) => {
		let newList;
		let searchText = event.target.value.toLowerCase();

		if (searchText !== "") {
			newList = this.state.originalItems.filter(item => item.name.toLowerCase().includes(searchText));
		} else {
			newList = this.state.originalItems;
		}

		this.setState({
			filteredItems: newList
		});
	};

	handleContactNumberChange = (event) => {
		let contactNumber = event.target.value;
		this.setState({contactNumber: contactNumber});
	};

	// Handles the clicking of any of the destination buttons
	handleDestinationButtonClick = (event) => {
		let destination = event.target.name;

		switch (destination) {
			case 'collection':
				this.setState({isCollection: true});
				break;
			case 'delivery':
				this.setState({isCollection: false});
				// Reset the address field
				this.setState({address: ""});
				break;
			default:
				console.log("Invalid destination selected");
		}
	};

	// Handles the address bar text changing
	handleAddressInputChange = (event) => {
		let inputAddress = event.target.value;

		this.setState({address: inputAddress});
	};

	render() {
		return (
			<div>
				<Container className="main-container container-fluid no-padding">
					<Row>
						<Col>
							{/*<h1>Hello World</h1>*/}
							<DestinationSelector isCollection={this.state.isCollection}
												 onclickHandler={this.handleDestinationButtonClick}
												 onAddressInputChange={this.handleAddressInputChange}/>
							<ContactNumberInput onChange={this.handleContactNumberChange}/>
							<SearchBar onChange={this.handleSearchBarChange}/>
						</Col>
					</Row>
					<Row>
						{this.state.filteredItems.map(item => <Item key={item.id} item={item}
																	price={item.price}
																	handleItemClick={this.handleItemCustomisationModalShow}
																	handleAddItemClick={this.handleAddItemClick}/>)}
					</Row>

				</Container>

				<footer className="footer">
					<OrderSummary totalPrice={this.state.selectedItems.reduce((total, item) => total + item.price, 0)}
								  totalNumItems={this.state.selectedItems.length}
								  handleOrderSummaryClick={this.handleOrderSummaryFooterClick}/>
				</footer>
				<ItemCustomisationModal selectedItem={this.state.currentItem}
										modifiers={this.state.itemModifiers}
										modalShow={this.state.showItemCustomisationModal}
										handleModalClose={this.handleItemCustomisationModalClose}
										handleAddItemModifierButtonClick={this.handleAddItemModifierButtonClick}
										handleRemoveItemModifierButtonClick={this.handleRemoveItemModifierButtonClick}
										handleAddCustomisedItemClick={this.handleAddCustomisedItemClick}
				/>
				<OrderSummaryModal modalShow={this.state.showOrderSummaryModal}
								   handleModalClose={this.handleOrderSummaryModalClose}
								   selectedItems={this.state.selectedItems}
								   contactNumber={this.state.contactNumber}
								   address={this.state.address}
				/>
			</div>
		);
	}
}

export default App;
