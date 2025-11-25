import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    User,
    Mail,
    Calendar,
    Activity,
    TrendingUp,
    Dumbbell,
    Utensils,
    CalendarCheck,
    Clock,
    AlertCircle,
    Edit2
} from 'lucide-react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { getAllMembers } from '../services/trainerService';

const MemberDetailsPage = () => {
    const { memberId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [member, setMember] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'plans' | 'attendance'>('overview');

    useEffect(() => {
        fetchMemberDetails();
    }, [memberId]);

    const fetchMemberDetails = async () => {
        try {
            setLoading(true);
            setError('');
            
            // For now, we'll fetch from the members list
            // TODO: Create a dedicated API endpoint for detailed member info
            const response = await getAllMembers();
            const foundMember = response.data.find(m => String(m.member_id) === memberId);
            
            if (!foundMember) {
                setError('Member not found');
                return;
            }

            // Mock detailed data - replace with actual API call when backend is ready
            setMember({
                ...foundMember,
                workoutPlans: [
                    {
                        plan_id: '1',
                        plan_details: 'Push Pull Legs Split - 6 days/week',
                        created_at: '2024-11-20T10:00:00Z',
                        trainer: { name: 'John Coach' }
                    },
                    {
                        plan_id: '2',
                        plan_details: 'Upper Lower Split - 4 days/week',
                        created_at: '2024-11-01T10:00:00Z',
                        trainer: { name: 'John Coach' }
                    }
                ],
                dietPlans: [
                    {
                        diet_id: '1',
                        diet_details: 'High Protein 2400 kcal',
                        created_at: '2024-11-20T10:00:00Z',
                        trainer: { name: 'John Coach' }
                    },
                    {
                        diet_id: '2',
                        diet_details: 'Balanced 2200 kcal',
                        created_at: '2024-11-05T10:00:00Z',
                        trainer: { name: 'John Coach' }
                    }
                ],
                progress: [
                    { date: '2024-11-01', weight: 75, body_fat: 20, muscle_mass: 32, notes: 'Initial assessment' },
                    { date: '2024-11-05', weight: 74.5, body_fat: 19.5, muscle_mass: 32.2, notes: 'Good progress' },
                    { date: '2024-11-10', weight: 74, body_fat: 19, muscle_mass: 32.5, notes: 'Consistent results' },
                    { date: '2024-11-15', weight: 73.5, body_fat: 18.5, muscle_mass: 33, notes: 'Excellent improvement' },
                    { date: '2024-11-20', weight: 73, body_fat: 18, muscle_mass: 33.5, notes: 'On track' }
                ],
                attendances: [
                    { date: '2024-11-20', status: 'present' },
                    { date: '2024-11-19', status: 'present' },
                    { date: '2024-11-18', status: 'present' },
                    { date: '2024-11-17', status: 'absent' },
                    { date: '2024-11-16', status: 'present' },
                    { date: '2024-11-15', status: 'present' },
                    { date: '2024-11-14', status: 'leave' },
                    { date: '2024-11-13', status: 'present' },
                    { date: '2024-11-12', status: 'present' },
                    { date: '2024-11-11', status: 'present' }
                ]
            });
        } catch (err: any) {
            console.error('Error fetching member details:', err);
            setError(err.response?.data?.message || 'Failed to load member details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading member details...</p>
                </div>
            </div>
        );
    }

    if (error || !member) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 max-w-md w-full text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Error</h2>
                    <p className="text-slate-600 mb-6">{error || 'Member not found'}</p>
                    <button
                        onClick={() => navigate('/dashboard/trainer')}
                        className="px-6 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // Calculate statistics
    const totalWorkouts = member.workoutPlans?.length || 0;
    const totalDiets = member.dietPlans?.length || 0;
    const totalProgress = member.progress?.length || 0;
    const attendanceRate = member.attendances
        ? Math.round((member.attendances.filter((a: any) => a.status === 'present').length / member.attendances.length) * 100)
        : 0;

    const latestProgress = member.progress?.[member.progress.length - 1];
    const firstProgress = member.progress?.[0];
    const weightChange = latestProgress && firstProgress 
        ? (latestProgress.weight - firstProgress.weight).toFixed(1)
        : '0';
    const bodyFatChange = latestProgress && firstProgress
        ? (latestProgress.body_fat - firstProgress.body_fat).toFixed(1)
        : '0';

    // Prepare chart data
    const progressChartData = member.progress?.map((p: any) => ({
        date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: p.weight,
        bodyFat: p.body_fat,
        muscleMass: p.muscle_mass
    })) || [];

    const attendanceChartData = [
        { name: 'Present', value: member.attendances?.filter((a: any) => a.status === 'present').length || 0, color: '#10b981' },
        { name: 'Absent', value: member.attendances?.filter((a: any) => a.status === 'absent').length || 0, color: '#ef4444' },
        { name: 'Leave', value: member.attendances?.filter((a: any) => a.status === 'leave').length || 0, color: '#f59e0b' }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 w-full sm:w-auto">
                        <button
                            onClick={() => navigate('/dashboard/trainer')}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shrink-0"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </button>
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Member Details</h1>
                            <p className="text-sm sm:text-base text-slate-500">Complete overview and history for {member.name}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate(`/update-member/${memberId}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm rounded-xl hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center"
                    >
                        <Edit2 className="w-4 h-4" />
                        Update Plans
                    </button>
                </div>

                {/* Member Info Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl sm:text-2xl shrink-0">
                            {member.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                            <div>
                                <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm mb-1">
                                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>Member Info</span>
                                </div>
                                <p className="font-bold text-slate-900 text-base sm:text-lg">{member.name}</p>
                                <p className="text-xs sm:text-sm text-slate-600">{member.age} years • {member.gender}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm mb-1">
                                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>Contact</span>
                                </div>
                                <p className="text-slate-900 text-xs sm:text-sm break-all">{member.email}</p>
                                <p className="text-slate-600 text-xs sm:text-sm">{member.phone}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm mb-1">
                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>Member Since</span>
                                </div>
                                <p className="text-slate-900 text-xs sm:text-sm">
                                    {new Date(member.join_date).toLocaleDateString('en-US', { 
                                        month: 'long', 
                                        day: 'numeric', 
                                        year: 'numeric' 
                                    })}
                                </p>
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mt-1 ${
                                    member.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                                }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                        member.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                                    }`} />
                                    {member.status}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-lg sm:text-2xl font-bold text-slate-900">{totalWorkouts}</p>
                                <p className="text-[10px] sm:text-xs text-slate-500">Workout Plans</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-lg sm:text-2xl font-bold text-slate-900">{totalDiets}</p>
                                <p className="text-[10px] sm:text-xs text-slate-500">Diet Plans</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-lg sm:text-2xl font-bold text-slate-900">{totalProgress}</p>
                                <p className="text-[10px] sm:text-xs text-slate-500">Progress Records</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-lg sm:text-2xl font-bold text-slate-900">{attendanceRate}%</p>
                                <p className="text-[10px] sm:text-xs text-slate-500">Attendance Rate</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="border-b border-slate-100 flex overflow-x-auto scrollbar-hide">
                        {[
                            { id: 'overview', label: 'Overview', icon: Activity },
                            { id: 'progress', label: 'Progress Analytics', icon: TrendingUp },
                            { id: 'plans', label: 'Plans History', icon: Dumbbell },
                            { id: 'attendance', label: 'Attendance', icon: CalendarCheck }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap min-w-fit ${
                                    activeTab === tab.id
                                        ? 'text-slate-900 bg-slate-50'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
                                }`}
                            >
                                <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden xs:inline sm:inline">{tab.label}</span>
                                <span className="xs:hidden">{tab.label.split(' ')[0]}</span>
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeDetailTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 sm:p-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4 sm:space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    {/* Latest Progress */}
                                    <div className="bg-slate-50 rounded-xl p-4 sm:p-6">
                                        <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                            Latest Measurements
                                        </h3>
                                        {latestProgress ? (
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-600">Weight</span>
                                                    <span className="font-bold text-slate-900">
                                                        {latestProgress.weight} kg
                                                        <span className={`ml-2 text-sm ${parseFloat(weightChange) < 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                            ({parseFloat(weightChange) > 0 ? '+' : ''}{weightChange} kg)
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-600">Body Fat</span>
                                                    <span className="font-bold text-slate-900">
                                                        {latestProgress.body_fat}%
                                                        <span className={`ml-2 text-sm ${parseFloat(bodyFatChange) < 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                            ({parseFloat(bodyFatChange) > 0 ? '+' : ''}{bodyFatChange}%)
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-600">Muscle Mass</span>
                                                    <span className="font-bold text-slate-900">{latestProgress.muscle_mass} kg</span>
                                                </div>
                                                {latestProgress.notes && (
                                                    <div className="pt-3 border-t border-slate-200">
                                                        <p className="text-sm text-slate-600 italic">"{latestProgress.notes}"</p>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-slate-500 text-sm">No progress data available</p>
                                        )}
                                    </div>

                                    {/* Current Plans */}
                                    <div className="bg-slate-50 rounded-xl p-6">
                                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <Dumbbell className="w-5 h-5 text-indigo-600" />
                                            Current Plans
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Latest Workout</p>
                                                <p className="text-sm font-medium text-slate-900">
                                                    {member.workoutPlans?.[0]?.plan_details || 'Not assigned'}
                                                </p>
                                                {member.workoutPlans?.[0] && (
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        Updated {new Date(member.workoutPlans[0].created_at).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="pt-3 border-t border-slate-200">
                                                <p className="text-xs text-slate-500 mb-1">Latest Diet</p>
                                                <p className="text-sm font-medium text-slate-900">
                                                    {member.dietPlans?.[0]?.diet_details || 'Not assigned'}
                                                </p>
                                                {member.dietPlans?.[0] && (
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        Updated {new Date(member.dietPlans[0].created_at).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-slate-600" />
                                        Recent Activity
                                    </h3>
                                    <div className="space-y-3">
                                        {member.attendances?.slice(0, 5).map((att: any, index: number) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        att.status === 'present' ? 'bg-emerald-500' : 
                                                        att.status === 'absent' ? 'bg-red-500' : 'bg-amber-500'
                                                    }`} />
                                                    <span className="text-sm text-slate-900 capitalize">{att.status}</span>
                                                </div>
                                                <span className="text-sm text-slate-500">
                                                    {new Date(att.date).toLocaleDateString('en-US', { 
                                                        month: 'short', 
                                                        day: 'numeric' 
                                                    })}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Progress Analytics Tab */}
                        {activeTab === 'progress' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6 sm:space-y-8"
                            >
                                {progressChartData.length > 0 ? (
                                    <>
                                        {/* Weight Trend */}
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-3 sm:mb-4">Weight Trend</h3>
                                            <div className="h-64 sm:h-[300px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={progressChartData}>
                                                        <defs>
                                                            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                                                                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                                        <Area type="monotone" dataKey="weight" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        {/* Body Composition */}
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-3 sm:mb-4">Body Composition Progress</h3>
                                            <div className="h-64 sm:h-[300px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={progressChartData}>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                                        <Legend />
                                                        <Line type="monotone" dataKey="bodyFat" stroke="#ef4444" strokeWidth={2} name="Body Fat %" />
                                                        <Line type="monotone" dataKey="muscleMass" stroke="#10b981" strokeWidth={2} name="Muscle Mass (kg)" />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        {/* Progress Summary */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                            <div className="bg-linear-to-br from-indigo-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-indigo-100">
                                                <p className="text-xs sm:text-sm text-indigo-600 font-medium mb-1 sm:mb-2">Weight Change</p>
                                                <p className="text-2xl sm:text-3xl font-bold text-indigo-900">
                                                    {parseFloat(weightChange) > 0 ? '+' : ''}{weightChange} kg
                                                </p>
                                                <p className="text-[10px] sm:text-xs text-indigo-600 mt-1 sm:mt-2">Since first record</p>
                                            </div>
                                            <div className="bg-linear-to-br from-red-50 to-orange-50 rounded-xl p-4 sm:p-6 border border-red-100">
                                                <p className="text-xs sm:text-sm text-red-600 font-medium mb-1 sm:mb-2">Body Fat Change</p>
                                                <p className="text-2xl sm:text-3xl font-bold text-red-900">
                                                    {parseFloat(bodyFatChange) > 0 ? '+' : ''}{bodyFatChange}%
                                                </p>
                                                <p className="text-[10px] sm:text-xs text-red-600 mt-1 sm:mt-2">Since first record</p>
                                            </div>
                                            <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl p-4 sm:p-6 border border-emerald-100 sm:col-span-2 lg:col-span-1">
                                                <p className="text-xs sm:text-sm text-emerald-600 font-medium mb-1 sm:mb-2">Muscle Gain</p>
                                                <p className="text-2xl sm:text-3xl font-bold text-emerald-900">
                                                    +{(latestProgress.muscle_mass - firstProgress.muscle_mass).toFixed(1)} kg
                                                </p>
                                                <p className="text-xs text-emerald-600 mt-2">Since first record</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500 font-medium">No progress data available</p>
                                        <p className="text-sm text-slate-400 mt-1">Start tracking to see analytics</p>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Plans History Tab */}
                        {activeTab === 'plans' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4 sm:space-y-6"
                            >
                                {/* Workout Plans History */}
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                                        <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                                        Workout Plans History
                                    </h3>
                                    <div className="space-y-3">
                                        {member.workoutPlans?.length > 0 ? (
                                            member.workoutPlans.map((plan: any, index: number) => (
                                                <div key={plan.plan_id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                                                                #{member.workoutPlans.length - index}
                                                            </span>
                                                            {index === 0 && (
                                                                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
                                                                    CURRENT
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-xs text-slate-500">
                                                            {new Date(plan.created_at).toLocaleDateString('en-US', { 
                                                                month: 'short', 
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-900 whitespace-pre-wrap">{plan.plan_details}</p>
                                                    <p className="text-xs text-slate-500 mt-2">Updated by {plan.trainer?.name || 'Trainer'}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-slate-500 text-sm text-center py-8">No workout plans assigned yet</p>
                                        )}
                                    </div>
                                </div>

                                {/* Diet Plans History */}
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                                        <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                                        Diet Plans History
                                    </h3>
                                    <div className="space-y-3">
                                        {member.dietPlans?.length > 0 ? (
                                            member.dietPlans.map((plan: any, index: number) => (
                                                <div key={plan.diet_id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
                                                                #{member.dietPlans.length - index}
                                                            </span>
                                                            {index === 0 && (
                                                                <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                                                                    CURRENT
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-xs text-slate-500">
                                                            {new Date(plan.created_at).toLocaleDateString('en-US', { 
                                                                month: 'short', 
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-900 whitespace-pre-wrap">{plan.diet_details}</p>
                                                    <p className="text-xs text-slate-500 mt-2">Updated by {plan.trainer?.name || 'Trainer'}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-slate-500 text-sm text-center py-8">No diet plans assigned yet</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Attendance Tab */}
                        {activeTab === 'attendance' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4 sm:space-y-6"
                            >
                                {member.attendances?.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                            {/* Attendance Pie Chart */}
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3 sm:mb-4">Attendance Distribution</h3>
                                                <div className="h-64 sm:h-[300px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie
                                                                data={attendanceChartData}
                                                                cx="50%"
                                                                cy="50%"
                                                                labelLine={false}
                                                                label={(entry) => `${entry.name}: ${entry.value}`}
                                                                outerRadius={100}
                                                                fill="#8884d8"
                                                                dataKey="value"
                                                            >
                                                                {attendanceChartData.map((entry, index) => (
                                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                                ))}
                                                            </Pie>
                                                            <Tooltip />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>

                                            {/* Attendance Stats */}
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3 sm:mb-4">Statistics</h3>
                                                <div className="space-y-3 sm:space-y-4">
                                                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-emerald-700 font-medium">Present Days</span>
                                                            <span className="text-2xl font-bold text-emerald-900">
                                                                {attendanceChartData[0].value}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-red-700 font-medium">Absent Days</span>
                                                            <span className="text-2xl font-bold text-red-900">
                                                                {attendanceChartData[1].value}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-amber-700 font-medium">Leave Days</span>
                                                            <span className="text-2xl font-bold text-amber-900">
                                                                {attendanceChartData[2].value}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-blue-700 font-medium">Attendance Rate</span>
                                                            <span className="text-2xl font-bold text-blue-900">
                                                                {attendanceRate}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Attendance History */}
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3 sm:mb-4">Recent Attendance</h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                                                {member.attendances.map((att: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className={`p-4 rounded-xl border-2 text-center ${
                                                            att.status === 'present'
                                                                ? 'bg-emerald-50 border-emerald-200'
                                                                : att.status === 'absent'
                                                                ? 'bg-red-50 border-red-200'
                                                                : 'bg-amber-50 border-amber-200'
                                                        }`}
                                                    >
                                                        <p className="text-xs text-slate-600 mb-1">
                                                            {new Date(att.date).toLocaleDateString('en-US', { 
                                                                month: 'short', 
                                                                day: 'numeric' 
                                                            })}
                                                        </p>
                                                        <p className={`text-sm font-bold capitalize ${
                                                            att.status === 'present'
                                                                ? 'text-emerald-700'
                                                                : att.status === 'absent'
                                                                ? 'text-red-700'
                                                                : 'text-amber-700'
                                                        }`}>
                                                            {att.status}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500 font-medium">No attendance records</p>
                                        <p className="text-sm text-slate-400 mt-1">Start marking attendance to see data</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDetailsPage;
