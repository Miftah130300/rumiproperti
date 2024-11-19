import dynamic from "next/dynamic";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAboutUs } from "./api/fetchAPI";
const Footer = dynamic(() => import('src/component/footer'), { ssr: false });
const Navbar = dynamic(() => import('src/component/navbar'), { ssr: false });
const CTA = dynamic(() => import('src/component/CTA'), { ssr: false });

export default function About() {
    const { reason } = useAboutUs()
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
                        {reason.map((reasons) => (
                            <Accordion key={reasons.id} className="border-0 rounded-lg shadow-md">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className="bg-[#D9D9D9] rounded-lg"
                                >
                                    {reasons.whyRumi}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {reasons.answerRumi}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </div>
                <CTA />
            </main>
            <Footer />
        </div>
    )
}