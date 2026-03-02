# Deploying StudyZone with Docker

## Prerequisites
Before deploying with Docker, ensure you have the following installed:
- Docker Engine (Docker Desktop for Windows/Mac or Docker Engine for Linux)
- Docker Compose (included with Docker Desktop)

## Quick Start Deployment

### 1. Clone the Repository
```bash
git clone https://github.com/MonsieurChips/Study-Zone.git
cd Study-Zone
```

### 2. Configure Environment Variables
Create a `.env` file in the `Fullstack-BE-main` directory with your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/StudyZone?retryWrites=true&w=majority
```

### 3. Start the Application
From the project root directory, run:
```bash
docker-compose up
```

This will start both the backend service on port 3000 and MongoDB on port 27017.

### 4. Access the Application
- Backend API: http://localhost:3000
- Database: mongodb://localhost:27017

## Docker Configuration Details

### Services Overview
1. **studyzone-backend**: Node.js Express application
2. **mongodb**: MongoDB database (for local development)

### Port Mappings
- Host port 3000 → Container port 3000 (Backend API)
- Host port 27017 → Container port 27017 (MongoDB)

### Environment Variables
The application uses the following environment variables:
- `MONGODB_URI`: Connection string for MongoDB

## Production Deployment

### Building Custom Images
To build the Docker images separately:
```bash
# Build the backend image
docker build -t studyzone-backend ./Fullstack-BE-main

# Run the backend container
docker run -p 3000:3000 --env-file ./Fullstack-BE-main/.env studyzone-backend
```

### Using External MongoDB
For production, you might want to use a managed MongoDB service (like MongoDB Atlas) instead of running MongoDB in a container:
```bash
# Remove the mongodb service from docker-compose.yml
# Set MONGODB_URI in your .env file to point to your MongoDB Atlas cluster
docker-compose up studyzone-backend
```

## Useful Docker Commands

### Development Workflow
```bash
# Start services in detached mode
docker-compose up -d

# View logs
docker-compose logs

# Stop services
docker-compose down

# Rebuild images
docker-compose up --build

# Access container shell
docker exec -it studyzone-backend sh
```

### Managing Data
```bash
# Backup MongoDB data
docker exec studyzone-mongodb mongodump --out /backup

# Restore MongoDB data
docker exec studyzone-mongodb mongorestore /backup
```

## Troubleshooting

### Common Issues
1. **Port already in use**: Stop other services using ports 3000 or 27017
2. **Permission denied**: Ensure Docker daemon is running
3. **Connection refused**: Check that all services are running with `docker-compose ps`

### Debugging
```bash
# Check service status
docker-compose ps

# View service logs
docker-compose logs studyzone-backend

# Check container resources
docker stats
```

## Scaling Options

### Horizontal Scaling
To run multiple instances of the backend:
```bash
docker-compose up --scale studyzone-backend=3
```

### Custom Configuration
Modify the `docker-compose.yml` file to:
- Change port mappings
- Adjust resource limits
- Add monitoring services
- Configure networks