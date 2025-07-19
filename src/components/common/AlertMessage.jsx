import { CheckCircle, XCircle, AlertTriangle, Info, Heart } from 'lucide-react';

const iconMap = {
    success: (
        <CheckCircle className='w-16 h-16 text-green-500 animate-bounce' />
    ),
    error: <XCircle className='w-16 h-16 text-red-500 animate-bounce' />,
    warning: (
        <AlertTriangle className='w-16 h-16 text-yellow-500 animate-bounce' />
    ),
    info: <Info className='w-16 h-16 text-blue-500 animate-bounce' />
};

const colorMap = {
    success: {
        border: 'border-green-200',
        title: 'text-green-700',
        message: 'text-green-600',
        button: 'bg-green-500 hover:bg-green-600'
    },
    error: {
        border: 'border-red-200',
        title: 'text-red-700',
        message: 'text-red-600',
        button: 'bg-red-500 hover:bg-red-600'
    },
    warning: {
        border: 'border-yellow-200',
        title: 'text-yellow-700',
        message: 'text-yellow-600',
        button: 'bg-yellow-500 hover:bg-yellow-600'
    },
    info: {
        border: 'border-blue-200',
        title: 'text-blue-700',
        message: 'text-blue-600',
        button: 'bg-blue-500 hover:bg-blue-600'
    }
};

const AlertMessage = ({
    isVisible,
    onClose,
    type = 'success',
    title = 'Thành công!',
    message = 'Thao tác đã được thực hiện.',
    showThankYou = false
}) => {
    if (!isVisible) return null;

    const colors = colorMap[type] || colorMap.success;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center pointer-events-none'>
            <div className='absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300'></div>

            <div
                className={`relative bg-white ${colors.border} border-2 px-8 py-6 rounded-2xl shadow-2xl text-center max-w-md mx-4 pointer-events-auto animate-scale-in`}
                role='dialog'
                aria-modal='true'
            >
                {/* Icon */}
                <div className='flex justify-center mb-4'>
                    <div className='relative'>
                        {iconMap[type]}
                        <div className='absolute -top-1 -right-1'>
                            <div className='w-6 h-6 rounded-full animate-ping opacity-75 bg-opacity-70 bg-current'></div>
                        </div>
                    </div>
                </div>

                {/* Main message */}
                <h2 className={`text-2xl font-bold ${colors.title} mb-2`}>
                    {title}
                </h2>
                <p className={`${colors.message} text-lg font-medium mb-4`}>
                    {message}
                </p>

                {/* Optional thank you section */}
                {showThankYou && (
                    <div className='border-t border-gray-100 pt-4'>
                        <div className='flex items-center justify-center gap-2 mb-2'>
                            <Heart className='w-5 h-5 text-red-500 animate-pulse' />
                            <span className='text-gray-700 font-semibold'>
                                Cảm ơn bạn!
                            </span>
                            <Heart className='w-5 h-5 text-red-500 animate-pulse' />
                        </div>
                        <p className='text-gray-600 text-sm leading-relaxed'>
                            Chúng tôi rất biết ơn sự tin tưởng của bạn.
                            <br />
                            Đơn hàng sẽ được xử lý và giao đến bạn sớm nhất!
                        </p>
                    </div>
                )}

                {/* Close button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className={`mt-5 px-6 py-2 text-white rounded-lg font-medium transition duration-200 ${colors.button}`}
                    >
                        Đóng
                    </button>
                )}
            </div>
        </div>
    );
};

export default AlertMessage;
