//import { render, screen } from "../../../test-utils/testing-library-utils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Authentication from "../Authentication";
import { UserProvider } from "../../../context/userContext";
import { BrowserRouter } from "react-router-dom";
//import { server } from "../../../mocks/server";
//import { rest } from "msw";
//import Nav from "../../nav/Nav";
//import { BirdProvider } from "../../../context/birdContext";
//import { waitFor } from "test/test-utils";

function register() {
	const register = screen.getByRole("button", { name: /register/i });
	userEvent.click(register);
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

	//Test when Signing up, user need to click Register
	register();
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

	//checking confirm password field
	register();
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
		const submit = screen.getByRole("button", { name: /submit/i });
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
		const submit = screen.getByRole("button", { name: /submit/i });
		userEvent.click(submit);

		//Find the error message
		const errorMessage = await screen.findByText(/password with at least 6 characters is required/i);
		expect(errorMessage).toBeInTheDocument();
	});

	test("Should show error message on invalid confirm password", async () => {
		// Render the Authentication component
		renderAuthentication();

		register();
		//Entering a valid password
		const passwordInput = screen.getByLabelText("Password");
		userEvent.type(passwordInput, "abc123");

		//Entering an invalid confirm password
		const confirmPassworInput = screen.getByLabelText(/confirm password/i);
		userEvent.type(confirmPassworInput, "ac");

		//Submit the form
		const submit = screen.getByRole("button", { name: /submit/i });
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
	const submit = await screen.findByRole("button", { name: /submit/i });
	userEvent.click(submit);

	//render the Nav component
	//render(<Nav />, { wrapper: UserProvider });
	const user = await screen.findByText(/shahid/i);
	expect(user).toBeInTheDocument();
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
