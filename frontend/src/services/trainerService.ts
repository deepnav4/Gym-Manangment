import api from '../config/api';
import type { Member, WorkoutPlan, DietPlan, Progress, Attendance } from './memberService';

// Types
export interface MemberWithDetails extends Member {
    workoutPlans?: WorkoutPlan[];
    dietPlans?: DietPlan[];
    progress?: Progress[];
    attendances?: Attendance[];
}

export interface UpdateWorkoutPlanData {
    plan_details: string;
}

export interface UpdateDietPlanData {
    diet_details: string;
}

export interface UpdateProgressData {
    weight: number;
    body_fat: number;
    muscle_mass: number;
    notes?: string;
}

export interface CreateAttendanceData {
    status: 'present' | 'absent' | 'leave';
}

// Local Storage Keys (matching memberService)
const MOCK_MEMBERS_LIST_KEY = 'mock_members_list';
const MOCK_WORKOUTS_KEY = 'mock_workouts';
const MOCK_DIETS_KEY = 'mock_diets';
const MOCK_ATTENDANCE_KEY = 'mock_attendance';
const MOCK_PROGRESS_KEY = 'mock_progress';

const initializeTrainerMockData = () => {
    if (!localStorage.getItem(MOCK_MEMBERS_LIST_KEY)) {
        localStorage.setItem(MOCK_MEMBERS_LIST_KEY, JSON.stringify([
            {
                member_id: "mock_member_1",
                name: "John Member Doe",
                email: "member@gym.com",
                age: 27,
                gender: "Male",
                phone: "+1 (555) 123-4567",
                join_date: "2026-01-15",
                status: "Active"
            },
            {
                member_id: "mock_member_2",
                name: "Sarah Walker",
                email: "sarah@walker.com",
                age: 24,
                gender: "Female",
                phone: "+1 (555) 987-6543",
                join_date: "2026-03-10",
                status: "Active"
            }
        ]));
    }
    if (!localStorage.getItem(MOCK_WORKOUTS_KEY)) {
        localStorage.setItem(MOCK_WORKOUTS_KEY, JSON.stringify([
            {
                plan_id: "p1",
                member_id: "mock_member_1",
                trainer_id: "mock_trainer_1",
                plan_details: "Push Day:\n- Bench Press: 4 sets x 8 reps\n- Incline Dumbbell Press: 3 sets x 10 reps\n- Lateral Raises: 4 sets x 12 reps\n- Tricep Pushdowns: 3 sets x 12 reps",
                created_at: new Date().toISOString(),
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
                diet_details: "High Protein Muscle Building Plan:\n- Meal 1: 4 egg whites, 2 whole eggs, oatmeal\n- Meal 2: Chicken breast, brown rice, broccoli",
                created_at: new Date().toISOString(),
                trainer: { name: "Coach Mike", specialization: "Strength & Conditioning" }
            }
        ]));
    }
    if (!localStorage.getItem(MOCK_ATTENDANCE_KEY)) {
        localStorage.setItem(MOCK_ATTENDANCE_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(MOCK_PROGRESS_KEY)) {
        localStorage.setItem(MOCK_PROGRESS_KEY, JSON.stringify([]));
    }
};

// ========================================
// GET ALL MEMBERS
// ========================================
export const getAllMembers = async () => {
    try {
        const response = await api.get<{ success: boolean; data: Member[]; count: number }>('/trainer/members');
        return response.data;
    } catch (error) {
        console.warn("Using mock members list:", error);
        initializeTrainerMockData();
        const members = JSON.parse(localStorage.getItem(MOCK_MEMBERS_LIST_KEY)!);
        return { success: true, data: members, count: members.length };
    }
};

// ========================================
// UPDATE MEMBER WORKOUT PLAN
// ========================================
export const updateMemberWorkout = async (memberId: string, data: UpdateWorkoutPlanData) => {
    try {
        const response = await api.put<{ success: boolean; message: string; data: WorkoutPlan }>(
            `/trainer/members/${memberId}/workout`,
            data
        );
        return response.data;
    } catch (error) {
        console.warn("Updating mock workout locally:", error);
        initializeTrainerMockData();
        const workouts = JSON.parse(localStorage.getItem(MOCK_WORKOUTS_KEY) || '[]');
        
        const newPlan: WorkoutPlan = {
            plan_id: "p_" + Date.now(),
            member_id: memberId,
            trainer_id: "mock_trainer_1",
            plan_details: data.plan_details,
            created_at: new Date().toISOString(),
            trainer: { name: "Coach Mike", specialization: "Strength & Conditioning" }
        };
        
        workouts.push(newPlan);
        localStorage.setItem(MOCK_WORKOUTS_KEY, JSON.stringify(workouts));
        
        return {
            success: true,
            message: "Workout plan updated locally (Mock Mode)",
            data: newPlan
        };
    }
};

// ========================================
// UPDATE MEMBER DIET PLAN
// ========================================
export const updateMemberDiet = async (memberId: string, data: UpdateDietPlanData) => {
    try {
        const response = await api.put<{ success: boolean; message: string; data: DietPlan }>(
            `/trainer/members/${memberId}/diet`,
            data
        );
        return response.data;
    } catch (error) {
        console.warn("Updating mock diet locally:", error);
        initializeTrainerMockData();
        const diets = JSON.parse(localStorage.getItem(MOCK_DIETS_KEY) || '[]');
        
        const newDiet: DietPlan = {
            diet_id: "d_" + Date.now(),
            member_id: memberId,
            trainer_id: "mock_trainer_1",
            diet_details: data.diet_details,
            created_at: new Date().toISOString(),
            trainer: { name: "Coach Mike", specialization: "Strength & Conditioning" }
        };
        
        diets.push(newDiet);
        localStorage.setItem(MOCK_DIETS_KEY, JSON.stringify(diets));
        
        return {
            success: true,
            message: "Diet plan updated locally (Mock Mode)",
            data: newDiet
        };
    }
};

// ========================================
// UPDATE MEMBER PROGRESS
// ========================================
export const updateMemberProgress = async (memberId: string, data: UpdateProgressData) => {
    try {
        const response = await api.put<{ success: boolean; message: string; data: Progress }>(
            `/trainer/members/${memberId}/progress`,
            data
        );
        return response.data;
    } catch (error) {
        console.warn("Updating mock progress locally:", error);
        initializeTrainerMockData();
        const progressList = JSON.parse(localStorage.getItem(MOCK_PROGRESS_KEY) || '[]');
        
        const newProgress: Progress = {
            progress_id: "pr_" + Date.now(),
            member_id: memberId,
            trainer_id: "mock_trainer_1",
            weight: data.weight,
            body_fat: data.body_fat,
            muscle_mass: data.muscle_mass,
            notes: data.notes,
            updated_at: new Date().toISOString(),
            trainer: { name: "Coach Mike" }
        };
        
        progressList.push(newProgress);
        localStorage.setItem(MOCK_PROGRESS_KEY, JSON.stringify(progressList));
        
        return {
            success: true,
            message: "Progress record created locally (Mock Mode)",
            data: newProgress
        };
    }
};

// ========================================
// CREATE MEMBER ATTENDANCE
// ========================================
export const createMemberAttendance = async (memberId: string, data: CreateAttendanceData) => {
    try {
        const response = await api.post<{ success: boolean; message: string; data: Attendance }>(
            `/trainer/members/${memberId}/attendance`,
            data
        );
        return response.data;
    } catch (error) {
        console.warn("Creating mock attendance record locally:", error);
        initializeTrainerMockData();
        const attendances = JSON.parse(localStorage.getItem(MOCK_ATTENDANCE_KEY) || '[]');
        
        const newAttendance: Attendance = {
            attendance_id: "a_" + Date.now(),
            member_id: memberId,
            date: new Date().toISOString().split('T')[0],
            status: data.status
        };
        
        attendances.push(newAttendance);
        localStorage.setItem(MOCK_ATTENDANCE_KEY, JSON.stringify(attendances));
        
        return {
            success: true,
            message: "Attendance recorded locally (Mock Mode)",
            data: newAttendance
        };
    }
};
