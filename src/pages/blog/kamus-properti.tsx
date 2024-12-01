import dynamic from "next/dynamic";
import { useDictionary } from "../api/fetchAPI";

const Footer = dynamic(() => import("src/component/footer"), { ssr: false });
const Navbar = dynamic(() => import("src/component/navbar"), { ssr: false });

export default function Dictionary() {
    const { dictionary } = useDictionary();

    // Grouping data by the first letter of wordProperty with validation
    const groupedDictionary = dictionary?.reduce((acc, item) => {
        // Validate wordProperty before using it
        if (item.wordProperty && typeof item.wordProperty === "string") {
            const firstLetter = item.wordProperty.charAt(0).toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(item);
        }
        return acc;
    }, {} as Record<string, typeof dictionary>) || {};

    return (
        <>
            <Navbar />
            <main>
                <div className="p-4">
                    <h1 className="text-xl font-bold">Kamus Properti</h1>
                    {/* Display grouped articles */}
                    {Object.keys(groupedDictionary)
                        .sort()
                        .map((letter) => (
                            <div key={letter} className="mb-6">
                                <h2 className="text-lg font-bold text-blue-500">
                                    {letter}
                                </h2>
                                <ul className="ml-4">
                                    {groupedDictionary[letter].map((item) => (
                                        <li key={item.id} className="my-2">
                                            {item.wordProperty}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                </div>
            </main>
            <Footer />
        </>
    );
}