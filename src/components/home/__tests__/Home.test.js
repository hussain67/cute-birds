import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import HomePage from "../HomePage";

describe("integration of filter and card component", () => {
	test("should display cards according to size selected", async () => {
		render(<HomePage />);
		// Find the select element size
		const selected = screen.getByLabelText(/size/i);

		// Initial state any
		const cardsAny = await screen.findAllByRole("article");
		expect(cardsAny.length).toBe(6);

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
		render(<HomePage />);

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
