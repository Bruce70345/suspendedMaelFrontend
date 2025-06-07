import { useState, useEffect } from 'react';

export default function useUserLocations() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('http://localhost:1000/api/users');
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                const filteredLocations = data
                    .filter(user => user.lnglat)
                    .map(user => ({
                        key: user.name,
                        location: {
                            lat: parseFloat(user.lnglat.lat),
                            lng: parseFloat(user.lnglat.lng),
                        },
                        userID: user.userId,
                        secret: user.secret
                    }));
                setLocations(filteredLocations);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return { locations, loading, error };
}
