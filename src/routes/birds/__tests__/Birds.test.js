import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Birds from "../Birds";
import { BrowserRouter } from "react-router-dom";
import { BirdProvider } from "../../../contexts/birdContext";

const renderBirds = () => {
	render(
		<BrowserRouter>
			<BirdProvider>
				<Birds />
			</BirdProvider>
		</BrowserRouter>
	);
};

describe("integration of filter and card component", () => {
	test("should display cards according to size selected", async () => {
		renderBirds();

		// Initial state any
		const cardsAny = await screen.findAllByRole("article");
		expect(cardsAny.length).toBe(6);

		// Find the select element size
		const selected = screen.getByLabelText(/size/i);
		//Selected size small

		userEvent.selectOptions(selected, "small");
		const cardsSmall = await screen.findAllByRole("article");
		expect(cardsSmall.length).toBe(3);

		// Selected size large

		userEvent.selectOptions(selected, "large");
		const cardsLarge = await screen.findAllByRole("article");
		expect(cardsLarge.length).toBe(3);
	});

	test("Should display cards according to selected favourate", async () => {
		renderBirds();

		//Initial state any
		const cardsAny = await screen.findAllByRole("article");
		expect(cardsAny.length).toBe(6);

		//Selected option favourate

		const birdFavoured = screen.getByTestId("1");

		userEvent.click(birdFavoured);

		// Find the select element favourate
		const selected = await screen.findByLabelText(/favourate/i);
		userEvent.selectOptions(selected, "favourate");
		const cardsF = await screen.findAllByRole("article");
		expect(cardsF.length).toBe(1);
	});
});
