import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </>
    </>
  );
}

export default App;
