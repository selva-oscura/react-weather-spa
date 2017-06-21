import React from 'react';
import '../styles/Search.css';
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
		<div
			className="Search"
		>
			<form 
				onSubmit={submitLocation}
			>
				<label
					htmlFor="city"
				>
					<input 
						type="text"
						id="city"
						placeholder="city, state"
						value={defaultValue.city}
						onChange={updateLocation}
					/>
				</label>
				<label 
					htmlFor="country"
				>
					<select
						id="country"
						name="select"
						value={defaultValue.country}
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
		</div>
	)
};

export default Search;
