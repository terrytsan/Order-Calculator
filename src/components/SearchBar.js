import React from "react";
import {FormControl} from "react-bootstrap";

function SearchBar({onChange}) {
	return (
		<FormControl type="text" placeholder="Search..." onChange={onChange} style={inputStyle}/>
	);
}

const inputStyle = {
	marginLeft: '1px',
	paddingBottom: '5px',
	marginBottom: '5px',
	marginTop: '6px',
	width: '100%'
};

export default SearchBar;