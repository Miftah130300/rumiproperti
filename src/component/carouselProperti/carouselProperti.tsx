import React, { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

type PropType = {
    slides: string[];
    options?: EmblaOptionsType;
    loader: ({ src }: { src: string }) => string;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options, loader } = props;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    });

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
                    {slides.map((src, index) => (
                        <div
                            className="embla__slide-property relative"
                            key={index}
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center blur-md"
                                style={{
                                    backgroundImage: `url(${src})`,
                                    display: 'none',
                                }}
                            />
                            <Image
                                src={src}
                                alt={`Slide ${index}`}
                                loader={loader}
                                layout="fill"
                                objectFit="contain"
                                className="embla__image"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla-thumbs-property">
                <div className="embla-thumbs__viewport-property" ref={emblaThumbsRef}>
                    <div className="embla-thumbs__container-property">
                        {slides.map((src, index) => (
                            <button
                                key={index}
                                onClick={() => onThumbClick(index)}
                                className={`embla-thumbs__slide-property ${index === selectedIndex ? 'embla-thumbs__slide-property--selected' : ''
                                    }`}
                            >
                                <Image
                                    src={src}
                                    alt={`Thumbnail ${index}`}
                                    loader={loader}
                                    width={50}
                                    height={50}
                                    objectFit="cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;