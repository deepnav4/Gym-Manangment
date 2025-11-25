import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    Calendar,
    Cake,
    Users as GenderIcon,
    Activity,
    Edit2,
    Save,
    X,
    CheckCircle2,
    AlertCircle,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getMemberProfile } from '../services/memberService';
import type { Member } from '../services/memberService';

const MemberProfilePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [memberData, setMemberData] = useState<Member | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Form state for editing (when backend supports it)
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await getMemberProfile();
            setMemberData(response.data);
            
            // Pre-fill edit form
            setEditForm({
                name: response.data.name,
                email: response.data.email,
                phone: response.data.phone,
                age: String(response.data.age),
            });
        } catch (err: any) {
            console.error('Error fetching profile:', err);
            setError(err.response?.data?.message || 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel editing, reset form
            if (memberData) {
                setEditForm({
                    name: memberData.name,
                    email: memberData.email,
                    phone: memberData.phone,
                    age: String(memberData.age),
                });
            }
        }
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        // TODO: Implement update profile API call when backend supports it
        setSuccessMessage('Profile update coming soon! Backend API not yet implemented.');
        setTimeout(() => {
            setSuccessMessage('');
            setIsEditing(false);
        }, 3000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 max-w-md w-full text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Failed to Load Profile</h2>
                    <p className="text-slate-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/dashboard/member')}
                        className="px-6 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (!memberData) return null;

    const profileFields = [
        {
            icon: User,
            label: 'Full Name',
            value: memberData.name,
            editKey: 'name' as const,
            editable: true
        },
        {
            icon: Mail,
            label: 'Email Address',
            value: memberData.email,
            editKey: 'email' as const,
            editable: false // Usually email shouldn't be editable
        },
        {
            icon: Phone,
            label: 'Phone Number',
            value: memberData.phone,
            editKey: 'phone' as const,
            editable: true
        },
        {
            icon: Cake,
            label: 'Age',
            value: `${memberData.age} years`,
            editKey: 'age' as const,
            editable: true
        },
        {
            icon: GenderIcon,
            label: 'Gender',
            value: memberData.gender.charAt(0).toUpperCase() + memberData.gender.slice(1),
            editKey: null,
            editable: false
        },
        {
            icon: Calendar,
            label: 'Member Since',
            value: new Date(memberData.join_date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }),
            editKey: null,
            editable: false
        },
        {
            icon: Activity,
            label: 'Status',
            value: memberData.status.charAt(0).toUpperCase() + memberData.status.slice(1),
            editKey: null,
            editable: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 lg:p-8 pt-24">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header with Back Button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard/member')}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Profile</h1>
                            <p className="text-slate-500">View and manage your account information</p>
                        </div>
                    </div>
                </div>

                {/* Success/Error Messages */}
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

                {/* Profile Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    
                    {/* Profile Header */}
                    <div className="bg-linear-to-br from-slate-900 to-slate-800 p-8 text-center relative">
                        <div className="absolute top-6 right-6">
                            {!isEditing ? (
                                <button
                                    onClick={handleEditToggle}
                                    className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2 text-sm font-medium border border-white/20"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2 text-sm font-medium"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleEditToggle}
                                        className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2 text-sm font-medium border border-white/20"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border-4 border-white/20">
                            <span className="text-3xl font-bold text-white">
                                {memberData.name.split(' ').map(n => n[0]).join('')}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-1">{memberData.name}</h2>
                        <p className="text-slate-300">{memberData.email}</p>
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <div className={`w-2 h-2 rounded-full ${
                                memberData.status === 'active' ? 'bg-emerald-400' : 'bg-slate-400'
                            }`}></div>
                            <span className="text-sm font-medium text-white capitalize">{memberData.status}</span>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Personal Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {profileFields.map((field, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <field.icon className="w-4 h-4" />
                                        <span className="font-medium">{field.label}</span>
                                    </div>
                                    
                                    {isEditing && field.editable && field.editKey ? (
                                        <input
                                            type={field.editKey === 'email' ? 'email' : field.editKey === 'age' ? 'number' : 'text'}
                                            value={editForm[field.editKey]}
                                            onChange={(e) => setEditForm({ ...editForm, [field.editKey!]: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900 font-medium">
                                            {field.value}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    <div className="border-t border-slate-100 p-8 bg-slate-50/50">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Account Information</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Member ID</span>
                                <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                                    #{memberData.member_id}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Account Created</span>
                                <span className="font-medium text-slate-900">
                                    {new Date(memberData.join_date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Days as Member</span>
                                <span className="font-medium text-slate-900">
                                    {Math.floor((new Date().getTime() - new Date(memberData.join_date).getTime()) / (1000 * 60 * 60 * 24))} days
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">Profile Update Notice</p>
                        <p>Currently, profile editing is in development. Contact your gym administrator to update your personal information.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberProfilePage;
