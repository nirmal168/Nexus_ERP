# Nexus ERP & CRM - Postman Collection Guide

This folder contains the complete Postman Collection and Environment configurations for testing the **Nexus ERP & CRM Operations Portal API**.

---

## 📁 Files Included

1. **`nexus-erp.postman_collection.json`**  
   The full Postman Collection (v2.1.0 schema) containing all 23+ endpoints organized into logical modules with automated auth token capture and dynamic variables.
2. **`nexus-erp.local.postman_environment.json`**  
   Pre-configured environment variables for local development (`http://localhost:5000/api`).
3. **`nexus-erp.production.postman_environment.json`**  
   Template environment configuration for production or deployed staging environments.

---

## 🚀 Getting Started

### 1. Import into Postman
1. Open **Postman**.
2. Click **Import** (top left).
3. Drag & drop or select:
   - `nexus-erp.postman_collection.json`
   - `nexus-erp.local.postman_environment.json`

### 2. Select the Environment
- In the top right environment dropdown of Postman, select **`Nexus ERP - Local Environment`**.

### 3. Authenticate
1. Navigate to **`2. Authentication`** folder.
2. Open any login request (e.g. **`Login - Admin User`**) and click **Send**.
3. The response test script will automatically extract the JWT Bearer token and save it to the collection's `{{authToken}}` variable.
4. All other authenticated requests across the collection inherit this Bearer token automatically!

---

## 📦 API Modules & Endpoints

### 1. System & Health
- `GET /` — API root & health status
- `GET /api/health` — Service health check

### 2. Authentication
- `POST /api/auth/login` — Login as Admin, Sales, Warehouse, or Accounts
- `GET /api/auth/me` — Current user profile details

### 3. Customers & CRM
- `GET /api/customers` — List customers with pagination, search, status, & type filters
- `POST /api/customers` — Create customer profile
- `GET /api/customers/:id` — Get customer details
- `PUT /api/customers/:id` — Update customer information
- `DELETE /api/customers/:id` — Delete customer
- `POST /api/customers/:id/followups` — Add CRM follow-up log
- `GET /api/customers/:id/followups` — List customer follow-ups
- `GET /api/customers/:id/challans` — List challans for customer

### 4. Products & Inventory
- `GET /api/products` — List catalog products (with `search`, `category`, `lowStock` filters)
- `POST /api/products` — Create new product SKU
- `GET /api/products/:id` — Get product details with presigned image URL
- `PUT /api/products/:id` — Update product details / pricing / thresholds
- `POST /api/products/:id/image` — Upload product image to AWS S3
- `GET /api/products/images` — Get presigned image URL
- `DELETE /api/products/:id` — Delete product

### 5. Stock Management
- `GET /api/stock/movements` — Audit trail of stock in / stock out movements
- `POST /api/stock/in` — Inbound stock addition
- `POST /api/stock/out` — Outbound stock adjustment / write-off

### 6. Delivery Challans (Sales & Fulfillment)
- `GET /api/challans` — List challans (filter by status, paymentStatus, customer, search)
- `POST /api/challans` — Create draft delivery challan
- `GET /api/challans/:id` — Get challan line items and details
- `PUT /api/challans/:id` — Update draft challan
- `PATCH /api/challans/:id/confirm` — Confirm challan (validates stock, deducts inventory, locks challan)
- `PATCH /api/challans/:id/paid` — Mark challan as PAID
- `PATCH /api/challans/:id/cancel` — Cancel challan (auto-reverses inventory deduction if confirmed)
- `GET /api/challans/:id/pdf` — Stream / Download Delivery Challan PDF

### 7. Invoices & Billing
- `GET /api/invoices/:id/pdf` — Stream / Download GST Tax Invoice PDF

---

## 👥 Demo Credentials

| Role | Email | Password | Allowed Operations |
|---|---|---|---|
| **ADMIN** | `admin@fundsroom.com` | `Admin@123` | Full access across all modules |
| **SALES** | `sales@fundsroom.com` | `Sales@123` | Customers, Challans, Product view |
| **WAREHOUSE** | `warehouse@fundsroom.com` | `Warehouse@123` | Products catalog, Stock In/Out, Stock movements |
| **ACCOUNTS** | `accounts@fundsroom.com` | `Accounts@123` | Read-only sales & inventory, Mark Paid, PDF exports |
