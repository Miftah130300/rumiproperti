import { useDictionary } from "src/pages/api/fetchAPI"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import Link from "next/link";
import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import('src/component/footer'), { ssr: false });
const Navbar = dynamic(() => import('src/component/navbar'), { ssr: false });

interface Kamus {
    id: number;
    wordProperty: string;
    descriptionWord: BlocksContent;
}

export default function DetailDictionary() {
    const router = useRouter();
    const { slug } = router.query;

    // Update state type to accept Kamus or null
    const [selectedDictionary, setDictionary] = useState<Kamus | null>(null);
    const { dictionary } = useDictionary();

    useEffect(() => {
        if (dictionary?.length > 0 && slug) {
            const slugDictionary = dictionary.find((dic) => dic.wordProperty === slug);
            setDictionary(slugDictionary || null);
        }
    }, [dictionary, slug]);

    return (
        <>
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
                {selectedDictionary ? (
                    <div className="py-10 px-5 md:px-10 w-full flex flex-col gap-5">
                        <h2 className="text-xl md:text-3xl font-semibold">{selectedDictionary.wordProperty}</h2>
                        <div className="w-full max-w-full md:max-w-[80%]">
                            <BlocksRenderer
                                content={selectedDictionary.descriptionWord}
                                blocks={{
                                    // You can use the default components to set class names...
                                    paragraph: ({ children }) => <p className="text-neutral900 max-w-prose">{children}</p>,
                                    // ...or point to a design system
                                    heading: ({ children, level }) => {
                                        switch (level) {
                                            case 1:
                                                return <Typography variant="h1">{children}</Typography>
                                            case 2:
                                                return <Typography variant="h2">{children}</Typography>
                                            case 3:
                                                return <Typography variant="h3">{children}</Typography>
                                            case 4:
                                                return <Typography variant="h4">{children}</Typography>
                                            case 5:
                                                return <Typography variant="h5">{children}</Typography>
                                            case 6:
                                                return <Typography variant="h6">{children}</Typography>
                                            default:
                                                return <Typography variant="h1">{children}</Typography>
                                        }
                                    },
                                    // For links, you may want to use the component from your router or framework
                                    link: ({ children, url }) => <Link href={url}>{children}</Link>,
                                }}
                                modifiers={{
                                    bold: ({ children }) => <strong>{children}</strong>,
                                    italic: ({ children }) => <span className="italic">{children}</span>,
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <p>Tidak ada detail istilah yang ditampilkan</p>
                )}
            </main>
            <Footer />
        </>
    );
}
