const Loading = ({
    message = 'Loading...',
    fullScreen = false,
    size = 48,
    color = 'border-red-500',
    overlayBg = 'bg-white/30 backdrop-blur-[1px]'
}) => {
    const containerClass = fullScreen
        ? `fixed inset-0 z-50 flex items-center justify-center ${overlayBg}`
        : 'flex justify-center items-center min-h-[200px]';

    return (
        <div className={containerClass}>
            <div className='flex items-center gap-3 px-5 py-4 bg-white bg-opacity-90 rounded-xl shadow-lg'>
                <div
                    className={`animate-spin rounded-full border-4 ${color} border-t-transparent`}
                    style={{ width: size, height: size }}
                ></div>
                {message && (
                    <span className='text-gray-800 text-base font-medium animate-pulse'>
                        {message}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Loading;
