import React from 'react';

const NavLink = ({pageLink, handleNav}) => {
	let icon;
	if(pageLink==="favorites"){
		icon="glyphicon glyphicon-heart";
	}else if(pageLink==="settings"){
		icon="glyphicon glyphicon-cog";
	}
	const navLink = `NavLink ${pageLink}`;
	return (
			<div 
				className={navLink}
				onClick={handleNav}
			>
				<p
				>
					<span 
						className={icon}
						id={pageLink}
					></span>
				</p>
			</div>
	)
}

export default NavLink;
