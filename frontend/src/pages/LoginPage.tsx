import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { login, trainerLogin } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState<'member' | 'trainer'>('member');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const credentials = {
                email: formData.email,
                password: formData.password
            };

            // Call appropriate login function based on user type
            const response = userType === 'member' 
                ? await login(credentials)
                : await trainerLogin(credentials);

            console.log('Login response:', response);

            if (response.success) {
                // Update auth context
                authLogin(response.user, response.token);
                
                // Small delay to ensure state updates
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Redirect to appropriate dashboard
                const dashboardPath = userType === 'member' ? '/dashboard/member' : '/dashboard/trainer';
                console.log('Navigating to:', dashboardPath);
                navigate(dashboardPath, { replace: true });
            }
        } catch (err: any) {
            console.error('Login error:', err);
            
            // Handle different types of errors
            if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
                setError('Network error. Please check your connection and ensure the backend server is running.');
            } else if (err.response) {
                // Server responded with error
                const errorMessage = err.response.data?.message || 
                                   err.response.data?.errors?.[0]?.msg ||
                                   'Login failed. Please try again.';
                setError(errorMessage);
            } else if (err.request) {
                // Request made but no response
                setError('No response from server. Please check if the backend is running.');
            } else {
                // Something else happened
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-8"
            >
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Please sign in to your account
                    </p>
                </div>

                {/* User Type Toggle */}
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setUserType('member')}
                        className={`py-2.5 text-sm font-medium rounded-lg transition-all ${userType === 'member'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        Member
                    </button>
                    <button
                        type="button"
                        onClick={() => setUserType('trainer')}
                        className={`py-2.5 text-sm font-medium rounded-lg transition-all ${userType === 'trainer'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        Trainer
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800">{error}</p>
                    </motion.div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 sm:text-sm transition-all"
                                    placeholder="Email address"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 sm:text-sm transition-all"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-slate-900 hover:text-slate-700">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20 transition-all"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Sign in as {userType === 'member' ? 'Member' : 'Trainer'}
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </button>
                    </div>
                </form>

                <p className="mt-2 text-center text-sm text-slate-500">
                    Not a member?{' '}
                    <Link to="/signup" className="font-medium text-slate-900 hover:text-slate-700">
                        Start your 14-day free trial
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
