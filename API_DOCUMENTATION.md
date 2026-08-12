# 📘 Nexus ERP & CRM — Comprehensive REST API Documentation

> **Version:** `1.0.0`  
> **Base URL (Local):** `http://localhost:5000/api`  
> **Base URL (Production):** `https://nexus-erp-ug4w.onrender.com/api`  
> **Authentication Scheme:** JWT Bearer Token (`Authorization: Bearer <token>`)

---

## 📑 Table of Contents

1. [Authentication & Authorization](#1-authentication--authorization)
   - [RBAC Permission Matrix](#rbac-permission-matrix)
   - [Default Test Credentials](#default-test-credentials)
2. [Global Standards & Error Handling](#2-global-standards--error-handling)
3. [Module 1: System & Health](#module-1-system--health)
4. [Module 2: Authentication APIs](#module-2-authentication-apis)
5. [Module 3: Customers & CRM](#module-3-customers--crm)
6. [Module 4: Products Catalog](#module-4-products-catalog)
7. [Module 5: Stock & Inventory Management](#module-5-stock--inventory-management)
8. [Module 6: Delivery Challans & Sales](#module-6-delivery-challans--sales)
9. [Module 7: Invoices & Billing](#module-7-invoices--billing)
10. [Postman Collection Runner Guide](#10-postman-collection-runner-guide)

---

## 1. Authentication & Authorization

All secure endpoints require a standard HTTP **Bearer Token** in the `Authorization` header:

```http
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

### RBAC Permission Matrix

| Module / Operation | ADMIN | SALES | WAREHOUSE | ACCOUNTS |
|---|:---:|:---:|:---:|:---:|
| **Authentication & Profile** (`/api/auth/*`) | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Customer Management** (`/api/customers`) | ✅ Full | ✅ Full | ❌ No | 👁️ Read-Only |
| **Customer Follow-ups** (`/api/customers/:id/followups`) | ✅ Full | ✅ Full | ❌ No | 👁️ Read-Only |
| **Products Catalog** (`/api/products`) | ✅ Full | 👁️ Read-Only | ✅ Full | 👁️ Read-Only |
| **Product Image Upload & Presign** | ✅ Full | ❌ No | ✅ Full | 👁️ Read-Only |
| **Stock In / Stock Out** (`/api/stock/*`) | ✅ Full | ❌ No | ✅ Full | ❌ No |
| **Stock Audit Movements** (`/api/stock/movements`) | ✅ Full | 👁️ Read-Only | ✅ Full | 👁️ Read-Only |
| **Delivery Challan Creation/Edit** | ✅ Full | ✅ Full | ❌ No | ❌ No |
| **Challan Confirmation (Stock Deduct)** | ✅ Full | ✅ Full | ❌ No | ❌ No |
| **Mark Challan Paid** | ✅ Full | ✅ Full | ❌ No | ✅ Full |
| **Challan & Invoice PDF Generation** | ✅ Full | ✅ Full | ❌ No | ✅ Full |

### Default Test Credentials

| Role | Email | Password | Primary Capabilities |
|---|---|---|---|
| **ADMIN** | `admin@fundsroom.com` | `Admin@123` | Full access across all system resources |
| **SALES** | `sales@fundsroom.com` | `Sales@123` | Leads, customer relationship, sales challans |
| **WAREHOUSE** | `warehouse@fundsroom.com` | `Warehouse@123` | Product SKU creation, inventory adjustments |
| **ACCOUNTS** | `accounts@fundsroom.com` | `Accounts@123` | Payment confirmation, invoices, PDF downloads |

---

## 2. Global Standards & Error Handling

### Standard Success Response Envelope
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional descriptive status message"
}
```

### Standard Paginated Response Envelope
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "total": 120,
    "page": 1,
    "limit": 20,
    "totalPages": 6
  }
}
```

### Standard Error Response Envelope
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "fieldName": "Specific error description"
  }
}
```

---

## Module 1: System & Health

### 1.1 Root Index Status
- **Method:** `GET`
- **Path:** `/`
- **Auth:** None

### 1.2 Health Check
- **Method:** `GET`
- **Path:** `/api/health`
- **Auth:** None

---

## Module 2: Authentication APIs

### 2.1 User Login
- **Method:** `POST`
- **Path:** `/api/auth/login`
- **Auth:** None
- **Body:** `{ "email": "admin@fundsroom.com", "password": "Admin@123" }`

### 2.2 Get Current User (Me)
- **Method:** `GET`
- **Path:** `/api/auth/me`
- **Auth:** Bearer Token

---

## Module 3: Customers & CRM

### 3.1 Create Customer
- **Method:** `POST`
- **Path:** `/api/customers`
- **Auth:** `ADMIN`, `SALES`

### 3.2 List Customers
- **Method:** `GET`
- **Path:** `/api/customers`
- **Auth:** `ADMIN`, `SALES`, `ACCOUNTS`

### 3.3 Get Customer By ID
- **Method:** `GET`
- **Path:** `/api/customers/:id`
- **Auth:** `ADMIN`, `SALES`, `ACCOUNTS`

### 3.4 Update Customer
- **Method:** `PUT`
- **Path:** `/api/customers/:id`
- **Auth:** `ADMIN`, `SALES`

### 3.5 Add Follow-up
- **Method:** `POST`
- **Path:** `/api/customers/:id/followups`
- **Auth:** `ADMIN`, `SALES`

### 3.6 List Follow-ups
- **Method:** `GET`
- **Path:** `/api/customers/:id/followups`
- **Auth:** `ADMIN`, `SALES`, `ACCOUNTS`

---

## Module 4: Products Catalog

### 4.1 Create Product
- **Method:** `POST`
- **Path:** `/api/products`
- **Auth:** `ADMIN`, `WAREHOUSE`

### 4.2 List Products
- **Method:** `GET`
- **Path:** `/api/products`
- **Auth:** `ADMIN`, `WAREHOUSE`, `SALES`, `ACCOUNTS`

### 4.3 Update Product
- **Method:** `PUT`
- **Path:** `/api/products/:id`
- **Auth:** `ADMIN`, `WAREHOUSE`

### 4.4 Upload Product Image
- **Method:** `POST`
- **Path:** `/api/products/:id/image`
- **Auth:** `ADMIN`, `WAREHOUSE`

---

## Module 5: Stock & Inventory Management

### 5.1 Stock In
- **Method:** `POST`
- **Path:** `/api/stock/in`
- **Auth:** `ADMIN`, `WAREHOUSE`

### 5.2 Stock Out
- **Method:** `POST`
- **Path:** `/api/stock/out`
- **Auth:** `ADMIN`, `WAREHOUSE`

### 5.3 List Stock Movements
- **Method:** `GET`
- **Path:** `/api/stock/movements`
- **Auth:** `ADMIN`, `WAREHOUSE`, `SALES`, `ACCOUNTS`

---

## Module 6: Delivery Challans & Sales

### 6.1 Create Challan (Draft)
- **Method:** `POST`
- **Path:** `/api/challans`
- **Auth:** `ADMIN`, `SALES`

### 6.2 Confirm Challan (Deduct Inventory)
- **Method:** `PATCH`
- **Path:** `/api/challans/:id/confirm`
- **Auth:** `ADMIN`, `SALES`

### 6.3 Mark Challan as Paid
- **Method:** `PATCH`
- **Path:** `/api/challans/:id/paid`
- **Auth:** `ADMIN`, `SALES`, `ACCOUNTS`

### 6.4 Export Challan PDF
- **Method:** `GET`
- **Path:** `/api/challans/:id/pdf`
- **Auth:** `ADMIN`, `SALES`, `ACCOUNTS`

---

## Module 7: Invoices & Billing

### 7.1 Export GST Invoice PDF
- **Method:** `GET`
- **Path:** `/api/invoices/:id/pdf`
- **Auth:** `ADMIN`, `SALES`, `ACCOUNTS`
