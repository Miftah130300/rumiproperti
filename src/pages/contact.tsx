import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import PendingIcon from '@mui/icons-material/Pending';

const Footer = dynamic(() => import("src/component/footer"), { ssr: false });
const Navbar = dynamic(() => import("src/component/navbar"), { ssr: false });

export default function Contact() {
    const form = useRef<HTMLFormElement | null>(null);
    const [send, setSend] = useState(false)
    const [loading, setLoading] = useState(false)

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.current) {
            setLoading(true)
            emailjs
                .sendForm("service_rcu415f", "template_vks5kf9", form.current, {
                    publicKey: "HtPeCu-iL-uOrTNE0",
                })
                .then(
                    () => {
                        setSend(true)
                        console.log("SUCCESS!");
                        if (form.current) {
                            form.current.reset()
                        }
                    },
                    (error) => {
                        console.log("FAILED...", error.text);
                    }
                )
                .finally(() => {
                    setLoading(false);
                });
        } else {
            console.error("Form reference is not available.");
        }
    };

    return (
        <div>
            <Navbar />
            <main className="dark:bg-[#1E1E1E]">
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5 items-center">
                    <h2 className="text-xl font-semibold dark:text-white">HUBUNGI KAMI</h2>
                    <div className="flex flex-col md:flex-row md:gap-5 gap-10 pt-[50px] justify-between w-full">
                        <div className="text-center md:text-start">
                            <h2 className="font-semibold dark:text-white">Hubungi kami melalui kontak di bawah ini:</h2>
                            <ul className="dark:text-[#CCCCCC]">
                                <li>Email: rumamilenial@gmail.com</li>
                                <li>Phone number: 081291964488</li>
                                <li>Location: Kebon Jeruk, Jakarta Barat, Indonesia</li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2">
                            <form ref={form} onSubmit={sendEmail} className="max-w-lg mx-auto px-4">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        name="from_name"
                                        placeholder="Name"
                                        className="w-full bg-[#D9D9D9] dark:bg-opacity-50 p-2 border dark:border-none border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        name="user_email"
                                        placeholder="Email"
                                        className="w-full bg-[#D9D9D9] dark:bg-opacity-50 p-2 border dark:border-none border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <textarea
                                        placeholder="Message"
                                        name="message"
                                        className="w-full bg-[#D9D9D9] dark:bg-opacity-50 p-2 border dark:border-none border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full p-2 hover:bg-[#4b6645] bg-green text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
                                >
                                    {loading ?
                                        <PendingIcon />
                                        :
                                        send ? <><CheckIcon /> Message successfully sent</> : "Send"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}