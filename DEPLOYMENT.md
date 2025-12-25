# Civic Issue Reporting System - Deployment Guide

## Frontend Deployment (Netlify)

### Step 1: Prepare the Project
1. Ensure all changes are committed to GitHub
2. The project is configured for Netlify deployment

### Step 2: Deploy to Netlify
1. Go to [Netlify](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Choose GitHub and select your repository: `Hackahthon1`
5. Configure build settings:
   - **Base directory:** `civic-react`
   - **Build command:** `npm run build`
   - **Publish directory:** `civic-react/build`

### Step 3: Environment Variables
Add these environment variables in Netlify:
- `REACT_APP_API_URL` = `https://your-backend-url.herokuapp.com/api`

## Backend Deployment (Heroku/Railway)

### Option 1: Heroku
1. Install Heroku CLI
2. Create Heroku app: `heroku create your-app-name`
3. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-connection-string
   heroku config:set JWT_SECRET=your-jwt-secret
   ```
4. Deploy: `git subtree push --prefix backend heroku main`

### Option 2: Railway
1. Go to [Railway](https://railway.app)
2. Connect GitHub repository
3. Select the `backend` folder
4. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT` (Railway sets this automatically)

## Database Setup (MongoDB Atlas)
1. Create account at [MongoDB Atlas](https://mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Add to backend environment variables

## Post-Deployment Steps
1. Update frontend API URL to point to deployed backend
2. Test all functionality:
   - User registration/login
   - Issue reporting with GPS and photos
   - Admin panel
   - Role-based access

## Live URLs
- **Frontend:** https://your-app.netlify.app
- **Backend:** https://your-backend.herokuapp.com
- **Admin Credentials:** admin@civic.com / admin123
- **Test User:** user@test.com / user123

## Features Deployed
✅ Role-based authentication (User/Admin)
✅ Issue reporting with GPS location
✅ Photo upload functionality
✅ Community issue visibility
✅ Admin issue management
✅ Real-time status updates
✅ Responsive design