import React from 'react';

const Errors = ({errors}) => (
	<div
		className="Errors"
	>
		{errors.map((error, i)=>(<Error error={error} key={i} />))}
	</div>
);

const Error = ({error}) => (
	<div className="error">
		<p>{error}</p>
	</div>
)

export default Errors;
