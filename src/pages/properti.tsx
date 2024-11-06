import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
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
    bannerProperty: {
        formats: {
            large: {
                url: string;
            }
        }
    };
}

const myLoader = ({ src }: { src: string }) => {
    return `http://localhost:1337${src}`;
};

export default function Property() {
    const [properti, setProperti] = useState<Properti[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:1337/api/propertis?populate=*`, {
                    headers: {
                        Authorization: `Bearer 2e762088040cd576315579bdb600e232c9d7f433fc1402e1692560a90c3e68d9c3a586e38059aabb1e462fe52bc5fa9aa095ca5845e5439b57f27033ea7eff804b9e6a21484fe4caf800ecba9abcd68adbecebf3662d2e2c6c0e74fc5ce8006255db9392d9f04d16ef1ce9893569e61adb57ed68eceeb3156e850aa852b2a1e7`,
                    },
                });
                const data = await res.json();
                setProperti(data.data || []);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <main>
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5">
                    <h2 className="text-xl font-medium text-[#24221D]">Temukan propertimu</h2>
                    <div className="w-full flex flex-col gap-3">
                        <div className="flex gap-3 w-full md:w-[85%]">
                            <input
                                className="bg-[#D9D9D9] bg-opacity-50 py-2 px-4 rounded-lg text-md flex-grow"
                                placeholder="Cari properti berdasarkan nama, lokasi, atau kota"
                            />
                            <a className="bg-green text-white rounded-xl px-6 py-2 md:flex hidden justify-center items-center cursor-pointer text-sm">
                                Cari Properti
                            </a>
                        </div>
                        <div className="flex w-full gap-3">
                            <div className="py-2 px-4 shadow-md text-sm rounded-md border">Tipe properti</div>
                            <div className="py-2 px-4 shadow-md text-sm rounded-md border">Area</div>
                            <div className="py-2 px-4 shadow-md text-sm rounded-md border">Harga</div>
                        </div>
                    </div>
                </div>
                <div className="pt-14 px-5 md:px-10 w-full flex flex-col gap-5">
                    <h2 className="text-xl font-medium text-[#24221D]">Rekomendasi hunian untukmu</h2>
                    <div className="flex md:flex-row flex-col gap-3">
                        {properti.map((item) => (
                            <Link key={item.id} href={`/properti/${item.title}`} className="rounded-lg hover:shadow-lg">
                                <div className="max-w-xs h-[450px] rounded-lg overflow-hidden shadow border transform transition-all duration-300">
                                    <div className="w-full h-[200px] overflow-hidden">
                                        <Image
                                            className="w-full h-full object-cover hover:scale-110 transition"
                                            src={item.bannerProperty?.formats?.large?.url || '/default-image.jpg'}
                                            loader={myLoader}
                                            alt={item.title}
                                            width={300}
                                            height={200}
                                        />
                                    </div>
                                    <div className="px-4 py-4 gap-2 flex flex-col">
                                        <div className="bg-green text-white w-[5rem] text-center text-sm rounded">{item.category.name}</div>
                                        <div className="text-black">
                                            <div className="font-bold text-medium-bold mb-2">Rp {item.price.toLocaleString()}</div>
                                            <p className="text-sm">{item.title}</p>
                                            <p className="text-xs text-black text-opacity-70">{item.address}</p>
                                        </div>
                                    </div>
                                    <div className="text-xs mx-4 py-4 gap-2 flex flex-col border-t border-black border-opacity-70">
                                        fasilitas
                                    </div>
                                    <div className="px-4 pt-4 pb-4 gap-5 flex items-center">
                                        <Link href={`/properti/${item.title}`}>
                                            <span className="inline-block bg-[#D9D9D9] hover:bg-[#c1c1c1] rounded-lg px-3 py-3 text-xs font-semibold text-black text-opacity-70">
                                                Lihat detail
                                            </span>
                                        </Link>
                                        <span className="inline-block bg-green rounded-lg px-3 py-3 text-xs font-semibold text-white">
                                            Hubungi kami
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
