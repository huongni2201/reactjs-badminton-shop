import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const TextInput = ({
    label,
    icon: Icon,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    showToggle = false
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType =
        showToggle && type === 'password'
            ? showPassword
                ? 'text'
                : 'password'
            : type;

    return (
        <div>
            {label && (
                <label className='text-gray-700 font-medium flex items-center gap-2 mb-1'>
                    {Icon && <Icon size={16} />} {label}{' '}
                    <span className='text-red-400'>(*)</span>
                </label>
            )}
            <div className='relative'>
                {Icon && (
                    <Icon
                        className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                        size={16}
                    />
                )}
                <input
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full h-12 rounded-lg border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } px-10 focus:outline-none focus:ring-2 focus:ring-red-400`}
                />

                {showToggle && type === 'password' && (
                    <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer'
                    >
                        {showPassword ? (
                            <EyeOff size={16} />
                        ) : (
                            <Eye size={16} />
                        )}
                    </button>
                )}
            </div>
            {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
        </div>
    );
};

export default TextInput;
