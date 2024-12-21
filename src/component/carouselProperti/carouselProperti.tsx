import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'

import Image from 'next/image'

type PropType = {
    slides: string[]; // Correct type for image paths
    options?: EmblaOptionsType;
    loader: ({ src }: { src: string }) => string; // Loader should be a function
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options, loader } = props
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreenWidth = () => {
            setIsSmallScreen(window.innerWidth < 550);
        };

        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', checkScreenWidth);
    }, []);

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()

        emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    return (
        <div className="embla embla-property">
            <div className="embla__viewport embla__viewport-property rounded-lg" ref={emblaMainRef}>
                <div className="embla__container-property aspect-[1024/768]">
                    {slides.map((src, index) => (
                        <div
                            className="embla__slide-property flex items-center justify-center w-full h-full relative overflow-hidden"
                            key={index}
                        >
                            {/* Gambar utama */}
                            <Image
                                src={src}
                                alt={`Slide ${index}`}
                                loader={loader}
                                className="h-auto w-auto max-h-full max-w-full object-contain z-10"
                            />

                            {/* Overlay blur hanya diterapkan jika lebar gambar lebih kecil dari 550 */}
                            {isSmallScreen && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-0"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla-thumbs-property">
                <div className="embla-thumbs__viewport-property" ref={emblaThumbsRef}>
                    <div className="embla-thumbs__container-property">
                        {slides.map((src, index) => (
                            <Thumb
                                key={index}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                index={index}
                                image={src} // Pass the image prop
                                myload={loader} // Use the loader function
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
