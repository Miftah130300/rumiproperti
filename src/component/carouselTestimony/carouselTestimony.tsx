import React from 'react'
import home from "/public/asset/1.webp"
import Image from 'next/image'
import { EmblaOptionsType } from 'embla-carousel'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './carouselButtonTestimony'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const CarouselTestimony: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)


    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <section className="embla-testimony">
            <div className="embla__viewport-testimony" ref={emblaRef}>
                <div className="embla__container-testimony gap-5">
                    {slides.map((index) => (
                        <div className="embla__slide-testimony border border-black p-4" key={index}>
                            <div className="flex items-center">
                                <Image
                                    src={home}
                                    alt="Profile"
                                    className="rounded-full w-12 h-12 mr-3"
                                />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">James</h3>
                                    <p className="text-sm text-gray-600">Pembeli</p>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-800">Bagus banget MasyaAllah</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls-testimony">
                <div className="embla__buttons-testimony">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
            </div>
        </section>
    )
}

export default CarouselTestimony
