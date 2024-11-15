import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
                        <>
                            <InstagramIcon />
                        </>
                        <>
                            <LinkedInIcon />
                        </>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Hubungi Kami</h3>
                    <p className="mt-2 text-sm">Email: rumamilenial@gmail.com</p>
                    <p className="mt-2 text-sm">Phone: 081291964488</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Tentang Kami</h3>
                    <p className="mt-2 font-sans text-sm">Rumi Properti adalah platform untuk mencari hunian idamanmu.  Dengan menampilkan pilihan properti terjangkau, Anda bisa mendapatkan hunian yang nyaman dan tentunya sesuai dengan budget Anda.</p>
                </div>
                <div className="w-full h-full bg-gray-300 rounded-md relative">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-md"
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3966.3258848578675!2d106.7735920749904!3d-6.220687993767329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTMnMTQuNSJTIDEwNsKwNDYnMzQuMiJF!5e0!3m2!1sid!2sid!4v1731511353384!5m2!1sid!2sid"
                        width="100%"
                        height="100%"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </footer>
    )
}