import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Cart from './Components/Cart';
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <Router>
          <Toaster position="top-right" />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}
export default App;