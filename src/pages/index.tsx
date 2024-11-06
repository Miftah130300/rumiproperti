import dynamic from 'next/dynamic';
import Image from 'next/image';
import home from "/public/asset/1.webp";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import { Autoplay } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Link from 'next/link';
const CarouselTestimony = dynamic(() => import('src/component/carouselTestimony/carouselTestimony'), { ssr: false });

export default function Home() {
  const images = new Array(7).fill(home)
  const slides = [0, 1, 2, 3, 4, 5]

  return (
    <div>
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
                  <Link href={'/'}>Tipe Properti</Link >
                </li>
                <li className="text-sm hover:text-green">
                  <Link href={'/'}>Blog</Link >
                </li>
                <li className="text-sm hover:text-green">
                  <Link href={'/'}>About Us</Link >
                </li>
                <li className="text-sm hover:text-green">
                  <Link href={'/'}>Contact</Link >
                </li>
              </ul>
              <Link className="text-sm px-6 py-2 bg-green rounded-2xl text-white flex justify-center items-center" href={"/contact"} role="button">Hubungi Kami</Link>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="relative">
          <div className="component-a bg-gray-200 w-full h-[300px] md:h-[350px] lg:h-[400px] flex items-center justify-center">
            <div className="component-b w-full h-full">
              <Swiper
                spaceBetween={30}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="w-full h-full"
              >
                {images.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <div className="w-full h-full relative">
                        <Image
                          src={item}
                          alt={item.title}
                          className="object-cover w-full h-full"
                          layout="fill"
                          priority
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}

              </Swiper>
            </div>
          </div>
          <div className="search-bar absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[800px] bg-white shadow-lg rounded-lg p-5 z-10">
            <div className="flex flex-col md:flex-row gap-3 space-x-4 items-center">
              <input
                type="text"
                placeholder="Tipe properti"
                className="flex-1 md:block hidden border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Alamat"
                className="flex-1 md:block hidden border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Cari properti berdasarkan nama, kota, atau daerah"
                className="flex-1 md:hidden block border rounded-lg p-2 w-full"
              />
              <a className="bg-green text-white rounded-lg px-5 py-2 cursor-pointer md:block w-full text-center">
                Cari Properti
              </a>
            </div>
          </div>
        </div>
        <div className="pt-[150px] px-5 md:px-10">
          <div className="flex flex-col gap-5 md:gap-0 md:flex-row md:h-[350px] mx-auto w-full">
            <div className="md:w-1/2 w-full h-full flex flex-col justify-center">
              <div className="text-center md:text-start">
                <h2 className="text-2xl font-semibold text-[#24221D]">Temukan properti di Rumi</h2>
                <p className="mt-2 text-md">
                  Kami memiliki puluhan rekomendasi terbaik, mulai dari rumah, apartemen, kos, hingga tanah.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 w-full h-full flex rounded-lg">
              <Image src={home} alt="Image 2" className="h-full w-full object-cover rounded-lg" />
            </div>
          </div>
        </div>
        <div className="pt-[150px] px-5 md:px-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-[#24221D]">Pilih kota hunian impianmu</h2>
            <div className="flex gap-5">
              {images.map((image, id) => (
                <div key={id} className="h-[60px] w-[150px] md:flex hidden flex-col items-center rounded-lg ">
                  <div className="rounded-lg">
                    <Image className="rounded-lg" src={image} alt="location" />
                  </div>
                  <div>Jakarta</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-[150px] px-5 md:px-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-[#24221D]">Rekomendasi hunian untukmu</h2>
            <div className="flex md:flex-row flex-col gap-5">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]} // Enable features
                spaceBetween={30}
                slidesPerView={3} // Show 3 slides at a time
                navigation // Enable next/prev buttons
                breakpoints={{
                  340: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                  },
                }}
                className="flex w-full"
              >
                {images.map((home, id) => (
                  <SwiperSlide key={id} className="max-w-xs pr-3">
                    <div key={id} className=" rounded-lg overflow-hidden shadow border transform transition-all duration-300">
                      <Image className="w-full" src={home} alt="Sunset in the mountains" />
                      <div className="px-4 py-4 gap-2 flex flex-col">
                        <div className="bg-green text-white w-[5rem] text-center text-sm rounded">Rumah</div>
                        <div className="text-black">
                          <div className="font-bold text-medium-bold mb-2">Rp 2M</div>
                          <p className="text-sm">Rumah di Sawangan, Depok</p>
                          <p className="text-xs text-black text-opacity-70">Sawangan, Depok, Jawa Barat</p>
                        </div>
                      </div>
                      <div className="text-xs mx-4 py-4 gap-2 flex flex-col border-t border-black border-opacity-70">
                        fasilitas
                      </div>
                      <div className="px-4 pt-4 pb-4 gap-5 flex items-center">
                        <span className="inline-block bg-[#D9D9D9] rounded-lg px-3 py-3 text-xs font-semibold text-black text-opacity-70">Lihat detail</span>
                        <span className="inline-block bg-green rounded-lg px-3 py-3 text-xs font-semibold text-white">Hubungi kami</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="pt-[50px] px-5 md:px-10">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-[#24221D]">Artikel Rumi</h2>
              <a className="border border-green text-green cursor-pointer hover:bg-green hover:text-white rounded-lg px-6 py-3">Cari Artikel</a>
            </div>
            <div className="flex flex-col md:flex-row w-full gap-2">
              <div className="relative w-full md:w-1/2">
                <Image src={home} alt="Image 1" className="h-full w-full object-cover rounded-md" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-5 rounded-md">
                  <span className="text-white text-xl font-semibold">Rumah di Bekasi terjual 100 unit dalam satu bulan</span>
                </div>
              </div>
              <div className="w-1/2 md:flex flex-col hidden gap-2">
                <div className="relative w-full">
                  <Image src={home} alt="Image 2" className="h-full w-full object-cover rounded-md" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-5 rounded-md">
                    <span className="text-white text-xl font-semibold">Apartemen di Jakarta ludes terjual hanya dalam 2 minggu</span>
                  </div>
                </div>
                <div className="w-full flex gap-2">
                  <div className="relative w-1/2">
                    <Image src={home} alt="Image 3" className="h-full w-full object-cover rounded-md" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-5 rounded-md">
                      <span className="text-white text-xl font-semibold">Kos di Depok penuh sampai 2025</span>
                    </div>
                  </div>
                  <div className="relative w-1/2">
                    <Image src={home} alt="Image 4" className="h-full w-full object-cover rounded-md" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-5 rounded-md">
                      <span className="text-white text-xl font-semibold">Tanah strategis di Bandung mulai diminati investor</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[100px] px-5 md:px-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-[#24221D]">Our Partner</h2>
            <div className="flex gap-5">
              {
                images.map((image, id) => (
                  <div key={id} className="rounded-lg h-[40px] w-[130px] bg-gray1">
                    <Image className="rounded-lg" src={image} alt="partner" />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="pt-[100px] px-5 md:px-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center w-full md:w-1/2">
              <div className="text-center md:text-start">
                <h2 className="text-xl font-semibold text-[#24221D]">Apa kata mereka tentang Rumi</h2>
                <p className="mt-2 text-md">
                  Sejak [tahun], kami telah membantu puluhan orang menemukan hunian impian mereka.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <CarouselTestimony slides={slides} />
            </div>
          </div>
        </div>
      </main >
      <footer className="mt-[100px] bg-green text-white md: p-5 md:p-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 grid-rows-1 gap-8">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold">Rumi Logo</h2>
              <p className="mt-2 text-sm">San Francisco, US</p>
            </div>
            <p className="mt-2 text-sm">Sosial media icon</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Hubungi Kami</h3>
            <p className="mt-2 text-sm">Email: rumiproperti@gmail.com</p>
            <p className="mt-2 text-sm">Phone: 081xxxxxxxx87</p>
            <p className="mt-2 text-sm">Office: San Francisco, US</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Tentang Kami</h3>
            <p className="mt-2 text-sm">Rumi Properti adalah ahaha hihihi huhuhu hehehe hohohoho</p>
          </div>
          <div className="w-48 h-32 bg-gray-300 rounded-md"></div>
        </div>
      </footer>
    </div >
  );
}