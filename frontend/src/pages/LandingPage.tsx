import { motion } from 'framer-motion';
import {
    Activity,
    Users,
    Calendar,
    BarChart3,
    ArrowRight
} from 'lucide-react';
import HeroImage from '../assets/light-dashboard.png';

const LandingPage = () => {
    return (
        <>

            {/* Hero Section */}
            <section className="relative pt-12 pb-20 lg:pt-28 lg:pb-32 z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            System Operational v2.4
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-slate-900">
                            The Operating System <br /> for Modern Fitness.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Seamlessly manage members, workouts, and growth.
                            Designed for studios that demand perfection.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                            <button className="group px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20">
                                Start Free Trial
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 bg-white text-slate-600 font-medium rounded-full border border-slate-200 hover:bg-slate-50 transition-all">
                                Schedule Demo
                            </button>
                        </div>
                    </motion.div>

                    {/* Hero Image - Simplified Container */}
                    <div className="relative max-w-5xl mx-auto">
                        <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-200/50 bg-white">
                            <img
                                src={HeroImage}
                                alt="Platform Interface"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="py-32 relative z-10 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Engineered for performance.</h2>
                        <p className="text-slate-500 max-w-xl text-lg">
                            Every tool you need to run a world-class facility, unified in one beautiful interface.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Large Card */}
                        <div className="md:col-span-2 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 hover:border-slate-200 transition-all group">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100">
                                <Users className="w-6 h-6 text-slate-900" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900">Member Intelligence</h3>
                            <p className="text-slate-500 leading-relaxed max-w-md">
                                Go beyond basic profiles. Track attendance patterns, health metrics, and engagement scores automatically. Know your members better than they know themselves.
                            </p>
                        </div>

                        {/* Tall Card */}
                        <div className="md:row-span-2 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 hover:border-slate-200 transition-all group flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100">
                                    <Activity className="w-6 h-6 text-slate-900" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900">Advanced Workout Builder</h3>
                                <p className="text-slate-500 leading-relaxed mb-8">
                                    Create complex periodization plans, supersets, and dropsets with a drag-and-drop interface designed for pros.
                                </p>
                            </div>
                            <div className="w-full h-32 bg-gradient-to-br from-white to-transparent rounded-xl border border-slate-100" />
                        </div>

                        {/* Small Card 1 */}
                        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:border-slate-200 transition-all group">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                                <Calendar className="w-6 h-6 text-slate-900" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">Smart Scheduling</h3>
                            <p className="text-slate-500 text-sm">Automated booking & waitlists.</p>
                        </div>

                        {/* Small Card 2 */}
                        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:border-slate-200 transition-all group">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                                <BarChart3 className="w-6 h-6 text-slate-900" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">Revenue Analytics</h3>
                            <p className="text-slate-500 text-sm">Real-time financial insights.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Minimal Stats */}
            <section className="py-20 border-y border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { label: "Active Gyms", value: "2,000+" },
                            { label: "Members Managed", value: "1.5M+" },
                            { label: "Workouts Logged", value: "50M+" },
                            { label: "Uptime", value: "99.99%" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-slate-900">{stat.value}</div>
                                <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 relative overflow-hidden bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter text-slate-900">
                        Ready to elevate your standard?
                    </h2>
                    <p className="text-xl text-slate-500 mb-12">
                        Join the elite fitness brands using GymFlow to power their operations.
                    </p>
                    <button className="px-10 py-5 bg-slate-900 text-white text-lg font-bold rounded-full hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
                        Get Started Now
                    </button>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
