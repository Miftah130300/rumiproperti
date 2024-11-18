import React from 'react';
import Image from 'next/image';

type PropType = {
    selected: boolean;
    index: number;
    onClick: () => void;
    image: string;
    myload: ({ src }: { src: string }) => string;
}

export const Thumb: React.FC<PropType> = (props) => {
    const { selected, onClick, image, myload } = props;

    return (
        <div
            className={'embla-thumbs__slide-property'.concat(
                selected ? ' embla-thumbs__slide-property--selected' : ''
            )}
        >
            <button
                onClick={onClick}
                type="button"
                className="embla-thumbs__slide__button w-full"
            >
                <div className="w-16 h-16 relative overflow-hidden">
                    <Image
                        src={image}
                        width={100}
                        height={100}
                        alt={`Thumbnail ${props.index}`}
                        className="object-cover"
                        loader={myload}
                        layout="fill"
                    />
                </div>
            </button>
        </div>
    )
}
