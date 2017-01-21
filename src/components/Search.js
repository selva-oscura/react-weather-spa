import React from 'react';
import countries from '../resources/countries.json';
console.log('countries', countries[0]);

const Search = () => {
	let options = countries.map((country) => {
		return (
			<option 
				key={country.Code}
				value={country.Code}
			>
				{country.Name}
			</option>
		)
	});
	return (
		<form 
			className="Search"
			id="searchForm"
		>
			<label
				htmlFor="city"
			>
				<input 
					type="text"
					id="city"
					placeholder="city, state"
				/>
			</label>
			<input 
				type="submit"
				value="submit"
			/>
		</form>
	)
};

export default Search;