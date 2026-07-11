import { Routes, Route } from "react-router-dom";
import AddAsset from "../pages/AddAssit";
import AssetDetails from "../pages/Adddetail";
import Publicassits from "../pages/Pablicassits";

function Rounting() {
  return (
    <Routes>
      <Route path="/admin/add-asset" element={<AddAsset />} />
      <Route path="/admin/asset/:id" element={<AssetDetails />} />
      <Route path="/asset/:id" element={<Publicassits />} />
    </Routes>
  );
}

export default Rounting;