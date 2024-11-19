import dynamic from 'next/dynamic';
import Image from 'next/image';
import home from "/public/asset/1.webp";
import logo from '/public/asset/logo.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import { Autoplay } from "swiper/modules"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useCities, usePartner, useProperti, useBlog, useBannerHome } from 'src/pages/api/fetchAPI';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { useMediaQuery } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
const CarouselTestimony = dynamic(() => import('src/component/carouselTestimony/carouselTestimony'), { ssr: false });
const DynamicHamburger = dynamic(() => import('hamburger-react').then(mod => mod.Sling), { ssr: false });

const myLoader = ({ src }: { src: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  return `${baseUrl}${src}`;
};

export default function Home() {
  const isMobile = useMediaQuery('(max-width:950px)');
  const [isOpen, setOpen] = useState(false);

  const { city } = useCities();
  const { partner } = usePartner();
  const { properti } = useProperti();
  const { blog } = useBlog();
  const { bannerHome } = useBannerHome()

  console.log("banner", bannerHome);
  // handle searchbar in hero
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const handleSearch = () => {
    router.push(`/properti?search=${keyword}`);
  };

  return (
    <>
      <Head>
        <title>Rumi Properti: Jual & Sewa Rumah, Apartemen, Tanah, Kos</title>
      </Head>
      <div>
        <header>
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
                <span className="ml-2 text-lg font-semibold">Rumi Properti</span>
              </Link>
              {isMobile ? (
                <DynamicHamburger toggled={isOpen} toggle={setOpen} size={20} />
              ) : (
                <div className="flex justify-center items-center gap-10">
                  <ul className="md:flex gap-5 hidden">
                    <li className="text-sm hover:text-green">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="text-sm hover:text-green">
                      <Link href="/properti">Tipe Properti</Link>
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
                    <Link className="text-sm px-6 py-2 bg-[#D9D9D9] hover:bg-[#c1c1c1] rounded-2xl text-[#24221D] flex justify-center items-center" href="https://bit.ly/SurveyRumi" target="_blank" role="button">Formulir</Link>
                    <Link className="text-sm px-6 py-2 hover:bg-[#4b6645] bg-green rounded-2xl text-white flex justify-center items-center" href="https://wa.me/6281291964488" target="_blank" role="button">Hubungi Kami</Link>
                  </div>
                </div>
              )}
            </div>
          </nav>
          {isOpen &&
            <div className="top-0 left-0 w-full relative h-screen z-50 flex flex-col px-5 pb-5 gap-5">
              <ul className="flex flex-col gap-5 mt-10">
                <li className="text-lg hover:text-green">
                  <Link href="/">Home</Link>
                </li>
                <li className="text-lg hover:text-green">
                  <Link href="/properti">Tipe Properti</Link>
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
                <Link className="text-sm px-6 py-2 bg-[#D9D9D9] hover:bg-[#c1c1c1] rounded-2xl text-[#24221D] flex justify-center items-center" href="https://bit.ly/SurveyRumi" target="_blank" role="button">Formulir</Link>
                <Link className="text-sm px-6 py-2 hover:bg-[#4b6645] bg-green rounded-2xl text-white flex justify-center items-center" href="https://wa.me/6281291964488" target="_blank" role="button">Hubungi Kami</Link>
              </div>
            </div>
          }
        </header>
        <main>
          <div className="relative">
            <div className="component-a bg-gray-200 w-full h-[300px] md:h-[350px] lg:h-[400px] flex items-center justify-center">
              <div className="component-b w-full h-full">
                <Swiper
                  spaceBetween={30}
                  pagination={{ clickable: true }}
                  loop={true}
                  navigation
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  className="flex w-full h-full"
                >
                  {bannerHome.length > 0 ? (
                    bannerHome.map((banhome) => (
                      <SwiperSlide key={banhome.id} className="w-full h-full relative">
                        <Image
                          src={banhome.imageBanner?.url || '/default-image.jpg'}
                          alt={"https://cms.rumiproperti.com" + banhome.imageBanner?.url || 'Banner Image'}
                          layout='fill'
                          loader={myLoader}
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <p>No banners available</p>
                  )}
                </Swiper>
              </div>
            </div>
            <div className="search-bar absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[800px] bg-white shadow-lg rounded-lg p-5 z-10">
              <div className="flex flex-col md:flex-row gap-3 space-x-4 items-center">
                <input
                  type="text"
                  placeholder="Cari properti berdasarkan nama, kota, atau daerah"
                  className="flex-1 block border rounded-lg p-2 w-full"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <a
                  className="hover:bg-[#4b6645] bg-green text-white rounded-lg px-5 py-2 cursor-pointer md:block w-[200px] text-center"
                  onClick={handleSearch}
                >
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
                    <SwiperSlide key={city.id} className="w-full">
                      <Link href={`/properti?search=${city.nameCity}`} className="flex flex-col items-center gap-2">
                        <div className="h-[120px] w-[180px] md:flex hidden flex-col items-center rounded-lg overflow-hidden">
                          <div className="relative w-full h-full">
                            <Image
                              className="object-cover w-full h-full"
                              loader={myLoader}
                              width={180}
                              height={120}
                              src={city.imageCity.formats.thumbnail.url}
                              alt="location"
                            />
                          </div>
                        </div>
                        <div className="text-sm mt-1">{city.nameCity}</div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="pt-[50px] px-5 md:px-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-[#24221D]">Rekomendasi hunian untukmu</h2>
              <div className="flex md:flex-row flex-col gap-5">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={30}
                  slidesPerView={3}
                  navigation
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
                  {properti.slice(0, 4).map((item) => (
                    <SwiperSlide key={item.id} className="max-w-xs w-full pr-3">
                      <Link href={`/properti/${item.title}`} className="max-w-xs rounded-lg overflow-hidden shadow hover:shadow-lg border transform transition-all duration-300 flex flex-col">
                        <div className="w-full h-[200px] overflow-hidden">
                          <Image
                            className="w-full h-full object-cover hover:scale-110 transition"
                            src={item.bannerProperty.formats.medium.url || '/default-image.jpg'}
                            loader={myLoader}
                            alt={item.title}
                            width={300}
                            height={200}
                          />
                        </div>
                        <div className="px-4 py-4 flex flex-col gap-2 flex-grow">
                          <div className="bg-green text-white w-[5rem] text-center text-sm rounded">
                            {item.category_properti.nameCategory}
                          </div>
                          <div className="text-black">
                            <div className="font-bold text-medium-bold mb-2">
                              Rp {item.price.toLocaleString()}
                            </div>
                            <p className="text-sm">{item.title}</p>
                            <p className="text-xs text-black text-opacity-70">
                              {item.address}
                            </p>
                          </div>
                        </div>
                        <div className="px-4 pt-4 pb-4 flex gap-5 items-center">
                          <Link href={`/properti/${item.title}`}>
                            <span className="inline-block bg-[#D9D9D9] hover:bg-[#c1c1c1] rounded-lg px-3 py-3 text-xs font-semibold text-black text-opacity-70">
                              Lihat detail
                            </span>
                          </Link>
                          <Link href={"https://wa.me/6281291964488"} target="_blank">
                            <span className="inline-block hover:bg-[#4b6645] bg-green rounded-lg px-3 py-3 text-xs font-semibold text-white">
                              Hubungi kami
                            </span>
                          </Link>
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
                  {blog[blog.length - 1] && blog[blog.length - 1].cover && blog[blog.length - 1].cover.formats && blog[blog.length - 1].cover.formats.large && (
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
                      <div className="h-[120px] w-[180px] p-3 border shadow-sm rounded-lg flex items-center justify-center">
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
                <Link className="px-6 py-2 bg-white hover:bg-[#c1c1c1] hover:bg-opacity-90 rounded-2xl text-green flex justify-center items-center" target='blank' href={"https://wa.me/6281291964488"} role="button">Hubungi Kami</Link>
              </div>
            </div>
          </div>
        </main >
        <footer className="mt-[100px] bg-green text-white md: p-5 md:p-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 grid-rows-1 gap-8">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold">Rumi Properti</h2>
                <p className="mt-2 text-sm">Jakarta, Indonesia</p>
              </div>
              <div className="mt-2 text-sm flex gap-3">
                <Link href={"https://www.instagram.com/rumiproperti.id/"} target='blank' className='hover:shadow-sm'>
                  <InstagramIcon />
                </Link>
                <Link href={'https://www.linkedin.com/company/rumiproperti/posts/?feedView=all'} target='blank' className='hover:shadow-sm'>
                  <LinkedInIcon />
                </Link>
                <Link href={'https://www.tiktok.com/@rumiproperti.id'} target='blank' className='hover:shadow-sm'>
                  <FontAwesomeIcon icon={faTiktok} style={{ color: "#ffffff", }} />
                </Link>
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
      </div >
    </>
  );
}