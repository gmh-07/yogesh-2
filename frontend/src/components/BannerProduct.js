import React, { useEffect, useState } from 'react';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [
        "https://beyoung.in/api/catalog/new-bb/desktop/banner/cargo-banner-desktop-view.jpg",
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_copy_1_n0a2uxe.jpg?format=webp&w=1500&dpr=1.3",
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Mobile-Banner_wZVPeYj.gif?format=webp&w=768&dpr=1.3",
        "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_banner_copy_6.jpg?format=webp&w=1500&dpr=1.3",
        
    ];

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ];

    const nextImage = () => {
        setCurrentImage(prev => (prev + 1) % desktopImages.length);
    };

    const prevImage = () => {
        setCurrentImage(prev => (prev - 1 + desktopImages.length) % desktopImages.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className="container mx-auto px-4 rounded-lg">
            <div className="h-80 md:h-[500px] w-full relative overflow-hidden rounded-lg shadow-lg">

                {/* Navigation Buttons */}
                <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 z-10">
                    <button onClick={prevImage} className="bg-white/50 hover:bg-white text-black shadow-md rounded-full p-2 transition-all">
                        <FaAngleLeft size={24} />
                    </button>
                    <button onClick={nextImage} className="bg-white/50 hover:bg-white text-black shadow-md rounded-full p-2 transition-all">
                        <FaAngleRight size={24} />
                    </button>
                </div>

                {/* Desktop and Tablet Version */}
                <div className="hidden md:flex h-full w-full overflow-hidden">
                    {desktopImages.map((imageUrl, index) => (
                        <div
                            className="w-full h-full min-w-full transition-transform ease-in-out duration-500"
                            key={imageUrl}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageUrl} className="w-full h-full object-cover" alt="Banner" />
                        </div>
                    ))}
                </div>

                {/* Mobile Version */}
                <div className="flex h-full w-full overflow-hidden md:hidden">
                    {mobileImages.map((imageUrl, index) => (
                        <div
                            className="w-full h-full min-w-full transition-transform ease-in-out duration-500"
                            key={imageUrl}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageUrl} className="w-full h-full object-cover" alt="Mobile Banner" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
