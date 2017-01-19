import React from 'react';
import NavLink from './NavLink';

const Header = () => (
	<header>
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