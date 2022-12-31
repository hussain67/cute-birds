import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import "./styles/main.scss";
import { BirdProvider } from "./contexts/birdContext";
import { UserProvider } from "./contexts/userContext";
import Authentication from "./routes/authentication/Authentication";
import Birds from "./routes/birds/Birds";
import Home from "./routes/home/Home";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<UserProvider>
					<BirdProvider>
						<Routes>
							<Route
								path="/"
								element={<Home />}
							/>
							<Route
								path="/authentication"
								element={<Authentication />}
							/>
							<Route
								path="/birds"
								element={<Birds />}
							/>
						</Routes>
					</BirdProvider>
				</UserProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
