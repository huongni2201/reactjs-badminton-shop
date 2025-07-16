// StatCard.js
const StatCard = ({ icon, title, value, subtext, color = 'primary' }) => {
    const colorMap = {
        primary: 'text-blue-600 bg-blue-100',
        success: 'text-green-600 bg-green-100',
        warning: 'text-yellow-600 bg-yellow-100',
        error: 'text-red-600 bg-red-100',
        brand: 'text-purple-600 bg-purple-100'
    };

    return (
        <div className='p-4 bg-white rounded-xl border border-base-200 shadow-sm flex items-center gap-4 hover:shadow-md transition'>
            <div className={`p-3 rounded-full ${colorMap[color]} text-lg`}>
                {icon}
            </div>
            <div>
                <div className='text-sm text-gray-500'>{title}</div>
                <div className='text-2xl font-bold text-gray-800'>{value}</div>
                {subtext && (
                    <div className='text-xs text-gray-400'>{subtext}</div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
