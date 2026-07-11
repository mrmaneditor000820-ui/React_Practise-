import { Routes, Route, Navigate } from "react-router-dom";
import AddAsset from "../pages/AddAssit";
import AssetDetails from "../pages/Adddetail";
import Publicassits from "../pages/Pablicassits";
import ReportIssue from "../pages/ReportIssue";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";

function Rounting() {
  return (
    <Routes>
      {/* Root route - automatically dashboard pe bhej do */}
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />

      {/* Public routes - koi bhi access kar sakta hai */}
      <Route path="/asset/:id" element={<Publicassits />} />
      <Route path="/report-issue/:id" element={<ReportIssue />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes - sirf login ke baad access */}
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