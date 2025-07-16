const GradientButton = ({ children, className = '', ...props }) => {
    return (
        <button
            {...props}
            className={`w-full h-12 cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-xl hover:from-red-600 hover:to-orange-600 transition duration-200 ${className}`}
        >
            {children}
        </button>
    );
};

export default GradientButton;
