# StudyZone - Complete Full Stack Application

This repository contains a complete full-stack web application for StudyZone, an online learning platform that offers various courses and lessons.

## Features

- **Frontend**: HTML, CSS, JavaScript with Vue.js
- **Backend**: Node.js with Express
- **Database**: MongoDB Atlas
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

### Backend (Fullstack-BE-main)
- RESTful API for courses and orders
- MongoDB integration for data storage
- Image serving for course materials

### Frontend (Fullstack-FE-master)
- Main landing page
- Courses catalog page with search and filtering
- Shopping cart functionality
- Individual course detail pages

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Backend Setup
1. Navigate to the `Fullstack-BE-main` directory
2. Run `npm install` to install dependencies
3. Create a `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/StudyZone?retryWrites=true&w=majority
   ```
4. Run `npm start` to start the server

### Deployment to Render.com
The application includes a `render.yaml` configuration file that makes deployment to Render.com straightforward. Simply connect your GitHub repository to Render and it will automatically detect and configure the deployment settings.

### Frontend Setup
1. Navigate to the `Fullstack-FE-master` directory
2. Serve the files using any static file server (e.g., `npx serve`)
3. Access the application at the provided URL

## API Endpoints

- `GET /api/lessons` - Retrieve all lessons
- `GET /api/lessons/search?query=text` - Search lessons by text
- `PUT /api/lessons/:id` - Update a specific lesson

## Contributing

Feel free to fork this repository and submit pull requests with improvements or new features.

## License

This project is for educational purposes.