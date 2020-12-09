import ImageGallery from '../gallary/ImageGallery';
import Resizer from 'react-image-file-resizer';
import React from 'react';
// const images = [
//     {
//         original:
//             'https://y-store-media-trendsquare67.s3.amazonaws.com/sys-trendsquare/images/hfa/hcc/8800715046942',
//         thumbnail:
//             'https://y-store-media-trendsquare67.s3.amazonaws.com/sys-trendsquare/images/hfa/hcc/8800715046942',
//     },
//     {
//         original:
//             'https://y-store-media-trendsquare67.s3.amazonaws.com/sys-trendsquare/images/hfa/hcc/8800715046942',
//         thumbnail:
//             'https://y-store-media-trendsquare67.s3.amazonaws.com/sys-trendsquare/images/hfa/hcc/8800715046942',
//     },
//     {
//         original:
//             'https://y-store-media-trendsquare67.s3.amazonaws.com/sys-trendsquare/images/hfa/hcc/8800715046942',
//         thumbnail:
//             'https://y-store-media-trendsquare67.s3.amazonaws.com/sys-trendsquare/images/hfa/hcc/8800715046942',
//     },
// ];

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
