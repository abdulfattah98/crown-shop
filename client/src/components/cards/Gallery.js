import ImageGallery from '../gallary/ImageGallery';
import React from 'react';

const Gallery = ({ images }) => {
    const newImages = images.map((image) => {
        return {
            original: image.url,
            thumbnail: image.url,
        };
    });
    return (
        <>
            <div className="d-none d-lg-block">
                <ImageGallery
                    thumbnailPosition={'left'}
                    showNav={false}
                    showPlayButton={false}
                    items={newImages}
                />
            </div>
            <div className="d-none d-sm-block d-lg-none">
                <ImageGallery
                    thumbnailPosition={'left'}
                    showNav={false}
                    showPlayButton={false}
                    items={newImages}
                />
            </div>
            <div className="d-block d-sm-none">
                <ImageGallery
                    thumbnailPosition={'bottom'}
                    showNav={false}
                    showPlayButton={false}
                    items={newImages}
                />
            </div>
        </>
    );
};

export default Gallery;
