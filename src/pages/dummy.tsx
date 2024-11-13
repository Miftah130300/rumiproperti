import { useEffect, useState } from 'react';

interface Author {
    id: number;
    documentId: string;
    name: string;
    email: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

const AuthorList: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('https://cms.rumiproperti.com/api/authors', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer 327a930bd59b3807235fe3581acb490e90ed1c9002c7baf62e2101706930e21447ec1c39bf065ebd48dd8aa132b89f3cb1eceaa390c24ae7242e86a52a8547cc2688825a477d97925a439a0af687dc24a617f86bd6b1c04814816dc4544c843cdb00264a40e8dd6132d93e294f08d9d6ad2110da994f9e5592466bc3f4d636fd',
                    }
                });

                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setAuthors(data.data);
            } catch (error) {
                console.error("Error fetching authors:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAuthors();
    }, []);

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Authors</h1>
            <ul className="space-y-4">
                {authors.map((author) => (
                    <li key={author.id} className="p-4 border rounded-md shadow-md">
                        <h2 className="text-xl font-semibold">{author.name}</h2>
                        <p>Document ID: {author.documentId}</p>
                        <p>Email: {author.email || 'N/A'}</p>
                        <p>Created At: {new Date(author.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorList;
