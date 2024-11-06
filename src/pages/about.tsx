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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod orci ac nunc porttitor,
                        a fermentum magna gravida. Sed venenatis, nisl ut elementum facilisis, risus nulla ullamcorper nunc, a tincidunt nulla erat eget justo.
                    </div>
                </div>
                <div className="pt-[100px] px-5 md:px-10 w-full flex flex-col md:flex-row justify-between gap-10">
                    <div>
                        <h2 className="text-xl font-semibold">Kenapa harus Rumi?</h2>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="px-6 py-2 bg-[#D9D9D9] rounded-lg w-[100%]">Karena Rumi bagus</div>
                        <div className="px-6 py-2 bg-[#D9D9D9] rounded-lg w-[100%]">Karena Rumi bagus banget</div>
                        <div className="px-6 py-2 bg-[#D9D9D9] rounded-lg w-[100%]">Karena Rumi bagus banget gak sih</div>
                        <div className="px-6 py-2 bg-[#D9D9D9] rounded-lg w-[100%]">Karena Rumi bagus banget gak sih gak ada lawan</div>
                    </div>
                </div>
                <CTA />
            </main>
            <Footer />
        </div>
    )
}