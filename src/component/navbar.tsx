import Link from "next/link";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import { useState } from 'react';
import logo from '/public/asset/logo.png'

const DynamicHamburger = dynamic(() => import('hamburger-react').then(mod => mod.Sling), { ssr: false });

export default function Navbar() {
    const isMobile = useMediaQuery('(max-width:950px)');
    const [isOpen, setOpen] = useState(false);

    return (
        <header className='dark:bg-[#1E1E1E]'>
            <nav className="shadow-md w-full">
                <div className="flex justify-between py-5 px-5 md:px-10 w-full">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={logo}
                            alt="Rumi Logo"
                            width={70}
                            height={25}
                            objectFit="fill"
                        />
                        <span className="ml-2 text-lg font-semibold dark:text-[#CCCCCC]">Rumi Properti</span>
                    </Link>
                    {isMobile ? (
                        <DynamicHamburger toggled={isOpen} toggle={setOpen} size={20} />
                    ) : (
                        <div className="flex justify-center items-center gap-10">
                            <ul className="md:flex gap-5 hidden dark:text-[#CCCCCC]">
                                <li className="text-sm hover:text-green">
                                    <Link href="/">Home</Link>
                                </li>
                                <li className="text-sm hover:text-green">
                                    <Link href="/beli">Beli</Link>
                                </li>
                                <li className="text-sm hover:text-green">
                                    <Link href="/sewa">Sewa</Link>
                                </li>
                                <li className="text-sm hover:text-green">
                                    <Link href="/blog">Blog</Link>
                                </li>
                                <li className="text-sm hover:text-green">
                                    <Link href="/about">About Us</Link>
                                </li>
                                <li className="text-sm hover:text-green">
                                    <Link href="/contact">Contact</Link>
                                </li>
                            </ul>
                            <div className="flex gap-3">
                                <Link className="text-sm px-6 py-2 bg-[#D9D9D9] hover:bg-[#c1c1c1] rounded-2xl text-[#24221D] flex justify-center items-center" href="https://form.jotform.com/243384851890062" target="_blank" role="button">Pasang Iklan Gratis</Link>
                                <Link className="text-sm px-6 py-2 hover:bg-[#4b6645] bg-green rounded-2xl text-white flex justify-center items-center" href="https://wa.me/6281291964488" target="_blank" role="button">Hubungi Kami</Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
            {isOpen &&
                <div className="top-0 left-0 w-full relative h-screen z-50 flex flex-col px-5 pb-5 gap-5">
                    <ul className="flex flex-col gap-5 mt-10 dark:text-[#CCCCCC]">
                        <li className="text-lg hover:text-green">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="text-lg hover:text-green">
                            <Link href="/beli">Beli</Link>
                        </li>
                        <li className="text-lg hover:text-green">
                            <Link href="/sewa">Sewa</Link>
                        </li>
                        <li className="text-lg hover:text-green">
                            <Link href="/blog">Blog</Link>
                        </li>
                        <li className="text-lg hover:text-green">
                            <Link href="/about">About Us</Link>
                        </li>
                        <li className="text-lg hover:text-green">
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>
                    <div className="flex flex-col gap-5 mt-5">
                        <Link className="text-sm px-6 py-2 bg-[#D9D9D9] hover:bg-[#c1c1c1] rounded-2xl text-[#24221D] flex justify-center items-center" href="https://form.jotform.com/243384851890062" target="_blank" role="button">Pasang Iklan Gratis</Link>
                        <Link className="text-sm px-6 py-2 hover:bg-[#4b6645] bg-green rounded-2xl text-white flex justify-center items-center" href="https://wa.me/6281291964488" target="_blank" role="button">Hubungi Kami</Link>
                    </div>
                </div>
            }
        </header>
    );
}
