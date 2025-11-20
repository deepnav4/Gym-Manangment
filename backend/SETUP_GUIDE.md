# 🏋️ GYM MANAGEMENT SYSTEM - COMPLETE SETUP GUIDE

This guide walks you through setting up and running the complete Gym Management System backend.

---

## 📦 STEP 1: INSTALL DEPENDENCIES

Open your terminal in the `backend` folder and run:

```bash
npm install
```

This installs all required packages:
- Express.js (web framework)
- TypeScript (type safety)
- Prisma (database ORM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cors (cross-origin requests)
- express-validator (input validation)

---

## 🗄️ STEP 2: SETUP POSTGRESQL DATABASE

### Option A: Local PostgreSQL

1. **Install PostgreSQL** on your machine
2. **Create database:**
   ```sql
   CREATE DATABASE gym_management;
   ```
3. **Update `.env` file:**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/gym_management?schema=public"
   ```
   Replace `username` and `password` with your PostgreSQL credentials.

### Option B: Neon.tech (Cloud PostgreSQL - Free)

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up for free account
3. Create a new project named "gym-management"
4. Copy the connection string
5. Update `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/gym_management?sslmode=require"
   ```

---

## 🔧 STEP 3: SETUP ENVIRONMENT VARIABLES

Your `.env` file should look like this:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/gym_management?schema=public"

# JWT Secrets (change these in production!)
JWT_ACCESS_SECRET="gym-management-super-secret-access-key-2024"
JWT_REFRESH_SECRET="gym-management-super-secret-refresh-key-2024"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"

# Server
PORT=3000
NODE_ENV="development"
```

**⚠️ IMPORTANT:** Change JWT secrets to random strings in production!

---

## 🗃️ STEP 4: SETUP DATABASE SCHEMA

Run these commands in order:

```bash
# Generate Prisma Client
npm run prisma:generate

# Create database tables (run migrations)
npm run prisma:migrate

# When prompted for migration name, enter:
# "initial_setup"
```

This creates all tables:
- members
- trainers
- workout_plans
- diet_plans
- attendances
- progress

---

## 🌱 STEP 5: SEED DATABASE WITH TRAINERS

```bash
npm run prisma:seed
```

This creates 2 trainer accounts:

| Email | Password | Specialization |
|-------|----------|----------------|
| john.trainer@gym.com | trainer123 | Strength Training & Bodybuilding |
| sarah.trainer@gym.com | trainer123 | Cardio & Weight Loss |

---

## 🚀 STEP 6: START DEVELOPMENT SERVER

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 3000
📍 http://localhost:3000
```

Open your browser and go to:
```
http://localhost:3000
```

You should see:
```json
{
  "success": true,
  "message": "Gym Management System API is running",
  "version": "1.0.0",
  "timestamp": "2024-..."
}
```

---

## 🧪 STEP 7: TEST THE API

### Using Postman, Thunder Client, or cURL

### 1️⃣ **Member Signup**

```http
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 25,
  "gender": "male",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Member registered successfully",
  "data": {
    "member": { ... },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Copy the `accessToken`** for next requests.

---

### 2️⃣ **Member Login**

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### 3️⃣ **Get Member Profile** (Protected Route)

```http
GET http://localhost:3000/api/member/profile
Authorization: Bearer <your_access_token_here>
```

---

### 4️⃣ **Trainer Login**

```http
POST http://localhost:3000/api/auth/trainer/login
Content-Type: application/json

{
  "email": "john.trainer@gym.com",
  "password": "trainer123"
}
```

**Copy the trainer's `accessToken`**.

---

### 5️⃣ **Get All Members** (Trainer Only)

```http
GET http://localhost:3000/api/trainer/members
Authorization: Bearer <trainer_access_token>
```

---

### 6️⃣ **Update Member Workout Plan** (Trainer Only)

```http
PUT http://localhost:3000/api/trainer/members/<member_id>/workout
Authorization: Bearer <trainer_access_token>
Content-Type: application/json

{
  "plan_details": "Day 1: Chest & Triceps\n- Bench Press 4x8\n- Incline Press 3x10\n\nDay 2: Back & Biceps\n- Deadlift 4x6\n- Pull-ups 3x10"
}
```

---

### 7️⃣ **Update Member Diet Plan** (Trainer Only)

```http
PUT http://localhost:3000/api/trainer/members/<member_id>/diet
Authorization: Bearer <trainer_access_token>
Content-Type: application/json

{
  "diet_details": "Breakfast: Oats + Eggs\nLunch: Chicken + Rice + Vegetables\nDinner: Fish + Sweet Potato"
}
```

---

### 8️⃣ **Record Member Attendance** (Trainer Only)

```http
POST http://localhost:3000/api/trainer/members/<member_id>/attendance
Authorization: Bearer <trainer_access_token>
Content-Type: application/json

{
  "status": "present"
}
```

Valid status values: `"present"`, `"absent"`, `"leave"`

---

### 9️⃣ **Update Member Progress** (Trainer Only)

```http
PUT http://localhost:3000/api/trainer/members/<member_id>/progress
Authorization: Bearer <trainer_access_token>
Content-Type: application/json

{
  "weight": 75.5,
  "body_fat": 18.2,
  "muscle_mass": 35.8,
  "notes": "Great progress this week! Keep it up."
}
```

---

### 🔟 **Get Member's Workout Plans** (Member)

```http
GET http://localhost:3000/api/member/my/workout
Authorization: Bearer <member_access_token>
```

---

### 1️⃣1️⃣ **Get Member's Diet Plans** (Member)

```http
GET http://localhost:3000/api/member/my/diet
Authorization: Bearer <member_access_token>
```

---

### 1️⃣2️⃣ **Get Member's Attendance** (Member)

```http
GET http://localhost:3000/api/member/my/attendance
Authorization: Bearer <member_access_token>
```

---

### 1️⃣3️⃣ **Get Member's Progress** (Member)

```http
GET http://localhost:3000/api/member/my/progress
Authorization: Bearer <member_access_token>
```

---

## 🎨 STEP 8: VIEW DATABASE (OPTIONAL)

Open Prisma Studio to view your database visually:

```bash
npm run prisma:studio
```

Opens at: `http://localhost:5555`

You can:
- View all tables
- Edit data
- Add records manually
- Delete records

---

## ☁️ STEP 9: DEPLOY TO VERCEL

### Prerequisites
- GitHub account
- Vercel account (free)
- Neon.tech PostgreSQL database

### Deployment Steps

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Gym Management System"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Setup Neon.tech Database:**
   - Go to [https://neon.tech](https://neon.tech)
   - Create project
   - Copy connection string

3. **Deploy to Vercel:**
   - Go to [https://vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project:
     - Framework Preset: Other
     - Root Directory: `backend`
     - Build Command: `npm run vercel-build`
     - Output Directory: Leave empty

4. **Add Environment Variables in Vercel:**
   
   Go to Settings > Environment Variables:
   
   ```
   DATABASE_URL = <your-neon-connection-string>
   JWT_ACCESS_SECRET = <random-secret-string>
   JWT_REFRESH_SECRET = <random-secret-string>
   JWT_ACCESS_EXPIRY = 15m
   JWT_REFRESH_EXPIRY = 7d
   NODE_ENV = production
   ```

5. **Run Migrations on Production:**
   ```bash
   DATABASE_URL="<neon-connection-string>" npx prisma migrate deploy
   DATABASE_URL="<neon-connection-string>" npx prisma db seed
   ```

6. **Deploy:**
   - Vercel will auto-deploy
   - Your API URL: `https://your-project.vercel.app`

---

## 📋 COMPLETE API ENDPOINTS REFERENCE

### Authentication (Public)
- `POST /api/auth/signup` - Member signup
- `POST /api/auth/login` - Member login
- `POST /api/auth/trainer/login` - Trainer login

### Member Routes (Requires Member Token)
- `GET /api/member/profile` - Get profile
- `GET /api/member/my/workout` - Get workout plans
- `GET /api/member/my/diet` - Get diet plans
- `GET /api/member/my/attendance` - Get attendance
- `GET /api/member/my/progress` - Get progress

### Trainer Routes (Requires Trainer Token)
- `GET /api/trainer/members` - Get all members
- `PUT /api/trainer/members/:id/workout` - Update workout plan
- `PUT /api/trainer/members/:id/diet` - Update diet plan
- `PUT /api/trainer/members/:id/progress` - Update progress
- `POST /api/trainer/members/:id/attendance` - Record attendance

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot connect to database"
- Check `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Verify database credentials

### Error: "Module not found"
```bash
rm -rf node_modules
npm install
```

### Error: "Prisma Client not generated"
```bash
npm run prisma:generate
```

### Port 3000 already in use
Change `PORT` in `.env`:
```env
PORT=4000
```

### Migration errors
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset
npm run prisma:seed
```

---

## 🎯 PROJECT FEATURES SUMMARY

✅ Complete TypeScript implementation  
✅ Clean MVC + Services architecture  
✅ JWT authentication (Access + Refresh tokens)  
✅ Role-based access control (Member/Trainer)  
✅ Password hashing with bcrypt  
✅ Input validation with express-validator  
✅ PostgreSQL with Prisma ORM  
✅ Database seeding script  
✅ Vercel serverless deployment ready  
✅ Production-ready error handling  
✅ CORS enabled  
✅ Comprehensive API documentation  

---

## 📚 USEFUL COMMANDS

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm start                      # Start production server

# Prisma
npm run prisma:generate        # Generate Prisma Client
npm run prisma:migrate         # Run migrations
npm run prisma:studio          # Open Prisma Studio
npm run prisma:seed            # Seed database

# Deployment
npm run vercel-build           # Build for Vercel
```

---

## 🎉 SUCCESS!

Your Gym Management System backend is now fully functional!

**Next Steps:**
1. Test all API endpoints
2. Build a frontend (React, Vue, or Angular)
3. Deploy to Vercel
4. Add more features (payments, notifications, etc.)

---

**Need Help?**
- Check the README.md for detailed documentation
- Review the code comments in each file
- Test with Postman/Thunder Client
- Check Prisma Studio for database state

**Built with ❤️ using Node.js, Express, TypeScript, and Prisma**
