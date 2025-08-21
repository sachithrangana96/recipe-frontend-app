import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard"
import FavoriteRecipes from "../pages/FavoriteRecipes";
import ProtectedRoute from "../components/ProtectedRoute";
// import { ProtectedRoute } from "../components/ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
  <Route path="/login" element={<Login />} />
      <Route path="/favorites" element={<FavoriteRecipes />} />
      <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      {/* <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} /> */}
    </Routes>
  );
}
