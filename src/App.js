import Home from "./pages/Home"
import GlobalStyles from "./components/GlobalStyles"
import Nav from "./components/Nav"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/game/:id" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
