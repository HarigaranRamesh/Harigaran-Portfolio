# Portfolio Project Guide

## 1. Overview
This is a personal portfolio website built with **React**. It features a responsive design, a contact form that sends emails and saves messages to a database, and an **Admin Dashboard** to view those messages.

## 2. Technology Stack
- **Frontend**: React, Vite
- **Styling**: CSS, Framer Motion (only for animations), React Icons
- **Email Service**: EmailJS (sends emails directly from the frontend)
- **Database & Auth**: Firebase (Firestore for data, Authentication for admin login)

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

## 4. Configuration (.env)
This project requires connection keys for EmailJS and Firebase. These are stored in a `.env` file in the root directory.

**Create a file named `.env` and add the following keys:**

```ini
# EmailJS Configuration (for sending emails)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Firebase Configuration (for Admin Dashboard)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

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
- **Action**: When a user submits, two things happen:
    1.  An email is sent to you via EmailJS.
    2.  The message is saved to the Firebase Database.

### Admin Dashboard (New Feature)
- **URL**: [http://localhost:5173/login](http://localhost:5173/login) (or `/admin`)
- **Purpose**: To view all messages submitted through the contact form.
- **Login**: Secured by Firebase Authentication.
    - *Note: Only users created in the Firebase Console can log in.*

#### How to create an Admin User:
1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Navigate to **Authentication** > **Users**.
3.  Click **"Add user"**.
4.  Enter the email/password you want to use for login.

## 7. Folder Structure
- `src/components`: Contains all React components (Navbar, Hero, Contact, etc.).
- `src/components/admin`: Contains Dashboard and Login pages.
- `src/styles`: CSS files for styling.
- `src/firebase.js`: Configuration file connecting to Firebase.

---
*Created on 2025-12-09*
