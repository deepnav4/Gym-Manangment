import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    UserCheck,
    TrendingUp,
    Search,
    Filter,
    AlertCircle,
    BarChart3
} from 'lucide-react';
import { getAllMembers } from '../services/trainerService';
import type { Member } from '../services/memberService';

const TrainerDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State for fetched data
    const [members, setMembers] = useState<Member[]>([]);

    // Fetch all members on component mount
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await getAllMembers();
                setMembers(response.data);
            } catch (err: any) {
                console.error('Error fetching members:', err);
                setError(err.response?.data?.message || 'Failed to load members');
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    // Calculate stats from real data
    const calculateStats = () => {
        const activeMembers = members.filter(m => m.status === 'active');
        return {
            totalMembers: members.length,
            activeToday: activeMembers.length,
            avgProgress: members.length > 0 ? Math.round((activeMembers.length / members.length) * 100) : 0
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading members...</p>
                </div>
            </div>
        );
    }

    const stats = calculateStats();

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

                {/* Error/Success Messages */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Trainer Dashboard</h1>
                        <p className="text-sm sm:text-base text-slate-500">Manage your clients and their progress.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {[
                        { label: 'Total Members', value: String(stats.totalMembers), icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { label: 'Active Members', value: String(stats.activeToday), icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Active Rate', value: `${stats.avgProgress}%`, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
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
                                    <th className="px-6 py-4">Details</th>
                                    <th className="px-6 py-4">Phone</th>
                                    <th className="px-6 py-4">Join Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {members.length > 0 ? (
                                    members.map((member) => (
                                        <tr key={member.member_id} className="hover:bg-slate-50/50 transition-colors group">
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
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                                                    member.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        member.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                                                    }`} />
                                                    {member.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                Age: {member.age} | {member.gender}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                {member.phone}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {new Date(member.join_date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => navigate(`/member-details/${member.member_id}`)}
                                                        className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
                                                    >
                                                        <BarChart3 className="w-3.5 h-3.5" />
                                                        Analytics
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/update-member/${member.member_id}`)}
                                                        className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                                    >
                                                        Manage
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                            <p className="text-slate-500 font-medium">No members found</p>
                                            <p className="text-sm text-slate-400 mt-1">Members will appear here once they sign up</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerDashboard;
