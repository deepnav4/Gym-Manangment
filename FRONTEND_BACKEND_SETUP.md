# GymFlow - Frontend-Backend Integration Setup

## 🚀 Complete Setup Guide

This guide explains how to set up and run the complete GymFlow application with frontend-backend integration.

---

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

---

## 🔧 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/gymflow_db"

# JWT Secret (change this to a random secret)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Port
PORT=5000
```

### 4. Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Run Database Migrations
npx prisma migrate dev --name init

# (Optional) Seed Database with Sample Data
npm run seed
```

### 5. Start Backend Server
```bash
npm run dev
```

The backend should now be running on `http://localhost:5000`

---

## 💻 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Start Frontend Development Server
```bash
npm run dev
```

The frontend should now be running on `http://localhost:5173` or `http://localhost:5174`

---

## 🔑 API Endpoints

### Authentication
- **POST** `/api/auth/signup` - Member signup
- **POST** `/api/auth/login` - Member login  
- **POST** `/api/auth/trainer/login` - Trainer login

### Member Routes (Requires Auth)
- **GET** `/api/member/profile` - Get member profile
- **GET** `/api/member/my/workout` - Get workout plans
- **GET** `/api/member/my/diet` - Get diet plans
- **GET** `/api/member/my/attendance` - Get attendance records
- **GET** `/api/member/my/progress` - Get progress records

### Trainer Routes (Requires Auth)
- **GET** `/api/trainer/members` - Get all members
- **PUT** `/api/trainer/members/:id/workout` - Update member workout
- **PUT** `/api/trainer/members/:id/diet` - Update member diet
- **PUT** `/api/trainer/members/:id/progress` - Update member progress
- **POST** `/api/trainer/members/:id/attendance` - Record attendance

---

## 🧪 Testing the Application

### 1. Create a Member Account
1. Navigate to `http://localhost:5173/signup`
2. Fill in the signup form
3. Submit to create account

### 2. Login as Member
1. Navigate to `http://localhost:5173/login`
2. Select "Member" tab
3. Enter credentials
4. You'll be redirected to Member Dashboard

### 3. Login as Trainer
1. Navigate to `http://localhost:5173/login`
2. Select "Trainer" tab
3. Enter trainer credentials
4. You'll be redirected to Trainer Dashboard

---

## 📁 Project Structure

```
GymManagement/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── roleGuard.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── member/
│   │   │   └── trainer/
│   │   └── utils/
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.tsx
    │   │   ├── ProtectedRoute.tsx
    │   │   └── GymFlowLogo.tsx
    │   ├── config/
    │   │   └── api.ts
    │   ├── context/
    │   │   └── AuthContext.tsx
    │   ├── pages/
    │   │   ├── LandingPage.tsx
    │   │   ├── LoginPage.tsx
    │   │   ├── SignupPage.tsx
    │   │   ├── MemberDashboard.tsx
    │   │   ├── TrainerDashboard.tsx
    │   │   └── UnauthorizedPage.tsx
    │   ├── services/
    │   │   ├── authService.ts
    │   │   ├── memberService.ts
    │   │   └── trainerService.ts
    │   └── App.tsx
    └── package.json
```

---

## 🔐 Authentication Flow

1. **User Signs Up/Logs In**
   - Credentials sent to backend
   - Backend validates and generates JWT token
   - Token stored in localStorage

2. **Protected Routes**
   - Token automatically added to all API requests
   - AuthContext manages authentication state
   - ProtectedRoute component guards dashboard routes

3. **Role-Based Access**
   - Member can only access `/dashboard/member`
   - Trainer can only access `/dashboard/trainer`
   - Unauthorized access redirects to `/unauthorized`

---

## 🛠️ Technologies Used

### Backend
- Express.js - Web framework
- Prisma - Database ORM
- PostgreSQL - Database
- JWT - Authentication
- bcrypt - Password hashing

### Frontend
- React 19 - UI framework
- TypeScript - Type safety
- Vite - Build tool
- Tailwind CSS 4 - Styling
- Axios - HTTP client
- React Router - Routing
- Framer Motion - Animations
- Recharts - Data visualization

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### Database Connection Error
- Check PostgreSQL is running
- Verify DATABASE_URL in `.env`
- Ensure database exists

### CORS Error
- Ensure backend is running
- Check VITE_API_BASE_URL in frontend `.env`
- Backend should allow frontend origin

### 401 Unauthorized
- Clear localStorage
- Re-login with valid credentials
- Check token expiration

---

## 📝 Environment Variables Summary

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/gymflow_db"
JWT_SECRET="your-secret-key"
PORT=5000
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 Production Deployment

### Backend
1. Set production DATABASE_URL
2. Set strong JWT_SECRET
3. Enable CORS for production domain
4. Run `npm run build`
5. Deploy to Vercel/Railway/Render

### Frontend
1. Update VITE_API_BASE_URL to production API
2. Run `npm run build`
3. Deploy `dist` folder to Vercel/Netlify

---

## 📞 Support

For issues or questions, please create an issue in the repository.

---

## ✅ Setup Checklist

- [ ] PostgreSQL installed and running
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Database migrated
- [ ] Backend server running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend .env configured
- [ ] Frontend server running
- [ ] Can access landing page
- [ ] Can signup as member
- [ ] Can login as member
- [ ] Can login as trainer
- [ ] Protected routes working
- [ ] API calls successful

---

**Made with ❤️ by GymFlow Team**
