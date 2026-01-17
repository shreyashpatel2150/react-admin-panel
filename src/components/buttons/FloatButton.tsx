import { ReactNode, useId } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';

interface FloatButtonProps {
    icon?: ReactNode;
    label?: string; // for aria-label or tooltip
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    to?: string; // optional navigate target
    position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
}

const positionClasses: Record<NonNullable<FloatButtonProps['position']>, string> = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
};

const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-16 h-16 text-lg',
};

const FloatButton: React.FC<FloatButtonProps> = ({
    icon,
    label = 'Floating Action',
    size = 'md',
    className = '',
    onClick,
    to,
    position = 'bottom-right',
}) => {
    const navigate = useNavigate();
    const id = useId();
    const tooltipId = `float-button-tooltip-${id}`;

    const handleClick = () => {
        if (onClick) onClick();
        if (to) navigate(to);
    };

    return (
        <div className={`fixed z-50 ${positionClasses[position]} ${className} group`}>
            <button
                aria-label={label}
                aria-describedby={tooltipId}
                onClick={handleClick}
                className={`relative ${sizeClasses[size]} inline-flex items-center justify-center rounded-full bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400 transition transform hover:scale-105`}
            >
                {icon ?? <AddIcon className="w-5 h-5" />}
            </button>

            {/* Tooltip: appears on hover/focus */}
            <span
                id={tooltipId}
                role="tooltip"
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1 text-xs text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
            >
                {label}
            </span>
        </div>
    );
};

export default FloatButton;
