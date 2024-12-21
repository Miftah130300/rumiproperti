import React, { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

type PropType = {
    slides: string[];
    options?: EmblaOptionsType;
    loader: ({ src }: { src: string }) => string;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options, loader }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    });

    const [imageOrientations, setImageOrientations] = useState<
        { index: number; isPortrait: boolean }[]
    >([]);

    const handleImageLoad = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.target as HTMLImageElement;
        const isPortrait = img.naturalHeight > img.naturalWidth;
        setImageOrientations((prev) => [...prev, { index, isPortrait }]);
    };

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return;
            emblaMainApi.scrollTo(index);
        },
        [emblaMainApi, emblaThumbsApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();

        emblaMainApi.on('select', onSelect).on('reInit', onSelect);
    }, [emblaMainApi, onSelect]);

    return (
        <div className="embla embla-property">
            <div className="embla__viewport embla__viewport-property rounded-lg" ref={emblaMainRef}>
                <div className="embla__container-property">
                    {slides.map((src, index) => {
                        const isPortrait = imageOrientations.find((img) => img.index === index)?.isPortrait;
                        return (
                            <div
                                className={`embla__slide-property ${isPortrait ? 'embla__slide--portrait' : 'embla__slide--landscape'
                                    }`}
                                key={index}
                                style={{
                                    backgroundImage: isPortrait ? `url(${src})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <Image
                                    src={src}
                                    alt={`Slide ${index}`}
                                    loader={loader}
                                    className="image-content"
                                    onLoad={(e) => handleImageLoad(index, e)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
