import React, { useState } from "react";
import Input from "../common/Input";
import validator from "validator";

const Login = () => {
	const [signupInput, setSignupInput] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [errors, setErrors] = useState({});
	console.log(errors);

	function handleChange(event) {
		const { name, value } = event.target;
		setSignupInput({
			...signupInput,
			[name]: value
		});
	}
	function formIsValid() {
		const { email, password, confirmPassword } = signupInput;
		let errors = {};
		if (!validator.isEmail(email)) {
			errors.email = "Email is required";
		}
		if (password.length < 6) {
			errors.password = "Password with at least 6 characters is required";
		}
		if (confirmPassword !== password) {
			errors.confirmPassword = "Passwords do not match, try again";
		}
		setErrors(errors);
		return Object.keys(errors).length === 0;
	}
	function handleSubmit(e) {
		e.preventDefault();
		if (!formIsValid()) return;
	}
	//name, id and type have the same value so any one can be used as propsß
	return (
		<article className="form-register">
			<h1>Sign up</h1>

			<form
				className="form"
				onSubmit={handleSubmit}
			>
				<Input
					name={"email"}
					label="Email address"
					type="email"
					value={signupInput.email}
					error={errors.email}
					handleChange={handleChange}
				/>
				<Input
					name={"password"}
					label="Password"
					type="password"
					value={signupInput.password}
					error={errors.password}
					handleChange={handleChange}
				/>
				<Input
					name={"confirmPassword"}
					label="Confirm password"
					type="password"
					value={signupInput.confirmPassword}
					error={errors.confirmPassword}
					handleChange={handleChange}
				/>

				<div className="form__submit">
					<button
						className="btn btn__submit"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</article>
	);
};

export default Login;
