import React from 'react';
import '../styles/NavLink.css';

const NavLink = ({pageLink, currPage, handleNav}) => {
	let icon;
	if(pageLink==="favorites"){
		icon="glyphicon glyphicon-heart";
	}else if(pageLink==="settings"){
		icon="glyphicon glyphicon-cog";
	}
	let navLink = `NavLink ${pageLink}`;
	if(currPage===pageLink){
		navLink += " selected";
	}
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
