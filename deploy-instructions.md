# Deploying StudyZone to Render.com

## Step-by-Step Deployment Instructions

### 1. Sign Up for Render.com
1. Go to https://render.com and create a free account
2. Verify your email address

### 2. Connect Your GitHub Repository
1. In Render Dashboard, click "New Web Service"
2. Select "Build and deploy from a Git repository"
3. Connect your GitHub account if not already connected
4. Find and select "MonsieurChips/Study-Zone" repository

### 3. Configure Your Web Service
1. Set the following configuration:
   - Name: studyzone-backend (or any name you prefer)
   - Runtime: Node
   - Build Command: npm install
   - Start Command: npm start

Note: Render.com will now automatically detect and use our root-level render.yaml configuration file, which properly handles the directory structure.

2. Under "Environment Variables", add:
   - Key: MONGODB_URI
   - Value: YOUR_MONGODB_CONNECTION_STRING_HERE

3. Click "Create Web Service"

### 4. Get Your Render.com URL
1. After deployment completes, you'll see your service URL in the format:
   `https://your-service-name.onrender.com`
2. Copy this URL for updating your frontend

### 5. Update Your Frontend
After deployment, update your frontend JavaScript files to use the Render.com URL:

In `Fullstack-FE-master/assets/js/app.js`:
```javascript
// Change from:
baseUrl: "http://localhost:3000",
serverUrl: "http://localhost:3000/api",

// To (replace with your actual Render.com URL):
baseUrl: "https://your-render-app-name.onrender.com",
serverUrl: "https://your-render-app-name.onrender.com/api",
```

In `Fullstack-FE-master/assets/js/lessons.js`:
```javascript
// Change from:
baseUrl: "http://localhost:3000",
serverUrl: "http://localhost:3000/api",

// To (replace with your actual Render.com URL):
baseUrl: "https://your-render-app-name.onrender.com",
serverUrl: "https://your-render-app-name.onrender.com/api",
```

### 6. Deploy Your Frontend
You can deploy your frontend to any static hosting service like:
- GitHub Pages
- Netlify
- Vercel
- Or continue serving it locally for development

## Notes
- Render.com has a free tier that will work for this application
- The free tier may have some limitations on uptime and performance
- Your MongoDB Atlas database will work with both local and Render deployments
- Remember to never commit sensitive information like database connection strings to version control
- The application now specifies Node.js 20.x in package.json for consistent deployment
