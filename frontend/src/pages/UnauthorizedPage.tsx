import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldX, Home } from 'lucide-react';

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md"
            >
                <div className="mb-8">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldX className="w-12 h-12 text-red-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Access Denied</h1>
                    <p className="text-lg text-slate-600 mb-8">
                        You don't have permission to access this page.
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Go to Home
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default UnauthorizedPage;
