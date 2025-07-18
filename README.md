# Medical Volunteer Desktop App

A desktop app built with TypeScript and Electron for efficient management of medical volunteers.
This app demonstrates CRUD operations, responsive UI, error handling, and local data maintenance.

---

## App Description

This app allows users to create and view volunteer profiles with details such as name, phone, department. It features:

- Clean and intuitive UI with two main views: Volunteer List and Volunteer Form

- Handling errors and loading states during asynchronous operations
- Saving data using JSON files on the local computer

---

## Access Control

- Only managers can create new volunteer profiles.
- Some volunteers are pre-registered with specific IDs (e.g., volunteer with ID `123456789` is already saved).
- Volunteers cannot self-register; they must be added by a manager.

---

## Installation Instructions

1. Clone the repository:

```
git clone https://github.com/OsnatProgrammer/medical-volunteer-app.git
cd medical-volunteer-app```

2.Install dependencies:

```
npm install```

3.Run the app in development mode (runs React and Electron concurrently):

```
npm run dev```

4.Open the Electron app window that opens automatically

Build Instructions
To build the React frontend:

```
npm run build```

To start the Electron app after build:

```
npm run electron```
