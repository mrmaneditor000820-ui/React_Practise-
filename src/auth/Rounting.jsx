import { Routes, Route } from "react-router-dom";
import Createuser from "./Createuser";
import Signupwithexitingemail from "./Signupwithexitingemail";
import Home from "../components/home/Home";

function Rounting() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Createuser" element={<Createuser />} />
      <Route path="/Signupwithexitingemail" element={<Signupwithexitingemail />} />
    </Routes>
  );
}

export default Rounting;