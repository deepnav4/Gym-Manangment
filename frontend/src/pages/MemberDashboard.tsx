import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Dumbbell,
    Utensils,
    Calendar,
    TrendingUp,
    Clock,
    ChevronRight,
    Trophy
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

// Mock Data
const progressData = [
    { date: 'Week 1', weight: 82, bodyFat: 22 },
    { date: 'Week 2', weight: 81.5, bodyFat: 21.8 },
    { date: 'Week 3', weight: 80.8, bodyFat: 21.5 },
    { date: 'Week 4', weight: 80.2, bodyFat: 21.2 },
    { date: 'Week 5', weight: 79.5, bodyFat: 20.8 },
    { date: 'Week 6', weight: 79.0, bodyFat: 20.5 },
];

const upcomingWorkouts = [
    { day: 'Today', title: 'Upper Body Power', duration: '60 min', time: '5:00 PM' },
    { day: 'Tomorrow', title: 'Active Recovery', duration: '30 min', time: 'Anytime' },
    { day: 'Wed', title: 'Lower Body Strength', duration: '75 min', time: '6:00 PM' },
];

const MemberDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 lg:p-8 pt-24">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Hello, Alex</h1>
                        <p className="text-slate-500">Here's your daily fitness breakdown.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-2 rounded-full border border-slate-100 shadow-sm">
                        <div className="px-4 py-1.5 bg-slate-900 text-white text-sm font-bold rounded-full">
                            Member
                        </div>
                        <span className="text-sm text-slate-500 pr-2">ID: #88392</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Current Weight', value: '79.0 kg', change: '-3.0 kg', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { label: 'Attendance', value: '92%', change: '+4%', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Workout Streak', value: '12 Days', change: 'Best', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
                        { label: 'Body Fat', value: '20.5%', change: '-1.5%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
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
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={progressData}>
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
                            </div>
                        </motion.div>

                        {/* Tabs Section */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="flex border-b border-slate-100">
                                {['overview', 'workout', 'diet'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-4 text-sm font-bold capitalize transition-colors ${activeTab === tab
                                                ? 'bg-slate-50 text-slate-900 border-b-2 border-slate-900'
                                                : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6 min-h-[300px]">
                                {activeTab === 'overview' && (
                                    <div className="space-y-6">
                                        <h4 className="font-bold text-slate-900">Recent Activity</h4>
                                        <div className="space-y-4">
                                            {[1, 2, 3].map((_, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                                        <Dumbbell className="w-5 h-5 text-indigo-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-bold text-slate-900">Upper Body Hypertrophy</div>
                                                        <div className="text-xs text-slate-500">Completed yesterday at 6:30 PM</div>
                                                    </div>
                                                    <div className="text-sm font-bold text-emerald-600">Done</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'workout' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-slate-900">Current Plan: "Summer Shred"</h4>
                                            <span className="text-xs font-medium px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">Week 4 of 12</span>
                                        </div>
                                        <div className="prose prose-slate max-w-none">
                                            <p className="text-slate-500 text-sm">
                                                Focus on compound movements with progressive overload. Maintain intensity and track rest periods.
                                            </p>
                                            <div className="mt-4 grid gap-4">
                                                {['Bench Press: 4x8 @ 75kg', 'Incline DB Press: 3x12 @ 24kg', 'Cable Flyes: 3x15'].map((exercise, i) => (
                                                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                                        <span className="text-sm font-medium text-slate-700">{exercise}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'diet' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-slate-900">Daily Targets</h4>
                                            <div className="flex gap-2">
                                                <span className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full">2400 kcal</span>
                                                <span className="text-xs font-medium px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">180g Protein</span>
                                            </div>
                                        </div>
                                        <div className="grid gap-4">
                                            {[
                                                { meal: 'Breakfast', items: 'Oatmeal, Whey Protein, Berries', cal: 450 },
                                                { meal: 'Lunch', items: 'Chicken Breast, Quinoa, Broccoli', cal: 650 },
                                                { meal: 'Dinner', items: 'Salmon, Sweet Potato, Asparagus', cal: 550 },
                                            ].map((meal, i) => (
                                                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                                            <Utensils className="w-5 h-5 text-orange-500" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900">{meal.meal}</div>
                                                            <div className="text-xs text-slate-500">{meal.items}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-bold text-slate-900">{meal.cal} kcal</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Schedule & Quick Actions) */}
                    <div className="space-y-8">

                        {/* Upcoming Schedule */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Upcoming Schedule</h3>
                            <div className="space-y-6">
                                {upcomingWorkouts.map((workout, i) => (
                                    <div key={i} className="relative pl-6 border-l-2 border-slate-100 pb-6 last:pb-0">
                                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-white" />
                                        <div className="text-xs font-bold text-indigo-600 mb-1">{workout.day}</div>
                                        <div className="font-bold text-slate-900 mb-1">{workout.title}</div>
                                        <div className="flex items-center gap-4 text-xs text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {workout.duration}
                                            </span>
                                            <span>{workout.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-slate-900 p-6 rounded-3xl shadow-xl shadow-slate-900/20 text-white">
                            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium text-left flex justify-between items-center transition-colors">
                                    Log Today's Workout
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium text-left flex justify-between items-center transition-colors">
                                    Update Body Stats
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium text-left flex justify-between items-center transition-colors">
                                    Contact Trainer
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDashboard;
