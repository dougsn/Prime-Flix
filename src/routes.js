import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Filme from "./pages/Filme";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/filme/:id" element={<Filme />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
