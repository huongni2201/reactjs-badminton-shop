import React from 'react';

const CategoryFilter = ({
    title,
    categories,
    selectedCategories,
    onChange
}) => {
    return (
        <div className='space-y-3'>
            <h3 className='text-lg font-medium text-gray-900 uppercase'>
                {title}
            </h3>
            <div className='space-y-2'>
                {categories?.map(category => (
                    <label
                        key={category.name}
                        className='flex items-center justify-between cursor-pointer'
                    >
                        <div className='flex items-center space-x-3'>
                            <input
                                type='checkbox'
                                checked={selectedCategories.includes(
                                    category.name
                                )}
                                onChange={() => onChange(category.name)}
                                className='checkbox checkbox-sm checkbox-primary w-4 h-4'
                            />
                            <span className='text-sm text-gray-700'>
                                {category.name}
                            </span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
