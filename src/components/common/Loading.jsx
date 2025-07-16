const Loading = ({ message }) => (
    <div className='flex justify-center items-center min-h-[300px]'>
        <span className='loading loading-spinner text-primary'></span>
        <span className='ml-2'>{message}</span>
    </div>
);

export default Loading;
