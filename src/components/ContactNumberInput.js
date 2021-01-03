import React from "react";
import {FormControl} from "react-bootstrap";

function ContactNumberInput({onChange}) {

	// Otherwise gray button
	return (
		<div className="text-center" style={{display: "flex", justifyContent: "center"}}>
			<FormControl style={inputStyle} type="text" autoComplete="none" placeholder="Contact Number"
						 onChange={onChange}/>
		</div>
	);
}

const inputStyle = {
	marginBottom: '5px',
	marginTop: '5px',
	width: '50%'
};

export default ContactNumberInput;