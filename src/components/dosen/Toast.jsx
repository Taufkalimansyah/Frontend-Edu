import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X, AlertCircle } from 'lucide-react';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    const icons = {
        success: <CheckCircle size={24} className="text-white" />,
        error: <XCircle size={24} className="text-white" />,
        warning: <AlertCircle size={24} className="text-white" />,
        info: <Info size={24} className="text-white" />
    };

    const colors = {
        success: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
        error: 'bg-gradient-to-r from-red-500 to-red-400',
        warning: 'bg-gradient-to-r from-amber-500 to-amber-400',
        info: 'bg-gradient-to-r from-blue-500 to-blue-400'
    };

    return (
        <div className="fixed top-6 right-6 z-[9999] transition-all duration-300">
            <div className={`
                flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl
                ${colors[type]} text-white min-w-[320px] max-w-md
                relative
            `}>
                <div className="flex-shrink-0">
                    {icons[type]}
                </div>
                <div className="flex-1">
                    <p className="font-medium text-sm">{message}</p>
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1 transition-colors duration-200"
                >
                    <X size={18} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-2xl overflow-hidden">
                    <div 
                        className="h-full bg-white/50 rounded-b-2xl transition-all duration-[3000ms]"
                        style={{ 
                            width: '100%',
                            transition: `width ${duration}ms linear`
                        }}
                    />
                </div>
            </div>
        </div>
    );
}