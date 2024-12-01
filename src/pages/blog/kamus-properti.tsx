import Head from "next/head";
import dynamic from "next/dynamic";
import { useDictionary } from "../api/fetchAPI";
import { useState } from "react";
const Footer = dynamic(() => import('src/component/footer'), { ssr: false });
const Navbar = dynamic(() => import('src/component/navbar'), { ssr: false });

export default function Dictionary() {
    const { dictionary } = useDictionary();
    const [filterLetter, setFilterLetter] = useState<string>(''); // Default is no filter.

    // Filter dictionary based on the first letter.
    const filteredDictionary = dictionary.filter((item) =>
        item.wordProperty.charAt(0).toLowerCase() === filterLetter.toLowerCase()
    );

    return (
        <>
            <Navbar />
            <main>
                <div className="p-4">
                    <h1 className="text-xl font-bold">Kamus Properti</h1>
                    {/* Dropdown or Buttons to Select Letter */}
                    <div className="flex gap-2 my-4">
                        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
                            <button
                                key={letter}
                                onClick={() => setFilterLetter(letter)}
                                className={`px-4 py-2 rounded ${filterLetter === letter
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                                    }`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>

                    {/* List of Articles */}
                    <ul>
                        {filteredDictionary.map((item) => (
                            <li key={item.id} className="my-2">
                                <h2 className="text-lg font-semibold">{item.wordProperty}</h2>
                            </li>
                        ))}
                    </ul>

                    {/* Display message if no articles */}
                    {filteredDictionary.length === 0 && (
                        <p>No articles found for the selected letter.</p>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};