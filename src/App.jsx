import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/Navbar";
import Home from "./components/Home";

function App() {
    return (
        <div className="App">
            <NavbarComp />
            <Home />
        </div>
    );
}

export default App;
