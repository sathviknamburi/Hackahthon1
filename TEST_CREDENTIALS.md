# Test Credentials for Civic Issue Reporting System

## Admin Account
- **Email:** admin@civic.com
- **Password:** admin123
- **Role:** ADMIN
- **Access:** View Issues, Manage Issues pages only

## Test User Account
- **Email:** user@test.com
- **Password:** user123
- **Role:** USER
- **Access:** Home, About, Report Issue, My Issues, Gallery, Contact pages

## How to Create Test Accounts

### Option 1: Run the Admin Creation Script
```bash
cd backend
node scripts/createAdmin.js
```

### Option 2: Use Signup Page
1. Go to http://localhost:3000/signup
2. Create a new account (will be USER role by default)
3. Login with your credentials

## Role-Based Access

### USER Role Navigation:
- Home
- About
- Report Issue
- My Issues (View Issues)
- Gallery
- Contact
- Logout

### ADMIN Role Navigation:
- View Issues (All issues from all users)
- Manage Issues (Update issue status)
- Logout

## Authentication Flow

### User Login:
1. Login at /login
2. Redirects to /home
3. Can access all USER pages
4. Cannot access ADMIN pages

### Admin Login:
1. Login at /login (toggle to Admin Login)
2. Redirects to /admin/view-issues
3. Can access only ADMIN pages
4. Cannot access USER pages

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user/admin

### Issues (Protected)
- POST /api/issues/report - Report new issue (USER only)
- GET /api/issues/my-issues - Get logged-in user's issues (USER only)
- GET /api/issues/all - Get all issues (ADMIN only)
- GET /api/issues/all?status=Open - Filter issues by status (ADMIN only)
- PATCH /api/issues/:id/status - Update issue status (ADMIN only)

## Issue Status Values
- Open
- In Progress
- Resolved
- Closed

## Starting the Application

### Backend:
```bash
cd backend
npm install
node server.js
```

### Frontend:
```bash
cd civic-react
npm install
npm start
```

## Database
- MongoDB connection: mongodb://localhost:27017/civic-report
- Collections: users, issues
