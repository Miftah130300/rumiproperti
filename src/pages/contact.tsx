import dynamic from "next/dynamic";
const Footer = dynamic(() => import('src/component/footer'), { ssr: false });
const Navbar = dynamic(() => import('src/component/navbar'), { ssr: false });

export default function Contact() {
    return (
        <div>
            <Navbar />
            <main>
                <div className="pt-10 px-5 md:px-10 w-full flex flex-col gap-5 items-center">
                    <h2 className="text-xl font-semibold">HUBUNGI KAMI</h2>
                    <div className="flex flex-col md:flex-row md:gap-5 gap-10 pt-10 justify-between w-full">
                        <div className="text-center md:text-start">
                            <h2 className="font-semibold">Hubungi kami melalui kontak di bawah ini:</h2>
                            <ul>
                                <li>Email: rumiproperti@gmail.com</li>
                                <li>Phone number: 6281xxxxx</li>
                                <li>Location: Gedung Sate, Bandung</li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2">
                            <form className="max-w-lg mx-auto px-4">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full bg-[#D9D9D9] p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full bg-[#D9D9D9] p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <textarea
                                        placeholder="Message"
                                        className="w-full bg-[#D9D9D9] p-2 h-32 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full p-2 bg-green text-white rounded-md hover:bg-green-700"
                                >
                                    SUBMIT
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}