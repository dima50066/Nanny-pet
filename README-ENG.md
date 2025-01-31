# Nanny-Pet

**Nanny-Pet** is a web application for finding and managing nannies. The project includes both backend and frontend parts, allowing users to register, authenticate, search for nannies, schedule appointments, and manage their data.

---

## Technologies

### Backend

- **Node.js** — server-side platform.
- **Express** — framework for building REST APIs.
- **MongoDB** — database for storing information about users, nannies, and appointments.
- **Mongoose** — ODM for working with MongoDB.
- **JWT** — for authentication and session management.
- **Nodemailer** — for sending emails (e.g., password reset).
- **Cloudinary** — for storing and managing images.
- **TypeScript** — for code typing.

### Frontend

- **React** — library for building the UI.
- **Redux Toolkit** — for state management.
- **React Router** — for navigation between pages.
- **Tailwind CSS** — for styling components.
- **Vite** — tool for frontend bundling.
- **TypeScript** — for code typing.

---

## Features

### Backend

- User registration and authentication.
- Session management using JWT.
- Password reset via email.
- Storing data about nannies, appointments, and users.
- Uploading and storing images in Cloudinary.

### Frontend

- User registration and login.
- Viewing the list of nannies.
- Creating, editing, and deleting appointments.
- Adding nannies to favorites.
- User profile page.
- Password reset via email.

---

## How to Run the Project

### Prerequisites

- Node.js (v18 or later)
- MongoDB (locally or via Atlas)
- Cloudinary (for image storage)

### Steps to Run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/Nanny-pet.git
   cd Nanny-pet
   ```

2. **Set up the backend:**

   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the root of the `backend` folder and add the following variables:
     ```env
     PORT=5000
     MONGODB_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ENABLE_CLOUDINARY=true
     NODE_ENV=development
     NODEMAILER_USER=your_email
     NODEMAILER_PASS=your_email_password
     SMTP_HOST=your_smtp_host
     SMTP_PORT=your_smtp_port
     SMTP_USER=your_smtp_user
     SMTP_PASSWORD=your_smtp_password
     SMTP_FROM=your_smtp_from
     ```
   - Start the server:
     ```bash
     npm run dev
     ```

3. **Set up the frontend:**

   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the root of the `frontend` folder and add the following variables:
     ```env
     VITE_API_URL=http://localhost:5000
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

4. **Open the application in the browser:**
   - Go to `http://localhost:5173`.

---

## Project Structure

### Backend

- **`src/controllers`** — controllers for handling requests.
- **`src/db`** — database connection and data models.
- **`src/middlewares`** — middleware for authentication, error handling, etc.
- **`src/routers`** — API routes.
- **`src/services`** — business logic (registration, authentication, working with nannies, etc.).
- **`src/utils`** — utility functions (e.g., for working with Cloudinary).

### Frontend

- **`src/components`** — UI components (navigation, modals, forms, etc.).
- **`src/pages`** — application pages (home, profile, nannies, etc.).
- **`src/redux`** — state management (authentication, nannies, appointments).
- **`src/hooks`** — custom hooks (e.g., for API interactions).

---

## Author

- **Dumitru Cuznetov** — project developer.  
  Email: [dima50066@gmail.com](mailto:dima50066@gmail.com)

---

If you need to add any additional information or make changes, let me know! 😊
