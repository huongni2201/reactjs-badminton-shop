const Pagination = ({ currentPage, totalPage, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {totalPage > 0 && (
                <div className='flex justify-center'>
                    <nav className='flex space-x-2'>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => onPageChange(currentPage - 1)}
                            className={`px-3 py-2 bg-white border border-gray-300 rounded text-sm ${
                                currentPage === 1
                                    ? 'disabled cursor-not-allowed'
                                    : 'hover:bg-primary hover:text-white cursor-pointer'
                            }`}
                        >
                            Previous
                        </button>

                        {pageNumbers.map(page => (
                            <button
                                key={page}
                                className={` px-3 py-2 text-black rounded text-sm transition ${
                                    currentPage === page
                                        ? 'bg-primary text-white'
                                        : 'cursor-pointer hover:bg-primary hover:text-white'
                                }`}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPage}
                            onClick={() => onPageChange(currentPage + 1)}
                            className={`px-3 py-2 bg-white border border-gray-300 rounded text-sm ${
                                currentPage === totalPage
                                    ? 'disabled cursor-not-allowed'
                                    : 'hover:bg-primary hover:text-white cursor-pointer'
                            }`}
                        >
                            Next
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Pagination;
