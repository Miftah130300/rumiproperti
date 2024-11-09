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
    category_properti: {
        nameCategory: string;
    };
    imageProperty: {
        formats: {
            large: {
                url: string;
            };
        };
    }[];
    bannerProperty: {
        formats: {
            large: {
                url: string;
            };
        };
    };
}

interface CategoryProperty {
    id: number;
    nameCategory: string;
}

const myLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
};

export default function Property() {
    const [properti, setProperti] = useState<Properti[]>([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [filteredProperties, setFilteredProperties] = useState<Properti[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [categories, setCategories] = useState<CategoryProperty[]>([]);

    // Fetch properties data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/propertis?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                const data = await res.json();
                setProperti(data.data || []);
                setFilteredProperties(data.data || []);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fetch category data for dropdown options
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category-propertis`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                const data = await res.json();
                setCategories(data.data || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Filter logic
    const handleFilter = () => {
        const filtered = properti.filter(item => {
            const matchKeyword = keyword
                ? item.title.toLowerCase().includes(keyword.toLowerCase()) ||
                item.address.toLowerCase().includes(keyword.toLowerCase())
                : true;
            const matchCategory = selectedCategory
                ? item.category_properti?.nameCategory === selectedCategory
                : true;
            const matchArea = selectedArea ? item.address.includes(selectedArea) : true;
            const matchPrice = selectedPrice
                ? selectedPrice === "low" ? item.price < 500000000 :
                    selectedPrice === "medium" ? item.price >= 500000000 && item.price < 1000000000 :
                        item.price >= 1000000000
                : true;
            return matchKeyword && matchCategory && matchArea && matchPrice;
        });
        setFilteredProperties(filtered);
    };

    useEffect(() => {
        handleFilter();
    }, [keyword, selectedCategory, selectedArea, selectedPrice]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <main>
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5">
                    <h2 className="text-xl font-medium text-[#24221D]">Temukan propertimu</h2>
                    <div className="search w-full flex flex-col gap-3">
                        <div className="flex gap-3 w-full md:w-[85%]">
                            <input
                                className="bg-[#D9D9D9] bg-opacity-50 py-2 px-4 rounded-lg text-md flex-grow"
                                placeholder="Cari properti berdasarkan nama, lokasi, atau kota"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button
                                className="bg-green text-white rounded-xl px-6 py-2 md:flex hidden justify-center items-center cursor-pointer text-sm"
                                onClick={handleFilter}
                            >
                                Cari Properti
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-3">
                            <select onChange={(e) => setSelectedCategory(e.target.value)} className="py-2 px-4 shadow-md text-sm rounded-md border">
                                <option value="">Tipe properti</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.nameCategory}>
                                        {category.nameCategory}
                                    </option>
                                ))}
                            </select>
                            <select onChange={(e) => setSelectedArea(e.target.value)} className="py-2 px-4 shadow-md text-sm rounded-md border">
                                <option value="">Area</option>
                                <option value="Jakarta">Jakarta</option>
                                <option value="Bandung">Bandung</option>
                            </select>
                            <select onChange={(e) => setSelectedPrice(e.target.value)} className="py-2 px-4 shadow-md text-sm rounded-md border">
                                <option value="">Harga</option>
                                <option value="low">Dibawah 500 Juta</option>
                                <option value="medium">500 Juta - 1 Miliar</option>
                                <option value="high">Diatas 1 Miliar</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="pt-14 px-5 md:px-10 w-full flex flex-col gap-5">
                    <h2 className="text-xl font-medium text-[#24221D]">Rekomendasi hunian untukmu</h2>
                    <div className="result flex md:flex-row flex-col gap-3">
                        {filteredProperties.map((item) => (
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
                                        <div className="bg-green text-white w-[5rem] text-center text-sm rounded">{item.category_properti.nameCategory}</div>
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