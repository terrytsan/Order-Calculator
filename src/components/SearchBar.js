import React from "react";

function SearchBar({onChange}) {
	return (
		<input type="text" placeholder="Search..." onChange={onChange} style={inputStyle}/>
	);
}

const inputStyle = {
	marginBottom: '5px',
	marginTop: '5px',
	width: '100%'
};

export default SearchBar;