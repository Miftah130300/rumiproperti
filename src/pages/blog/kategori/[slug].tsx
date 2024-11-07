import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import('src/component/footer'), { ssr: false });
const Navbar = dynamic(() => import('src/component/navbar'), { ssr: false });

// Update interface Article sesuai data JSON
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
            }
        }
    }
    category: {
        name: string;
    }
}

const myLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
};

export default function Category() {
    const router = useRouter();
    const { slug } = router.query;

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch data using useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=*`);
                const data = await res.json();
                setArticles(data.data || []);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run only once after component mounts

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <main>
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5">
                    <nav className="flex flex-col md:flex-row justify-between gap-5">
                        <ul className="flex gap-5">
                            <li className="text-sm">
                                <Link href={"/blog/kategori/berita"}>Berita</Link>
                            </li>
                            <li className="text-sm">
                                <Link href={"/blog/kategori/tips & trik"}>Tips & Trik</Link>
                            </li>
                            <li className="text-sm">
                                <Link href={"/blog/kategori/kamus properti"}>Kamus properti</Link>
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

                <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5">
                    <h2 className="capitalize text-xl font-semibold">{slug}</h2>

                    {/* Render the articles */}
                    {articles.length > 0 ? (
                        <div className="flex flex-col md:flex-row gap-3">
                            {articles
                                .filter((article: Article) => article.category?.name.toLocaleLowerCase() === slug)
                                .map((article: Article) => {
                                    const date = new Date(article.publishedAt);
                                    const formattedDate = date.toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    });

                                    return (
                                        <Link key={article.id} href={`/blog/${article.slug}`} className="rounded-lg hover:shadow-lg max-w-xs">
                                            <div className="max-w-xs h-full rounded-lg overflow-hidden shadow border transform transition-all duration-300 flex flex-col">
                                                <Image className="w-full" width={100} height={100} src={article.cover.formats.large.url} alt={article.title} loader={myLoader} />
                                                <div className="px-4 py-4 gap-2 flex flex-col flex-grow">
                                                    <div className="text-green text-sm rounded">{article.category.name}</div>
                                                    <div className="text-black flex-grow">
                                                        <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{article.title}</p>
                                                        <p className="text-xs text-black text-opacity-70">{formattedDate}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                        </div>
                    ) : (
                        <p>No articles found</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}