import React from "react";

const Input = ({ name, label, value, error, handleChange }) => {
	return (
		<div className="form__group">
			<label
				htmlFor={name}
				className="form__label"
			>
				{label}
			</label>
			<input
				type={name}
				className="form__control"
				id={name}
				name={name}
				value={value}
				onChange={handleChange}
				autoComplete="off"
			/>
			{error && <div>{error}</div>}
		</div>
	);
};

export default Input;
