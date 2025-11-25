import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, ChevronDown, User, LayoutDashboard, FileText, BookOpen, Dumbbell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GymFlowLogo from '../components/GymFlowLogo';


const Layout = () => {
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useAuth();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const isLandingPage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown-container')) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setDropdownOpen(false);
        logout();
    };

    const handleNavigation = (path: string) => {
        setDropdownOpen(false);
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-50 selection:text-indigo-900 flex flex-col">

            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || isAuthPage ? 'bg-white/90 backdrop-blur-md border-b border-slate-100' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <GymFlowLogo size="md" variant={scrolled || isAuthPage ? 'light' : 'light'} />
                        </Link>

                        {!isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link to="/how-it-works" className="hidden md:block text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                                    How It Works
                                </Link>
                                <Link to="/login" className="hidden md:block text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                                    Log in
                                </Link>
                                <Link to="/signup" className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-900/20">
                                    Get Access
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/how-it-works" className="hidden md:block text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                                    Guide
                                </Link>
                                
                                {/* User Dropdown */}
                                <div className="relative dropdown-container">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
                                            <span className="text-xs font-bold text-white">
                                                {user?.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <span className="hidden md:block text-sm font-medium text-slate-900">
                                            {user?.name}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                                            {/* User Info */}
                                            <div className="px-4 py-3 border-b border-slate-100">
                                                <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                                                <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                                            </div>

                                            {/* Member Menu Items */}
                                            {user?.role === 'member' && (
                                                <>
                                                    <button
                                                        onClick={() => handleNavigation('/dashboard/member')}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                                    >
                                                        <LayoutDashboard className="w-4 h-4" />
                                                        Dashboard
                                                    </button>
                                                    <button
                                                        onClick={() => handleNavigation('/my-plans')}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                        My Plans
                                                    </button>
                                                    <button
                                                        onClick={() => handleNavigation('/profile')}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                                    >
                                                        <User className="w-4 h-4" />
                                                        Profile
                                                    </button>
                                                </>
                                            )}

                                            {/* Trainer Menu Items */}
                                            {user?.role === 'trainer' && (
                                                <button
                                                    onClick={() => handleNavigation('/dashboard/trainer')}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                                >
                                                    <Dumbbell className="w-4 h-4" />
                                                    Dashboard
                                                </button>
                                            )}

                                            {/* Guide Link */}
                                            <button
                                                onClick={() => handleNavigation('/how-it-works')}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100"
                                            >
                                                <BookOpen className="w-4 h-4" />
                                                How It Works
                                            </button>

                                            {/* Logout */}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="grow pt-20">
                <Outlet />
            </main>

            {/* Footer - Hidden on Landing Page */}
            {!isLandingPage && (
                <footer className="py-12 border-t border-slate-100 text-slate-500 text-sm bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="flex items-center gap-3">
                                <GymFlowLogo size="sm" variant="light" />
                                {/* <span className="text-sm font-semibold text-slate-700">GymFlow</span> */}
                            </Link>
                            <p className="hidden sm:block text-sm text-slate-500">Build stronger routines.</p>
                        </div>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
                            <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
                            <a href="#" className="hover:text-slate-900 transition-colors">Instagram</a>
                        </div>
                        <div className="flex flex-col items-center md:items-end gap-1">
                            <p>&copy; 2025 GymFlow Inc.</p>
                            <p className="text-xs">
                                Designed & Developed by{' '}
                                <a
                                    href="https://navdeep-site.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-slate-900 hover:text-slate-700 transition-colors italic"
                                >
                                    Navdeep
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default Layout;
