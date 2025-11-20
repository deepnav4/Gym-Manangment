# 🏋️ GYM MANAGEMENT SYSTEM - QUICK REFERENCE

## 🚀 QUICK START (3 COMMANDS)

```bash
npm install                    # Install dependencies
npm run prisma:migrate        # Setup database (name: "init")
npm run prisma:seed           # Seed trainers
npm run dev                   # Start server at http://localhost:3000
```

---

## 📡 API ENDPOINTS QUICK LIST

### 🔓 Public (No Auth)
```
POST /api/auth/signup          # Member signup
POST /api/auth/login           # Member login
POST /api/auth/trainer/login   # Trainer login
```

### 👤 Member Only
```
GET  /api/member/profile       # Get profile
GET  /api/member/my/workout    # Get workout plans
GET  /api/member/my/diet       # Get diet plans
GET  /api/member/my/attendance # Get attendance
GET  /api/member/my/progress   # Get progress
```

### 🏋️ Trainer Only
```
GET  /api/trainer/members                    # Get all members
PUT  /api/trainer/members/:id/workout        # Update workout
PUT  /api/trainer/members/:id/diet           # Update diet
PUT  /api/trainer/members/:id/progress       # Update progress
POST /api/trainer/members/:id/attendance     # Record attendance
```

---

## 🔑 SEEDED CREDENTIALS

```
Trainer 1:
  Email: john.trainer@gym.com
  Password: trainer123
  
Trainer 2:
  Email: sarah.trainer@gym.com
  Password: trainer123
```

---

## 📦 NPM SCRIPTS

```bash
# Development
npm run dev              # Start with hot reload
npm run build            # Build TypeScript
npm start                # Run production build

# Database
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open DB GUI (localhost:5555)
npm run prisma:seed      # Seed trainers

# Deployment
npm run vercel-build     # Build for Vercel
```

---

## 🗂️ PROJECT STRUCTURE

```
backend/
├── prisma/
│   ├── schema.prisma     # DB schema
│   └── seed.ts           # Seed script
├── src/
│   ├── config/
│   │   └── db.ts         # Prisma client
│   ├── middleware/
│   │   ├── auth.ts       # JWT auth
│   │   └── roleGuard.ts  # Role check
│   ├── modules/
│   │   ├── auth/         # Login/Signup
│   │   ├── member/       # Member ops
│   │   └── trainer/      # Trainer ops
│   ├── utils/
│   │   ├── hash.ts       # Password hash
│   │   └── jwt.ts        # JWT tokens
│   ├── app.ts            # Express app
│   └── serverless.ts     # Vercel wrapper
├── .env                  # Environment vars
├── package.json
├── tsconfig.json
└── vercel.json          # Vercel config
```

---

## 🔧 ENVIRONMENT VARIABLES

```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
JWT_ACCESS_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-key"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"
PORT=3000
NODE_ENV="development"
```

---

## 📊 DATABASE TABLES

```
members           # Member info + credentials
trainers          # Trainer info + credentials
workout_plans     # Workout plans (member + trainer)
diet_plans        # Diet plans (member + trainer)
attendances       # Attendance records
progress          # Progress tracking (weight, body fat, muscle mass)
```

---

## 🧪 QUICK TEST (cURL)

```bash
# 1. Trainer Login
curl -X POST http://localhost:3000/api/auth/trainer/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.trainer@gym.com","password":"trainer123"}'

# 2. Member Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"test123","age":25,"gender":"male","phone":"1234567890"}'

# 3. Get Profile (use token from signup)
curl http://localhost:3000/api/member/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🐛 COMMON ISSUES & FIXES

### "Cannot connect to database"
```bash
# Check DATABASE_URL in .env
# Ensure PostgreSQL is running
```

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### "Prisma Client not generated"
```bash
npm run prisma:generate
```

### "Port 3000 in use"
```bash
# Change PORT in .env to 4000 or any free port
```

---

## ☁️ DEPLOY TO VERCEL

```bash
# 1. Setup Neon.tech database (free PostgreSQL)
# 2. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# 3. Import on Vercel.com
# 4. Add env vars in Vercel dashboard
# 5. Run migrations:
DATABASE_URL="neon-url" npx prisma migrate deploy
DATABASE_URL="neon-url" npm run prisma:seed
```

---

## 📱 REQUEST FORMAT

### Headers
```
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Sample Requests

**Member Signup:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 25,
  "gender": "male",
  "phone": "1234567890"
}
```

**Update Workout:**
```json
{
  "plan_details": "Day 1: Chest\n- Bench Press 4x8\n- Incline Press 3x10"
}
```

**Update Progress:**
```json
{
  "weight": 75.5,
  "body_fat": 18.2,
  "muscle_mass": 35.8,
  "notes": "Good progress!"
}
```

**Record Attendance:**
```json
{
  "status": "present"
}
```
Valid: "present", "absent", "leave"

---

## 📚 DETAILED DOCS

- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Step-by-step setup
- **DEPLOYMENT_CHECKLIST.md** - Production deployment
- **API_EXAMPLES.http** - All API examples

---

## 🎯 FEATURES

✅ TypeScript + Express + Prisma  
✅ JWT Auth (Access + Refresh)  
✅ Role-based Access (Member/Trainer)  
✅ Password Hashing (bcrypt)  
✅ Input Validation  
✅ PostgreSQL Database  
✅ Vercel Serverless Ready  
✅ Production-Ready Error Handling  
✅ CORS Enabled  
✅ Database Seeding  

---

## 📞 SUPPORT

- Check error logs: `npm run dev` output
- View database: `npm run prisma:studio`
- Test with Postman/Thunder Client
- Review code comments in files

---

**Built with ❤️ using Node.js, Express, TypeScript, and Prisma**
