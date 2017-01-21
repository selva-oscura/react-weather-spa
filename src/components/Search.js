import React from 'react';


const Search = () => {
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
