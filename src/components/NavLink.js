import React from 'react';

const NavLink = ({pageLink, handleNav}) => {
	let display;
	display = pageLink[0];
	console.log("id", pageLink)
	return (
			<div 
				className="NavLink"
				id={pageLink}
				onClick={handleNav}
			>
				<p
					className={pageLink}
				>{display.toUpperCase()}</p>
			</div>
	)
}

export default NavLink;
