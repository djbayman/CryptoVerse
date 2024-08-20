import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cryptocurrencies from "./components/Cryptocurrencies";
import News from "./components/News";
import CryptoDetails from "./components/CryptoDetails";

function App() {
  return (
    <div className="app ">
      <div className=" block lg:flex " style={{ backgroundColor: "#eee" }}>
        <div className="navbar  md:w-1/6 bg-slate-600 lg:h-screen top-0 sticky">
          <Navbar />
        </div>
        <div className="main w-full ">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/news" element={<News />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
