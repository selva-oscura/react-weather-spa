import React from 'react';

const NavLink = ({id}) => {
	let display;
	display = id[0];
	return (
	<div className="NavLink"
		id={id}
	>
		<p>{display.toUpperCase()}</p>
	</div>
)}

export default NavLink
