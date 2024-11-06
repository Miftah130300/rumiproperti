import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from "next/image";
import dynamic from "next/dynamic";
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
    category: {
        name: string;
    }
    cover: {
        url: string;
    };
    author: {
        name: string;
    };
    blocks: {
        __component: string;
        id: number;
        body: string; // Assuming this is the rich text content
    }[];
}

export default function DetailBlog() {
    const router = useRouter();
    const { slug } = router.query;

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!article) {
        return <p>Article not found</p>;
    }

    return (
        <div>
            <Navbar />
            <main>
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
                        <div>
                            <input
                                className="bg-[#D9D9D9] bg-opacity-50 py-2 px-4 rounded-lg text-md flex-grow"
                                placeholder="Cari artikel.."
                            />
                        </div>
                    </nav>
                </div>
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col md:flex-row gap-5">
                    <div className="w-full md:w-3/4 flex flex-col gap-5 items-center">
                        <div className="text-center gap-2 flex flex-col">
                            <h2 className="text-xl md:text-3xl font-semibold text-green">{article.title}</h2>
                            <p className="text-sm text-black text-opacity-70">{article.author.name} | Kategori: {article.category.name}</p>
                            <p className="text-sm text-black text-opacity-70">{new Date(article.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="w-full text-center">
                            <Image src={article.cover.url} width={100} height={100} alt='foto' className="h-[400px] w-full object-cover" />
                            <p className="text-sm text-black text-opacity-70">Source</p>
                        </div>
                        <div className="w-full">
                            {/* Render the rich-text content using react-markdown */}
                            {article.blocks.map(block => (
                                block.__component === "shared.rich-text" && (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} key={block.id}>
                                        {block.body}
                                    </ReactMarkdown>
                                )
                            ))}
                        </div>
                    </div>
                    <div className="border w-full md:w-1/4 bg-[#D9D9D9] max-h-[500px] flex justify-center items-center">Banner</div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
