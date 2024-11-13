import { useEffect, useState } from "react";

interface City {
    id: number;
    nameCity: string;
    imageCity: {
        formats: {
            thumbnail: {
                url: string;
            }
        }
    }
}

interface Partner {
    id: number;
    namePartner: string;
    imagePartner: {
        formats: {
            thumbnail: {
                url: string;
            }
        }
    }
}

interface Testimony {
    id: number;
    nama: string;
    pekerjaan: string;
    pesanTestimoni: string;
    imageClient: {
        formats: {
            thumbnail: {
                url: string;
            }
        }
    }
}

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

interface Properti {
    id: number;
    documentId: string;
    title: string;
    price: number;
    address: string;
    luasTanah: number | null;
    luasBangunan: number | null;
    jumlahKamarMandi: number | null;
    jumlahKamarTidur: number | null;
    jenisSertifikat: string | null;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category_properti: {
        nameCategory: string;
    }
    imageProperty: {
        formats: {
            large: {
                url: string;
            }
        }
    }[];
    bannerProperty: {
        formats: {
            large: {
                url: string;
            }
        }
    };
}

interface Article {
    id: number;
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
        formats: {
            large: {
                url: string;
            }
        }
    }
    category_article: {
        nameCategory: string;
    }
}

interface BannerHome {
    id: number;
    title: string;
    imageBanner: {
        height: number;
        width: number;
        formats: {
            url: string;
        }
        url: string;
    }
}

export const useCities = () => {
    const [city, setCity] = useState<City[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/city-lists?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch cities");
                }
                const data = await res.json();
                setCity(data.data || []);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    return { city };
};


export const usePartner = () => {
    const [partner, setPartner] = useState<Partner[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partner-lists?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch cities");
                }
                const data = await res.json();
                setPartner(data.data || []);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    return { partner };
};

export const useTestimony = () => {
    const [testimony, setTestimony] = useState<Testimony[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonies?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch cities");
                }
                const data = await res.json();
                setTestimony(data.data || []);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    return { testimony };
};


export const useBanner = () => {
    const [banner, setBanner] = useState<Banner[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banner-artikel?populate=*`, {
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

        fetchData();
    }, []);

    return { banner };
};

export const useProperti = () => {
    const [properti, setProperti] = useState<Properti[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/propertis?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                const data = await res.json();
                setProperti(data.data || []);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchData();
    }, []);

    return { properti }
}

export const useBlog = () => {
    const [blog, setBlog] = useState<Article[]>([]); // <-- array of articles

    // Fetch data using useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                const data = await res.json();
                setBlog(data.data || []); // <-- set blog as an array
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchData();
    }, []);

    return { blog }
}


export const useBannerHome = () => {
    const [bannerHome, setBannerHome] = useState<BannerHome[]>([]);

    // Fetching banner data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banner-heroes?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                console.log('Banner Data:', data); // Cek respons API
                setBannerHome(data.data || []); // Menyimpan data banner jika ada
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchData();
    }, []);

    return { bannerHome };
};
