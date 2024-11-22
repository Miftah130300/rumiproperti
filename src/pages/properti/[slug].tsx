import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import EmblaCarousel from "src/component/carouselProperti/carouselProperti";
import type { EmblaOptionsType } from "embla-carousel";
import dynamic from "next/dynamic";
import { useProperti } from "../api/fetchAPI";
import Link from "next/link";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { iconMap } from "src/component/icon";
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
    adressDetail: string;
    mapsSource: string;
    fasilitasPerabot: string[] | null;
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
                </div>
                <div className="pt-[50px] px-5 md:px-10 w-full flex flex-col md:flex-row justify-between gap-10 md:gap-5">
                    <div className="flex flex-col gap-10">
                        <div className="text-start">
                            <h1 className="text-2xl font-bold text-[#24221D]">{selectedProperti.title}</h1>
                            <p className="text-black text-opacity-70">{selectedProperti.address}</p>
                        </div>
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
                        <div className="flex flex-col gap-5">
                            <h2 className="text-xl font-bold text-[#24221D]">Fasilitas & Perabotan</h2>
                            <div className="w-full grid grid-cols-5 justify-center gap-5 shadow-sm border py-5 rounded-lg">
                                {selectedProperti.fasilitasPerabot?.length ? (
                                    selectedProperti.fasilitasPerabot.map((perabot, index) => (
                                        <div key={index} className="flex flex-col items-center gap-2">
                                            {iconMap[perabot]}
                                            <p className="text-sm">{perabot}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Tidak ada fasilitas perabot yang tersedia.</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-[#24221D]">Deskripsi</h2>
                            <p>{selectedProperti.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center shadow py-5 px-10 border rounded-md max-w-[500px] h-[250px]">
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
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5">
                    <h2 className="text-xl font-bold text-[#24221D]">Lokasi {selectedProperti.title}</h2>
                    <div className="flex gap-3">
                        <LocationOnIcon />
                        <p className="text-black text-opacity-70">{selectedProperti.adressDetail}</p>
                    </div>
                    <div className="w-full h-[300px]">
                        <iframe
                            src={selectedProperti.mapsSource}
                            className="h-full w-full max-w-[600px] rounded-lg shadow-lg"
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
