import React from 'react'
import Image from 'next/image'
import { EmblaOptionsType } from 'embla-carousel'
import { PrevButton, NextButton, usePrevNextButtons } from './carouselButtonTestimony'
import useEmblaCarousel from 'embla-carousel-react'
import { useTestimony } from 'src/lib/fetchCity'

const myLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
};

type PropType = {
    options?: EmblaOptionsType
}

const CarouselTestimony: React.FC<PropType> = (props) => {
    const { options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const { testimony } = useTestimony();

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    if (!testimony || testimony.length === 0) {
        return <div>Loading...</div>;  // Handle the loading state
    }

    return (
        <section className="embla-testimony">
            <div className="embla__viewport-testimony" ref={emblaRef}>
                <div className="embla__container-testimony gap-5">
                    {testimony.map((testi) => (
                        <div className="embla__slide-testimony bg-green text-white gap-5 flex flex-col p-5 rounded-lg shadow-lg" key={testi.id}>
                            <div className="flex items-center mb-5">
                                <Image
                                    src={testi.foto.formats.thumbnail.url}
                                    alt="Profile"
                                    className="rounded-full w-10 h-10 mr-3"
                                    loader={myLoader}
                                    width={100}
                                    height={100}
                                />
                                <div>
                                    <h3 className="text-base font-semibold">James</h3>
                                    <p className="text-sm text-gray-500">Pembeli</p>
                                </div>
                            </div>
                            <p className="text-gray-800 text-sm">Bagus banget MasyaAllah</p>
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

export default CarouselTestimony;
