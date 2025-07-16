const PriceRange = ({ prices, title, selectedPriceRange, onChange }) => {
    return (
        <div className='space-y-3'>
            <h3 className='text-lg font-medium text-gray-900 uppercase'>
                {title}
            </h3>
            <div className='space-y-2'>
                {prices?.map((price, index) => {
                    const isChecked = selectedPriceRange.some(
                        p => p.label === price.label
                    );

                    return (
                        <label
                            key={index}
                            className='flex items-center space-x-3 cursor-pointer'
                        >
                            <input
                                type='checkbox'
                                checked={isChecked}
                                onChange={() => onChange(price)}
                                className='checkbox checkbox-sm checkbox-primary w-4 h-4'
                            />
                            <span className='text-sm text-gray-800'>
                                {price.label}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default PriceRange;
