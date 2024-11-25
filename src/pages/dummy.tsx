import { useState } from 'react';

export default function Home() {
    const [message, setMessage] = useState(''); // State untuk satu tulisan
    const [buttonClicked, setButtonClicked] = useState(false); // Untuk menghindari klik ganda

    const handleClick = () => {
        if (buttonClicked) return; // Mencegah klik ganda
        setButtonClicked(true);

        const texts = ['Untungnya..', 'bumi masih berputar..', 'Untungnya..', 'ku tak pilih menyerah..']; // Tulisan yang akan muncul
        let index = 0;

        const interval = setInterval(() => {
            setMessage(texts[index]); // Set tulisan saat ini
            index++;

            if (index >= texts.length) {
                clearInterval(interval); // Hentikan interval setelah semua tulisan muncul
            }
        }, 2000); // Interval 1 detik
    };

    return (
        <main className="flex flex-col justify-center items-center h-screen gap-5">
            <div className='flex flex-col justify-center items-center w-[500px] h-[450px] border border-slate-300 rounded-lg'>
                <div className="text-2xl mb-4">{message}</div>
                <div className="shadow-sm text-xl w-1/2 border rounded-lg p-5 text-center bg-green hover:bg-[#54ad3e] text-white">
                    <button onClick={handleClick} className='px-5 py-2'>
                        Nyanyi!
                    </button>
                </div>
            </div>
        </main>
    );
}
