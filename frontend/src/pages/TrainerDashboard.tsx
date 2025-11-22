import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    UserCheck,
    TrendingUp,
    Search,
    Filter,
    X,
    Dumbbell,
    Utensils,
    FileText,
    CheckCircle2
} from 'lucide-react';

// Mock Data
const membersData = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', status: 'Active', plan: 'Weight Loss', lastActive: '2 hours ago', progress: 75 },
    { id: 2, name: 'Michael Chen', email: 'm.chen@example.com', status: 'Active', plan: 'Muscle Gain', lastActive: 'Today', progress: 45 },
    { id: 3, name: 'Emma Wilson', email: 'emma.w@example.com', status: 'Inactive', plan: 'Maintenance', lastActive: '3 days ago', progress: 12 },
    { id: 4, name: 'James Rodriguez', email: 'j.rod@example.com', status: 'Active', plan: 'Athletic Perf.', lastActive: 'Yesterday', progress: 88 },
    { id: 5, name: 'Lisa Park', email: 'lisa.p@example.com', status: 'Active', plan: 'Weight Loss', lastActive: '5 hours ago', progress: 32 },
];

const TrainerDashboard = () => {
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [activeModalTab, setActiveModalTab] = useState('workout');

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 lg:p-8 pt-24">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Trainer Dashboard</h1>
                        <p className="text-slate-500">Manage your clients and their progress.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                        + Add New Member
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Total Members', value: '24', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { label: 'Active Today', value: '18', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Avg. Progress', value: '68%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-500">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Members Table Section */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

                    {/* Toolbar */}
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-900">Client List</h3>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search members..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                />
                            </div>
                            <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4">Member Name</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Current Plan</th>
                                    <th className="px-6 py-4">Progress</th>
                                    <th className="px-6 py-4">Last Active</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {membersData.map((member) => (
                                    <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{member.name}</div>
                                                    <div className="text-xs text-slate-500">{member.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${member.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{member.plan}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${member.progress}%` }} />
                                                </div>
                                                <span className="text-xs font-medium text-slate-600">{member.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">{member.lastActive}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedMember(member)}
                                                className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                            >
                                                Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Manage Member Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMember(null)}
                            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Manage Client</h2>
                                    <p className="text-sm text-slate-500">Updating plan for <span className="font-semibold text-slate-900">{selectedMember.name}</span></p>
                                </div>
                                <button
                                    onClick={() => setSelectedMember(null)}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Tabs */}
                            <div className="flex border-b border-slate-100">
                                {[
                                    { id: 'workout', label: 'Workout Plan', icon: Dumbbell },
                                    { id: 'diet', label: 'Diet Plan', icon: Utensils },
                                    { id: 'progress', label: 'Update Progress', icon: FileText },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveModalTab(tab.id)}
                                        className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeModalTab === tab.id
                                                ? 'bg-white text-slate-900 border-b-2 border-slate-900'
                                                : 'bg-slate-50/30 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                {activeModalTab === 'workout' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-900 mb-2">Plan Description</label>
                                            <textarea
                                                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                                                placeholder="Enter detailed workout plan..."
                                                defaultValue="Focus on hypertrophy. Split: Push/Pull/Legs/Rest. 
Day 1: Push (Chest/Shoulders/Triceps)
- Bench Press 4x8
- OHP 3x10..."
                                            />
                                        </div>
                                        <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Save Workout Plan
                                        </button>
                                    </div>
                                )}

                                {activeModalTab === 'diet' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-900 mb-2">Dietary Requirements</label>
                                            <textarea
                                                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                                                placeholder="Enter diet plan details..."
                                                defaultValue="Target: 2400 kcal. High Protein.
Breakfast: Oatmeal + Whey
Lunch: Chicken + Rice
Dinner: Fish + Veggies"
                                            />
                                        </div>
                                        <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Save Diet Plan
                                        </button>
                                    </div>
                                )}

                                {activeModalTab === 'progress' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-900 mb-2">Current Weight (kg)</label>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                                    defaultValue="75.5"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-slate-900 mb-2">Body Fat %</label>
                                                <input
                                                    type="number"
                                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                                    defaultValue="18.2"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-900 mb-2">Trainer Notes</label>
                                            <textarea
                                                className="w-full h-24 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                                                placeholder="Add notes about progress..."
                                            />
                                        </div>
                                        <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Update Progress
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TrainerDashboard;
