//import { render, screen } from "../../../test-utils/testing-library-utils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Authentication from "../Authentication";
import { UserProvider } from "../../../contexts/userContext";
import { BrowserRouter } from "react-router-dom";
//import { server } from "../../../mocks/server";
//import { rest } from "msw";
//import Nav from "../../../components/nav/Nav";
//import { BirdProvider } from "../../../context/birdContext";
//import { waitFor } from "test/test-utils";

function signUpUser() {
	const signUp = screen.getByRole("button", { name: /Sign Up/i });
	userEvent.click(signUp);
}
function renderAuthentication() {
	render(
		<BrowserRouter>
			<UserProvider>
				<Authentication />
			</UserProvider>
		</BrowserRouter>
	);
}
test("Should test Authentication form input fields are empty", () => {
	// Render the Authentication component
	renderAuthentication();

	//Test when login, initially login form will appear
	const emailInput = screen.getByRole("textbox", { name: /email address/i });
	expect(emailInput.value).toBe("");

	const passwordInput = screen.getByLabelText("Password");
	expect(passwordInput.value).toBe("");

	//To show Name and Confirm password it is necessary to click Sign Upp button
	signUpUser();
	const name = screen.getByLabelText(/Name/i);
	expect(name.value).toBe("");
	const confirmPassworInput = screen.getByLabelText(/confirm password/i);
	expect(confirmPassworInput.value).toBe("");
});

test("user should be able to type in input fields", () => {
	// Render the Authentication component
	renderAuthentication();

	// checking email field
	const emailInput = screen.getByRole("textbox", { name: /email address/i });
	userEvent.type(emailInput, "shahid@yahoo.com");
	expect(emailInput.value).toBe("shahid@yahoo.com");

	//checking password field
	const passwordInput = screen.getByLabelText("Password");
	userEvent.type(passwordInput, "abc123");
	expect(passwordInput.value).toBe("abc123");

	//checking name and confirm password field
	signUpUser();
	const name = screen.getByLabelText(/Name/i);
	userEvent.type(name, "Shahid");
	expect(name.value).toBe("Shahid");
	const confirmPassworInput = screen.getByLabelText(/confirm password/i);
	userEvent.type(confirmPassworInput, "abc123");
	expect(confirmPassworInput.value).toBe("abc123");
});

describe("Should show the error message on invalid input", () => {
	test("Should show error message on invalid email input", async () => {
		// Render the Authentication component
		renderAuthentication();

		//Entering an invalid email
		const emailInput = screen.getByRole("textbox", { name: /email address/i });
		userEvent.type(emailInput, "shahidyahoo.com");

		//Submit the form
		const submit = screen.getByRole("button", { name: /Sign in/i });
		userEvent.click(submit);

		//Find the error message
		const errorMessage = await screen.findByText(/Email is required/i);
		expect(errorMessage).toBeInTheDocument();
	});

	test("Should show error message on invalid password", async () => {
		// Render the Authentication component
		renderAuthentication();

		//Entering an invalid password
		const passwordInput = screen.getByLabelText("Password");
		userEvent.type(passwordInput, "123");

		//Submit the form
		const submit = screen.getByRole("button", { name: /sign in/i });
		userEvent.click(submit);

		//Find the error message
		const errorMessage = await screen.findByText(/password with at least 6 characters is required/i);
		expect(errorMessage).toBeInTheDocument();
	});

	test("Should show error message on invalid confirm password", async () => {
		// Render the Authentication component
		renderAuthentication();

		signUpUser();
		//Entering a valid password
		const passwordInput = screen.getByLabelText("Password");
		userEvent.type(passwordInput, "abc123");

		//Entering an invalid confirm password
		const confirmPassworInput = screen.getByLabelText(/confirm password/i);
		userEvent.type(confirmPassworInput, "ac");

		//Submit the form
		const submit = screen.getByRole("button", { name: /sign up/i });
		userEvent.click(submit);

		//Find the error message
		const errorMessage = await screen.findByText(/Passwords do not match, try again/i);
		expect(errorMessage).toBeInTheDocument();
	});
});

test("A user can login properly", async () => {
	// Render the Authentication component
	renderAuthentication();

	//Entering a valid email
	const emailInput = screen.getByRole("textbox", { name: /email address/i });
	userEvent.type(emailInput, "shahid@yahoo.com");

	//Entering a valid password
	const passwordInput = screen.getByLabelText("Password");
	userEvent.type(passwordInput, "abc123");

	//Submit the form
	const submit = await screen.findByRole("button", { name: /Sign In/i });
	userEvent.click(submit);

	//render the Nav component
	// render(<Nav />);
	// const user = await screen.findByText(/shahid/i);
	// expect(user).toBeInTheDocument();
});

// test.only("error responce from server for failed login", async () => {
// 	server.resetHandlers(
// 		rest.post("http://localhost:4000", (req, res, ctx) => {
// 			return res(ctx.status(500));
// 		})
// 	);
// 	renderAuthentication();
// 	//Entering a valid email
// 	const emailInput = screen.getByRole("textbox", { name: /email address/i });
// 	userEvent.type(emailInput, "shahid@yahoo.com");

// 	//Entering a valid password
// 	const passwordInput = screen.getByLabelText("Password");
// 	userEvent.type(passwordInput, "abc345");

// 	//Submit the form
// 	const submit = await screen.findByRole("button", { name: /submit/i });
// 	userEvent.click(submit);

// 	//Find the error message
// 	const errorMessage = await screen.findByText(/Invalid credentials/i);
// 	expect(errorMessage).toBeInTheDocument();
// });
