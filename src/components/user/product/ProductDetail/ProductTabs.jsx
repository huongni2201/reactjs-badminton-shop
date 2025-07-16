const ProductTabs = ({ activeTab, setActiveTab, description }) => {
    return (
        <div className='mt-8'>
            <div className='flex border-b'>
                {['description', 'review'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 font-medium capitalize cursor-pointer ${
                            activeTab === tab
                                ? 'text-red-500 border-b-2 border-red-500'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className='mt-6 text-gray-600'>
                {activeTab === 'description' && <p>{description}</p>}
                {activeTab === 'review' && (
                    <p>Customer reviews will appear here...</p>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;
