# 🛠️ MaintainIQ

**AI-Powered QR Maintenance Hub**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com)
[![Status](https://img.shields.io/badge/Status-MVP-brightgreen)]()

> A smart asset maintenance tracking system that lets organizations manage equipment — computers, printers, ACs, projectors, and more — using QR codes and AI-assisted issue triage.

---

## 📑 Table of Contents

- [Problem](#-problem)
- [Solution](#-solution)
- [Features](#-features)
- [User Roles](#-user-roles)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [App Flow](#-app-flow)
- [Roadmap](#️-roadmap)
- [License](#-license)

---

## 🔍 Problem

Organizations struggle to track equipment issues efficiently. Complaints get scattered across registers, calls, and messages — there's no centralized priority system, and maintenance history is rarely recorded anywhere useful.

## 💡 Solution

Every asset gets a unique QR code. Anyone can scan it, view the asset's live status, and report an issue — no login required. The system automatically analyzes the complaint and assigns a category and priority, so admins can act on the most urgent issues first.

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Admin Authentication** | Secure login via Firebase Auth |
| 📋 **Asset Registration** | Register assets with name, category, and location |
| 🔗 **QR Code Generation** | Auto-generated QR code for every asset |
| 📱 **Public Asset Page** | Scan QR to view asset info and report issues — no login needed |
| 🤖 **AI-Powered Triage** | Detects issue category, priority, possible causes, and initial checks from the complaint description |
| 📊 **Admin Dashboard** | Real-time stats, asset list, and issue management with search |
| 🔄 **Status Workflow** | Reported → Assigned → Inspection Started → Maintenance In Progress → Resolved → Closed |
| 🕓 **Service History** | Every asset keeps a timeline of past issues and status changes |
| 📱 **Responsive Design** | Works seamlessly across desktop, tablet, and mobile |

## 👥 User Roles

| Role | Responsibilities |
|---|---|
| **Administrator** | Register assets, view all issues, manage status, review dashboard analytics |
| **Reporter / Public User** | Scan QR, view asset info, report issues, check status |
| **Technician** *(planned)* | View assigned work, log maintenance notes, resolve issues |
| **Supervisor** *(planned)* | Review completed maintenance, approve/reopen resolutions |

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Routing | React Router |
| Backend / Database | Firebase (Authentication + Firestore) |
| Styling | Custom CSS, fully responsive |

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- A Firebase project with **Authentication** and **Firestore** enabled

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd maintainiq

# Install dependencies
npm install

# Add your Firebase config in src/firebasecode/Firebase.js
# (or set VITE_API_KEY in a .env file)

# Run the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📂 Project Structure

src/
├── auth/                  # Login, signup, protected routes
├── components/
│   ├── navbar/             # Navbar component
│   ├── footer/             # Footer component
│   └── assetscard/          # Asset & issue card components
├── firebasecode/           # Firebase config & helper functions
├── pages/                  # Dashboard, Add Asset, Report Issue, Public Asset page
└── Rounting.jsx             # App routes

## 🔄 App Flow

Login → Admin Dashboard → Add Asset → QR Code Generated
↓
Public scans QR → Asset Page
↓
Report Issue
↓
AI Triage (auto)
↓
Issue appears in Admin Dashboard
↓
Admin assigns technician → updates status → Resolved

## 🗺️ Roadmap

- [ ] Technician role with assigned work view
- [ ] Supervisor approval workflow
- [ ] Last service / next service date tracking
- [ ] Maintenance cost & parts tracking
- [ ] Evidence/photo upload for issues
- [ ] QR download, copy-link & print label actions

## 📄 License

Built as part of a hackathon/demo submission.

---

<p align="center">Made with ❤️ for smarter facility management</p>