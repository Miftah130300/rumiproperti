import { BlocksContent } from "@strapi/blocks-react-renderer";
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
    name: string;
    occupation: string;
    message: string;
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
    adressDetail: string;
    mapsSource: string;
    fasilitasPerabot: string[] | null;
    category_properti: {
        nameCategory: string;
    };
    imageProperty: {
        formats: {
            large: {
                url: string;
            };
            medium: {
                url: string;
            };
            small: {
                url: string;
            };
            thumbnail: {
                url: string;
            };
        };
    }[];
    bannerProperty: {
        formats: {
            medium: {
                url: string;
            };
        };
    };
    developer: {
        nameDeveloper: string;
        aboutDeveloper: string;
    }
    brosur: {
        name: string;
        url: string;
    }
    detailDescription: {
        __component: string;
        id: number;
        text: string;
    }[];
}

interface Developer {
    id: number;
    nameDeveloper: string;
    aboutDeveloper: string;
    logoDeveloper: {
        formats: {
            thumbnail: {
                url: string;
            }
        }
    }
}

interface WhyRumi {
    id: number;
    question: string;
    answer: string;
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
            };
            medium: {
                url: string;
            };
            small: {
                url: string;
            };
            thumbnail: {
                url: string;
            };
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

interface Kamus {
    id: number;
    wordProperty: string;
    description: string;
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
    const [blog, setBlog] = useState<Article[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                const data = await res.json();
                setBlog(data.data || []);
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
                console.log('Banner Data:', data);
                setBannerHome(data.data || []);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchData();
    }, []);

    return { bannerHome };
};

export const useDeveloper = () => {
    const [developer, setDeveloper] = useState<Developer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/developers?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                console.log('Banner Data:', data);
                setDeveloper(data.data || []);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchData();
    }, []);

    return { developer };
};

export const useQuestion = () => {
    const [question, setQuestion] = useState<WhyRumi[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/why-rumis?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                console.log('Banner Data:', data);
                setQuestion(data.data || []);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchData();
    }, []);

    return { question };
};

export const useDictionary = () => {
    const [dictionary, setDictionary] = useState<Kamus[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dictionary-properties?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    },
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                console.log('Banner Data:', data);
                setDictionary(data.data || []);
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchData();
    }, []);

    return { dictionary };
};

