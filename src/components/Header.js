import React from 'react';
import Search from './Search';
import NavLink from './NavLink';
import '../styles/Header.css';

const Header = ({defaultValue, currPage, submitLocation, updateLocation, handleNav}) => (
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
			currPage={currPage}
			handleNav={handleNav}
		/>
		<NavLink 
			pageLink="settings"
			currPage={currPage}
			handleNav={handleNav}
		/>
	</header>
)

export default Header;
