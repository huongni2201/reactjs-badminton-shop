const ProductImageGallery = ({
    images,
    imageAlt,
    selectedImage,
    setSelectedImage
}) => {
    return (
        <div>
            <div className='mb-4 w-full flex justify-center'>
                <img
                    src={images[selectedImage]}
                    alt={imageAlt}
                    className='h-96 object-cover rounded-lg'
                />
            </div>
            <div className='flex space-x-2'>
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-16 h-16 rounded-lg border-2 overflow-hidden cursor-pointer ${
                            selectedImage === i
                                ? 'border-red-500'
                                : 'border-gray-200'
                        }`}
                    >
                        <img
                            src={img}
                            alt={imageAlt}
                            className='w-full h-full object-cover'
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductImageGallery;
