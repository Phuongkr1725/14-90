import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

import Home from "./pages/Home";
import ReportPage from "./pages/ReportPage";
import MapPage from "./pages/Map";
import DiseasePage from "./pages/Disease";

import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">

        {/* SIDEBAR (fixed) */}
        <Sidebar />

        {/* MAIN */}
        <div className="ml-64 flex flex-col min-h-screen">

          {/* HEADER */}
          <Header />

          {/* CONTENT */}
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/disease" element={<DiseasePage />} />
            </Routes>
          </div>

        </div>
      </div>
    </BrowserRouter>
  );
}