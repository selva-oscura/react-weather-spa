import React from 'react';
import NavLink from './NavLink';
import '../styles/Header.css';

const Header = ({handleNav}) => (
	<header
		className="Header"
	>
		<div>
			<p>search to go here</p>
		</div>
		<NavLink 
			pageLink="favorites"
			handleNav={handleNav}
		/>
		<NavLink 
			pageLink="settings"
			handleNav={handleNav}
		/>
	</header>
)

export default Header;
