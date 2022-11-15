import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../Register";

describe("something", () => {
	beforeEach(() => {});
	test("Should test input form", () => {
		render(<Register />);
		const emailInput = screen.getByRole("textbox", { name: /email address/i });
		expect(emailInput.value).toBe("");

		const passwordInput = screen.getByLabelText("Password");
		expect(passwordInput.value).toBe("");

		const confirmPassworInput = screen.getByLabelText(/confirm password/i);
		expect(confirmPassworInput.value).toBe("");
	});
});

test("user should be able to type in input fields", () => {
	render(<Register />);

	// checking email field
	const emailInput = screen.getByRole("textbox", { name: /email address/i });
	userEvent.type(emailInput, "shahid@yahoo.com");
	expect(emailInput.value).toBe("shahid@yahoo.com");

	//checking password field
	const passwordInput = screen.getByLabelText("Password");
	userEvent.type(passwordInput, "abc123");
	expect(passwordInput.value).toBe("abc123");

	//checking confirm password field
	const confirmPassworInput = screen.getByLabelText(/confirm password/i);
	userEvent.type(confirmPassworInput, "abc123");
	expect(confirmPassworInput.value).toBe("abc123");
});

describe("Should show the error message on invalid input", () => {
	test("Should show error message on invalid email input", async () => {
		render(<Register />);

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
		render(<Register />);

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
		render(<Register />);

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
