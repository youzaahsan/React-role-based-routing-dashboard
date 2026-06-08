/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Core Public Pages
import Home from './pages/Home';
import AccessDenied from './pages/AccessDenied';

// Admin Portal Pages
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Products from './pages/admin/Products';
import Settings from './pages/admin/Settings';

// Seller Portal Pages
import SellerDashboard from './pages/seller/Dashboard';
import Orders from './pages/seller/Orders';

// Employee Portal Pages
import EmployeeDashboard from './pages/employee/Dashboard';
import Tasks from './pages/employee/Tasks';
import Profile from './pages/employee/Profile';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ======================================================== */}
          {/* PUBLIC ROUTES                                            */}
          {/* ======================================================== */}
          <Route path="/" element={<Home />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* ======================================================== */}
          {/* ADMIN PORTAL ROLE-BASED GROUPS                           */}
          {/* ======================================================== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Index redirects or renders dashboard */}
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>

          {/* ======================================================== */}
          {/* SELLER PORTAL ROLE-BASED GROUPS                          */}
          {/* ======================================================== */}
          <Route
            path="/seller"
            element={
              <ProtectedRoute allowedRoles={['seller']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<SellerDashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="*" element={<Navigate to="/seller" replace />} />
          </Route>

          {/* ======================================================== */}
          {/* EMPLOYEE PORTAL ROLE-BASED GROUPS                        */}
          {/* ======================================================== */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployeeDashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/employee" replace />} />
          </Route>

          {/* ======================================================== */}
          {/* FALLBACK REDIRECTS                                       */}
          {/* ======================================================== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
