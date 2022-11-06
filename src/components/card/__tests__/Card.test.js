import { screen, render } from "@testing-library/react";
import Card from "../Card";

const cardProps = {
	name: "peacock",
	phone: "111-111-111",
	email: "msh@yahoo.com",
	image: { url: "https://images.unsplash.com/photo-1639453632997-31ca966ec491?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Z3JlZW4lMjBiaWclMjBiaXJkc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60", alt: "peacock" },
	favoured: true
};

test("Should show the description of the bird", () => {
	render(<Card {...cardProps} />);

	let bird = screen.getByRole("heading", { name: "peacock" });
	expect(bird).toBeInTheDocument();

	let phone = screen.getByText(/111-111-111/i);
	expect(phone).toBeInTheDocument();

	let email = screen.getByText(/msh@yahoo.com/i);
	expect(email).toBeInTheDocument();

	let img = screen.getByAltText(/peacock/i);
	expect(img).toBeInTheDocument();
});
