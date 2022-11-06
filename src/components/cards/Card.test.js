import { render, screen } from "@testing-library/react";
import Cards from "./Cards";

test("number of cards rendered should be 5", () => {
	render(<Cards />);
	let cards = screen.getAllByRole("article");
	expect(cards.length).toBe(5);
});
