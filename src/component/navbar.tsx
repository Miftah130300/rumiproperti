import Link from "next/link"

export default function Navbar() {
    return (
        <header>
            <nav className="shadow-md w-full">
                <div className="flex justify-between py-5 px-5 md:px-10 w-full">
                    <div className="text-2xl">Rumi Logo</div>
                    <div className="flex justify-center items-center gap-10">
                        <ul className="md:flex gap-5 hidden">
                            <li className="text-sm hover:text-green">
                                <Link href={'/'}>Home</Link >
                            </li>
                            <li className="text-sm hover:text-green">
                                <Link href={'/properti'}>Tipe Properti</Link >
                            </li>
                            <li className="text-sm hover:text-green">
                                <Link href={'/blog'}>Blog</Link >
                            </li>
                            <li className="text-sm hover:text-green">
                                <Link href={'/about'}>About Us</Link >
                            </li>
                            <li className="text-sm hover:text-green">
                                <Link href={'/contact'}>Contact</Link >
                            </li>
                        </ul>
                        <div className="flex gap-3">
                            <Link className="text-sm px-6 py-2 hover:bg-[#4b6645] bg-green rounded-2xl text-white flex justify-center items-center" href={"https://bit.ly/SurveyRumi"} target='blank' role="button">Formulir</Link>
                            <Link className="text-sm px-6 py-2 hover:bg-[#4b6645] bg-green rounded-2xl text-white flex justify-center items-center" href={"https://wa.me/6281291964488"} target='blank' role="button">Hubungi Kami</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    )
}