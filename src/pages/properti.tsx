import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
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

interface CategoryProperty {
    id: number;
    nameCategory: string;
}

interface CityList {
    id: number;
    nameCity: string;
}

const myLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
};

export default function Property() {
    const router = useRouter();
    const { search } = router.query;
    const [properti, setProperti] = useState<Properti[]>([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [filteredProperties, setFilteredProperties] = useState<Properti[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [categories, setCategories] = useState<CategoryProperty[]>([]);
    const [city, setCity] = useState<CityList[]>([]);

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
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category-propertis?populate=*`, {
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

    // Fetch city
    useEffect(() => {
        const fetchCity = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/city-lists?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                const data = await res.json();
                setCity(data.data || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCity();
    }, []);

    // Filter logic
    const handleFilter = () => {
        const filtered = properti.filter(item => {
            const matchKeyword = keyword
                ? (item.title && item.title.toLowerCase().includes(keyword.toLowerCase())) ||
                (item.address && item.address.toLowerCase().includes(keyword.toLowerCase()))
                : true;
            const matchCategory = selectedCategory
                ? item.category_properti?.nameCategory === selectedCategory
                : true;
            const matchArea = selectedArea ? item.address && item.address.includes(selectedArea) : true;
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

    // Filter the properties based on the search query from the URL
    useEffect(() => {
        if (search) {
            const filtered = properti.filter((item) => {
                return (
                    (item.title && item.title.toLowerCase().includes(search.toString().toLowerCase())) ||
                    (item.address && item.address.toLowerCase().includes(search.toString().toLowerCase()))
                );
            });
            setFilteredProperties(filtered);
        }
    }, [search, properti]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <main className="dark:bg-[#1E1E1E]">
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5">
                    <h2 className="text-xl font-medium text-[#24221D] dark:text-white">Temukan propertimu</h2>
                    <div className="search w-full flex flex-col gap-3">
                        <div className="flex gap-3 w-full md:w-[85%]">
                            <input
                                className="bg-[#D9D9D9] bg-opacity-50 py-2 px-4 rounded-lg text-md flex-grow"
                                placeholder="Cari properti berdasarkan nama, lokasi, atau kota"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button
                                className="hover:bg-[#4b6645] bg-green text-white rounded-xl px-6 py-2 md:flex hidden justify-center items-center cursor-pointer text-sm"
                                onClick={handleFilter}
                            >
                                Cari Properti
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-3">
                            <select onChange={(e) => setSelectedCategory(e.target.value)} className="py-2 px-4 shadow-md text-sm rounded-md border cursor-pointer dark:text-[#24221D] dark:bg-[#D9D9D9] dark:hover:bg-[#c1c1c1] hover:bg-slate-50">
                                <option value="">Tipe properti</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.nameCategory}>
                                        {category.nameCategory}
                                    </option>
                                ))}
                            </select>
                            <select onChange={(e) => setSelectedArea(e.target.value)} className="py-2 px-4 shadow-md text-sm rounded-md border cursor-pointer dark:text-[#24221D] dark:bg-[#D9D9D9] dark:hover:bg-[#c1c1c1] hover:bg-slate-50">
                                <option value="">Area</option>
                                {city.map((city) => (
                                    <option key={city.id} value={city.nameCity}>{city.nameCity}</option>
                                ))}
                            </select>
                            <select onChange={(e) => setSelectedPrice(e.target.value)} className="py-2 px-4 shadow-md text-sm rounded-md border cursor-pointer dark:text-[#24221D] dark:bg-[#D9D9D9] dark:hover:bg-[#c1c1c1] hover:bg-slate-50">
                                <option value="">Harga</option>
                                <option value="low">Dibawah 500 Juta</option>
                                <option value="medium">500 Juta - 1 Miliar</option>
                                <option value="high">Diatas 1 Miliar</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="py-[50px] px-5 md:px-10 w-full flex flex-col gap-5">
                    <h2 className="text-xl font-medium text-[#24221D] dark:text-white">Rekomendasi hunian untukmu</h2>
                    <div className="result grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {filteredProperties && filteredProperties.length > 0 ? (
                            filteredProperties.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/properti/${item.title}`}
                                    className="max-w-xs rounded-lg overflow-hidden shadow hover:shadow-lg border dark:border-none dark:bg-[#252525] transform transition-all duration-300 flex flex-col"
                                >
                                    <div className="w-full h-[200px] overflow-hidden">
                                        <Image
                                            className="w-full h-full object-cover hover:scale-110 transition"
                                            src={item.bannerProperty?.formats?.medium?.url || '/default-image.jpg'}
                                            loader={myLoader}
                                            alt={item.title}
                                            width={300}
                                            height={200}
                                        />
                                    </div>
                                    <div className="px-4 py-4 flex flex-col gap-2 flex-grow">
                                        <div className="bg-green text-white w-[7rem] px-2 py-1 text-center text-sm rounded">
                                            {item.category_properti?.nameCategory || 'Kategori tidak tersedia'}
                                        </div>
                                        <div className="text-black">
                                            <div className="font-bold text-medium-bold mb-2 dark:text-white">
                                                Rp {item.price.toLocaleString()}
                                            </div>
                                            <p className="text-sm dark:text-[#CCCCCC]">{item.title}</p>
                                            <p className="text-xs text-black dark:text-[#757575] text-opacity-70">
                                                {item.address}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-4 pt-4 pb-4 flex gap-5 items-center">
                                        <Link href={`/properti/${item.title}`}>
                                            <span className="inline-block bg-[#D9D9D9] hover:bg-[#c1c1c1] rounded-lg px-3 py-3 text-xs font-semibold text-black text-opacity-70">
                                                Lihat detail
                                            </span>
                                        </Link>
                                        <Link href={"https://wa.me/6281291964488"} target="_blank">
                                            <span className="inline-block hover:bg-[#4b6645] bg-green rounded-lg px-3 py-3 text-xs font-semibold text-white">
                                                Hubungi kami
                                            </span>
                                        </Link>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="col-span-full text-black dark:text-[#CCCCCC] dark:text-opacity-100 text-opacity-70 italic">Tidak ada properti yang tersedia.</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}