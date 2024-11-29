import dynamic from "next/dynamic";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useQuestion } from "./api/fetchAPI";
const Footer = dynamic(() => import('src/component/footer'), { ssr: false });
const Navbar = dynamic(() => import('src/component/navbar'), { ssr: false });
const CTA = dynamic(() => import('src/component/CTA'), { ssr: false });

export default function About() {
    const { question } = useQuestion()
    return (
        <div>
            <Navbar />
            <main className="dark:bg-[#1E1E1E]">
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5 items-center">
                    <h2 className="text-sm font-semibold dark:text-white">About Rumi Properti</h2>
                    <div className="text-xl px-0 md:px-5 xl:px-20 text-center dark:text-[#CCCCCC]">
                        Rumi Properti menyediakan platform digital yang mempertemukan calon pembeli dan penyewa untuk menghadirkan hunian dengan harga terjangkau,
                        mulai dari rumah, apartemen, hingga kamar kos. Visi utama Rumi Properti adalah mempermudah akses masyarakat terhadap hunian berkualitas dengan harga yang bersahabat,
                        sambil mendukung para pengembang yang ingin menawarkan properti mereka secara efisien. Adapun misi Rumi Properti adalah untuk mempermudah masyarakat memiliki hunian, Rumi Property juga menyediakan layanan konsultasi serta edukasi finansial bagi penggunanya.
                    </div>
                </div>
                <div className="pt-[50px] px-5 md:px-10 w-full flex flex-col md:flex-row justify-between gap-10">
                    <div className="md:w-[500px]">
                        <h2 className="text-xl font-semibold dark:text-white">Kenapa harus Rumi?</h2>
                    </div>
                    <div className="flex flex-col gap-5">
                        {question.map((ques) => (
                            <Accordion key={ques.id} className="border-0 dark:text-[#24221D] dark:bg-[#D9D9D9] dark:hover:bg-[#c1c1c1]" >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className="bg-[#D9D9D9]"
                                >
                                    {ques.question}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {ques.answer}
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