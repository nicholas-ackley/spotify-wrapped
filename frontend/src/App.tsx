import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Home from "./pages/home/Home";
import Callback from "./pages/Callback";
import NowPlaying from "./components/widget/NowPlaying";
import Statistics from "./pages/statistics/Statistics";
//cd spotify - cd frontend/backend
export default function App() {
  return (
    <BrowserRouter>
      {/* Left sidebar */}
        <NowPlaying />

      {/* Right content area */}
      <div className="ml-0">
        <Routes>
          <Route path="/" element={<Home />} />          {/* DEFAULT PAGE */}
          <Route path="/callback" element={<Callback />} />
          <Route path="/statistics" element={<Statistics />} />

        </Routes>

      </div>
    </BrowserRouter>
    
  );
}
