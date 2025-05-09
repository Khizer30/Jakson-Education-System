# Jakson Education System Portal

The Jakson Education System (JES) Portal is a web application designed to manage student records efficiently. It provides features for adding, editing, removing, and promoting students, as well as
generating fee challans. The portal is built using **Next.js**, **Firebase**, and other modern web technologies.

## Features

- **Authentication**: Secure login system using Firebase Authentication.
- **Dashboard**: Centralized interface for accessing all features.
- **Student Management**:
    - Add new students to the database.
    - Edit existing student records.
    - Remove students from the database.
    - Promote or demote students between grades.
- **Fee Challan Generation**: Generate and download fee challans in Word document format.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React.js, Next.js
- **Backend**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **Styling**: Bootstrap 5, CSS3
- **Document Generation**: Docxtemplater
- **TypeScript**: For type safety and better development experience

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Khizer30/Jakson-Education-System.git
    cd Jakson-Education-System
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables in `.env` file in the root directory.

    ```bash
    NEXT_PUBLIC_FIREBASE_CONFIG=<your-firebase-config>
    SERVICE_ACCOUNT=<your-service-account-json>
    NEXT_PUBLIC_SITE_KEY=<your-recaptcha-site-key>
    SECRET_KEY=<your-recaptcha-secret-key>
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open the application in your browser:

    ```bash
    http://localhost:3000
    ```

## License

Developed by Syed Muhammad Khizer
