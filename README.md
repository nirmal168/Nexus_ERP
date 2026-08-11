# Nexus ERP & CRM Operations Portal

A complete Mini ERP and CRM portal designed for wholesale, distribution, and operations companies. It features role-based access control, customer tracking, inventory management, product catalogs, and sales challans.

## Features

- **Role-Based Access Control (RBAC):** Admin, Sales, Warehouse, and Accounts roles with restricted views.
- **Customer Management:** Create and track customer profiles, contacts, and account balances.
- **Product Catalog:** Manage product SKUs, prices, minimum stock thresholds, and images.
- **Inventory & Stock Tracking:** Track inbound and outbound stock movements with live inventory counts.
- **Sales Challans (Invoices):** Generate and confirm sales challans. Automatically deducts stock upon confirmation and handles payment tracking.
- **Interactive Dashboard:** Live stats and overview pulse of operations.

## Tech Stack

- **Frontend:** React 18, Vite, TypeScript, React Router, Tailwind CSS, Lucide Icons, Axios.
- **Backend:** Node.js, Express, TypeScript, Prisma ORM.
- **Database:** PostgreSQL (Hosted on Neon).
- **Authentication:** JWT-based stateless authentication.

---

## Quick Start Guide

### 1. Backend Setup

Open a terminal and navigate to the `backend` directory:
```bash
cd backend
npm install
```

Set up your environment variables. Copy the example file and update it:
```bash
cp .env.example .env
```
Make sure `.env` contains your PostgreSQL connection string (e.g. Neon DB):
```env
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD_HERE@ep-floral-surf-ayy73zvu-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
```

Run database migrations to initialize tables, then seed demo data:
```bash
npx prisma migrate deploy
npx prisma db seed
```

Start the backend server:
```bash
npm run dev
```

### 2. Frontend Setup

Open a **new** terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

Set up the environment variables (it connects to the backend by default):
```bash
cp .env.example .env
```

Start the frontend development server:
```bash
npm run dev
```

---

## Demo Credentials

Log in using any of these roles to see the filtered navigation and permissions:

| Role      | Email                      | Password      | Description |
|-----------|----------------------------|---------------|-------------|
| ADMIN     | admin@fundsroom.com        | Admin@123     | Full access to all modules. |
| SALES     | sales@fundsroom.com        | Sales@123     | Can manage customers and create challans. |
| WAREHOUSE | warehouse@fundsroom.com    | Warehouse@123 | Can manage products and inventory stock. |
| ACCOUNTS  | accounts@fundsroom.com     | Accounts@123  | Read-only access to sales, full access to invoices. |
