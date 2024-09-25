import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Tarjeta } from "./components/Tarjeta";
import { Detalles } from "./components/detalles/Detalles";
// You'll need to create this component

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen p-6">
        
        <Routes>
          <Route path="/" element={<Tarjeta />} />
          <Route path="/detalles/:descripcion" element={<Detalles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
