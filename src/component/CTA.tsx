import Image from "next/image"
import home from "/public/asset/1.webp"
import Link from "next/link"

export default function CTA() {

    return (
        <div className="pt-[100px] px-5 md:px-10">
            <div className="flex justify-center items-center relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={home}
                    alt="Card background"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
                <div className="absolute inset-0 bg-green opacity-80"></div>
                <div className="absolute inset-0 flex flex-col gap-5 items-center justify-center">
                    <div className="flex flex-col text-center md:text-start">
                        <h2 className="text-white text-2xl font-semibold">Temukan Properti Idamanmu dengan Rumi</h2>
                        <p className="text-white text-md">Temukan properti idamanmu dengan langkah yang sangat mudah</p>
                    </div>
                    <Link className="px-6 py-2 bg-white rounded-2xl text-green flex justify-center items-center" href={"/contact"} role="button">Hubungi Kami</Link>
                </div>
            </div>
        </div>
    )
}