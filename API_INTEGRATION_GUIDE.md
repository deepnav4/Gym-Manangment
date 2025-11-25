# GymFlow API Integration Quick Reference

## 🔗 How Services Are Connected

### Service Files Created:

1. **`src/config/api.ts`** - Axios configuration with interceptors
2. **`src/services/authService.ts`** - Authentication functions
3. **`src/services/memberService.ts`** - Member API calls
4. **`src/services/trainerService.ts`** - Trainer API calls
5. **`src/context/AuthContext.tsx`** - Global auth state management

---

## 📱 Using Services in Components

### 1. Authentication

```tsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
    const { user, isAuthenticated, login, logout } = useAuth();
    
    // Check if user is logged in
    if (isAuthenticated) {
        console.log(`Hello ${user.name}`);
    }
    
    // Logout user
    const handleLogout = () => {
        logout(); // Clears token and redirects to login
    };
}
```

### 2. Member API Calls

```tsx
import { 
    getMemberProfile, 
    getMemberWorkouts, 
    getMemberDiet 
} from '../services/memberService';

function MemberComponent() {
    const [profile, setProfile] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMemberProfile();
                setProfile(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);
}
```

### 3. Trainer API Calls

```tsx
import { 
    getAllMembers, 
    updateMemberWorkout 
} from '../services/trainerService';

function TrainerComponent() {
    const updateWorkout = async (memberId, planDetails) => {
        try {
            const response = await updateMemberWorkout(memberId, {
                plan_details: planDetails
            });
            console.log('Updated:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
}
```

---

## 🔐 Protected Routes

```tsx
// In App.tsx - Already implemented
<Route
    path="/dashboard/member"
    element={
        <ProtectedRoute allowedRoles={['member']}>
            <MemberDashboard />
        </ProtectedRoute>
    }
/>
```

---

## 🎯 Example: Complete Login Flow

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, trainerLogin } from '../services/authService';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('member');
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const credentials = { email, password };
            
            // Call appropriate login function
            const response = userType === 'member' 
                ? await login(credentials)
                : await trainerLogin(credentials);
            
            // Update auth context
            authLogin(response.user, response.token);
            
            // Redirect to dashboard
            navigate(`/dashboard/${userType}`);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form inputs */}
        </form>
    );
}
```

---

## 📊 Example: Fetching Member Data

```tsx
import { useEffect, useState } from 'react';
import { getMemberProgress } from '../services/memberService';

function ProgressChart() {
    const [progressData, setProgressData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                setLoading(true);
                const response = await getMemberProgress();
                setProgressData(response.data);
            } catch (err) {
                setError('Failed to load progress data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {progressData.map((record) => (
                <div key={record.progress_id}>
                    Weight: {record.weight}kg
                </div>
            ))}
        </div>
    );
}
```

---

## 🛠️ Example: Updating Member Data (Trainer)

```tsx
import { updateMemberProgress } from '../services/trainerService';

function UpdateProgressForm({ memberId }) {
    const [formData, setFormData] = useState({
        weight: '',
        body_fat: '',
        muscle_mass: '',
        notes: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const data = {
                weight: parseFloat(formData.weight),
                body_fat: parseFloat(formData.body_fat),
                muscle_mass: parseFloat(formData.muscle_mass),
                notes: formData.notes
            };
            
            const response = await updateMemberProgress(memberId, data);
            console.log('Success:', response.message);
            
            // Show success message or update UI
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form inputs */}
        </form>
    );
}
```

---

## 🔄 Automatic Token Management

The axios instance in `src/config/api.ts` automatically:
- ✅ Adds JWT token to all requests
- ✅ Redirects to login on 401 (Unauthorized)
- ✅ Redirects to /unauthorized on 403 (Forbidden)
- ✅ Handles errors globally

You don't need to manually add tokens to requests!

---

## 📝 API Response Format

All API responses follow this structure:

### Success Response
```json
{
    "success": true,
    "data": { /* response data */ },
    "message": "Success message"
}
```

### Error Response
```json
{
    "success": false,
    "message": "Error message",
    "errors": [/* validation errors */]
}
```

---

## 🎨 Best Practices

1. **Always use try-catch** when making API calls
2. **Handle loading states** while fetching data
3. **Show error messages** to users
4. **Clear sensitive data** on logout
5. **Use useEffect** for data fetching on mount
6. **Avoid multiple API calls** in render functions

---

## 🚀 Next Steps to Integrate Dashboards

### Member Dashboard
```tsx
import { useEffect, useState } from 'react';
import { 
    getMemberProfile,
    getMemberWorkouts,
    getMemberProgress 
} from '../services/memberService';

function MemberDashboard() {
    const [data, setData] = useState({
        profile: null,
        workouts: [],
        progress: []
    });

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [profile, workouts, progress] = await Promise.all([
                    getMemberProfile(),
                    getMemberWorkouts(),
                    getMemberProgress()
                ]);
                
                setData({
                    profile: profile.data,
                    workouts: workouts.data,
                    progress: progress.data
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchAllData();
    }, []);

    // Use real data instead of mock data
}
```

### Trainer Dashboard
```tsx
import { useEffect, useState } from 'react';
import { getAllMembers } from '../services/trainerService';

function TrainerDashboard() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getAllMembers();
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };
        
        fetchMembers();
    }, []);

    // Use real members data instead of mock data
}
```

---

**Everything is now connected and ready to use! 🎉**
