import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import EmblaCarousel from "src/component/carouselProperti/carouselProperti";
import type { EmblaOptionsType } from "embla-carousel";
import dynamic from "next/dynamic";
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
    category: {
        name: string;
    }
    imageProperty: {
        formats: {
            large: {
                url: string;
            }
        }
    }[];
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/propertis?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                const data = await res.json();

                // Filter based on slug after data is fetched
                if (slug) {
                    const filteredProperti = data.data.find((item: Properti) => {
                        const itemSlug = item.title; // Ensure title matches the slug
                        return itemSlug === slug;
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
    }, [slug]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!selectedProperti) {
        return <p>Property not found</p>;
    }

    // Perbaikan: Cek apakah imageProperty ada sebelum melakukan map
    const imageUrls = selectedProperti.imageProperty?.map(image => image.formats.large.url) || [];

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
                        <div className="flex flex-col items-center shadow py-5 px-10 border rounded-md gap-4 w-[300px] h-[250px]">
                            <div className="text-center">
                                <h2 className="text-xl font-bold text-[#24221D]">Rp {selectedProperti.price.toLocaleString()}</h2>
                                <p className="text-xs text-black text-opacity-70">Cicilan mulai dari 2juta/bulan</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="inline-block text-center bg-green rounded-lg px-3 py-3 text-xs font-semibold text-white">Hubungi Kami</span>
                                <span className="inline-block text-center bg-[#D9D9D9] rounded-lg px-3 py-3 text-xs font-semibold text-black text-opacity-70">Lihat Brosur</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col md:flex-row justify-between gap-10 md:gap-5">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col"></div>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-[#24221D]">Informasi Properti</h2>
                            <p>Luas Tanah: {selectedProperti.luasTanah ?? 'Tidak tersedia'}</p>
                            <p>Luas Bangunan: {selectedProperti.luasBangunan ?? 'Tidak tersedia'}</p>
                            <p>Kamar Tidur: {selectedProperti.jumlahKamarTidur ?? 'Tidak tersedia'}</p>
                            <p>Kamar Mandi: {selectedProperti.jumlahKamarMandi ?? 'Tidak tersedia'}</p>
                            <p>Jenis Sertifikat: {selectedProperti.jenisSertifikat ?? 'Tidak tersedia'}</p>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-[#24221D]">Deskripsi</h2>
                            <p>{selectedProperti.description}</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}