import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
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
    cover: {
        formats: {
            large: {
                url: string;
            }
        }
    }
    category_article: {
        nameCategory: string;
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
    const [searchQuery, setSearchQuery] = useState(""); // New state for search query

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                const data = await res.json();
                setArticles(data.data || []);
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

    // Filter articles based on category and search query
    const filteredArticles = articles
        .filter((article: Article) =>
            article.category_article.nameCategory.toLowerCase() === slug
        )
        .filter((article: Article) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const category = articles.find((article: Article) => article.category_article)?.title || "Default Title";

    return (
        <>
            <Head>
                <title>Rumi artikel | {category}</title>
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Artikel Rumi Properti" />
                <meta property="og:description" content="Rumi Properti menyediakan platform digital yang mempertemukan calon pembeli dan penyewa untuk menghadirkan hunian dengan harga terjangkau,
                            mulai dari rumah, apartemen, hingga kamar kos. Visi utama Rumi Properti adalah mempermudah akses masyarakat terhadap hunian berkualitas dengan harga yang bersahabat,
                            sambil mendukung para pengembang yang ingin menawarkan properti mereka secara efisien. Adapun misi Rumi Properti adalah untuk mempermudah masyarakat memiliki hunian, Rumi Property juga menyediakan layanan konsultasi serta edukasi finansial bagi penggunanya." />
                <meta property="og:url" content={`https://rumiproperti.com/blog/kategori/${filteredArticles}`} />
            </Head>
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
                                    <Link href={"/blog/kategori/kamus properti"}>Kamus Properti</Link>
                                </li>
                            </ul>
                            <div>
                                <input
                                    className="bg-[#D9D9D9] bg-opacity-50 py-2 px-4 rounded-lg text-md flex-grow"
                                    placeholder="Cari artikel..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
                                />
                            </div>
                        </nav>
                    </div>

                    <div className="pt-[50px] px-5 md:px-10 w-full flex flex-col gap-5">
                        <h2 className="capitalize text-xl font-semibold">{slug}</h2>

                        {filteredArticles.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {filteredArticles.map((article: Article) => {
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
                                                <div className="h-36">
                                                    <Image className="w-full h-full" width={100} height={100} src={article.cover.formats.large.url} alt={article.title} loader={myLoader} />
                                                </div>
                                                <div className="px-4 py-4 gap-2 flex flex-col flex-grow">
                                                    <div className="text-green text-sm rounded">{article.category_article.nameCategory}</div>
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
                            <p className="col-span-full text-black text-opacity-70 italic">Belum tersedia artikel</p>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
