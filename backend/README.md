# 🏋️ Gym Management System - Backend

A complete, production-ready backend API for gym management with member and trainer roles.

## 📋 Features

- **Member Features:**
  - Signup & Login with JWT authentication
  - View personal profile
  - Access workout plans
  - Access diet plans
  - View attendance history
  - Track progress metrics

- **Trainer Features:**
  - Login (pre-seeded accounts)
  - View all members
  - Create/update workout plans
  - Create/update diet plans
  - Record member attendance
  - Track member progress (weight, body fat, muscle mass)

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (Access + Refresh tokens)
- **Password Hashing:** bcryptjs
- **Deployment:** Vercel Serverless Functions

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Database seeding
├── src/
│   ├── config/
│   │   └── db.ts          # Prisma client configuration
│   ├── middleware/
│   │   ├── auth.ts        # JWT authentication middleware
│   │   └── roleGuard.ts   # Role-based access control
│   ├── modules/
│   │   ├── auth/          # Authentication (signup, login)
│   │   ├── member/        # Member operations
│   │   └── trainer/       # Trainer operations
│   ├── utils/
│   │   ├── hash.ts        # Password hashing utilities
│   │   └── jwt.ts         # JWT token utilities
│   ├── app.ts             # Express app setup
│   └── serverless.ts      # Vercel serverless wrapper
├── .env                   # Environment variables
├── package.json
├── tsconfig.json
└── vercel.json            # Vercel deployment config
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/gym_management?schema=public"
   
   JWT_ACCESS_SECRET="your-super-secret-access-token-key"
   JWT_REFRESH_SECRET="your-super-secret-refresh-token-key"
   JWT_ACCESS_EXPIRY="15m"
   JWT_REFRESH_EXPIRY="7d"
   
   PORT=3000
   NODE_ENV="development"
   ```

4. **Setup database:**
   ```bash
   # Generate Prisma Client
   npm run prisma:generate
   
   # Run database migrations
   npm run prisma:migrate
   
   # Seed trainers
   npm run prisma:seed
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

   Server will run at: `http://localhost:3000`

## 📊 Database Schema

### Tables

- **members** - Member information and credentials
- **trainers** - Trainer information and credentials
- **workout_plans** - Workout plans assigned to members
- **diet_plans** - Diet plans assigned to members
- **attendances** - Member attendance records
- **progress** - Member progress tracking (weight, body fat, muscle mass)

## 🔐 Seeded Trainer Accounts

After running `npm run prisma:seed`, use these credentials:

| Email | Password | Specialization |
|-------|----------|----------------|
| john.trainer@gym.com | trainer123 | Strength Training & Bodybuilding |
| sarah.trainer@gym.com | trainer123 | Cardio & Weight Loss |

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/signup` | Member signup | Public |
| POST | `/api/auth/login` | Member login | Public |
| POST | `/api/auth/trainer/login` | Trainer login | Public |

### Member Routes (Requires Member Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/member/profile` | Get member profile |
| GET | `/api/member/my/workout` | Get workout plans |
| GET | `/api/member/my/diet` | Get diet plans |
| GET | `/api/member/my/attendance` | Get attendance history |
| GET | `/api/member/my/progress` | Get progress records |

### Trainer Routes (Requires Trainer Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trainer/members` | Get all members |
| PUT | `/api/trainer/members/:id/workout` | Update member workout plan |
| PUT | `/api/trainer/members/:id/diet` | Update member diet plan |
| PUT | `/api/trainer/members/:id/progress` | Update member progress |
| POST | `/api/trainer/members/:id/attendance` | Record member attendance |

## 🧪 API Examples

### 1. Member Signup

```bash
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

### 2. Member Login

```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Get Member Profile

```bash
GET http://localhost:3000/api/member/profile
Authorization: Bearer <access_token>
```

### 4. Trainer Login

```bash
POST http://localhost:3000/api/auth/trainer/login
Content-Type: application/json

{
  "email": "john.trainer@gym.com",
  "password": "trainer123"
}
```

### 5. Update Member Workout Plan (Trainer)

```bash
PUT http://localhost:3000/api/trainer/members/:member_id/workout
Authorization: Bearer <trainer_access_token>
Content-Type: application/json

{
  "plan_details": "Day 1: Chest & Triceps\n- Bench Press 4x8\n- Incline Dumbbell Press 3x10\n- Cable Flyes 3x12\n- Tricep Dips 3x10"
}
```

## 🚀 Deployment to Vercel

### 1. Setup PostgreSQL Database (Neon.tech)

1. Go to [Neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string

### 2. Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Set environment variables in Vercel Dashboard:
   - `DATABASE_URL` - Your Neon.tech PostgreSQL connection string
   - `JWT_ACCESS_SECRET` - Your JWT access secret
   - `JWT_REFRESH_SECRET` - Your JWT refresh secret
   - `JWT_ACCESS_EXPIRY` - "15m"
   - `JWT_REFRESH_EXPIRY` - "7d"
   - `NODE_ENV` - "production"

5. Run migrations on production database:
   ```bash
   # Set production DATABASE_URL temporarily
   DATABASE_URL="your-neon-connection-string" npx prisma migrate deploy
   DATABASE_URL="your-neon-connection-string" npx prisma db seed
   ```

### 3. Production URL

After deployment, your API will be available at:
```
https://your-project.vercel.app
```

## 🔒 Authentication Flow

1. **Login/Signup** - User receives `accessToken` and `refreshToken`
2. **API Requests** - Include `Authorization: Bearer <accessToken>` header
3. **Token Expiry** - Access token expires in 15 minutes
4. **Refresh Token** - Use refresh token to get new access token (valid for 7 days)

## 🛡️ Security Features

- Passwords hashed using bcryptjs (10 salt rounds)
- JWT tokens for stateless authentication
- Role-based access control (Member vs Trainer)
- Input validation using express-validator
- SQL injection protection via Prisma ORM
- CORS enabled for cross-origin requests

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (GUI for database)
- `npm run prisma:seed` - Seed database with trainers

## 🐛 Troubleshooting

### Database Connection Issues

1. Verify `DATABASE_URL` in `.env` file
2. Ensure PostgreSQL is running
3. Check database credentials

### Prisma Issues

```bash
# Reset Prisma Client
rm -rf node_modules/.prisma
npm run prisma:generate
```

### Port Already in Use

```bash
# Change PORT in .env file
PORT=4000
```

## 📚 Learn More

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [JWT.io](https://jwt.io/)
- [Vercel Documentation](https://vercel.com/docs)
- [Neon.tech Documentation](https://neon.tech/docs)

## 📄 License

ISC

## 👨‍💻 Author

Your Name

---

**Built with ❤️ using Node.js, Express, TypeScript, and Prisma**
