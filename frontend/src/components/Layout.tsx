import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-50 selection:text-indigo-900 flex flex-col">

            {/* Navbar - Hidden on Auth pages if desired, or kept minimal. 
          User asked to PERSIST it, so we keep it. */}
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || isAuthPage ? 'bg-white/90 backdrop-blur-md border-b border-slate-100' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-slate-900 rounded-sm rotate-45" />
                            <span className="font-bold text-xl tracking-tight text-slate-900">GymFlow</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
                            <Link to="/#product" className="hover:text-slate-900 transition-colors">Product</Link>
                            <Link to="/#solutions" className="hover:text-slate-900 transition-colors">Solutions</Link>
                            <Link to="/#pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link to="/login" className="hidden md:block text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                                Log in
                            </Link>
                            <Link to="/signup" className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-900/20">
                                Get Access
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow pt-20">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-100 text-slate-500 text-sm bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-slate-900 rounded-sm rotate-45" />
                        <span className="font-semibold text-slate-900">GymFlow</span>
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Instagram</a>
                    </div>
                    <div>
                        &copy; 2025 GymFlow Inc.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
