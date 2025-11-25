import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Dumbbell,
    Utensils,
    TrendingUp,
    CalendarCheck,
    Save,
    AlertCircle,
    CheckCircle2,
    User,
    Mail,
    Phone,
    Calendar,
    X
} from 'lucide-react';
import {
    getAllMembers,
    updateMemberWorkout,
    updateMemberDiet,
    updateMemberProgress,
    createMemberAttendance
} from '../services/trainerService';
import type { Member } from '../services/memberService';
import { WORKOUT_TEMPLATES, DIET_TEMPLATES } from '../constants/planTemplates';

const UpdateMemberPage = () => {
    const { memberId } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState<Member | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [activeTab, setActiveTab] = useState<'workout' | 'diet' | 'progress' | 'attendance'>('workout');
    
    // Form states
    const [workoutPlan, setWorkoutPlan] = useState('');
    const [dietPlan, setDietPlan] = useState('');
    const [weight, setWeight] = useState('');
    const [bodyFat, setBodyFat] = useState('');
    const [muscleMass, setMuscleMass] = useState('');
    const [progressNotes, setProgressNotes] = useState('');
    const [attendanceStatus, setAttendanceStatus] = useState<'present' | 'absent' | 'leave'>('present');
    const [submitting, setSubmitting] = useState(false);

    // Fetch member data
    useEffect(() => {
        const fetchMember = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await getAllMembers();
                const foundMember = response.data.find(m => String(m.member_id) === memberId);
                
                if (!foundMember) {
                    setError('Member not found');
                    setTimeout(() => navigate('/trainer-dashboard'), 2000);
                    return;
                }
                
                setMember(foundMember);
            } catch (err: any) {
                console.error('Error fetching member:', err);
                setError(err.response?.data?.message || 'Failed to load member data');
            } finally {
                setLoading(false);
            }
        };

        fetchMember();
    }, [memberId, navigate]);

    // Handle workout plan submission
    const handleWorkoutSubmit = async () => {
        if (!workoutPlan.trim()) {
            setError('Please enter workout plan details');
            return;
        }

        try {
            setSubmitting(true);
            setError('');
            await updateMemberWorkout(memberId!, { plan_details: workoutPlan });
            setSuccessMessage('Workout plan updated successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (err: any) {
            console.error('Error updating workout:', err);
            setError(err.response?.data?.message || 'Failed to update workout plan');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle diet plan submission
    const handleDietSubmit = async () => {
        if (!dietPlan.trim()) {
            setError('Please enter diet plan details');
            return;
        }

        try {
            setSubmitting(true);
            setError('');
            await updateMemberDiet(memberId!, { diet_details: dietPlan });
            setSuccessMessage('Diet plan updated successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (err: any) {
            console.error('Error updating diet:', err);
            setError(err.response?.data?.message || 'Failed to update diet plan');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle progress submission
    const handleProgressSubmit = async () => {
        if (!weight || !bodyFat || !muscleMass) {
            setError('Please fill in all progress fields');
            return;
        }

        try {
            setSubmitting(true);
            setError('');
            await updateMemberProgress(memberId!, {
                weight: parseFloat(weight),
                body_fat: parseFloat(bodyFat),
                muscle_mass: parseFloat(muscleMass),
                notes: progressNotes || undefined
            });
            setSuccessMessage('Progress updated successfully!');
            setTimeout(() => {
                setSuccessMessage('');
                setWeight('');
                setBodyFat('');
                setMuscleMass('');
                setProgressNotes('');
            }, 3000);
        } catch (err: any) {
            console.error('Error updating progress:', err);
            setError(err.response?.data?.message || 'Failed to update progress');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle attendance submission
    const handleAttendanceSubmit = async () => {
        try {
            setSubmitting(true);
            setError('');
            await createMemberAttendance(memberId!, { status: attendanceStatus });
            setSuccessMessage(`Attendance marked as ${attendanceStatus}!`);
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (err: any) {
            console.error('Error marking attendance:', err);
            setError(err.response?.data?.message || 'Failed to mark attendance');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle template selection
    const handleWorkoutTemplate = (template: typeof WORKOUT_TEMPLATES[0]) => {
        setWorkoutPlan(template.details);
    };

    const handleDietTemplate = (template: typeof DIET_TEMPLATES[0]) => {
        setDietPlan(template.details);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading member data...</p>
                </div>
            </div>
        );
    }

    if (!member) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-slate-900 font-bold text-xl mb-2">Member Not Found</p>
                    <p className="text-slate-600">Redirecting back to dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24">
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">

                {/* Header with Back Button */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <button
                        onClick={() => navigate('/dashboard/trainer')}
                        className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shrink-0"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <div className="min-w-0">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Update Member Details</h1>
                        <p className="text-sm sm:text-base text-slate-500 truncate">Manage plans and progress for {member.name}</p>
                    </div>
                </div>

                {/* Error/Success Messages */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                        <p className="text-red-800 text-sm">{error}</p>
                    </motion.div>
                )}
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3"
                    >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <p className="text-emerald-800 text-sm">{successMessage}</p>
                    </motion.div>
                )}

                {/* Member Info Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg sm:text-xl shrink-0">
                            {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="flex items-center gap-2 min-w-0">
                                <User className="w-4 h-4 text-slate-400 shrink-0" />
                                <span className="text-slate-900 font-semibold text-sm sm:text-base truncate">{member.name}</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                                <span className="text-slate-600 text-xs sm:text-sm truncate">{member.email}</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                                <span className="text-slate-600 text-xs sm:text-sm">{member.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                <span className="text-slate-600 text-xs sm:text-sm">
                                    Joined {new Date(member.join_date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${
                            member.status === 'active' 
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-slate-100 text-slate-700'
                        }`}>
                            {member.status}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="border-b border-slate-100 flex overflow-x-auto scrollbar-hide">
                        {[
                            { id: 'workout', label: 'Workout Plan', icon: Dumbbell },
                            { id: 'diet', label: 'Diet Plan', icon: Utensils },
                            { id: 'progress', label: 'Progress', icon: TrendingUp },
                            { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors relative whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'text-slate-900 bg-slate-50'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
                                }`}
                            >
                                <tab.icon className="w-4 h-4 shrink-0" />
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 sm:p-6">
                        {/* Workout Tab */}
                        {activeTab === 'workout' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4 sm:space-y-6"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-slate-900 mb-2">
                                        Select Template (Optional)
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            const template = WORKOUT_TEMPLATES.find(t => t.name === e.target.value);
                                            if (template) handleWorkoutTemplate(template);
                                        }}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                    >
                                        <option value="">Choose a workout template...</option>
                                        {WORKOUT_TEMPLATES.map((template) => (
                                            <option key={template.name} value={template.name}>
                                                {template.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-900 mb-2">
                                        Workout Plan Details
                                    </label>
                                    <textarea
                                        value={workoutPlan}
                                        onChange={(e) => setWorkoutPlan(e.target.value)}
                                        rows={12}
                                        placeholder="Enter detailed workout plan..."
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                                    />
                                </div>

                                <button
                                    onClick={handleWorkoutSubmit}
                                    disabled={submitting || !workoutPlan.trim()}
                                    className="w-full bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Save Workout Plan
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        )}

                        {/* Diet Tab */}
                        {activeTab === 'diet' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4 sm:space-y-6"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-slate-900 mb-2">
                                        Select Template (Optional)
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            const template = DIET_TEMPLATES.find(t => t.name === e.target.value);
                                            if (template) handleDietTemplate(template);
                                        }}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                    >
                                        <option value="">Choose a diet template...</option>
                                        {DIET_TEMPLATES.map((template) => (
                                            <option key={template.name} value={template.name}>
                                                {template.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-900 mb-2">
                                        Diet Plan Details
                                    </label>
                                    <textarea
                                        value={dietPlan}
                                        onChange={(e) => setDietPlan(e.target.value)}
                                        rows={12}
                                        placeholder="Enter detailed diet plan..."
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                                    />
                                </div>

                                <button
                                    onClick={handleDietSubmit}
                                    disabled={submitting || !dietPlan.trim()}
                                    className="w-full bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Save Diet Plan
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        )}

                        {/* Progress Tab */}
                        {activeTab === 'progress' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4 sm:space-y-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-900 mb-2">
                                            Weight (kg)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            placeholder="e.g., 75.5"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-900 mb-2">
                                            Body Fat (%)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={bodyFat}
                                            onChange={(e) => setBodyFat(e.target.value)}
                                            placeholder="e.g., 18.5"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-900 mb-2">
                                            Muscle Mass (kg)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={muscleMass}
                                            onChange={(e) => setMuscleMass(e.target.value)}
                                            placeholder="e.g., 35.2"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-900 mb-2">
                                        Progress Notes (Optional)
                                    </label>
                                    <textarea
                                        value={progressNotes}
                                        onChange={(e) => setProgressNotes(e.target.value)}
                                        rows={6}
                                        placeholder="Add notes about progress, achievements, or concerns..."
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                                    />
                                </div>

                                <button
                                    onClick={handleProgressSubmit}
                                    disabled={submitting || !weight || !bodyFat || !muscleMass}
                                    className="w-full bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Save Progress Update
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        )}

                        {/* Attendance Tab */}
                        {activeTab === 'attendance' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4 sm:space-y-6"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-slate-900 mb-4">
                                        Mark Attendance for Today
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                        {[
                                            { value: 'present', label: 'Present', color: 'emerald', icon: CheckCircle2 },
                                            { value: 'absent', label: 'Absent', color: 'red', icon: X },
                                            { value: 'leave', label: 'On Leave', color: 'amber', icon: Calendar },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => setAttendanceStatus(option.value as any)}
                                                className={`p-4 sm:p-6 rounded-xl border-2 transition-all ${
                                                    attendanceStatus === option.value
                                                        ? `border-${option.color}-500 bg-${option.color}-50`
                                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                                }`}
                                            >
                                                <option.icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 ${
                                                    attendanceStatus === option.value
                                                        ? `text-${option.color}-600`
                                                        : 'text-slate-400'
                                                }`} />
                                                <div className={`text-sm sm:text-base font-semibold ${
                                                    attendanceStatus === option.value
                                                        ? `text-${option.color}-900`
                                                        : 'text-slate-900'
                                                }`}>
                                                    {option.label}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
                                    <p className="text-blue-800 text-xs sm:text-sm">
                                        <strong>Note:</strong> Attendance can only be marked once per day per member.
                                    </p>
                                </div>

                                <button
                                    onClick={handleAttendanceSubmit}
                                    disabled={submitting}
                                    className="w-full bg-slate-900 text-white px-6 py-3 rounded-xl text-sm sm:text-base font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Marking...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Mark Attendance
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateMemberPage;
