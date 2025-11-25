import { motion } from 'framer-motion';
import {
    Activity,
    Users,
    Calendar,
    BarChart3,
    ArrowRight,
    Star,
    Quote
} from 'lucide-react';
import HeroImage from '../assets/light-dashboard.png';

const LandingPage = () => {
    return (
        <>
            {/* Navigation */}
        
            {/* Hero Section */}
            <section className="relative pt-12 pb-20 lg:pt-28 lg:pb-32 z-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center font-light gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            System Operational v2.4
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 text-slate-900">
                            The Operating System
                        </h1>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 text-slate-900">
                            for Modern Fitness.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Seamlessly manage members, workouts, and growth.
                            Designed for studios that demand perfection.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                            <button 
                                onClick={() => {
                                    // Check if user is logged in
                                    const token = localStorage.getItem('token');
                                    const user = localStorage.getItem('user');
                                    
                                    if (token && user) {
                                        const userData = JSON.parse(user);
                                        // Redirect based on user role
                                        if (userData.role === 'trainer') {
                                            window.location.href = '/dashboard/trainer';
                                        } else if (userData.role === 'member') {
                                            window.location.href = '/dashboard/member';
                                        } else {
                                            window.location.href = '/dashboard';
                                        }
                                    } else {
                                        window.location.href = '/login';
                                    }
                                }}
                                className="group px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20"
                            >
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
                        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white">
                            <img
                                src={HeroImage}
                                alt="Platform Interface"
                                className="w-full h-auto filter grayscale"
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
                        <div className="md:col-span-2 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100 group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                                <Users className="w-6 h-6 text-slate-900 group-hover:text-emerald-600 transition-colors duration-300" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900">Member Intelligence</h3>
                            <p className="text-slate-500 leading-relaxed max-w-md">
                                Go beyond basic profiles. Track attendance patterns, health metrics, and engagement scores automatically. Know your members better than they know themselves.
                            </p>
                        </div>

                        {/* Tall Card */}
                        <div className="md:row-span-2 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100 group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                                    <Activity className="w-6 h-6 text-slate-900 group-hover:text-emerald-600 transition-colors duration-300" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-slate-900">Advanced Workout Builder</h3>
                                <p className="text-slate-500 leading-relaxed mb-8">
                                    Create complex periodization plans, supersets, and dropsets with a drag-and-drop interface designed for pros.
                                </p>
                            </div>
                            <div className="w-full bg-white rounded-xl border border-slate-100 p-4 group-hover:border-slate-200 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold">A</div>
                                    <div className="flex-1">
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{width: '75%'}} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">B</div>
                                    <div className="flex-1">
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{width: '60%'}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Small Card 1 */}
                        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                                <Calendar className="w-6 h-6 text-slate-900 group-hover:text-emerald-600 transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">Smart Scheduling</h3>
                            <p className="text-slate-500 text-sm">Automated booking & waitlists.</p>
                        </div>

                        {/* Small Card 2 */}
                        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                                <BarChart3 className="w-6 h-6 text-slate-900 group-hover:text-emerald-600 transition-colors duration-300" />
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

            {/* Customer Reviews */}
            <section id="reviews" className="py-24 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Loved by fitness professionals</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            See what gym owners and trainers are saying about GymFlow
                        </p>
                    </div>
                </div>

                {/* Infinite Scrolling Reviews */}
                <div className="relative">
                    {/* Fade Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
                    
                    {/* Scrolling Container */}
                    <div className="flex gap-6 animate-scroll hover:pause-animation">
                        {[
                            {
                                name: "Sarah Johnson",
                                role: "Gym Owner, FitCore Studio",
                                image: "SJ",
                                rating: 5,
                                review: "GymFlow transformed how we manage our gym. Member retention increased by 40% in just 3 months. The analytics are incredible!"
                            },
                            {
                                name: "Michael Chen",
                                role: "Head Trainer, PowerLift Gym",
                                image: "MC",
                                rating: 5,
                                review: "Creating workout plans is now effortless. My clients love the tracking features, and I can focus more on training than paperwork."
                            },
                            {
                                name: "Emma Rodriguez",
                                role: "Studio Manager, Yoga Flow",
                                image: "ER",
                                rating: 5,
                                review: "Best investment we've made. Class scheduling is automated, members are happier, and our revenue has grown significantly."
                            },
                            {
                                name: "David Park",
                                role: "CrossFit Coach",
                                image: "DP",
                                rating: 5,
                                review: "The progress tracking tools are game-changing. Athletes see their improvements clearly, which keeps them motivated and engaged."
                            },
                            {
                                name: "Lisa Thompson",
                                role: "Boutique Gym Owner",
                                image: "LT",
                                rating: 5,
                                review: "Switched from three different tools to just GymFlow. Everything we need in one place. Support team is outstanding too!"
                            },
                            {
                                name: "James Wilson",
                                role: "Personal Trainer",
                                image: "JW",
                                rating: 5,
                                review: "My clients appreciate the professional touch. Easy to use, looks great, and helps me deliver better results consistently."
                            }
                        ].concat([
                            {
                                name: "Sarah Johnson",
                                role: "Gym Owner, FitCore Studio",
                                image: "SJ",
                                rating: 5,
                                review: "GymFlow transformed how we manage our gym. Member retention increased by 40% in just 3 months. The analytics are incredible!"
                            },
                            {
                                name: "Michael Chen",
                                role: "Head Trainer, PowerLift Gym",
                                image: "MC",
                                rating: 5,
                                review: "Creating workout plans is now effortless. My clients love the tracking features, and I can focus more on training than paperwork."
                            },
                            {
                                name: "Emma Rodriguez",
                                role: "Studio Manager, Yoga Flow",
                                image: "ER",
                                rating: 5,
                                review: "Best investment we've made. Class scheduling is automated, members are happier, and our revenue has grown significantly."
                            },
                            {
                                name: "David Park",
                                role: "CrossFit Coach",
                                image: "DP",
                                rating: 5,
                                review: "The progress tracking tools are game-changing. Athletes see their improvements clearly, which keeps them motivated and engaged."
                            },
                            {
                                name: "Lisa Thompson",
                                role: "Boutique Gym Owner",
                                image: "LT",
                                rating: 5,
                                review: "Switched from three different tools to just GymFlow. Everything we need in one place. Support team is outstanding too!"
                            },
                            {
                                name: "James Wilson",
                                role: "Personal Trainer",
                                image: "JW",
                                rating: 5,
                                review: "My clients appreciate the professional touch. Easy to use, looks great, and helps me deliver better results consistently."
                            }
                        ]).map((review, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 w-96 bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer group"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                                    ))}
                                </div>
                                
                                <Quote className="w-10 h-10 text-slate-200 mb-4 group-hover:text-slate-300 transition-colors duration-300" />
                                
                                <p className="text-slate-700 leading-relaxed mb-6 text-base">
                                    "{review.review}"
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                        {review.image}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-base">{review.name}</div>
                                        <div className="text-sm text-slate-500">{review.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-16">
                    <p className="text-sm text-slate-500 mb-4">Join 2,000+ satisfied fitness professionals</p>
                    <button onClick={() => window.location.href = '/login'} className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 hover:shadow-xl transition-all duration-300">
                        Start Your Free Trial
                    </button>
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

            {/* Main Footer */}
            <footer className="bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                    {/* Top Section */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
                        {/* Brand Column */}
                        <div className="col-span-2">
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">Experience liftoff</h3>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                                Transform your fitness business with the most advanced gym management platform.
                            </p>
                        </div>

                        {/* Product Column */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4 text-sm">Product</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Download</a></li>
                                <li><a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</a></li>
                                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Docs</a></li>
                                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Changelog</a></li>
                            </ul>
                        </div>

                        {/* Resources Column */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4 text-sm">Resources</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Blog</a></li>
                                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</a></li>
                                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Use Cases</a></li>
                                <li><a href="#reviews" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Reviews</a></li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4 text-sm">Company</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">About</a></li>
                                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Careers</a></li>
                                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Contact</a></li>
                                <li><a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Partners</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Brand Name */}
                    <div className="mb-16">
                        <h2 className="text-7xl md:text-9xl font-bold text-slate-900 tracking-tight">
                            GymFlow
                        </h2>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-slate-200">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                                <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
                                <a href="#" className="hover:text-slate-900 transition-colors">Cookie Policy</a>
                            </div>
                            <p className="text-xs text-slate-500">
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
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Old Footer - Commented */}
            {/* <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
                        <div>
                            <h4 className="font-bold mb-3 text-sm">Product</h4>
                            <ul className="space-y-2 text-sm text-white/60">
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-3 text-sm">Company</h4>
                            <ul className="space-y-2 text-sm text-white/60">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-3 text-sm">Resources</h4>
                            <ul className="space-y-2 text-sm text-white/60">
                                <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
                                <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-3 text-sm">Legal</h4>
                            <ul className="space-y-2 text-sm text-white/60">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <GymFlowLogo size="md" variant="light" />
                        <p className="text-sm text-white/60">© 2025 GymFlow. All rights reserved.</p>
                    </div>
                </div>
            </footer> */}
        </>
    );
};

export default LandingPage;
