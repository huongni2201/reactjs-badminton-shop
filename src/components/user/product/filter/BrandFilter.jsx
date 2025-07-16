import React from 'react';

const BrandFilter = ({ title, brands, selectedBrands, onChange }) => {
    return (
        <div className='space-y-3'>
            <h3 className='text-lg font-medium text-gray-900 uppercase'>
                {title}
            </h3>
            <div className='space-y-2'>
                {brands?.map(brand => (
                    <label
                        key={brand.name}
                        className='flex items-center justify-between cursor-pointer'
                    >
                        <div className='flex items-center space-x-3'>
                            <input
                                type='checkbox'
                                checked={selectedBrands.includes(brand.name)}
                                onChange={() => onChange(brand.name)}
                                className='checkbox checkbox-sm checkbox-primary w-4 h-4'
                            />
                            <span className='text-sm text-gray-700'>
                                {brand.name}
                            </span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default BrandFilter;
