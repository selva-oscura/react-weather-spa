import React from 'react';
import Search from './Search';
import NavLink from './NavLink';
import '../styles/Header.css';

const Header = ({defaultValue, submitLocation, updateLocation, handleNav}) => (
	<header
		className="Header"
	>
		<Search 
			defaultValue={defaultValue}
			submitLocation={submitLocation}
			updateLocation={updateLocation} 
		/>
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
