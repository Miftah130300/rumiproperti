export default function Footer() {
    return (
        <footer className="mt-[100px] bg-green text-white md: p-5 md:p-8">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 grid-rows-1 gap-8">
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Rumi Logo</h2>
                        <p className="mt-2 text-sm">San Francisco, US</p>
                    </div>
                    <div className="mt-2 text-sm">
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Hubungi Kami</h3>
                    <p className="mt-2 text-sm">Email: rumamilenial@gmail.com</p>
                    <p className="mt-2 text-sm">Phone: 081291964488</p>
                    <p className="mt-2 text-sm">Office: San Francisco, US</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Tentang Kami</h3>
                    <p className="mt-2 font-sans text-sm">Rumi Properti adalah platform untuk mencari hunian idamanmu.  Dengan menampilkan pilihan properti terjangkau, Anda bisa mendapatkan hunian yang nyaman dan tentunya sesuai dengan budget Anda.</p>
                </div>
                <div className="w-48 h-32 bg-gray-300 rounded-md"></div>
            </div>
        </footer>
    )
}