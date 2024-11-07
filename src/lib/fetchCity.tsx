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

export const useCities = () => {
    const [properti, setProperti] = useState<City[]>([]);

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
                setProperti(data.data || []);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    return { properti };
};
