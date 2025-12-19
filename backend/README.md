# Civic App Backend

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/civic-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

4. Start MongoDB service (if using local MongoDB)

5. Run the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user/admin

### Issues
- `GET /api/issues` - Get all issues
- `POST /api/issues` - Create new issue (with file upload)
- `GET /api/issues/my-issues` - Get current user's issues
- `PATCH /api/issues/:id/status` - Update issue status (admin only)
- `DELETE /api/issues/:id` - Delete issue (admin only)

## Features
- JWT Authentication
- Role-based access control (User/Admin)
- File upload support for issue images
- MongoDB integration
- Password hashing with bcrypt
- CORS enabled for frontend integration