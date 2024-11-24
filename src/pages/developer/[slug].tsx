import { useEffect, useState } from "react";
import { useDeveloper, useProperti } from "../api/fetchAPI";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
const Footer = dynamic(() => import('src/component/footer'), { ssr: false });
const Navbar = dynamic(() => import('src/component/navbar'), { ssr: false });

const myLoader = ({ src }: { src: string }) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    return `${baseUrl}${src}`;
};
interface Developer {
    id: number;
    nameDeveloper: string;
    aboutDeveloper: string;
    logoDeveloper: {
        formats: {
            thumbnail: {
                url: string;
            };
        };
    };
}

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
            large: {
                url: string;
            };
            medium: {
                url: string;
            };
            small: {
                url: string;
            };
            thumbnail: {
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
    developer: {
        nameDeveloper: string;
        aboutDeveloper: string;
    }
    brosur: {
        name: string;
        url: string;
    }
}

const DeveloperDetailPage = () => {
    const { developer }: { developer: Developer[] } = useDeveloper();
    const { properti }: { properti: Properti[] } = useProperti();
    const router = useRouter();
    const { slug } = router.query;

    const [currentDeveloper, setCurrentDeveloper] = useState<Developer | null>(null);

    const propertiDeveloper = properti?.filter((item: Properti) => {
        return (
            currentDeveloper?.nameDeveloper &&
            item.developer?.nameDeveloper &&
            currentDeveloper.nameDeveloper === item.developer.nameDeveloper
        );
    });

    useEffect(() => {
        if (developer?.length > 0 && slug) {
            const foundDeveloper = developer.find(
                (dev) => dev.nameDeveloper.toLowerCase().replace(/\s+/g, "-") === slug
            );
            setCurrentDeveloper(foundDeveloper || null);
        }
    }, [developer, slug]);

    if (!currentDeveloper) {
        return <p className="text-center py-10">Developer tidak ditemukan.</p>;
    }

    return (
        <div>
            <Navbar />
            <main className="dark:bg-[#1E1E1E]">
                <div className="container mx-auto flex flex-col gap-5 py-10 px-4">
                    <div className="max-w-2xl mx-auto bg-white dark:border-none dark:bg-[#252525] rounded-lg shadow-lg p-6">
                        {currentDeveloper.logoDeveloper?.formats?.thumbnail?.url && (
                            <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto mb-6">
                                {currentDeveloper.logoDeveloper?.formats?.thumbnail?.url && (
                                    <Image
                                        src={currentDeveloper.logoDeveloper.formats.thumbnail.url}
                                        alt={currentDeveloper.nameDeveloper}
                                        fill
                                        className="object-cover"
                                        loader={myLoader}
                                        sizes="160px"
                                    />
                                )}
                            </div>
                        )}
                        <h1 className="text-2xl font-bold text-center mb-4 dark:text-white">{currentDeveloper.nameDeveloper}</h1>
                        <p className="text-gray-700 dark:text-[#757575] text-justify">{currentDeveloper.aboutDeveloper}</p>
                    </div>
                    <div className="max-w-2xl mx-auto bg-white dark:border-none dark:bg-[#252525] rounded-lg shadow-lg p-6">
                        <h2 className="font-medium text-[#24221D] dark:text-white">Tentang Developer</h2>
                        <p className="text-gray-700 dark:text-[#757575] text-justify">{currentDeveloper.aboutDeveloper}</p>
                    </div>
                </div>
                <div className="py-[50px] px-5 md:px-10 w-full flex flex-col gap-5">
                    <h2 className="text-xl font-medium text-[#24221D] dark:text-white">Proyek</h2>
                    <div className="result grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {propertiDeveloper && propertiDeveloper.length > 0 ? (
                            propertiDeveloper.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/properti/${item.title}`}
                                    className="max-w-xs rounded-lg overflow-hidden shadow hover:shadow-lg border dark:border-none dark:bg-[#252525] transform transition-all duration-300 flex flex-col"
                                >
                                    <div className="w-full h-[200px] overflow-hidden">
                                        <Image
                                            className="w-full h-full object-cover hover:scale-110 transition"
                                            src={item.bannerProperty?.formats?.medium?.url ?? '/default-image.jpg'}
                                            loader={myLoader}
                                            alt={item.title}
                                            width={300}
                                            height={200}
                                        />
                                    </div>
                                    <div className="px-4 py-4 flex flex-col gap-2 flex-grow">
                                        <div className="bg-green text-white w-[5rem] text-center text-sm rounded">
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
};

export default DeveloperDetailPage;