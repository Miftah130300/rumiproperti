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
                <div className="embla__container-property">
                    {slides.map((src, index) => (
                        <div className="embla__slide-property h-[550px]" key={index}>
                            <Image
                                src={src}
                                alt={`Slide ${index}`}
                                loader={loader}
                                className="h-auto object-contain"
                            />
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
