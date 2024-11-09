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
import { useCities, usePartner, useProperti, useBlog } from 'src/lib/fetchCity';
import { useEffect } from 'react';
import Head from 'next/head';

import Link from 'next/link';
import { useState } from 'react';
const Navbar = dynamic(() => import('src/component/navbar'), { ssr: false });
const CarouselTestimony = dynamic(() => import('src/component/carouselTestimony/carouselTestimony'), { ssr: false });


const myLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
};

interface Banner {
  id: number;
  title: string;
  bannerImage: {
    formats: {
      medium: {
        url: string;
      }
    }
  }
}

export default function Home() {
  // const images = new Array(7).fill(home)
  const [banner, setBanner] = useState<Banner[]>([])

  const { city } = useCities();
  const { partner } = usePartner();
  const { properti } = useProperti();
  const { blog } = useBlog();

  // Fetching banner data directly in code2
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banner-heroes?populate=*`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch banners");
        }

        const data = await res.json();
        setBanner(data.data || []);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <>
      <Head>
        <title>Rumi Properti: Jual & Sewa Rumah, Apartemen, Tanah, Kos</title>
      </Head>
      <div>
        <Navbar />
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
                  className="w-full h-full">
                  {banner.map((bannerItem) => (
                    <SwiperSlide key={bannerItem.id}>
                      <div className="w-full h-full relative">
                        <Image
                          src={bannerItem.bannerImage?.formats?.medium?.url || '/fallback-image.jpg'} // Replace with a fallback image path if necessary
                          alt={bannerItem.title}
                          className="object-cover w-full h-full"
                          layout="fill"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
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
              <div className="flex">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={5}
                  slidesPerView={6}
                  navigation
                  breakpoints={{
                    340: {
                      slidesPerView: 3,
                      spaceBetween: 5,
                    },
                    768: {
                      slidesPerView: 6,
                      spaceBetween: 5,
                    },
                    1024: {
                      slidesPerView: 6,
                      spaceBetween: 5,
                    },
                  }}
                  className="flex w-full"
                >
                  {city.map((city) => (
                    <SwiperSlide key={city.id} className='w-full'>
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-[120px] w-[180px] md:flex hidden flex-col items-center rounded-lg overflow-hidden">
                          <div className="relative w-full h-full">
                            <Image
                              className="object-cover"
                              loader={myLoader}
                              width={300}
                              height={225}
                              src={city.imageCity.formats.thumbnail.url}
                              alt="location"
                            />
                          </div>
                        </div>
                        <div className="text-sm mt-1">{city.nameCity}</div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
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
                  {properti.slice(0, 4).map((home) => (
                    <SwiperSlide key={home.id} className="max-w-xs w-full pr-3">
                      <Link href={`/properti/${home.title}`} className="rounded-lg hover:shadow-lg">
                        <div className="max-w-xs h-[450px] rounded-lg overflow-hidden shadow border transform transition-all duration-300">
                          <div className="w-full h-[200px] overflow-hidden">
                            <Image
                              className="w-full h-full object-cover hover:scale-110 transition"
                              src={home.bannerProperty?.formats?.large?.url || '/default-image.jpg'}
                              loader={myLoader}
                              alt={home.title}
                              width={300}
                              height={200}
                            />
                          </div>
                          <div className="px-4 py-4 gap-2 flex flex-col">
                            <div className="bg-green text-white w-[5rem] text-center text-sm rounded">{home.category.name}</div>
                            <div className="text-black">
                              <div className="font-bold text-medium-bold mb-2">Rp {home.price.toLocaleString()}</div>
                              <p className="text-sm">{home.title}</p>
                              <p className="text-xs text-black text-opacity-70">{home.address}</p>
                            </div>
                          </div>
                          <div className="text-xs mx-4 py-4 gap-2 flex flex-col border-t border-black border-opacity-70">
                            fasilitas
                          </div>
                          <div className="px-4 pt-4 pb-4 gap-5 flex items-center">
                            <Link href={`/properti/${home.title}`}>
                              <span className="inline-block bg-[#D9D9D9] hover:bg-[#c1c1c1] rounded-lg px-3 py-3 text-xs font-semibold text-black text-opacity-70">
                                Lihat detail
                              </span>
                            </Link>
                            <span className="inline-block bg-green rounded-lg px-3 py-3 text-xs font-semibold text-white">
                              Hubungi kami
                            </span>
                          </div>
                        </div>
                      </Link>
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
                <Link href={"/blog"} className="border border-green text-green cursor-pointer hover:bg-green hover:text-white rounded-lg px-6 py-3">Cari Artikel</Link>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-2">
                <>
                  {blog[blog.length - 1] && (
                    <Link className="relative w-full md:w-1/2 group" href={`/blog/${blog[blog.length - 1].slug}`}>
                      <Image
                        src={blog[blog.length - 1].cover.formats.large.url}
                        loader={myLoader}
                        width={100}
                        height={100}
                        alt="Image 1"
                        className="h-full w-full object-cover rounded-md"
                      />
                      <span className="absolute bottom-5 left-5 text-white text-xl font-semibold z-10">
                        {blog[blog.length - 1].title}
                      </span>
                      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-md transition-all duration-300 group-hover:backdrop-blur-sm group-hover:bg-opacity-50"></div>
                    </Link>
                  )}
                </>
                <div className="w-1/2 md:flex flex-col hidden gap-2">
                  <>
                    {blog[blog.length - 2] && (
                      <Link className="relative w-full group" href={`/blog/${blog[blog.length - 2].slug}`}>
                        <Image
                          src={blog[blog.length - 2].cover.formats.large.url}
                          loader={myLoader}
                          width={100}
                          height={100}
                          alt="Image 2"
                          className="h-full w-full object-cover rounded-md"
                        />
                        <span className="absolute bottom-5 left-5 text-white text-xl font-semibold z-10">{blog[blog.length - 2].title}</span>
                        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-md transition-all duration-300 group-hover:backdrop-blur-sm group-hover:bg-opacity-50"></div>
                      </Link>
                    )}
                  </>
                  <div className="w-full flex gap-2">
                    <>
                      {blog[blog.length - 3] && (
                        <Link className="relative w-1/2 group" href={`/blog/${blog[blog.length - 3].slug}`}>
                          <Image
                            src={blog[blog.length - 3].cover.formats.large.url}
                            loader={myLoader}
                            width={100}
                            height={100}
                            alt="Image 3"
                            className="h-full w-full object-cover rounded-md"
                          />
                          <span className="absolute bottom-5 left-5 text-white text-xl font-semibold z-10">
                            {blog[blog.length - 3].title}
                          </span>
                          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-md transition-all duration-300 group-hover:backdrop-blur-sm group-hover:bg-opacity-50"></div>
                        </Link>
                      )}
                    </>
                    <>
                      {blog[blog.length - 4] && (
                        <Link className="relative w-1/2 group" href={`/blog/${blog[blog.length - 4].slug}`}>
                          <Image
                            src={blog[blog.length - 4].cover.formats.large.url}
                            loader={myLoader}
                            width={100}
                            height={100}
                            alt="Image 4"
                            className="h-full w-full object-cover rounded-md"
                          />
                          <span className="absolute bottom-5 left-5 text-white text-xl font-semibold z-10">
                            {blog[blog.length - 4].title}
                          </span>
                          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-md transition-all duration-300 group-hover:backdrop-blur-sm group-hover:bg-opacity-50"></div>
                        </Link>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-[100px] px-5 md:px-10">
            <div>
              <h2 className="text-xl font-semibold text-[#24221D]">Partner Kami</h2>
              <>
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={5}
                  slidesPerView={6}
                  navigation
                  breakpoints={{
                    340: {
                      slidesPerView: 3,
                      spaceBetween: 5,
                    },
                    768: {
                      slidesPerView: 6,
                      spaceBetween: 5,
                    },
                    1024: {
                      slidesPerView: 6,
                      spaceBetween: 5,
                    },
                  }}
                  className="flex w-full"
                >
                  <div className="flex gap-5">
                    {partner.map((item) => (
                      <SwiperSlide key={item.id}>
                        <div className="border border-black h-[120px] w-[180px] rounded-lg flex items-center justify-center">
                          <Image
                            loader={myLoader}
                            src={item.imagePartner.formats.thumbnail.url}
                            alt={item.namePartner}
                            width={100}
                            height={100}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </>
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
                <CarouselTestimony />
              </div>
            </div>
          </div>
          <div className="pt-[100px] px-5 md:px-10">
            <div className="flex justify-center items-center relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={home}
                alt="Card background"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-green opacity-80"></div>
              <div className="absolute inset-0 flex flex-col gap-5 items-center justify-center">
                <div className="flex flex-col text-center md:text-start">
                  <h2 className="text-white text-2xl font-semibold">Temukan Properti Idamanmu dengan Rumi</h2>
                  <p className="text-white text-md">Temukan properti idamanmu dengan langkah yang sangat mudah</p>
                </div>
                <Link className="px-6 py-2 bg-[#D9D9D9] hover:bg-[#c1c1c1] hover:bg-opacity-90 rounded-2xl text-green flex justify-center items-center" target='blank' href={"https://wa.me/6281291964488"} role="button">Hubungi Kami</Link>
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
              <p className="mt-2 text-sm">Email: rumamilenial@gmail.com</p>
              <p className="mt-2 text-sm">Phone: 081291964488</p>
              <p className="mt-2 text-sm">Office: San Francisco, US</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Tentang Kami</h3>
              <p className="mt-2 font-sans text-sm">Rumi Properti adalah platform untuk mencari hunian idamanmu.  Dengan menampilkan pilihan properti terjangkau, Anda bisa mendapatkan hunian yang nyaman dan tentunya sesuai dengan budget Anda.</p>
            </div>
            <div className="w-48 h-32 bg-gray-300 rounded-md"></div>
          </div>
        </footer>
      </div >
    </>
  );
}