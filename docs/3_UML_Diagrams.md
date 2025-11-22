# UML Diagrams
## Gym Management System

---

## 1. USE CASE DIAGRAM

```
                    GYM MANAGEMENT SYSTEM - USE CASES

                         ┌────────────────┐
                         │                │
                         │    MEMBER      │
                         │                │
                         └───────┬────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
          │                      │                      │
    ┌─────▼────┐           ┌────▼────┐          ┌──────▼──────┐
    │ Register │           │  Login  │          │View Profile │
    └──────────┘           └─────────┘          └─────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
    ┌─────▼──────┐        ┌──────▼──────┐       ┌──────▼──────┐
    │View Workout│        │View Diet    │       │View         │
    │Plans       │        │Plans        │       │Attendance   │
    └────────────┘        └─────────────┘       └─────────────┘
                                 │
                          ┌──────▼──────┐
                          │View Progress│
                          └─────────────┘


                         ┌────────────────┐
                         │                │
                         │    TRAINER     │
                         │                │
                         └───────┬────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
    ┌─────▼────┐           ┌────▼────┐          ┌──────▼──────┐
    │  Login   │           │View All │          │Assign       │
    └──────────┘           │Members  │          │Workout Plan │
                           └─────────┘          └─────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
    ┌─────▼──────┐        ┌──────▼──────┐       ┌──────▼──────┐
    │Assign Diet │        │Record       │       │Update       │
    │Plan        │        │Attendance   │       │Progress     │
    └────────────┘        └─────────────┘       └─────────────┘
```

---

## 2. CLASS DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        GYM MANAGEMENT SYSTEM - CLASSES                   │
└─────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────┐                   ┌─────────────────────────┐
│       Member            │                   │       Trainer           │
├─────────────────────────┤                   ├─────────────────────────┤
│ - member_id: string     │                   │ - trainer_id: string    │
│ - name: string          │                   │ - name: string          │
│ - email: string         │                   │ - email: string         │
│ - password: string      │                   │ - password: string      │
│ - age: number           │                   │ - specialization: string│
│ - gender: string        │                   └───────────┬─────────────┘
│ - phone: string         │                               │
│ - join_date: Date       │                               │ creates
│ - status: string        │                               │
└───────────┬─────────────┘                               │
            │                                             │
            │ has                                         │
            │                    ┌────────────────────────┤
            │                    │                        │
            │              ┌─────▼──────────┐    ┌───────▼─────────┐
            │              │ WorkoutPlan    │    │   DietPlan      │
            │              ├────────────────┤    ├─────────────────┤
            │              │- plan_id: str  │    │- diet_id: str   │
            ├──────────────┤- member_id: str│    │- member_id: str │
            │              │- trainer_id:str│    │- trainer_id: str│
            │              │- plan_details  │    │- diet_details   │
            │              │- created_at    │    │- created_at     │
            │              └────────────────┘    └─────────────────┘
            │
            │
            │              ┌─────────────────┐    ┌─────────────────┐
            │              │  Attendance     │    │    Progress     │
            │              ├─────────────────┤    ├─────────────────┤
            │              │- attendance_id  │    │- progress_id    │
            ├──────────────┤- member_id: str │    │- member_id: str │
            │              │- date: Date     │    │- trainer_id: str│
            └──────────────┤- status: string │    │- weight: float  │
                           └─────────────────┘    │- body_fat: float│
                                                  │- muscle_mass    │
                                                  │- notes: string  │
                                                  │- updated_at     │
                                                  └─────────────────┘
```

### Detailed Class Specifications

#### Class: Member
```typescript
class Member {
    // Properties
    - member_id: string         // Primary key (UUID)
    - name: string              // Member's full name
    - email: string             // Unique email address
    - password: string          // Hashed password
    - age: number               // Member's age
    - gender: string            // Gender
    - phone: string             // Contact number
    - join_date: Date           // Registration date
    - status: string            // Active/Inactive status

    // Methods
    + register(data: MemberDTO): Promise<Member>
    + login(email: string, password: string): Promise<AuthTokens>
    + getProfile(): Promise<MemberProfile>
    + getWorkoutPlans(): Promise<WorkoutPlan[]>
    + getDietPlans(): Promise<DietPlan[]>
    + getAttendance(): Promise<Attendance[]>
    + getProgress(): Promise<Progress[]>
}
```

#### Class: Trainer
```typescript
class Trainer {
    // Properties
    - trainer_id: string        // Primary key (UUID)
    - name: string              // Trainer's full name
    - email: string             // Unique email address
    - password: string          // Hashed password
    - specialization: string    // Area of expertise

    // Methods
    + login(email: string, password: string): Promise<AuthTokens>
    + getAllMembers(): Promise<Member[]>
    + assignWorkoutPlan(memberId: string, details: string): Promise<WorkoutPlan>
    + assignDietPlan(memberId: string, details: string): Promise<DietPlan>
    + recordAttendance(memberId: string, status: string): Promise<Attendance>
    + updateProgress(memberId: string, data: ProgressDTO): Promise<Progress>
}
```

#### Class: WorkoutPlan
```typescript
class WorkoutPlan {
    // Properties
    - plan_id: string           // Primary key (UUID)
    - member_id: string         // Foreign key to Member
    - trainer_id: string        // Foreign key to Trainer
    - plan_details: string      // Workout plan description
    - created_at: Date          // Creation timestamp

    // Methods
    + create(data: WorkoutPlanDTO): Promise<WorkoutPlan>
    + getByMemberId(memberId: string): Promise<WorkoutPlan[]>
    + update(planId: string, details: string): Promise<WorkoutPlan>
}
```

#### Class: DietPlan
```typescript
class DietPlan {
    // Properties
    - diet_id: string           // Primary key (UUID)
    - member_id: string         // Foreign key to Member
    - trainer_id: string        // Foreign key to Trainer
    - diet_details: string      // Diet plan description
    - created_at: Date          // Creation timestamp

    // Methods
    + create(data: DietPlanDTO): Promise<DietPlan>
    + getByMemberId(memberId: string): Promise<DietPlan[]>
    + update(dietId: string, details: string): Promise<DietPlan>
}
```

#### Class: Attendance
```typescript
class Attendance {
    // Properties
    - attendance_id: string     // Primary key (UUID)
    - member_id: string         // Foreign key to Member
    - date: Date                // Attendance date
    - status: string            // Present/Absent

    // Methods
    + record(data: AttendanceDTO): Promise<Attendance>
    + getByMemberId(memberId: string): Promise<Attendance[]>
}
```

#### Class: Progress
```typescript
class Progress {
    // Properties
    - progress_id: string       // Primary key (UUID)
    - member_id: string         // Foreign key to Member
    - trainer_id: string        // Foreign key to Trainer
    - weight: number            // Weight in kg
    - body_fat: number          // Body fat percentage
    - muscle_mass: number       // Muscle mass in kg
    - notes: string             // Optional notes
    - updated_at: Date          // Update timestamp

    // Methods
    + create(data: ProgressDTO): Promise<Progress>
    + getByMemberId(memberId: string): Promise<Progress[]>
    + update(progressId: string, data: ProgressDTO): Promise<Progress>
}
```

---

## 3. SEQUENCE DIAGRAMS

### 3.1 Member Registration Sequence
```
Member          Frontend        AuthController    AuthService    Database
  │                │                  │               │              │
  │──Fill Form────>│                  │               │              │
  │                │                  │               │              │
  │                │──POST /signup───>│               │              │
  │                │                  │               │              │
  │                │                  │──register()──>│              │
  │                │                  │               │              │
  │                │                  │               │──hashPass──> │
  │                │                  │               │              │
  │                │                  │               │──create──────>│
  │                │                  │               │              │
  │                │                  │               │<──member─────│
  │                │                  │               │              │
  │                │                  │               │──genToken──> │
  │                │                  │               │              │
  │                │                  │<──tokens──────│              │
  │                │                  │               │              │
  │                │<──201 Created────│               │              │
  │                │   {tokens}       │               │              │
  │                │                  │               │              │
  │<──Success──────│                  │               │              │
```

### 3.2 Member Login Sequence
```
Member          Frontend        AuthController    AuthService    Database
  │                │                  │               │              │
  │──Enter Creds──>│                  │               │              │
  │                │                  │               │              │
  │                │──POST /login────>│               │              │
  │                │                  │               │              │
  │                │                  │──login()─────>│              │
  │                │                  │               │              │
  │                │                  │               │──findMember─>│
  │                │                  │               │              │
  │                │                  │               │<──member─────│
  │                │                  │               │              │
  │                │                  │               │──verifyPass─>│
  │                │                  │               │              │
  │                │                  │               │──genTokens──>│
  │                │                  │               │              │
  │                │                  │<──tokens──────│              │
  │                │                  │               │              │
  │                │<──200 OK─────────│               │              │
  │                │   {tokens}       │               │              │
  │                │                  │               │              │
  │<──Success──────│                  │               │              │
```

### 3.3 Trainer Assigns Workout Plan Sequence
```
Trainer        Frontend      TrainerController  TrainerService  Database
  │               │                  │               │              │
  │──Select Plan─>│                  │               │              │
  │               │                  │               │              │
  │               │──PUT /workout───>│               │              │
  │               │   + JWT Token    │               │              │
  │               │                  │               │              │
  │               │              [Auth Middleware]   │              │
  │               │                  │               │              │
  │               │                  │──verifyToken─>│              │
  │               │                  │               │              │
  │               │              [Role Guard]        │              │
  │               │                  │               │              │
  │               │                  │──checkRole───>│              │
  │               │                  │               │              │
  │               │                  │──assignPlan─>│              │
  │               │                  │               │              │
  │               │                  │               │──create────>│
  │               │                  │               │              │
  │               │                  │               │<──plan──────│
  │               │                  │               │              │
  │               │                  │<──workoutPlan─│              │
  │               │                  │               │              │
  │               │<──200 OK─────────│               │              │
  │               │   {plan}         │               │              │
  │               │                  │               │              │
  │<──Success─────│                  │               │              │
```

### 3.4 Member Views Progress Sequence
```
Member         Frontend      MemberController   MemberService   Database
  │               │                  │               │              │
  │──Click View──>│                  │               │              │
  │               │                  │               │              │
  │               │──GET /progress──>│               │              │
  │               │   + JWT Token    │               │              │
  │               │                  │               │              │
  │               │              [Auth Middleware]   │              │
  │               │                  │               │              │
  │               │                  │──verifyToken─>│              │
  │               │                  │               │              │
  │               │                  │──getProgress>│              │
  │               │                  │               │              │
  │               │                  │               │──findMany──>│
  │               │                  │               │              │
  │               │                  │               │<──progress──│
  │               │                  │               │              │
  │               │                  │<──progressData│              │
  │               │                  │               │              │
  │               │<──200 OK─────────│               │              │
  │               │   {progress[]}   │               │              │
  │               │                  │               │              │
  │<──Display─────│                  │               │              │
```

---

## 4. ACTIVITY DIAGRAMS

### 4.1 Member Registration Activity Diagram
```
                    START
                      │
                      ▼
            ┌─────────────────┐
            │ Open Registration│
            │      Form       │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  Fill Personal  │
            │   Information   │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  Submit Form    │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  Validate Input │
            └────────┬────────┘
                     │
                     ▼
           ◇─────────────────◇
          /   Valid Data?     \
         /                     \
        ◇                       ◇
       YES                      NO
        │                        │
        ▼                        ▼
┌──────────────┐         ┌──────────────┐
│ Hash Password│         │ Show Error   │
└──────┬───────┘         │   Message    │
       │                 └──────┬───────┘
       ▼                        │
┌──────────────┐                │
│Create Member │                │
│  in Database │                │
└──────┬───────┘                │
       │                        │
       ▼                        │
┌──────────────┐                │
│Generate JWT  │                │
│   Tokens     │                │
└──────┬───────┘                │
       │                        │
       ▼                        │
┌──────────────┐                │
│Return Success│                │
│  with Tokens │                │
└──────┬───────┘                │
       │                        │
       └────────────┬───────────┘
                    │
                    ▼
                   END
```

### 4.2 Trainer Assigns Workout Plan Activity Diagram
```
                    START
                      │
                      ▼
            ┌─────────────────┐
            │  Trainer Login  │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  View Members   │
            │      List       │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ Select Member   │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  Create Workout │
            │  Plan Details   │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  Submit Plan    │
            └────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  Verify Token   │
            └────────┬────────┘
                     │
                     ▼
           ◇─────────────────◇
          /  Token Valid?     \
         /                     \
        ◇                       ◇
       YES                      NO
        │                        │
        ▼                        ▼
┌──────────────┐         ┌──────────────┐
│ Check Role   │         │   Return     │
│  (Trainer)   │         │ Unauthorized │
└──────┬───────┘         └──────────────┘
       │                        │
       ▼                        │
  ◇──────────◇                  │
 /  Is Trainer?\                │
◇              ◇                │
YES            NO               │
 │              │               │
 ▼              ▼               │
┌────────┐  ┌────────┐          │
│ Save   │  │ Return │          │
│ Plan   │  │Forbidden│         │
└───┬────┘  └────────┘          │
    │            │              │
    ▼            └──────┬───────┘
┌────────┐              │
│ Return │              │
│Success │              │
└───┬────┘              │
    │                   │
    └───────────┬───────┘
                │
                ▼
               END
```

---

## 5. STATE DIAGRAM

### 5.1 Member Status State Diagram
```
                    ┌─────────┐
              ┌────>│ Active  │<────┐
              │     └────┬────┘     │
              │          │          │
              │          │          │
        [reactivate]  [deactivate]  │
              │          │          │
              │          ▼          │
              │     ┌─────────┐    │
              └─────│Inactive │    │
                    └────┬────┘    │
                         │         │
                         │         │
                    [suspend]  [activate]
                         │         │
                         ▼         │
                    ┌─────────┐   │
                    │Suspended│───┘
                    └─────────┘
```

### 5.2 Attendance Status State Diagram
```
                 ┌────────────┐
            ┌───>│  Scheduled │
            │    └──────┬─────┘
            │           │
            │     [mark present]
            │           │
            │           ▼
            │    ┌────────────┐
            │    │  Present   │
            │    └────────────┘
            │
       [create new]
            │
            │    ┌────────────┐
            └───>│   Absent   │
                 └────────────┘
```

---

## 6. COMPONENT DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                    GYM MANAGEMENT SYSTEM                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   React UI   │  │  Member UI   │  │  Trainer UI  │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                    ┌────────▼────────┐
                    │  API Gateway    │
                    │   (Express)     │
                    └────────┬────────┘
                             │
┌────────────────────────────┼────────────────────────────────────┐
│                     APPLICATION LAYER                            │
│  ┌──────────────┐         │         ┌──────────────┐            │
│  │Auth Module   │◄────────┼────────►│Member Module │            │
│  ├──────────────┤         │         ├──────────────┤            │
│  │• Controller  │         │         │• Controller  │            │
│  │• Service     │         │         │• Service     │            │
│  │• Routes      │         ▼         │• Routes      │            │
│  └──────────────┘   ┌──────────┐   └──────────────┘            │
│                     │Trainer   │                                │
│  ┌──────────────┐   │Module    │   ┌──────────────┐            │
│  │Middleware    │◄──┤          │──►│Utils         │            │
│  ├──────────────┤   │• Control.│   ├──────────────┤            │
│  │• Auth        │   │• Service │   │• Hash        │            │
│  │• RoleGuard   │   │• Routes  │   │• JWT         │            │
│  └──────────────┘   └──────────┘   └──────────────┘            │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────────┐
│                       DATA ACCESS LAYER                          │
│                   ┌────────▼────────┐                            │
│                   │  Prisma Client  │                            │
│                   └────────┬────────┘                            │
└────────────────────────────┼────────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────────┐
│                      DATABASE LAYER                              │
│                   ┌────────▼────────┐                            │
│                   │   PostgreSQL    │                            │
│                   │   ┌──────────┐  │                            │
│                   │   │ Members  │  │                            │
│                   │   │ Trainers │  │                            │
│                   │   │ Plans    │  │                            │
│                   │   │ Progress │  │                            │
│                   │   └──────────┘  │                            │
│                   └─────────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. DEPLOYMENT DIAGRAM

```
┌───────────────────────────────────────────────────────────────────┐
│                      DEPLOYMENT ARCHITECTURE                       │
└───────────────────────────────────────────────────────────────────┘

┌─────────────────┐                              ┌─────────────────┐
│  Client Device  │                              │  Client Device  │
│  (Web Browser)  │                              │  (Web Browser)  │
└────────┬────────┘                              └────────┬────────┘
         │                                                │
         │                   HTTPS                        │
         │                                                │
         └────────────────────┬───────────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │   Load Balancer    │
                    │     (Vercel)       │
                    └─────────┬──────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
┌────────▼────────┐  ┌────────▼────────┐  ┌───────▼─────────┐
│  Frontend       │  │  Backend API    │  │  Backend API    │
│  (React + Vite) │  │  (Node.js)      │  │  (Node.js)      │
│                 │  │                 │  │                 │
│  Port: 5174     │  │  Port: 3000     │  │  Port: 3000     │
└─────────────────┘  └────────┬────────┘  └────────┬────────┘
                              │                    │
                              └─────────┬──────────┘
                                        │
                              ┌─────────▼──────────┐
                              │   Database Pool    │
                              └─────────┬──────────┘
                                        │
                              ┌─────────▼──────────┐
                              │   PostgreSQL DB    │
                              │   (Neon.tech)      │
                              │                    │
                              │  Tables:           │
                              │  • members         │
                              │  • trainers        │
                              │  • workout_plans   │
                              │  • diet_plans      │
                              │  • attendances     │
                              │  • progress        │
                              └────────────────────┘
```

---

**Document Version**: 1.0  
**Date**: November 22, 2025  
**Created By**: DBMS Lab Project Team  
**Modeling Standard**: UML 2.5
