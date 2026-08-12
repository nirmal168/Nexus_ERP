# 🚀 Nexus ERP

> **Nexus ERP** is a modern full-stack Enterprise Resource Planning and CRM platform designed to centralize business operations, customer management, sales, finance, inventory, and organizational workflows in a single system.

## 🌐 Live Demo

| Service          | Live URL                             |
| ---------------- | ------------------------------------ |
| 🖥️ Frontend     | https://nexus-erp-blush.vercel.app/  |
| ⚙️ Backend / API | https://nexus-erp-ug4w.onrender.com/ |

---

## 📌 Overview

Nexus ERP provides a centralized platform for managing core business operations through a modern web interface.

The system follows a **client-server architecture**, where the frontend communicates with the backend through REST APIs. Business data is processed by the backend and stored in the database.

### Key Goals

* Centralize business operations
* Manage customers and leads
* Manage sales and business activities
* Track products and inventory
* Manage employees and organizational data
* Provide dashboards and business insights
* Secure application access using authentication and authorization
* Provide a scalable foundation for future ERP modules

---

# 🏗️ System Architecture

```text
                        ┌─────────────────────────┐
                        │        End User         │
                        │   Desktop / Mobile Web  │
                        └────────────┬────────────┘
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │       React Frontend    │
                        │                         │
                        │  • Dashboard            │
                        │  • CRM                  │
                        │  • Sales                │
                        │  • Inventory            │
                        │  • Finance              │
                        │  • HR / Employees       │
                        │  • Reports              │
                        └────────────┬────────────┘
                                     │
                              REST API / HTTP
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │      Backend Server     │
                        │                         │
                        │  • API Routes           │
                        │  • Authentication       │
                        │  • Authorization        │
                        │  • Business Logic       │
                        │  • Validation           │
                        │  • Data Processing      │
                        └────────────┬────────────┘
                                     │
                              Database Queries
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │        Database         │
                        │                         │
                        │  Users                  │
                        │  Customers              │
                        │  Products               │
                        │  Orders                 │
                        │  Inventory              │
                        │  Transactions           │
                        │  Employees              │
                        └─────────────────────────┘
```

---

# 🔄 Application Data Flow

```text
User
  │
  ▼
Frontend UI
  │
  │ HTTP Request
  ▼
Backend REST API
  │
  ├── Authentication
  │
  ├── Authorization
  │
  ├── Request Validation
  │
  └── Business Logic
          │
          ▼
       Database
          │
          ▼
    Query / Result
          │
          ▼
    Backend Response
          │
          ▼
     Frontend UI
```

---

# 🧩 Core Modules

## 📊 Dashboard

Provides a centralized overview of business activities and important operational information.

* Business KPIs
* Sales overview
* Customer statistics
* Inventory information
* Operational metrics
* Recent activities

## 👥 CRM

Manage customer relationships and business interactions.

* Customer management
* Lead management
* Contact information
* Customer history
* Follow-up management
* Sales pipeline

## 💰 Sales Management

Manage the complete sales workflow.

* Sales records
* Orders
* Customers
* Sales tracking
* Revenue monitoring
* Sales status

## 📦 Inventory Management

Track products and inventory operations.

* Product management
* Stock tracking
* Inventory updates
* Stock availability
* Product information
* Inventory monitoring

## 👨‍💼 Employee Management

Manage organizational employee information.

* Employee records
* Employee profiles
* Departments
* Roles
* Organizational information

## 💳 Finance

Support business financial operations and transaction tracking.

* Financial records
* Transactions
* Revenue tracking
* Expense monitoring
* Financial overview

## 📈 Reports & Analytics

Provide business insights through dashboards and reports.

* Sales analytics
* Customer analytics
* Inventory analytics
* Revenue information
* Business performance metrics

## 🔐 Authentication & Authorization

Secure application access through controlled user authentication.

* User authentication
* Protected routes
* Role-based access
* Authorization
* Session management

---

# 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript / TypeScript
* HTML5
* CSS3
* Tailwind CSS
* REST API integration
* Responsive UI

### Backend

* Node.js
* Express.js
* RESTful APIs
* Authentication & Authorization
* Server-side business logic

### Database

* MongoDB
* Mongoose

### Development Tools

* Git
* GitHub
* VS Code
* npm

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB / MongoDB Atlas

---

# 📁 Project Architecture

```text
Nexus-ERP/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.*
│   │
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── config/
│   ├── server.*
│   └── package.json
│
├── .gitignore
└── README.md
```

> The exact folder names may differ depending on the current implementation.

---

# 🔌 API Architecture

The frontend communicates with the backend through RESTful API endpoints.

```text
Frontend
   │
   ├── Authentication APIs
   ├── User APIs
   ├── Customer APIs
   ├── Sales APIs
   ├── Product APIs
   ├── Inventory APIs
   ├── Employee APIs
   └── Reports APIs
             │
             ▼
        Express Server
             │
             ▼
          MongoDB
```

### Example API Flow

```text
POST /api/auth/login
        │
        ▼
Authentication Controller
        │
        ▼
User Model
        │
        ▼
MongoDB
        │
        ▼
Authentication Response
        │
        ▼
Frontend
```

---

# 🔐 Security

The application is designed around common web application security practices.

* Authentication
* Authorization
* Protected API routes
* Role-based access control
* Environment-based configuration
* Secure password handling
* Input validation
* CORS configuration

> Never commit production credentials, database URLs, API keys, or secret tokens to GitHub.

---

# 🚀 Running the Project Locally

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Nexus_ERP.git

cd Nexus_ERP
```

## 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## 3. Configure Frontend Environment

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

## 4. Start Frontend

```bash
npm run dev
```

---

## 5. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

## 6. Configure Backend Environment

Create a `.env` file according to the backend configuration.

Example:

```env
PORT=5000
DATABASE_URL=your_postgres_database_url
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

## 7. Start Backend

```bash
npm run dev
```

---

## 👥 User Roles & Default Credentials

| Role      | Email                      | Password      | Description |
|-----------|----------------------------|---------------|-------------|
| **ADMIN**     | `admin@fundsroom.com`        | `Admin@123`     | Full access to all modules. |
| **SALES**     | `sales@fundsroom.com`        | `Sales@123`     | Can manage customers and create challans. |
| **WAREHOUSE** | `warehouse@fundsroom.com`    | `Warehouse@123` | Can manage products and inventory stock. |
| **ACCOUNTS**  | `accounts@fundsroom.com`     | `Accounts@123`  | Read-only access to sales, full access to invoices. |

---

## 📮 API Testing with Postman

A complete, verified Postman collection is included in the project:
- **Collection:** [`Nexus_ERP_API.postman_collection.json`](Nexus_ERP_API.postman_collection.json)
- **Local Environment:** [`postman/environments/Nexus ERP - Local Environment.environment.yaml`](postman/environments/)
- **Production Environment:** [`postman/environments/Nexus ERP - Production Environment.environment.yaml`](postman/environments/)

### Quick Start in Postman:
1. In Postman, press `Ctrl + O` and select `Nexus_ERP_API.postman_collection.json`.
2. Select **Nexus ERP - Local Environment**.
3. Run the collection to verify all 24 endpoints.

---

# 🌍 Deployment Architecture

The production deployment uses separate frontend and backend services.

### Production Services

- **Frontend:** https://nexus-erp-blush.vercel.app/
- **Backend:** https://nexus-erp-ug4w.onrender.com/

---

# 📱 Responsive Design

Nexus ERP is designed to provide a consistent experience across different screen sizes.

* Desktop
* Laptop
* Tablet
* Mobile

---

# 🎯 Project Objectives

Nexus ERP aims to provide businesses with a unified platform that reduces the need for multiple disconnected applications.

### Business Benefits

* Centralized business information
* Improved operational visibility
* Faster access to business data
* Better customer management
* Simplified inventory tracking
* Improved sales monitoring
* Scalable architecture
* Modular application design

---

# 🔮 Future Enhancements

Potential future improvements include:

* 🤖 AI-powered business assistant
* 📊 Advanced business intelligence
* 📈 Predictive sales analytics
* 💬 Real-time team communication
* 🔔 Advanced notification system
* ⚙️ Workflow automation
* 📄 Automated report generation
* 📧 Email automation
* 📱 Progressive Web App support
* 🔗 Third-party integrations
* 🏢 Multi-company support
* 🌍 Multi-branch management
* 🔐 Advanced permission management

---

# 🤝 Contribution

Contributions are welcome.

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature/new-feature

# Commit changes
git commit -m "Add new feature"

# Push changes
git push origin feature/new-feature

# Create a Pull Request
```

---

# 📄 License

This project is intended for educational, development, and demonstration purposes.

---

# 👨‍💻 Developer

**Nirmal Prajapat**

Full Stack Developer | MERN Stack | DSA

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

- **Live Application:** https://nexus-erp-blush.vercel.app/
- **Backend API:** https://nexus-erp-ug4w.onrender.com/
