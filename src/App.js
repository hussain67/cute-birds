import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register/Register";
import "./App.css";
import "./styles/main.scss";

import HomePage from "./components/home/HomePage";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Register />}
					/>
					<Route
						path="/birds"
						element={<HomePage />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
