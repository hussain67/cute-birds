import React, { useState } from "react";
import Input from "../common/Input";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/userContext";

const Login = () => {
	const { setUser } = useUser();
	const navigate = useNavigate();

	const [signupInput, setSignupInput] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [isRegistered, setIsRegistered] = useState(true);
	const [errors, setErrors] = useState({});
	const [loginError, setLoginError] = useState("");
	const [client, setClient] = useState("");
	console.log(loginError);
	function handleChange(event) {
		const { name, value } = event.target;
		setSignupInput({
			...signupInput,
			[name]: value
		});
	}
	function formIsValid(registered) {
		const { name, email, password, confirmPassword } = signupInput;
		let errors = {};

		if (!registered) {
			if (name.length === 0) {
				errors.name = "Name is required";
			}
		}
		if (!validator.isEmail(email)) {
			errors.email = "Email is required";
		}
		if (password.length < 6) {
			errors.password = "Password with at least 6 characters is required";
		}
		if (!registered) {
			if (confirmPassword !== password) {
				errors.confirmPassword = "Passwords do not match, try again";
			}
		}

		setErrors(errors);
		return Object.keys(errors).length === 0;
	}
	function handleSubmit(e) {
		e.preventDefault();

		if (!formIsValid(isRegistered)) return;
		if (isRegistered) {
			axios
				//.post("http://localhost:4000", { name: signupInput.name })
				.post("https://cute-birds-be.onrender.com", { name: signupInput.name })

				.then(response => {
					setClient(response.data.name);
					setUser(response.data.name);
					setTimeout(() => {
						navigate("/birds");
					}, 1000);
				})
				.catch(error => {
					setLoginError(error);
					setTimeout(() => {
						setLoginError("");
					}, 2000);
				});
		}
	}
	//name, id and type have the same value so any one can be used as propsß
	if (client) {
		return <h1> Welcome {client}</h1>;
	}
	if (loginError) {
		return <h1> Invalid credentials </h1>;
	}
	return (
		<article className="form-register">
			<h1>{isRegistered ? "Login" : "Register"}</h1>

			<form
				className="form"
				onSubmit={handleSubmit}
				autoComplete="off"
			>
				{isRegistered ? (
					""
				) : (
					<Input
						name={"name"}
						label="Name"
						type="text"
						value={signupInput.name}
						error={errors.name}
						handleChange={handleChange}
					/>
				)}

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
				{isRegistered ? (
					""
				) : (
					<Input
						name={"confirmPassword"}
						label="Confirm password"
						type="password"
						value={signupInput.confirmPassword}
						error={errors.confirmPassword}
						handleChange={handleChange}
					/>
				)}

				<div className="form__submit">
					<button
						className="btn btn__submit"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
			<p>
				{isRegistered ? "Not registered yet?" : "Already registered?"} <button onClick={() => setIsRegistered(!isRegistered)}> {isRegistered ? "Register" : "Login"}</button>
			</p>
		</article>
	);
};

export default Login;
