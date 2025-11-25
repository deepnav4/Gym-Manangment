import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Dumbbell,
    Utensils,
    Calendar,
    User,
    AlertCircle,
    Clock,
    TrendingUp
} from 'lucide-react';
import { 
    getMemberWorkouts, 
    getMemberDiet, 
    getMemberAttendance,
    type WorkoutPlan,
    type DietPlan,
    type Attendance
} from '../services/memberService';

const MyPlansPage = () => {
    const [activeTab, setActiveTab] = useState<'workout' | 'diet' | 'attendance'>('workout');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
    const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
    const [attendances, setAttendances] = useState<Attendance[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');
                
                const [workoutRes, dietRes, attendanceRes] = await Promise.all([
                    getMemberWorkouts(),
                    getMemberDiet(),
                    getMemberAttendance()
                ]);

                setWorkoutPlans(workoutRes.data);
                setDietPlans(dietRes.data);
                setAttendances(attendanceRes.data);
            } catch (err: any) {
                console.error('Error fetching plans:', err);
                setError(err.response?.data?.message || 'Failed to load plans');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center pt-24">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading your plans...</p>
                </div>
            </div>
        );
    }

    const calculateAttendanceStats = () => {
        const total = attendances.length;
        const present = attendances.filter(a => a.status === 'present').length;
        const absent = attendances.filter(a => a.status === 'absent').length;
        const leave = attendances.filter(a => a.status === 'leave').length;
        const rate = total > 0 ? Math.round((present / total) * 100) : 0;

        return { total, present, absent, leave, rate };
    };

    const stats = calculateAttendanceStats();

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 lg:p-8 pt-24">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Plans & Progress</h1>
                        <p className="text-slate-500">View your workout plans, diet plans, and attendance history</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-indigo-50">
                                <Dumbbell className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{workoutPlans.length}</div>
                                <div className="text-xs text-slate-500">Workout Plans</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-emerald-50">
                                <Utensils className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{dietPlans.length}</div>
                                <div className="text-xs text-slate-500">Diet Plans</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-blue-50">
                                <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                                <div className="text-xs text-slate-500">Total Sessions</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-amber-50">
                                <TrendingUp className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{stats.rate}%</div>
                                <div className="text-xs text-slate-500">Attendance Rate</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Content - Tabs */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    {/* Tab Buttons */}
                    <div className="flex border-b border-slate-100">
                        {[
                            { id: 'workout', label: 'Workout Plans', icon: Dumbbell },
                            { id: 'diet', label: 'Diet Plans', icon: Utensils },
                            { id: 'attendance', label: 'Attendance History', icon: Calendar }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 py-4 text-sm font-bold capitalize transition-colors flex items-center justify-center gap-2 ${
                                    activeTab === tab.id
                                        ? 'bg-slate-50 text-slate-900 border-b-2 border-slate-900'
                                        : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-8 min-h-[500px]">
                        {/* Workout Plans Tab */}
                        {activeTab === 'workout' && (
                            <div className="space-y-6">
                                {workoutPlans.length > 0 ? (
                                    workoutPlans.map((plan, index) => (
                                        <motion.div
                                            key={plan.plan_id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                                                        <Dumbbell className="w-6 h-6 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 text-lg">Workout Plan #{index + 1}</h3>
                                                        <p className="text-sm text-slate-500">
                                                            Assigned by {plan.trainer?.name || 'Your Trainer'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <Clock className="w-4 h-4" />
                                                    {new Date(plan.created_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                            
                                            <div className="bg-white rounded-xl p-5 border border-slate-100">
                                                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                                    {plan.plan_details}
                                                </pre>
                                            </div>

                                            {plan.trainer?.specialization && (
                                                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                                                    <User className="w-4 h-4" />
                                                    <span>Trainer Specialization: <span className="font-medium text-slate-700">{plan.trainer.specialization}</span></span>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-16">
                                        <Dumbbell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">No Workout Plans Yet</h3>
                                        <p className="text-slate-500 max-w-md mx-auto">
                                            Your trainer will assign a personalized workout plan soon. Once assigned, it will appear here.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Diet Plans Tab */}
                        {activeTab === 'diet' && (
                            <div className="space-y-6">
                                {dietPlans.length > 0 ? (
                                    dietPlans.map((plan, index) => (
                                        <motion.div
                                            key={plan.diet_id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                                        <Utensils className="w-6 h-6 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 text-lg">Diet Plan #{index + 1}</h3>
                                                        <p className="text-sm text-slate-500">
                                                            Assigned by {plan.trainer?.name || 'Your Trainer'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <Clock className="w-4 h-4" />
                                                    {new Date(plan.created_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                            
                                            <div className="bg-white rounded-xl p-5 border border-slate-100">
                                                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                                                    {plan.diet_details}
                                                </pre>
                                            </div>

                                            {plan.trainer?.specialization && (
                                                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                                                    <User className="w-4 h-4" />
                                                    <span>Trainer Specialization: <span className="font-medium text-slate-700">{plan.trainer.specialization}</span></span>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-16">
                                        <Utensils className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">No Diet Plans Yet</h3>
                                        <p className="text-slate-500 max-w-md mx-auto">
                                            Your trainer will assign a personalized diet plan soon. Once assigned, it will appear here.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Attendance History Tab */}
                        {activeTab === 'attendance' && (
                            <div className="space-y-6">
                                {/* Attendance Summary */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                        <div className="text-2xl font-bold text-emerald-700">{stats.present}</div>
                                        <div className="text-sm text-emerald-600">Present</div>
                                    </div>
                                    <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                                        <div className="text-2xl font-bold text-red-700">{stats.absent}</div>
                                        <div className="text-sm text-red-600">Absent</div>
                                    </div>
                                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                                        <div className="text-2xl font-bold text-amber-700">{stats.leave}</div>
                                        <div className="text-sm text-amber-600">Leave</div>
                                    </div>
                                </div>

                                {/* Attendance List */}
                                {attendances.length > 0 ? (
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-slate-900 text-lg mb-4">Complete History</h3>
                                        {attendances.slice().reverse().map((attendance) => (
                                            <div 
                                                key={attendance.attendance_id} 
                                                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-3 h-3 rounded-full ${
                                                        attendance.status === 'present' ? 'bg-emerald-500' :
                                                        attendance.status === 'absent' ? 'bg-red-500' : 'bg-amber-500'
                                                    }`} />
                                                    <div>
                                                        <div className="font-medium text-slate-900 capitalize">
                                                            {attendance.status}
                                                        </div>
                                                        <div className="text-sm text-slate-500">
                                                            {new Date(attendance.date).toLocaleDateString('en-US', {
                                                                weekday: 'long',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                                    attendance.status === 'present' ? 'bg-emerald-100 text-emerald-700' :
                                                    attendance.status === 'absent' ? 'bg-red-100 text-red-700' : 
                                                    'bg-amber-100 text-amber-700'
                                                }`}>
                                                    {attendance.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">No Attendance Records</h3>
                                        <p className="text-slate-500 max-w-md mx-auto">
                                            Your attendance history will appear here once your trainer starts tracking it.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPlansPage;
