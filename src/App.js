import "./App.css";
import Elevators from "./Elevators";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Elevators elevatorCount={5} />
			</header>
		</div>
	);
}

export default App;
