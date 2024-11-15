import dynamic from "next/dynamic";
const Footer = dynamic(() => import('src/component/footer'), { ssr: false });
const Navbar = dynamic(() => import('src/component/navbar'), { ssr: false });
const CTA = dynamic(() => import('src/component/CTA'), { ssr: false });

export default function About() {
    return (
        <div>
            <Navbar />
            <main>
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5 items-center">
                    <h2 className="text-sm font-semibold">About Rumi Properti</h2>
                    <div className="text-xl px-0 md:px-5 xl:px-20 text-center">
                        Rumi Properti menyediakan platform digital yang mempertemukan calon pembeli dan penyewa untuk menghadirkan hunian dengan harga terjangkau,
                        mulai dari rumah, apartemen, hingga kamar kos. Visi utama Rumi Properti adalah mempermudah akses masyarakat terhadap hunian berkualitas dengan harga yang bersahabat,
                        sambil mendukung para pengembang yang ingin menawarkan properti mereka secara efisien. Adapun misi Rumi Properti adalah untuk mempermudah masyarakat memiliki hunian, Rumi Property juga menyediakan layanan konsultasi serta edukasi finansial bagi penggunanya.
                    </div>
                </div>
                <div className="pt-[100px] px-5 md:px-10 w-full flex flex-col md:flex-row justify-between gap-10">
                    <div>
                        <h2 className="text-xl font-semibold">Kenapa harus Rumi?</h2>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="px-6 py-2 bg-[#D9D9D9] rounded-lg w-[100%]">Platform digital untuk hunian terjangkau</div>
                        <div className="px-6 py-2 bg-[#D9D9D9] rounded-lg w-[100%]">Kolaborasi dengan developer lokal dan pemiliki properti</div>
                        <div className="px-6 py-2 bg-[#D9D9D9] rounded-lg w-[100%]">Layanan pengguna dan edukasi seputar properti</div>
                        <div className="px-6 py-2 bg-[#D9D9D9] rounded-lg w-[100%]">Membantu mencarikan hunian terjangkau yang Anda inginkan</div>
                    </div>
                </div>
                <CTA />
            </main>
            <Footer />
        </div>
    )
}