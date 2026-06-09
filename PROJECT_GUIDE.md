# Portfolio Project Guide

## 1. Overview
This is a personal portfolio website built with **React**. It features a responsive design, and includes a contact form and admin dashboard UI that are currently disabled because external EmailJS and Firebase integrations have been removed.

## 2. Technology Stack
- **Frontend**: React, Vite
- **Styling**: CSS, Framer Motion (only for animations), React Icons
- **Email Service**: Removed from this version
- **Database & Auth**: Removed from this version

## 3. Setup Instructions (For New Users)

### Prerequisites
- Node.js installed on your computer.

### Installation
1.  **Download/Clone** the project folder.
2.  Open the folder in VS Code.
3.  Open a terminal and run:
    ```bash
    npm install
    ```

## 4. Configuration
EmailJS and Firebase configuration have been removed from this project.

The contact form and admin dashboard are currently disabled unless those services are restored.

## 5. How to Run
To start the website locally:
```bash
npm run dev
```
It will typically run on `http://localhost:5173`.

## 6. Features & How to Use

### Contact Form
- Located at the bottom of the main page.
- Fields: Name, Email, Phone, Message.
- **Status**: The contact form is currently disabled because EmailJS and Firebase integration have been removed.

### Admin Dashboard
- The admin login and dashboard are disabled in this version.
- Restore Firebase configuration to re-enable admin authentication and message management.

## 7. Folder Structure
- `src/components`: Contains all React components (Navbar, Hero, Contact, etc.).
- `src/components/admin`: Contains Dashboard and Login pages.
- `src/styles`: CSS files for styling.
- `src/firebase.js`: Configuration file connecting to Firebase.

---
*Created on 2025-12-09*
