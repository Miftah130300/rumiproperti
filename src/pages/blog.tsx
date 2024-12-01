import dynamic from "next/dynamic";
const Footer = dynamic(() => import('src/component/footer'), { ssr: false });
const Navbar = dynamic(() => import('src/component/navbar'), { ssr: false });
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Head from "next/head";

interface Article {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
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
        }
    }
    category_article: {
        nameCategory: string;
    }
}

const myLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
};

export default function Blog() {
    // Ubah tipe state blog menjadi array Article[]
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Article[]>([]); // <-- array of articles

    // Fetch data using useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                const data = await res.json();
                setBlog(data.data || []); // <-- set blog as an array
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
        <>
            <Head>
                <title>Artikel Rumi Properti</title>
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Artikel Rumi Properti" />
                <meta property="og:description" content="Rumi Properti menyediakan platform digital yang mempertemukan calon pembeli dan penyewa untuk menghadirkan hunian dengan harga terjangkau" />
                <meta property="og:url" content={`https://rumiproperti.com/blog/`} />
            </Head>
            <div>
                <Navbar />
                <main className="dark:bg-[#1E1E1E]">
                    <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5">
                        <nav className="flex flex-col md:flex-row justify-between gap-5">
                            <ul className="flex gap-5">
                                <li className="text-sm">
                                    <Link href={'/blog/kategori/berita'}>Berita</Link>
                                </li>
                                <li className="text-sm">
                                    <Link href={'/blog/kategori/tips & trik'}>Tips & Trik</Link>
                                </li>
                                <li className="text-sm">
                                    <Link href={'/blog/kategori/kamus-properti'}>Kamus properti</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="pt-[50px] px-5 md:px-10 w-full flex flex-col gap-10">
                        {blog.length && blog.length > 0 ? (
                            <>
                                {blog.length && blog.length > 0 &&
                                    (
                                        <div className="flex flex-col gap-5">
                                            <div className="flex justify-between w-full">
                                                <h2 className="text-xl font-semibold dark:text-white">Berita</h2>
                                                <Link href={'/blog/kategori/berita'} >
                                                    <span className="border border-green text-green cursor-pointer hover:bg-green hover:text-white dark:text-green dark:border dark:border-[#307629] rounded-lg px-3 py-2 text-sm">Lihat semua</span>
                                                </Link>
                                            </div>
                                            <div className="flex flex-col md:flex-row gap-3">
                                                <Swiper
                                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                    spaceBetween={5}
                                                    slidesPerView={4}
                                                    navigation
                                                    breakpoints={{
                                                        340: {
                                                            slidesPerView: 1,
                                                            spaceBetween: 5,
                                                        },
                                                        768: {
                                                            slidesPerView: 3,
                                                            spaceBetween: 5,
                                                        },
                                                        1024: {
                                                            slidesPerView: 4,
                                                            spaceBetween: 5,
                                                        },
                                                    }}
                                                    className="flex w-full"
                                                >
                                                    {blog.filter((article: Article) => article.category_article?.nameCategory === 'Berita')
                                                        .slice(0, 4)
                                                        .map((article: Article) => {
                                                            const date = new Date(article.publishedAt);
                                                            const formattedDate = date.toLocaleDateString('id-ID', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            });
                                                            return (
                                                                <SwiperSlide key={article.id} className="w-full hover:shadow-lg">
                                                                    <Link href={`/blog/${article.slug}`} className="rounded-lg max-w-xs">
                                                                        <div className="h-full rounded-lg overflow-hidden shadow border dark:border-none dark:bg-[#252525] transform transition-all duration-300 flex flex-col">
                                                                            <div className="h-40 overflow-hidden">
                                                                                <Image
                                                                                    className="w-full h-full"
                                                                                    width={100}
                                                                                    height={100}
                                                                                    loader={myLoader}
                                                                                    src={article.cover.formats.large.url || article.cover.formats.medium.url || article.cover.formats.small.url || article.cover.formats.thumbnail.url}
                                                                                    alt={article.title} />
                                                                            </div>
                                                                            <div className="px-4 py-4 gap-2 flex flex-col flex-grow">
                                                                                <div className="text-green text-sm rounded">{article.category_article.nameCategory}</div>
                                                                                <div className="text-black flex-grow">
                                                                                    <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis dark:text-white">
                                                                                        {article.title}
                                                                                    </p>
                                                                                    <p className="text-xs text-black text-opacity-70 dark:text-[#CCCCCC]">{formattedDate}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </SwiperSlide>
                                                            );
                                                        })}
                                                </Swiper>
                                            </div>
                                        </div>
                                    )}
                                {blog.length && blog.length > 0 &&
                                    (
                                        <div className="flex flex-col gap-5">
                                            <div className="flex justify-between w-full">
                                                <h2 className="text-xl font-semibold dark:text-white">Tips & Trik</h2>
                                                <Link href={'/blog/kategori/tips & trik'} >
                                                    <span className="border border-green text-green cursor-pointer hover:bg-green hover:text-white dark:text-green dark:border dark:border-[#307629] rounded-lg px-3 py-2 text-sm">Lihat semua</span>
                                                </Link>
                                            </div>
                                            <div className="flex flex-col md:flex-row gap-3">
                                                <Swiper
                                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                    spaceBetween={5}
                                                    slidesPerView={4}
                                                    navigation
                                                    breakpoints={{
                                                        340: {
                                                            slidesPerView: 1,
                                                            spaceBetween: 5,
                                                        },
                                                        768: {
                                                            slidesPerView: 3,
                                                            spaceBetween: 5,
                                                        },
                                                        1024: {
                                                            slidesPerView: 4,
                                                            spaceBetween: 5,
                                                        },
                                                    }}
                                                    className="flex w-full"
                                                >
                                                    {blog.length && blog.length > 0 && blog
                                                        .filter((article: Article) => article.category_article?.nameCategory === 'Tips & Trik')
                                                        .slice(0, 4)
                                                        .map((article: Article) => {
                                                            if (!article.cover?.formats?.large?.url) {
                                                                return null;
                                                            }

                                                            const date = new Date(article.publishedAt);
                                                            const formattedDate = date.toLocaleDateString('id-ID', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            });

                                                            return (
                                                                <SwiperSlide key={article.id} className="w-full hover:shadow-lg">
                                                                    <Link href={`/blog/${article.slug}`} className="rounded-lg max-w-xs">
                                                                        <div className="h-full rounded-lg overflow-hidden shadow border dark:border-none dark:bg-[#252525] transform transition-all duration-300 flex flex-col">
                                                                            <div className="h-40 overflow-hidden">
                                                                                <Image
                                                                                    className="w-full h-full"
                                                                                    width={100}
                                                                                    height={100}
                                                                                    loader={myLoader}
                                                                                    src={article.cover.formats.large.url || article.cover.formats.medium.url || article.cover.formats.small.url || article.cover.formats.thumbnail.url}
                                                                                    alt={article.title}
                                                                                />
                                                                            </div>
                                                                            <div className="px-4 py-4 gap-2 flex flex-col flex-grow">
                                                                                <div className="text-green text-sm rounded">{article.category_article.nameCategory}</div>
                                                                                <div className="text-black flex-grow">
                                                                                    <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis dark:text-white">{article.title}</p>
                                                                                    <p className="text-xs text-black text-opacity-70 dark:text-[#CCCCCC]">{formattedDate}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </SwiperSlide>
                                                            );
                                                        })}
                                                </Swiper>
                                            </div>
                                        </div>
                                    )}
                            </>
                        ) : (
                            <p className="col-span-full text-black text-opacity-70 italic">Belum tersedia artikel</p>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}
