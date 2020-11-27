import React from "react";

function SearchBar({onChange}) {
	return (
		<input type="text" placeholder="Search..." onChange={onChange} style={inputStyle}/>
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