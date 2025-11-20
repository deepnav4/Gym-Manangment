# 🚀 HOW TO RUN THIS PROJECT - STEP BY STEP

Follow these exact steps to run the Gym Management System backend on your machine.

---

## ⚡ FASTEST WAY (4 Commands)

If you just want to get started quickly:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

That's it! Server will run at `http://localhost:3000`

---

## 📋 DETAILED INSTRUCTIONS

### STEP 1: Check Prerequisites

Make sure you have installed:
- ✅ Node.js (v18 or higher) - Download from https://nodejs.org
- ✅ PostgreSQL (local) - Download from https://postgresql.org
  - OR use Neon.tech (cloud, free) - https://neon.tech
- ✅ Git (optional) - Download from https://git-scm.com

**Verify installations:**
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
psql --version    # Should show PostgreSQL version (if using local)
```

---

### STEP 2: Setup Database

#### Option A: Local PostgreSQL

1. **Start PostgreSQL service:**
   - Windows: PostgreSQL should start automatically
   - Mac: `brew services start postgresql`
   - Linux: `sudo service postgresql start`

2. **Create database:**
   ```bash
   # Login to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE gym_management;
   
   # Exit
   \q
   ```

3. **Update .env file:**
   Open `backend/.env` and update the DATABASE_URL:
   ```env
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/gym_management?schema=public"
   ```
   Replace `yourpassword` with your PostgreSQL password.

#### Option B: Neon.tech (Cloud - Easier)

1. Go to https://neon.tech
2. Sign up (free)
3. Create new project: "gym-management"
4. Copy connection string
5. Update `backend/.env`:
   ```env
   DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
   ```

---

### STEP 3: Install Dependencies

Open terminal in `backend` folder:

```bash
cd backend
npm install
```

This will install all required packages (~50MB). Wait for completion.

**Expected output:**
```
added 250 packages, and audited 251 packages in 30s
```

---

### STEP 4: Setup Prisma

Generate Prisma Client:
```bash
npm run prisma:generate
```

**Expected output:**
```
✔ Generated Prisma Client
```

---

### STEP 5: Run Database Migrations

Create all database tables:
```bash
npm run prisma:migrate
```

When prompted for migration name, enter:
```
init
```

**Expected output:**
```
✔ Applying migration `20231219123456_init`
✔ Generated Prisma Client
```

This creates 6 tables:
- members
- trainers
- workout_plans
- diet_plans
- attendances
- progress

---

### STEP 6: Seed Database

Add trainer accounts:
```bash
npm run prisma:seed
```

**Expected output:**
```
🌱 Starting database seeding...
👨‍🏫 Seeding trainers...
   ✅ Created trainer: John Smith (john.trainer@gym.com)
   ✅ Created trainer: Sarah Johnson (sarah.trainer@gym.com)

✅ Database seeding completed successfully!

📋 Seeded Trainer Credentials:
   1. Email: john.trainer@gym.com | Password: trainer123
   2. Email: sarah.trainer@gym.com | Password: trainer123
```

**Save these credentials!** You'll need them to test trainer features.

---

### STEP 7: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
[nodemon] starting `ts-node src/app.ts`
🚀 Server running on port 3000
📍 http://localhost:3000
```

---

### STEP 8: Test the API

#### Method 1: Browser
Open browser and go to:
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

#### Method 2: Postman/Thunder Client
1. Install Thunder Client extension in VS Code (or use Postman)
2. Open `API_EXAMPLES.http` file
3. Click "Send Request" on any endpoint

#### Method 3: cURL
```bash
# Test health endpoint
curl http://localhost:3000/health

# Test member signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "password": "password123",
    "age": 25,
    "gender": "male",
    "phone": "1234567890"
  }'
```

---

### STEP 9: Test Authentication Flow

#### A. Member Signup
```bash
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "name": "Test Member",
  "email": "test@example.com",
  "password": "test123",
  "age": 25,
  "gender": "male",
  "phone": "1234567890"
}
```

**Copy the `accessToken` from response.**

#### B. Get Member Profile
```bash
GET http://localhost:3000/api/member/profile
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

#### C. Trainer Login
```bash
POST http://localhost:3000/api/auth/trainer/login
Content-Type: application/json

{
  "email": "john.trainer@gym.com",
  "password": "trainer123"
}
```

**Copy the trainer's `accessToken`.**

#### D. Get All Members (Trainer)
```bash
GET http://localhost:3000/api/trainer/members
Authorization: Bearer TRAINER_ACCESS_TOKEN_HERE
```

---

### STEP 10: View Database (Optional)

Open Prisma Studio - a visual database browser:
```bash
npm run prisma:studio
```

Opens at: `http://localhost:5555`

You can:
- View all tables
- See all records
- Edit data
- Delete records
- Add new entries

---

## 🎯 WHAT YOU SHOULD SEE

### Terminal (Development Server)
```
🚀 Server running on port 3000
📍 http://localhost:3000
```

### Browser (http://localhost:3000)
```json
{
  "success": true,
  "message": "Gym Management System API is running",
  "version": "1.0.0"
}
```

### Prisma Studio (http://localhost:5555)
- See all 6 tables
- See 2 trainers in `trainers` table
- Empty `members`, `workout_plans`, `diet_plans`, `attendances`, `progress` tables

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot connect to database"
```bash
# Check if PostgreSQL is running
# Windows: Check Services
# Mac: brew services list
# Linux: sudo service postgresql status

# Check DATABASE_URL in .env file
# Verify username, password, host, port
```

### Error: "Port 3000 already in use"
```bash
# Option 1: Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Option 2: Change port in .env
PORT=4000
```

### Error: "Module not found"
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Error: "Prisma Client not generated"
```bash
npm run prisma:generate
```

### Error: "Migration failed"
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset
npm run prisma:seed
```

### Error: "Cannot find module 'typescript'"
```bash
npm install typescript --save-dev
```

---

## 📝 USEFUL COMMANDS

### Development
```bash
npm run dev              # Start dev server with hot reload
npm run build            # Build TypeScript to JavaScript
npm start                # Start production build
```

### Database
```bash
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open visual database browser
npm run prisma:seed      # Seed trainers
npx prisma migrate reset # Reset database (deletes data)
```

### Troubleshooting
```bash
npm install              # Install dependencies
npm run build            # Check for TypeScript errors
npx prisma validate      # Validate schema
```

---

## 🔄 RESTART FROM SCRATCH

If something goes wrong, start over:

```bash
# 1. Stop server (Ctrl+C in terminal)

# 2. Delete generated files
rm -rf node_modules
rm -rf dist

# 3. Delete database data (optional)
npx prisma migrate reset

# 4. Reinstall everything
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# 5. Start server
npm run dev
```

---

## ✅ SUCCESS CHECKLIST

You know everything is working when:
- [ ] Server starts without errors
- [ ] `http://localhost:3000` returns JSON
- [ ] `/health` endpoint returns "healthy"
- [ ] Member signup works
- [ ] Member login returns tokens
- [ ] Trainer login works
- [ ] Protected routes require authentication
- [ ] Prisma Studio shows all tables
- [ ] 2 trainers visible in database

---

## 📚 NEXT STEPS

Once server is running successfully:

1. **Test All Endpoints**
   - Open `API_EXAMPLES.http`
   - Test all 13 endpoints
   - Verify responses

2. **Explore Database**
   - Run `npm run prisma:studio`
   - View table structures
   - See relationships

3. **Read Documentation**
   - `README.md` - Full docs
   - `SETUP_GUIDE.md` - Detailed setup
   - `QUICK_REFERENCE.md` - Quick commands

4. **Deploy (Optional)**
   - Follow `DEPLOYMENT_CHECKLIST.md`
   - Deploy to Vercel
   - Use Neon.tech database

---

## 🎉 YOU'RE READY!

Server is running at: `http://localhost:3000`

**Default Credentials:**
```
Trainer 1: john.trainer@gym.com / trainer123
Trainer 2: sarah.trainer@gym.com / trainer123
```

**Test with:**
- Browser: http://localhost:3000
- Postman/Thunder Client
- cURL commands
- API_EXAMPLES.http file

---

## 💡 TIPS

- Keep terminal open to see logs
- Use Prisma Studio to debug database
- Check `.env` if connection fails
- Thunder Client extension for VS Code makes testing easy
- Tokens expire after 15 minutes (configurable)
- Server auto-restarts on file changes

---

**Need Help?**
1. Check error message in terminal
2. Read SETUP_GUIDE.md
3. Check troubleshooting section above
4. Review code comments in files

**Happy Coding! 🏋️‍♂️**
