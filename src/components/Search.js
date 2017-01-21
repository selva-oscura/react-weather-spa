import React from 'react';
import countries from '../resources/countries.json';

const Search = ({ defaultValue, submitLocation, updateLocation }) => {
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
			onSubmit={submitLocation}
		>
			<label
				htmlFor="city"
			>
				<input 
					type="text"
					id="city"
					placeholder="city, state"
					onChange={updateLocation}
				/>
			</label>
			<label 
				htmlFor="country"
			>
				<select
					id="country"
					name="select"
					value={defaultValue}
					onChange={updateLocation}
				>
					{options}
				</select>
			</label>
			<input 
				type="submit"
				value="submit"
			/>
		</form>
	)
};

export default Search;
