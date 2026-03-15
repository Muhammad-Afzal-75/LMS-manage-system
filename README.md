# LMS Management System

A comprehensive Learning Management System built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **Admin Dashboard**: Manage users and courses.
- **Instructor Portal**: Create and manage course content.
- **Student Dashboard**: Enroll and track progress (in progress).
- **Public Course Listing**: Explore available courses.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Muhammad-Afzal-75/LMS-manage-system.git
   cd LMS-manage-system
   ```

2. **Backend Setup**
   - Go to `backend` folder: `cd backend`
   - Install dependencies: `npm install`
   - Create a `.env` file with:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```
   - Seed the database (optional): `node seed.js`
   - Start the server: `npm start`

3. **Frontend Setup**
   - Go to `frontend` folder: `cd frontend`
   - Install dependencies: `npm install`
   - Create a `.env` file with:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```
   - Start the development server: `npm run dev`

## Technologies Used
- **Frontend**: React, React-Bootstrap, Lucide-React, Axios
- **Backend**: Node.js, Express, Mongoose, JWT, Cors
- **Database**: MongoDB
