# MaintainIQ

**AI-Powered QR Maintenance Hub**

MaintainIQ is a smart asset maintenance tracking system that lets organizations manage equipment (computers, printers, ACs, projectors, etc.) using QR codes and AI-assisted issue triage.

## 🔍 Problem

Organizations struggle to track equipment issues efficiently — complaints get lost, there's no priority system, and maintenance history isn't recorded anywhere centralized.

## 💡 Solution

Every asset gets a unique QR code. Anyone can scan it, view the asset's status, and report an issue — no login required. The system automatically analyzes the complaint and assigns a category and priority, so admins can act on the most urgent issues first.

## ✨ Features

- 🔐 **Admin Authentication** — Secure login via Firebase
- 📋 **Asset Registration** — Register assets with name, category, and location
- 🔗 **QR Code Generation** — Auto-generated QR code for every asset
- 📱 **Public Asset Page** — Scan QR to view asset info and report issues (no login needed)
- 🤖 **AI-Powered Triage** — Automatically detects issue category, priority, possible causes, and initial checks based on the complaint description
- 📊 **Admin Dashboard** — Real-time stats (total assets, pending issues, resolved issues), asset list, and recent issues with status management
- 🔄 **Status Workflow** — Track issue progress: Reported → Assigned → Inspection Started → Maintenance In Progress → Resolved → Closed
- 📱 **Responsive Design** — Works across desktop, tablet, and mobile

## 👥 User Roles

| Role | Responsibilities |
|------|------------------|
| **Administrator** | Register assets, view all issues, manage status, review dashboard analytics |
| **Reporter / Public User** | Scan QR, view asset info, report issues, check status |
| **Technician** *(planned)* | View assigned work, log maintenance notes, resolve issues |
| **Supervisor** *(planned)* | Review completed maintenance, approve/reopen resolutions |

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Routing:** React Router
- **Backend / Database:** Firebase (Authentication + Firestore)
- **Styling:** Custom CSS (fully responsive)

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- A Firebase project set up (Authentication + Firestore enabled)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd maintainiq

# Install dependencies
npm install

# Add your Firebase config in src/firebasecode/Firebase.js

# Run the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📂 Project Structure