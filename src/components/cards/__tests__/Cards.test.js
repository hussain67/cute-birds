import { render, screen } from "@testing-library/react";
import Cards from ".././Cards";

test("number of cards rendered should be 6", async () => {
	render(<Cards />);
	let cards = await screen.findAllByRole("article");
	expect(cards.length).toBe(6);
});
