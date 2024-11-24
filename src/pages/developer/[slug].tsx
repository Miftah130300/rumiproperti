import { useEffect, useState } from "react";
import { useDeveloper } from "../api/fetchAPI";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
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

const DeveloperDetailPage = () => {
    const { developer } = useDeveloper();
    const router = useRouter();
    const { slug } = router.query;

    const [currentDeveloper, setCurrentDeveloper] = useState<Developer | null>(null);

    useEffect(() => {
        if (developer.length > 0 && slug) {
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
                <div className="container mx-auto py-10 px-4">
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                        {currentDeveloper.logoDeveloper?.formats?.thumbnail?.url && (
                            <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6">
                                <Image
                                    src={currentDeveloper.logoDeveloper.formats.thumbnail.url}
                                    alt={currentDeveloper.nameDeveloper}
                                    width={160}
                                    height={160}
                                    className="object-cover"
                                    loader={myLoader}
                                />
                            </div>
                        )}
                        <h1 className="text-2xl font-bold text-center mb-4">{currentDeveloper.nameDeveloper}</h1>
                        <p className="text-gray-700 text-justify">{currentDeveloper.aboutDeveloper}</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default DeveloperDetailPage;