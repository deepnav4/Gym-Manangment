interface GymFlowLogoProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'dark' | 'light';
}

const GymFlowLogo = ({ size = 'md', variant = 'dark' }: GymFlowLogoProps) => {
    const sizes = {
        sm: { container: 'w-7 h-7', text: 'text-base' },
        md: { container: 'w-8 h-8', text: 'text-xl' },
        lg: { container: 'w-10 h-10', text: 'text-2xl' }
    };

    const colors = {
        dark: {
            bg: 'bg-slate-900',
            text: 'text-slate-900',
            icon: 'text-white'
        },
        light: {
            bg: 'bg-white',
            text: 'text-white',
            icon: 'text-slate-900'
        }
    };

    return (
        <div className="flex items-center gap-2">
            <div className={`${sizes[size].container} ${colors[variant].bg} rounded-lg flex items-center justify-center`}>
                <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} ${colors[variant].icon}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M3 8h4v8H3V8zm7-4h4v16h-4V4zm7 6h4v8h-4v-8z" 
                        fill="currentColor"
                    />
                </svg>
            </div>
            <span className={`${sizes[size].text} font-bold font-black tracking-tight`}>
                GymFlow
            </span>
        </div>
    );
};

export default GymFlowLogo;
