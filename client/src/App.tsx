import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Home />
      </main>
    </div>
  );
}

export default App;
