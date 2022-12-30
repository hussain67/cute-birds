import { render } from "@testing-library/react";
import { BirdProvider } from "../contexts/birdContext";
//import { BrowserRouter } from "react-router-dom";

const renderWithContext = ui => render(ui, { wrapper: BirdProvider });

//re-export everything
export * from "@testing-library/react";

//overrite render method
export { renderWithContext as render };
