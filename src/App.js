import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/authentication/Authentication";
import "./App.css";
import "./styles/main.scss";

import HomePage from "./components/home/HomePage";
import { BirdProvider } from "./context/birdContext";
import { UserProvider } from "./context/userContext";

function App() {
	return (
		<div className="App">
			<UserProvider>
				<BirdProvider>
					<BrowserRouter>
						<Routes>
							<Route
								path="/"
								element={<Authentication />}
							/>
							<Route
								path="/birds"
								element={<HomePage />}
							/>
						</Routes>
					</BrowserRouter>
				</BirdProvider>
			</UserProvider>
		</div>
	);
}

export default App;
