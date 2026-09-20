import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import SearchOrder from "../pages/SearchOrder";
import OrderDetails from "../pages/OrderDetails";

import RoleRoute from "./RoleRoute";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
            path="/register"
            element={<Register/>}
        />

        {/* Admin Routes */}
        <Route
          element={<RoleRoute allowedRole="admin" />}
        >
          <Route
            path="/orders"
            element={<SearchOrder />}
          />

          <Route
            path="/orders/:orderId"
            element={<OrderDetails />}
          />
        </Route>

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/orders" replace />}
        />

        {/* Unauthorized */}
        <Route
          path="/unauthorized"
          element={
            <div className="flex min-h-screen items-center justify-center">
              <h1 className="text-2xl font-bold">
                Access Denied
              </h1>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;