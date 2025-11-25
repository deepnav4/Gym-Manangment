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

// ========================================
// GET MEMBER PROFILE
// ========================================
export const getMemberProfile = async () => {
    const response = await api.get<{ success: boolean; data: Member }>('/member/profile');
    return response.data;
};

// ========================================
// GET MEMBER WORKOUT PLANS
// ========================================
export const getMemberWorkouts = async () => {
    const response = await api.get<{ success: boolean; data: WorkoutPlan[] }>('/member/my/workout');
    return response.data;
};

// ========================================
// GET MEMBER DIET PLANS
// ========================================
export const getMemberDiet = async () => {
    const response = await api.get<{ success: boolean; data: DietPlan[] }>('/member/my/diet');
    return response.data;
};

// ========================================
// GET MEMBER ATTENDANCE
// ========================================
export const getMemberAttendance = async () => {
    const response = await api.get<{ success: boolean; data: Attendance[] }>('/member/my/attendance');
    return response.data;
};

// ========================================
// GET MEMBER PROGRESS
// ========================================
export const getMemberProgress = async () => {
    const response = await api.get<{ success: boolean; data: Progress[] }>('/member/my/progress');
    return response.data;
};
