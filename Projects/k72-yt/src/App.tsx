import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Agence from "./Pages/Agence";
import Projects from "./Pages/Projects";
import Navbar from "./components/Navigation/Navbar";
import FullScreenNav from "./components/Navigation/FullScreenNav";
import ReactLenis from "lenis/react";
const App = () => {
  return (
    <div className="text-white">
      <Navbar/>
      <FullScreenNav/> 
      <ReactLenis 
      root
      options={{
        lerp:0.1,
        duration:1,
        wheelMultiplier:2,
        orientation:"vertical",
        gestureOrientation:"vertical"
      }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agence" element={<Agence />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      </ReactLenis>
    </div>
  );
};

export default App;
