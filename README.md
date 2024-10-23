# Simple Note Taking App with Authentication and Storage

A simple note-taking app built using **React**, **TypeScript**, and **Vite**. It simulates basic login/logout functionality using **Cookies**, allows users to create and store notes in **IndexedDB**, auto-saves drafts using **Session Storage**, and remembers user preferences (e.g., sorting order) using **Local Storage**.

## Features

- **User Authentication**: Simulated login/logout using cookies
- **Note Creation**: Users can create notes with a text area and store them locally
- **Note Storage**: Notes are stored in IndexedDB with a timestamp
- **Auto-save Draft**: Draft notes are auto-saved using Session Storage in case the user navigates away or refreshes the page
- **Sorting Preference**: User's preferred note sorting (newest/oldest) is saved in Local Storage
- **Responsive UI**: The main application is hidden/displayed based on the user's login state

## Getting Started

### Prerequisites

- **Node.js** (v14.x or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/simple-note-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd simple-note-app
   ```

3. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit `http://localhost:5173`

## Project Structure

```
├── src
│   ├── App.tsx           # Main component with login/logout and note management
│   └── styles.css        # Basic CSS for styling the app
├── public
│   └── index.html        # Main HTML file
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

### App.tsx
This file contains the entire logic of the app:
- Manages user authentication (simulated with cookies)
- Allows the user to create notes and stores them in **IndexedDB**
- Supports auto-saving drafts using **Session Storage**
- Remembers the sorting preference using **Local Storage**
- Controls the UI, displaying the login button or the note-taking app based on login state

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: A superset of JavaScript that adds static typing
- **Vite**: A fast build tool for modern web applications
- **IndexedDB**: A low-level API for storing large amounts of structured data in the browser
- **Session Storage**: A type of web storage for temporary data
- **Local Storage**: A type of web storage for persistent key-value pairs in the browser
- **Cookies (via js-cookie)**: Small pieces of data stored in the user's browser, used for simulating login/logout functionality

## Storage Overview

This app uses three types of browser storage to manage data:

### Cookies
- Used to simulate login/logout functionality
- Stores the user's login state (`loggedIn` or not)

### IndexedDB
- Stores the actual notes locally in the user's browser
- Each note includes a **content** field and a **timestamp**

### Session Storage
- Temporarily stores draft notes
- This helps prevent data loss if the user navigates away from the page without saving

### Local Storage
- Stores the user's sorting preference (newest or oldest)
- The sorting preference is persistent across sessions

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`
Builds the app for production to the `dist` folder. It bundles React in production mode and optimizes the build for best performance.

### `npm run preview`
Serves the built project locally after running the build command.
