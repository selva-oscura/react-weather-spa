import React from 'react';

const NavLink = ({id}) => (
	<div className="NavLink"
		id={id}
	>
		<p>{id.toUpperCase()}</p>
	</div>
)

export default NavLink