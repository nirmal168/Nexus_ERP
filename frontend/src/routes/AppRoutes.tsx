import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login.tsx";
import { Dashboard } from "../pages/dashboard/Dashboard.tsx";
import { Customers } from "../pages/customers/Customers.tsx";
import { NewCustomer } from "../pages/customers/NewCustomer.tsx";
import { CustomerView } from "../pages/customers/CustomerView.tsx";
import { CustomerEdit } from "../pages/customers/CustomerEdit.tsx";
import { Products } from "../pages/products/Products.tsx";
import { NewProduct } from "../pages/products/NewProduct.tsx";
import EditProduct from "../pages/products/EditProduct.tsx";
import { Inventory } from "../pages/inventory/Inventory.tsx";
import { Challans } from "../pages/challans/Challans.tsx";
import { NewChallan } from "../pages/challans/NewChallan.tsx";
import { ChallanView } from "../pages/challans/ChallanView.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { DashboardLayout } from "../components/layout/DashboardLayout.tsx";
import { Accounts } from "../pages/placeholder/Accounts.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Customers: ADMIN, SALES, ACCOUNTS (Read-only for ACCOUNTS) */}
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/new" element={<ProtectedRoute allowedRoles={['ADMIN', 'SALES']}><NewCustomer /></ProtectedRoute>} />
        <Route path="/customers/:id" element={<CustomerView />} />
        <Route path="/customers/:id/edit" element={<ProtectedRoute allowedRoles={['ADMIN', 'SALES']}><CustomerEdit /></ProtectedRoute>} />
        
        {/* Products: ADMIN, WAREHOUSE can create/edit; SALES, ACCOUNTS can view catalog */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<ProtectedRoute allowedRoles={['ADMIN', 'WAREHOUSE']}><NewProduct /></ProtectedRoute>} />
        <Route path="/products/:id/edit" element={<ProtectedRoute allowedRoles={['ADMIN', 'WAREHOUSE']}><EditProduct /></ProtectedRoute>} />
        
        {/* Inventory: ADMIN, WAREHOUSE only */}
        <Route path="/inventory" element={<ProtectedRoute allowedRoles={['ADMIN', 'WAREHOUSE']}><Inventory /></ProtectedRoute>} />
        
        {/* Challans / Sales: ADMIN, SALES can create; ACCOUNTS can view */}
        <Route path="/challans" element={<Challans />} />
        <Route path="/challans/new" element={<ProtectedRoute allowedRoles={['ADMIN', 'SALES']}><NewChallan /></ProtectedRoute>} />
        <Route path="/challans/:id" element={<ChallanView />} />
        
        {/* Accounts: ADMIN, ACCOUNTS */}
        <Route path="/accounts" element={<ProtectedRoute allowedRoles={['ADMIN', 'ACCOUNTS']}><Accounts /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
