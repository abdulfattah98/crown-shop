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
            <div className="d-none d-xl-block">
                <ImageGallery
                    thumbnailPosition={'left'}
                    showNav={false}
                    showPlayButton={false}
                    items={newImages}
                />
            </div>
            <div className="d-none d-lg-block d-xl-none">
                <ImageGallery
                    thumbnailPosition={'left'}
                    notComputer={true}
                    showNav={false}
                    showPlayButton={false}
                    items={newImages}
                />
            </div>
            <div className="d-none d-md-block d-lg-none">
                <ImageGallery
                    thumbnailPosition={'bottom'}
                    notComputer={true}
                    showNav={false}
                    showPlayButton={false}
                    items={newImages}
                />
            </div>
            <div className="d-none d-sm-block d-md-none">
                <ImageGallery
                    thumbnailPosition={'left'}
                    notComputer={true}
                    showNav={false}
                    showPlayButton={false}
                    items={newImages}
                />
            </div>
            <div className="d-block d-sm-none">
                <ImageGallery
                    thumbnailPosition={'bottom'}
                    notComputer={true}
                    showNav={false}
                    showPlayButton={false}
                    items={newImages}
                />
            </div>
        </>
    );
};

export default Gallery;
