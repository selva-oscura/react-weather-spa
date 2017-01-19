import React from 'react';
import NavLink from './NavLink';
import '../styles/Header.css';

const Header = () => (
	<header
		className="Header"
	>
		<div>
			<p>search</p>
		</div>
		<NavLink 
			id="favorites"
		/>
		<NavLink 
			id="settings"
		/>
	</header>
)

export default Header;