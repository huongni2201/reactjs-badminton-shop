const GradientButton = ({ children, className = '', disabled, ...props }) => {
    const baseClass =
        'w-full h-12 font-medium rounded-xl transition duration-200';

    const enabledClass =
        'cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600';

    const disabledClass = 'cursor-not-allowed bg-gray-300 text-gray-500';

    return (
        <button
            {...props}
            disabled={disabled}
            className={`${baseClass} ${
                disabled ? disabledClass : enabledClass
            } ${className}`}
        >
            {children}
        </button>
    );
};

export default GradientButton;
