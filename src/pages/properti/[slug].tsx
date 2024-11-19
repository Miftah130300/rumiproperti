import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import EmblaCarousel from "src/component/carouselProperti/carouselProperti";
import type { EmblaOptionsType } from "embla-carousel";
import dynamic from "next/dynamic";
import { useProperti } from "../api/fetchAPI";
import Link from "next/link";
const Footer = dynamic(() => import('src/component/footer'), { ssr: false });
const Navbar = dynamic(() => import('src/component/navbar'), { ssr: false });

interface Properti {
    id: number;
    documentId: string;
    title: string;
    price: number;
    address: string;
    luasTanah: number | null;
    luasBangunan: number | null;
    jumlahKamarMandi: number | null;
    jumlahKamarTidur: number | null;
    jenisSertifikat: string | null;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category_properti: {
        nameCategory: string;
    };
    imageProperty: {
        formats: {
            medium: {
                url: string;
            };
        };
    }[];
    bannerProperty: {
        formats: {
            medium: {
                url: string;
            };
        };
    };
}

const OPTIONS: EmblaOptionsType = {};
const myLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
};

export default function DetailProperti() {
    const router = useRouter();
    const { slug } = router.query;

    const [loading, setLoading] = useState(true);
    const [selectedProperti, setSelectedProperti] = useState<Properti | null>(null);

    const { properti } = useProperti();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (slug && properti) {
                    const filteredProperti = properti.find((item: Properti) => {
                        return item.title === slug;
                    });
                    setSelectedProperti(filteredProperti || null);
                }
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, properti]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!selectedProperti) {
        return <p>Property not found</p>;
    }

    const imageUrls = selectedProperti.imageProperty?.map(image => image.formats.medium.url) || [];

    return (
        <div>
            <Navbar />
            <main>
                <div className="pt-10 px-5 md:px-10 w-full h-full flex flex-col md:flex-row justify-between gap-10 md:gap-10">
                    <EmblaCarousel slides={imageUrls} options={OPTIONS} loader={myLoader} />
                    <div className="w-full md:w-1/2 flex flex-col gap-5">
                        <div className="text-start">
                            <h1 className="text-2xl font-bold text-[#24221D]">{selectedProperti.title}</h1>
                            <p className="text-black text-opacity-70">{selectedProperti.address}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center shadow py-5 px-10 border rounded-md w-[300px] h-[250px]">
                            <div className="flex flex-col gap-4">
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-[#24221D]">Rp {selectedProperti.price.toLocaleString()}</h2>
                                    <p className="text-xs text-black text-opacity-70">Cicilan mulai dari 2juta/bulan</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Link href={"https://wa.me/6281291964488"} target='blank' className="inline-block text-center bg-green rounded-lg px-3 py-3 text-xs font-semibold text-white">
                                        <span>Hubungi Kami</span>
                                    </Link>
                                    <span className="inline-block text-center bg-[#D9D9D9] rounded-lg px-3 py-3 text-xs font-semibold text-black text-opacity-70">Lihat Brosur</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col md:flex-row justify-between gap-10 md:gap-5">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col"></div>
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl font-bold text-[#24221D]">Informasi Properti</h2>
                            <div className="flex flex-col md:flex-row gap-5">
                                <div>
                                    <p>{selectedProperti.luasTanah ?? 'Tidak tersedia'}</p>
                                    <div>Luas Tanah</div>
                                </div>
                                <div>
                                    <p>{selectedProperti.luasBangunan ?? 'Tidak tersedia'}</p>
                                    <div>Luas Bangunan</div>
                                </div>
                                <div>
                                    <p>{selectedProperti.jumlahKamarTidur ?? 'Tidak tersedia'}</p>
                                    <div>Kamar Tidur</div>
                                </div>
                                <div>
                                    <p>{selectedProperti.jumlahKamarMandi ?? 'Tidak tersedia'}</p>
                                    <div>Kamar Mandi</div>
                                </div>
                                <div>
                                    <p>{selectedProperti.jenisSertifikat ?? 'Tidak tersedia'}</p>
                                    <div>Jenis Sertifikat</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-[#24221D]">Deskripsi</h2>
                            <p>{selectedProperti.description}</p>
                        </div>
                    </div>
                </div>
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5">
                    <h2 className="text-xl font-bold text-[#24221D]">Lokasi test</h2>
                    <p className="text-black text-opacity-70">alamat tes</p>
                    <div className="w-full h-[300px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3203819208693!2d106.83008137355634!3d-6.352553162145459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec3a55522ac7%3A0x8b02476de77d3b63!2sRumah%20Kepemimpinan%20Pusat!5e0!3m2!1sid!2sid!4v1731996703099!5m2!1sid!2sid"
                            className="w-full h-full rounded-lg shadow-lg"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
