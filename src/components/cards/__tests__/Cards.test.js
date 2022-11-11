import { render, screen } from "../../../test-utils/testing-library-utils";
import Cards from ".././Cards";

test("number of cards rendered should be 6", async () => {
	render(<Cards />);
	let cards = await screen.findAllByRole("article");
	expect(cards.length).toBe(6);
});
