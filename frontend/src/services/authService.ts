import api from '../config/api';

// Types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupData {
    name: string;
    email: string;
    password: string;
    age: number;
    gender: string;
    phone: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: 'member' | 'trainer';
    };
}

// ========================================
// MEMBER SIGNUP
// ========================================
export const signup = async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', data);
    
    const backendData = response.data.data;
    const token = backendData.accessToken;
    const user = {
        id: backendData.member.member_id,
        name: backendData.member.name,
        email: backendData.member.email,
        role: 'member' as const
    };
    
    // Store token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
        success: true,
        message: response.data.message,
        token: token,
        user: user
    };
};

// ========================================
// MEMBER LOGIN
// ========================================
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    
    const backendData = response.data.data;
    const token = backendData.accessToken;
    const user = {
        id: backendData.member.member_id,
        name: backendData.member.name,
        email: backendData.member.email,
        role: 'member' as const
    };
    
    // Store token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
        success: true,
        message: response.data.message,
        token: token,
        user: user
    };
};

// ========================================
// TRAINER LOGIN
// ========================================
export const trainerLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/trainer/login', credentials);
    
    const backendData = response.data.data;
    const token = backendData.accessToken;
    const user = {
        id: backendData.trainer.trainer_id,
        name: backendData.trainer.name,
        email: backendData.trainer.email,
        role: 'trainer' as const
    };
    
    // Store token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
        success: true,
        message: response.data.message,
        token: token,
        user: user
    };
};

// ========================================
// LOGOUT
// ========================================
export const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// ========================================
// GET CURRENT USER
// ========================================
export const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        if (!userStr || userStr === 'undefined' || userStr === 'null') {
            return null;
        }
        return JSON.parse(userStr);
    } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        return null;
    }
};

// ========================================
// CHECK IF AUTHENTICATED
// ========================================
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!(token && token !== 'undefined' && token !== 'null');
};

// ========================================
// GET USER ROLE
// ========================================
export const getUserRole = (): 'member' | 'trainer' | null => {
    const user = getCurrentUser();
    return user?.role || null;
};
