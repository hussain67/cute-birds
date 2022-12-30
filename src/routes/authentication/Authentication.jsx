import React, { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getUserInfo, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Input from "../../components/input-field/Input";
import { useUser } from "../../contexts/userContext";

const Authentication = () => {
	const { setDisplayName } = useUser();

	const navigate = useNavigate();

	const navigateToBirdsPage = () => {
		navigate("/birds");
	};

	const [signupInput, setSignupInput] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	const { name, email, password, confirmPassword } = signupInput;
	const [isRegistered, setIsRegistered] = useState(true);
	const [errors, setErrors] = useState({});

	const handleChange = event => {
		const { name, value } = event.target;
		setSignupInput({
			...signupInput,
			[name]: value
		});
	};

	const formIsValid = registered => {
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
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!formIsValid(isRegistered)) return;
		if (isRegistered) {
			try {
				const { user } = await signInAuthUserWithEmailAndPassword(email, password);

				const userData = await getUserInfo(user);
				setDisplayName(userData.displayName);
				if (user) {
					navigateToBirdsPage();
				}
			} catch (error) {
				switch (error.code) {
					case "auth/wrong-password":
						alert("Password do not match");
						break;
					case "auth/user-not-found":
						alert("No user found with this Email");
						break;
					default:
						console.log(error.code);
				}
			}
		}
		if (!isRegistered) {
			//The user is authenticated using email and password
			try {
				const { user } = await createAuthUserWithEmailAndPassword(email, password);
				setDisplayName(name);
				await createUserDocumentFromAuth(user, { displayName: name });
				if (user) {
					navigateToBirdsPage();
				}
			} catch (error) {
				if (error.code === "auth/email-already-in-use") {
					alert("Email is already in use, Try another Email");
				}
				console.log(error.code);
			}
		}
	};

	return (
		<article className="form-register">
			<h1>{isRegistered ? "Sign In" : "Sign Up"}</h1>

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
						{isRegistered ? "Sign In" : "Sign Up"}
					</button>
				</div>
			</form>
			<p>
				{isRegistered ? "Not registered yet?" : "Already registered?"} <button onClick={() => setIsRegistered(!isRegistered)}> {isRegistered ? "Sign Up" : "Sign In"}</button>
			</p>
		</article>
	);
};

export default Authentication;
