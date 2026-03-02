# StudyZone Backend Deployment to Render

## Prerequisites
1. A Render account (https://render.com/)
2. A MongoDB Atlas account (https://cloud.mongodb.com/)
3. Your codebase pushed to a GitHub repository

## Step 1: Prepare MongoDB Atlas

1. Log in to MongoDB Atlas
2. Navigate to your cluster's Network Access settings
3. Add a new IP address to the whitelist:
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (0.0.0.0/0) for testing
   - For production, use Render's IP ranges
4. Note your connection string from "Connect" > "Connect your application"

## Step 2: Update Environment Variables

Ensure your `.env` file contains the correct MongoDB connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster-url/studyzone?retryWrites=true&w=majority
```

## Step 3: Configure Render

1. Log in to Render Dashboard
2. Click "New Web Service"
3. Connect your GitHub repository
4. Select the branch you want to deploy
5. Render will automatically detect your `render.yaml` file

## Step 4: Set Render Environment Variables

1. In your Render dashboard, go to your web service
2. Click on "Environment" tab
3. Add the following environment variables:
   - Key: `MONGODB_URI`, Value: Your MongoDB connection string
   - Key: `NODE_ENV`, Value: `production`

## Step 5: Deploy

1. Click "Manual Deploy" to trigger deployment
2. Watch the build logs for any errors
3. Once deployed, test the endpoints

## Health Check Endpoint

Render will check the `/health` endpoint to verify your app is running. Make sure this endpoint is implemented in your application.

## Troubleshooting

### Common Issues

1. **MongoDB Connection Errors**
   - Verify your MongoDB Atlas IP whitelist includes Render's IP ranges
   - Check that your credentials in `MONGODB_URI` are correct
   - Ensure your cluster is paused or stopped

2. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Verify `package-lock.json` is committed
   - Ensure Dockerfile is in the correct location

3. **Application Not Starting**
   - Check the application logs in Render dashboard
   - Verify environment variables are correctly set
   - Ensure PORT is configurable (Render sets PORT environment variable)

### Checking Logs

1. Go to your service in Render dashboard
2. Click on "Logs" tab
3. View real-time logs during deployment and runtime

## Local Testing

Before deploying, test your Docker configuration locally:

```bash
# Build the Docker image
docker build -t studyzone-backend ./Fullstack-BE-main

# Run the container
docker run -p 3000:3000 -e MONGODB_URI="your_connection_string" studyzone-backend
```

This will help identify any issues before deployment.