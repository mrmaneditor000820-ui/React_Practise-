import { Routes, Route } from "react-router-dom";
import AddAsset from "../pages/Addassit";
import AssetDetails from "../pages/Adddetail";
import Publicassits from "../pages/Pablicassits";
import ReportIssue from "../pages/ReportIssue";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import Home from "../pages/home/Home";
import ProtectedRoute from "../components/ProtectedRoute";

function Rounting() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/asset/:id" element={<Publicassits />} />
      <Route path="/report-issue/:id" element={<ReportIssue />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/add-asset"
        element={
          <ProtectedRoute>
            <AddAsset />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/asset/:id"
        element={
          <ProtectedRoute>
            <AssetDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Rounting;