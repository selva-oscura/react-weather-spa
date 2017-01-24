import React from 'react';
import '../styles/NavLink.css';

const NavLink = ({pageLink, currPage, handleNav}) => {
	let icon;
	if(pageLink==="favorites"){
		icon="fa fa-heart";
	}else if(pageLink==="settings"){
		icon="fa fa-cog";
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
					<i 
						className={icon}
						id={pageLink}
					></i>
				</p>
			</div>
	)
}

export default NavLink;
