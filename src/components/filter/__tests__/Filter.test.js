import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "../Filter";

test("Should be able to change value of favourate select", () => {
	render(<Filter />);
	const select = screen.getByLabelText(/favourate/i);
	expect(select.value).toBe("any");

	userEvent.selectOptions(select, "favourate");
	expect(select.value).toBe("favourate");

	userEvent.selectOptions(select, "not favourate");
	expect(select.value).toBe("not favourate");
});

test("Should be able to change value of size select", () => {
	render(<Filter />);
	const select = screen.getByLabelText(/size/i);
	expect(select.value).toBe("any");

	userEvent.selectOptions(select, "small");
	expect(select.value).toBe("small");

	userEvent.selectOptions(select, "large");
	expect(select.value).toBe("large");
});
