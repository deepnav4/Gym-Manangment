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

// ========================================
// GET ALL MEMBERS
// ========================================
export const getAllMembers = async () => {
    const response = await api.get<{ success: boolean; data: Member[]; count: number }>('/trainer/members');
    return response.data;
};

// ========================================
// UPDATE MEMBER WORKOUT PLAN
// ========================================
export const updateMemberWorkout = async (memberId: string, data: UpdateWorkoutPlanData) => {
    const response = await api.put<{ success: boolean; message: string; data: WorkoutPlan }>(
        `/trainer/members/${memberId}/workout`,
        data
    );
    return response.data;
};

// ========================================
// UPDATE MEMBER DIET PLAN
// ========================================
export const updateMemberDiet = async (memberId: string, data: UpdateDietPlanData) => {
    const response = await api.put<{ success: boolean; message: string; data: DietPlan }>(
        `/trainer/members/${memberId}/diet`,
        data
    );
    return response.data;
};

// ========================================
// UPDATE MEMBER PROGRESS
// ========================================
export const updateMemberProgress = async (memberId: string, data: UpdateProgressData) => {
    const response = await api.put<{ success: boolean; message: string; data: Progress }>(
        `/trainer/members/${memberId}/progress`,
        data
    );
    return response.data;
};

// ========================================
// CREATE MEMBER ATTENDANCE
// ========================================
export const createMemberAttendance = async (memberId: string, data: CreateAttendanceData) => {
    const response = await api.post<{ success: boolean; message: string; data: Attendance }>(
        `/trainer/members/${memberId}/attendance`,
        data
    );
    return response.data;
};
