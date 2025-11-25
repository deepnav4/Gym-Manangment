import { motion } from 'framer-motion';
import { 
    UserPlus, 
    LogIn, 
    Dumbbell, 
    Users, 
    Calendar, 
    TrendingUp,
    ClipboardList,
    Utensils,
    CheckCircle2,
    ArrowRight,
    BookOpen,
    Target
} from 'lucide-react';

const HowItWorksPage = () => {
    const memberSteps = [
        {
            icon: UserPlus,
            title: "Sign Up",
            description: "Create your account by providing basic details like name, email, age, and contact information.",
            color: "indigo"
        },
        {
            icon: LogIn,
            title: "Login to Dashboard",
            description: "Access your personalized member dashboard to view all your fitness information in one place.",
            color: "blue"
        },
        {
            icon: Dumbbell,
            title: "View Workout Plans",
            description: "Your assigned trainer will create customized workout plans tailored to your fitness goals.",
            color: "purple"
        },
        {
            icon: Utensils,
            title: "Follow Diet Plans",
            description: "Get personalized nutrition guidance with detailed meal plans from your trainer.",
            color: "emerald"
        },
        {
            icon: TrendingUp,
            title: "Track Progress",
            description: "Monitor your fitness journey with progress metrics including weight, body fat, and muscle mass.",
            color: "amber"
        },
        {
            icon: Calendar,
            title: "Check Attendance",
            description: "View your gym attendance history and maintain consistency in your fitness routine.",
            color: "rose"
        }
    ];

    const trainerSteps = [
        {
            icon: LogIn,
            title: "Login as Trainer",
            description: "Access your trainer dashboard with your credentials to manage all your clients.",
            color: "indigo"
        },
        {
            icon: Users,
            title: "View All Members",
            description: "See a comprehensive list of all gym members assigned to you with their current status.",
            color: "blue"
        },
        {
            icon: ClipboardList,
            title: "Manage Member Details",
            description: "Click 'Manage' on any member to access their dedicated update page with full details.",
            color: "purple"
        },
        {
            icon: Dumbbell,
            title: "Assign Workout Plans",
            description: "Create custom workout routines or use pre-built templates for quick assignment.",
            color: "emerald"
        },
        {
            icon: Utensils,
            title: "Create Diet Plans",
            description: "Design personalized meal plans or select from nutrition templates to guide members.",
            color: "amber"
        },
        {
            icon: TrendingUp,
            title: "Update Progress",
            description: "Record member measurements like weight, body fat percentage, and muscle mass regularly.",
            color: "rose"
        },
        {
            icon: Calendar,
            title: "Mark Attendance",
            description: "Track daily attendance with three status options: Present, Absent, or Leave.",
            color: "cyan"
        }
    ];

    const features = [
        {
            icon: Target,
            title: "Goal-Oriented Approach",
            description: "Track and achieve your fitness goals with structured plans and regular progress monitoring."
        },
        {
            icon: BookOpen,
            title: "Easy to Use",
            description: "Intuitive interface designed for both members and trainers with minimal learning curve."
        },
        {
            icon: CheckCircle2,
            title: "Complete Management",
            description: "Everything you need in one place - workouts, diet, attendance, and progress tracking."
        }
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; text: string; icon: string }> = {
            indigo: { bg: "bg-indigo-50", text: "text-indigo-900", icon: "text-indigo-600" },
            blue: { bg: "bg-blue-50", text: "text-blue-900", icon: "text-blue-600" },
            purple: { bg: "bg-purple-50", text: "text-purple-900", icon: "text-purple-600" },
            emerald: { bg: "bg-emerald-50", text: "text-emerald-900", icon: "text-emerald-600" },
            amber: { bg: "bg-amber-50", text: "text-amber-900", icon: "text-amber-600" },
            rose: { bg: "bg-rose-50", text: "text-rose-900", icon: "text-rose-600" },
            cyan: { bg: "bg-cyan-50", text: "text-cyan-900", icon: "text-cyan-600" }
        };
        return colors[color] || colors.indigo;
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 lg:p-8 pt-24">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        How It Works
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Complete guide to using GymFlow for members and trainers
                    </p>
                </motion.div>

                {/* Key Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-600">{feature.description}</p>
                        </div>
                    ))}
                </motion.div>

                {/* For Members */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
                            <Users className="w-4 h-4 text-indigo-600" />
                            <span className="text-sm font-semibold text-indigo-900">For Members</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                            Your Fitness Journey Simplified
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Follow these simple steps to get started and make the most of your gym membership
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {memberSteps.map((step, index) => {
                            const colors = getColorClasses(step.color);
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                                            <step.icon className={`w-6 h-6 ${colors.icon}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-bold text-slate-400">STEP {index + 1}</span>
                                            </div>
                                            <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Member Quick Tips */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="bg-linear-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-8"
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                            Quick Tips for Members
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="flex items-start gap-3">
                                <ArrowRight className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                                <span className="text-slate-700">Check your dashboard daily for new plans from your trainer</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ArrowRight className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                                <span className="text-slate-700">Visit "My Plans" page for detailed workout and diet information</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ArrowRight className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                                <span className="text-slate-700">Track your attendance to maintain consistency in your routine</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ArrowRight className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                                <span className="text-slate-700">Monitor your progress metrics to see how far you've come</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* For Trainers */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-4">
                            <Dumbbell className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-semibold text-emerald-900">For Trainers</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                            Manage Your Clients Effectively
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Comprehensive tools to help you guide your clients toward their fitness goals
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainerSteps.map((step, index) => {
                            const colors = getColorClasses(step.color);
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.1 + index * 0.1 }}
                                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}>
                                            <step.icon className={`w-6 h-6 ${colors.icon}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-bold text-slate-400">STEP {index + 1}</span>
                                            </div>
                                            <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Trainer Quick Tips */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 }}
                        className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-8"
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                            Quick Tips for Trainers
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="flex items-start gap-3">
                                <ArrowRight className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="text-slate-700">Use pre-built templates to save time when assigning common plans</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ArrowRight className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="text-slate-700">Update member progress regularly to track their improvements</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ArrowRight className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="text-slate-700">Mark attendance daily - you can only mark once per member per day</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ArrowRight className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="text-slate-700">Customize templates to match each member's specific needs and goals</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.9 }}
                    className="bg-slate-900 rounded-3xl p-12 text-center"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                        Join GymFlow today and experience the easiest way to manage your fitness journey
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/signup"
                            className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
                        >
                            Sign Up Now
                        </a>
                        <a
                            href="/login"
                            className="px-8 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition-colors border border-slate-700"
                        >
                            Login
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HowItWorksPage;
