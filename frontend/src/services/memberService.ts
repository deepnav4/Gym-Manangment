import api from '../config/api';

// Types
export interface Member {
    member_id: string;
    name: string;
    email: string;
    age: number;
    gender: string;
    phone: string;
    join_date: string;
    status: string;
}

export interface WorkoutPlan {
    plan_id: string;
    member_id: string;
    trainer_id: string;
    plan_details: string;
    created_at: string;
    trainer?: {
        name: string;
        specialization: string;
    };
}

export interface DietPlan {
    diet_id: string;
    member_id: string;
    trainer_id: string;
    diet_details: string;
    created_at: string;
    trainer?: {
        name: string;
        specialization: string;
    };
}

export interface Attendance {
    attendance_id: string;
    member_id: string;
    date: string;
    status: 'present' | 'absent' | 'leave';
}

export interface Progress {
    progress_id: string;
    member_id: string;
    trainer_id: string;
    weight: number;
    body_fat: number;
    muscle_mass: number;
    notes?: string;
    updated_at: string;
    trainer?: {
        name: string;
    };
}

// Local Storage Keys
const MOCK_MEMBER_PROFILE_KEY = 'mock_member_profile';
const MOCK_WORKOUTS_KEY = 'mock_workouts';
const MOCK_DIETS_KEY = 'mock_diets';
const MOCK_ATTENDANCE_KEY = 'mock_attendance';
const MOCK_PROGRESS_KEY = 'mock_progress';

// Helper to initialize local data if empty
const initializeMockData = () => {
    if (!localStorage.getItem(MOCK_MEMBER_PROFILE_KEY)) {
        localStorage.setItem(MOCK_MEMBER_PROFILE_KEY, JSON.stringify({
            member_id: "mock_member_1",
            name: "John Member Doe",
            email: "member@gym.com",
            age: 27,
            gender: "Male",
            phone: "+1 (555) 123-4567",
            join_date: "2026-01-15",
            status: "Active"
        }));
    }
    if (!localStorage.getItem(MOCK_WORKOUTS_KEY)) {
        localStorage.setItem(MOCK_WORKOUTS_KEY, JSON.stringify([
            {
                plan_id: "p1",
                member_id: "mock_member_1",
                trainer_id: "mock_trainer_1",
                plan_details: "Push Day:\n- Bench Press: 4 sets x 8 reps\n- Incline Dumbbell Press: 3 sets x 10 reps\n- Lateral Raises: 4 sets x 12 reps\n- Tricep Pushdowns: 3 sets x 12 reps",
                created_at: "2026-06-20T10:00:00.000Z",
                trainer: { name: "Coach Mike", specialization: "Strength & Conditioning" }
            }
        ]));
    }
    if (!localStorage.getItem(MOCK_DIETS_KEY)) {
        localStorage.setItem(MOCK_DIETS_KEY, JSON.stringify([
            {
                diet_id: "d1",
                member_id: "mock_member_1",
                trainer_id: "mock_trainer_1",
                diet_details: "High Protein Muscle Building Plan:\n- Meal 1: 4 egg whites, 2 whole eggs, oatmeal\n- Meal 2: Chicken breast, brown rice, broccoli\n- Meal 3: Whey protein shake, almonds\n- Meal 4: Salmon, sweet potato, asparagus",
                created_at: "2026-06-21T10:00:00.000Z",
                trainer: { name: "Coach Mike", specialization: "Strength & Conditioning" }
            }
        ]));
    }
    const existingAttendance = localStorage.getItem(MOCK_ATTENDANCE_KEY);
    if (!existingAttendance || JSON.parse(existingAttendance).length <= 3) {
        localStorage.setItem(MOCK_ATTENDANCE_KEY, JSON.stringify([
            { attendance_id: "a1", member_id: "mock_member_1", date: "2026-06-15", status: "present" },
            { attendance_id: "a2", member_id: "mock_member_1", date: "2026-06-16", status: "present" },
            { attendance_id: "a3", member_id: "mock_member_1", date: "2026-06-18", status: "present" },
            { attendance_id: "a4", member_id: "mock_member_1", date: "2026-06-19", status: "present" },
            { attendance_id: "a5", member_id: "mock_member_1", date: "2026-06-22", status: "present" },
            { attendance_id: "a6", member_id: "mock_member_1", date: "2026-06-23", status: "present" },
            { attendance_id: "a7", member_id: "mock_member_1", date: "2026-06-24", status: "absent" },
            { attendance_id: "a8", member_id: "mock_member_1", date: "2026-06-25", status: "present" },
            { attendance_id: "a9", member_id: "mock_member_1", date: "2026-06-26", status: "present" },
            { attendance_id: "a10", member_id: "mock_member_1", date: "2026-06-29", status: "present" }
        ]));
    }
    const existingProgress = localStorage.getItem(MOCK_PROGRESS_KEY);
    if (!existingProgress || JSON.parse(existingProgress).length <= 1) {
        localStorage.setItem(MOCK_PROGRESS_KEY, JSON.stringify([
            {
                progress_id: "pr1",
                member_id: "mock_member_1",
                trainer_id: "mock_trainer_1",
                weight: 85.2,
                body_fat: 16.1,
                muscle_mass: 39.5,
                notes: "Starting weight registered.",
                updated_at: "2026-05-24T10:00:00.000Z",
                trainer: { name: "Coach Mike" }
            },
            {
                progress_id: "pr2",
                member_id: "mock_member_1",
                trainer_id: "mock_trainer_1",
                weight: 84.6,
                body_fat: 15.7,
                muscle_mass: 39.9,
                notes: "Good progress. Increasing stamina.",
                updated_at: "2026-06-01T10:00:00.000Z",
                trainer: { name: "Coach Mike" }
            },
            {
                progress_id: "pr3",
                member_id: "mock_member_1",
                trainer_id: "mock_trainer_1",
                weight: 84.1,
                body_fat: 15.3,
                muscle_mass: 40.2,
                notes: "Weight dropping gradually.",
                updated_at: "2026-06-08T10:00:00.000Z",
                trainer: { name: "Coach Mike" }
            },
            {
                progress_id: "pr4",
                member_id: "mock_member_1",
                trainer_id: "mock_trainer_1",
                weight: 83.5,
                body_fat: 14.8,
                muscle_mass: 40.6,
                notes: "Strong lifting session.",
                updated_at: "2026-06-15T10:00:00.000Z",
                trainer: { name: "Coach Mike" }
            },
            {
                progress_id: "pr5",
                member_id: "mock_member_1",
                trainer_id: "mock_trainer_1",
                weight: 83.0,
                body_fat: 14.5,
                muscle_mass: 40.9,
                notes: "Muscle definition improving.",
                updated_at: "2026-06-22T10:00:00.000Z",
                trainer: { name: "Coach Mike" }
            },
            {
                progress_id: "pr6",
                member_id: "mock_member_1",
                trainer_id: "mock_trainer_1",
                weight: 82.5,
                body_fat: 14.2,
                muscle_mass: 41.2,
                notes: "Great energy levels. Squat strength increased.",
                updated_at: "2026-06-29T10:00:00.000Z",
                trainer: { name: "Coach Mike" }
            }
        ]));
    }
};

// ========================================
// GET MEMBER PROFILE
// ========================================
export const getMemberProfile = async () => {
    try {
        const response = await api.get<{ success: boolean; data: Member }>('/member/profile');
        return response.data;
    } catch (error) {
        console.warn("Using mock Member profile:", error);
        initializeMockData();
        const profile = JSON.parse(localStorage.getItem(MOCK_MEMBER_PROFILE_KEY)!);
        return { success: true, data: profile };
    }
};

// ========================================
// GET MEMBER WORKOUT PLANS
// ========================================
export const getMemberWorkouts = async () => {
    try {
        const response = await api.get<{ success: boolean; data: WorkoutPlan[] }>('/member/my/workout');
        return response.data;
    } catch (error) {
        console.warn("Using mock Workout plans:", error);
        initializeMockData();
        const workouts = JSON.parse(localStorage.getItem(MOCK_WORKOUTS_KEY)!);
        return { success: true, data: workouts };
    }
};

// ========================================
// GET MEMBER DIET PLANS
// ========================================
export const getMemberDiet = async () => {
    try {
        const response = await api.get<{ success: boolean; data: DietPlan[] }>('/member/my/diet');
        return response.data;
    } catch (error) {
        console.warn("Using mock Diet plans:", error);
        initializeMockData();
        const diets = JSON.parse(localStorage.getItem(MOCK_DIETS_KEY)!);
        return { success: true, data: diets };
    }
};

// ========================================
// GET MEMBER ATTENDANCE
// ========================================
export const getMemberAttendance = async () => {
    try {
        const response = await api.get<{ success: boolean; data: Attendance[] }>('/member/my/attendance');
        return response.data;
    } catch (error) {
        console.warn("Using mock Attendance:", error);
        initializeMockData();
        const attendance = JSON.parse(localStorage.getItem(MOCK_ATTENDANCE_KEY)!);
        return { success: true, data: attendance };
    }
};

// ========================================
// GET MEMBER PROGRESS
// ========================================
export const getMemberProgress = async () => {
    try {
        const response = await api.get<{ success: boolean; data: Progress[] }>('/member/my/progress');
        return response.data;
    } catch (error) {
        console.warn("Using mock Progress records:", error);
        initializeMockData();
        const progress = JSON.parse(localStorage.getItem(MOCK_PROGRESS_KEY)!);
        return { success: true, data: progress };
    }
};
