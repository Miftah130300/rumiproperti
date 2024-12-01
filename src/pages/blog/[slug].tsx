import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from "next/image";
import dynamic from "next/dynamic";
import Head from "next/head";
const Footer = dynamic(() => import('src/component/footer'), { ssr: false });
const Navbar = dynamic(() => import('src/component/navbar'), { ssr: false });

interface Article {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category_article: {
        nameCategory: string;
    };
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
        };
    };
    author: {
        name: string;
    };
    blocks: {
        __component: string;
        id: number;
        text: string;
    }[];
}

interface Banner {
    title: string;
    bannerImage: {
        formats: {
            large: {
                url: string;
                width: number;
                height: number;
            };
        };
    };
}

const myLoader = ({ src }: { src: string }) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log('Loading image from:', `${baseUrl}${src}`); // Debug the full image URL
    return `${baseUrl}${src}`;
};

export default function DetailBlog() {
    const router = useRouter();
    const { slug } = router.query;

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [banner, setBanner] = useState<Banner | null>(null);

    // Fetch article data
    useEffect(() => {
        const fetchArticle = async () => {
            if (!slug) return;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch article');
                }

                const data = await res.json();
                if (data.data.length > 0) {
                    setArticle(data.data[0]);
                } else {
                    setArticle(null);
                }
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);

    // Fetch banner data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banner-artikel?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                const data = await res.json();
                setBanner(data.data || []); // <-- set blog as an array
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!article) {
        return <p>Article not found</p>;
    }

    return (
        <>
            <Head>
                <title>{article.title}</title>
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.description} />
                <meta property="og:image" content={article.cover.formats.large?.url} />
                <meta property="og:url" content={`https://rumiproperti.com/blog/${article.slug}`} />
            </Head>
            <div>
                <Navbar />
                <main className="dark:bg-[#1E1E1E]">
                    <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5">
                        <nav className="flex flex-col md:flex-row gap-5">
                            <ul className="flex gap-5">
                                <li className="text-sm">
                                    <Link href={'/blog/kategori/berita'}>Berita</Link>
                                </li>
                                <li className="text-sm">
                                    <Link href={'/blog/kategori/tips & trik'}>Tips & Trik</Link>
                                </li>
                                <li className="text-sm">
                                    <Link href={'/blog/kategori/kamus'}>Kamus properti</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="py-10 px-5 md:px-10 w-full flex flex-col md:flex-row gap-5">
                        <div className="w-full md:w-3/4 flex flex-col gap-5 items-center">
                            <div className="text-center gap-2 flex flex-col">
                                <h2 className="text-xl md:text-3xl font-semibold text-green">{article.title}</h2>
                                <p className="text-sm text-black text-opacity-70 dark:text-[#CCCCCC] dark:text-opacity-100">
                                    {article.author.name} | Kategori: {article.category_article.nameCategory}
                                </p>
                                <p className="text-sm text-black text-opacity-70 dark:text-[#CCCCCC] dark:text-opacity-100">{new Date(article.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="w-full text-center">
                                <Image
                                    loader={myLoader}
                                    src={article.cover.formats.large.url || article.cover.formats.medium.url || article.cover.formats.small.url || article.cover.formats.thumbnail.url}
                                    width={100}
                                    height={100}
                                    alt="foto"
                                    className="h-[400px] w-full object-cover"
                                />
                                <p className="text-sm text-black text-opacity-70 dark:text-[#CCCCCC] dark:text-opacity-100">Source</p>
                            </div>
                            <div className="w-full md:w-full dark:text-white flex justify-center">
                                <div className="w-full prose prose-md dark:prose-invert max-w-full">
                                    {article.blocks.map((block) => (
                                        block.__component === "description.description" && (
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                key={block.id}
                                            >
                                                {block.text}
                                            </ReactMarkdown>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="border dark:border-none w-full md:w-1/4 bg-[#D9D9D9] md:h-[500px] flex justify-center items-center relative">
                            {banner && banner.bannerImage && (
                                <Image
                                    loader={myLoader}
                                    src={banner.bannerImage.formats.large.url}
                                    width={100}
                                    height={100}
                                    alt="Banner"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
