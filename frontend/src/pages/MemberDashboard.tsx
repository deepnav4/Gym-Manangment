import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Activity,
    Dumbbell,
    Utensils,
    Calendar,
    TrendingUp,
    Trophy,
    AlertCircle,
    ArrowRight,
    FileText,
    User
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { 
    getMemberProfile, 
    getMemberWorkouts, 
    getMemberDiet, 
    getMemberAttendance, 
    getMemberProgress,
    type Member,
    type WorkoutPlan,
    type DietPlan,
    type Attendance,
    type Progress
} from '../services/memberService';

const MemberDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State for fetched data
    const [profile, setProfile] = useState<Member | null>(null);
    const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
    const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [progressRecords, setProgressRecords] = useState<Progress[]>([]);

    // Fetch all data on component mount
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                setError('');
                
                const [profileRes, workoutRes, dietRes, attendanceRes, progressRes] = await Promise.all([
                    getMemberProfile(),
                    getMemberWorkouts(),
                    getMemberDiet(),
                    getMemberAttendance(),
                    getMemberProgress()
                ]);

                setProfile(profileRes.data);
                setWorkoutPlans(workoutRes.data);
                setDietPlans(dietRes.data);
                setAttendances(attendanceRes.data);
                setProgressRecords(progressRes.data);
            } catch (err: any) {
                console.error('Error fetching member data:', err);
                setError(err.response?.data?.message || 'Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    // Calculate stats from real data
    const calculateStats = () => {
        const latestProgress = progressRecords.length > 0 
            ? progressRecords[progressRecords.length - 1] 
            : null;
        
        const firstProgress = progressRecords.length > 0 
            ? progressRecords[0] 
            : null;
        
        const currentWeight = latestProgress?.weight || 0;
        const weightChange = firstProgress && latestProgress 
            ? (latestProgress.weight - firstProgress.weight).toFixed(1) 
            : '0';
        
        const currentBodyFat = latestProgress?.body_fat || 0;
        const bodyFatChange = firstProgress && latestProgress 
            ? (latestProgress.body_fat - firstProgress.body_fat).toFixed(1) 
            : '0';
        
        // Calculate attendance percentage
        const presentCount = attendances.filter(a => a.status === 'present').length;
        const attendanceRate = attendances.length > 0 
            ? Math.round((presentCount / attendances.length) * 100) 
            : 0;
        
        return {
            currentWeight: currentWeight > 0 ? `${currentWeight} kg` : 'N/A',
            weightChange: weightChange !== '0' ? `${weightChange} kg` : 'No data',
            attendanceRate: `${attendanceRate}%`,
            attendanceChange: attendanceRate >= 80 ? 'Good' : 'Low',
            workoutStreak: attendances.length > 0 ? `${presentCount} Days` : 'N/A',
            streakStatus: 'Active',
            currentBodyFat: currentBodyFat > 0 ? `${currentBodyFat}%` : 'N/A',
            bodyFatChange: bodyFatChange !== '0' ? `${bodyFatChange}%` : 'No data'
        };
    };

    // Transform progress data for chart
    const getChartData = () => {
        return progressRecords.map((record, index) => ({
            date: `Record ${index + 1}`,
            weight: record.weight,
            bodyFat: record.body_fat
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    const stats = calculateStats();
    const chartData = getChartData();

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 lg:p-8 pt-24">
            <div className="max-w-7xl mx-auto space-y-8">

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
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Hello, {profile?.name || 'Member'}
                        </h1>
                        <p className="text-slate-500">Here's your daily fitness breakdown.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-2 rounded-full border border-slate-100 shadow-sm">
                        <div className="px-4 py-1.5 bg-slate-900 text-white text-sm font-bold rounded-full">
                            Member
                        </div>
                        <span className="text-sm text-slate-500 pr-2">
                            {profile?.email || 'N/A'}
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Current Weight', value: stats.currentWeight, change: stats.weightChange, icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { label: 'Attendance', value: stats.attendanceRate, change: stats.attendanceChange, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Workout Streak', value: stats.workoutStreak, change: stats.streakStatus, icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
                        { label: 'Body Fat', value: stats.currentBodyFat, change: stats.bodyFatChange, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-500">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (Charts & Tabs) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Progress Chart */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold text-slate-900">Progress Tracking</h3>
                                <select className="bg-slate-50 border-none text-sm font-medium text-slate-500 rounded-lg px-3 py-2 cursor-pointer hover:text-slate-900">
                                    <option>Last 6 Weeks</option>
                                    <option>Last 3 Months</option>
                                    <option>Last Year</option>
                                </select>
                            </div>
                            <div className="h-[300px] w-full">
                                {chartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                itemStyle={{ color: '#1e293b' }}
                                            />
                                            <Area type="monotone" dataKey="weight" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="text-center">
                                            <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                            <p className="text-slate-500 font-medium">No progress data yet</p>
                                            <p className="text-sm text-slate-400 mt-1">Your trainer will update your progress soon</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Quick Access Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Workout Plans Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => navigate('/my-plans')}
                                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Dumbbell className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900">Workout Plans</h3>
                                        <p className="text-xs text-slate-500">{workoutPlans.length} {workoutPlans.length === 1 ? 'plan' : 'plans'} assigned</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                </div>
                                {workoutPlans.length > 0 ? (
                                    <p className="text-sm text-slate-600 line-clamp-2">
                                        View your complete workout routine and exercise details
                                    </p>
                                ) : (
                                    <p className="text-sm text-slate-500 italic">No workout plan assigned yet</p>
                                )}
                            </motion.div>

                            {/* Diet Plans Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                onClick={() => navigate('/my-plans')}
                                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Utensils className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900">Diet Plans</h3>
                                        <p className="text-xs text-slate-500">{dietPlans.length} {dietPlans.length === 1 ? 'plan' : 'plans'} assigned</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                </div>
                                {dietPlans.length > 0 ? (
                                    <p className="text-sm text-slate-600 line-clamp-2">
                                        View your nutrition plan and meal guidelines
                                    </p>
                                ) : (
                                    <p className="text-sm text-slate-500 italic">No diet plan assigned yet</p>
                                )}
                            </motion.div>

                            {/* Attendance Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                onClick={() => navigate('/my-plans')}
                                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Calendar className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900">Attendance History</h3>
                                        <p className="text-xs text-slate-500">{attendances.length} total records</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                </div>
                                <p className="text-sm text-slate-600">
                                    Track your gym attendance and consistency
                                </p>
                            </motion.div>

                            {/* Profile Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                onClick={() => navigate('/profile')}
                                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <User className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900">My Profile</h3>
                                        <p className="text-xs text-slate-500">View account details</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                </div>
                                <p className="text-sm text-slate-600">
                                    Manage your personal information
                                </p>
                            </motion.div>

                            {/* View All Plans Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                onClick={() => navigate('/my-plans')}
                                className="bg-linear-to-br from-slate-900 to-slate-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group md:col-span-2"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white">View All My Plans</h3>
                                        <p className="text-xs text-slate-300">Complete details & history</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-all" />
                                </div>
                                <p className="text-sm text-slate-300">
                                    Access workout plans, diet plans, and attendance in one place
                                </p>
                            </motion.div>
                        </div>

                    </div>

                    {/* Right Column (Schedule & Quick Actions) */}
                    <div className="space-y-8">

                        {/* Upcoming Schedule */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Progress Updates</h3>
                            {progressRecords.length > 0 ? (
                                <div className="space-y-6">
                                    {progressRecords.slice(-3).reverse().map((progress) => (
                                        <div key={progress.progress_id} className="relative pl-6 border-l-2 border-slate-100 pb-6 last:pb-0">
                                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-white" />
                                            <div className="text-xs font-bold text-indigo-600 mb-1">
                                                {new Date(progress.updated_at).toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric' 
                                                })}
                                            </div>
                                            <div className="font-bold text-slate-900 mb-2">Progress Update</div>
                                            <div className="space-y-1 text-xs text-slate-600">
                                                <div>Weight: <span className="font-medium text-slate-900">{progress.weight} kg</span></div>
                                                <div>Body Fat: <span className="font-medium text-slate-900">{progress.body_fat}%</span></div>
                                                <div>Muscle Mass: <span className="font-medium text-slate-900">{progress.muscle_mass} kg</span></div>
                                                {progress.notes && (
                                                    <div className="mt-2 text-slate-500 italic">"{progress.notes}"</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500 text-sm">No progress updates yet</p>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-slate-900 p-6 rounded-3xl shadow-xl shadow-slate-900/20 text-white">
                            <h3 className="text-lg font-bold mb-4">Quick Info</h3>
                            <div className="space-y-3">
                                <div className="py-3 px-4 bg-white/10 rounded-xl text-sm">
                                    <div className="font-medium mb-1">Member Since</div>
                                    <div className="text-white/70">
                                        {profile?.join_date ? new Date(profile.join_date).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                        }) : 'N/A'}
                                    </div>
                                </div>
                                <div className="py-3 px-4 bg-white/10 rounded-xl text-sm">
                                    <div className="font-medium mb-1">Status</div>
                                    <div className="text-white/70 capitalize">{profile?.status || 'N/A'}</div>
                                </div>
                                <div className="py-3 px-4 bg-white/10 rounded-xl text-sm">
                                    <div className="font-medium mb-1">Contact</div>
                                    <div className="text-white/70">{profile?.phone || 'N/A'}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDashboard;
