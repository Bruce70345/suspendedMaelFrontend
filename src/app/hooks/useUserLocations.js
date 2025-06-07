import { useState, useEffect } from 'react';
import { buildApiUrl, API_ENDPOINTS } from '../../config/api';

const useUserLocations = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            console.log('useUserLocations - Starting fetch users');
            setLoading(true);
            setError(null);

            try {
                const apiUrl = buildApiUrl(API_ENDPOINTS.USERS);
                console.log('useUserLocations - Fetching from:', apiUrl);

                const res = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('useUserLocations - Response status:', res.status);
                console.log('useUserLocations - Response ok:', res.ok);

                if (!res.ok) {
                    const errorText = await res.text();
                    console.error('useUserLocations - Error response:', errorText);
                    throw new Error(`HTTP ${res.status}: ${errorText || 'Failed to fetch users'}`);
                }

                const data = await res.json();
                console.log('useUserLocations - Raw response data:', data);

                // 驗證回應資料格式
                if (!Array.isArray(data)) {
                    console.error('useUserLocations - Response is not an array:', typeof data);
                    throw new Error('Response data format error: expected array');
                }

                // 驗證每個用戶的資料結構
                const validUsers = data.filter((user, index) => {
                    const isValid = user && (
                        (typeof user.latitude === 'number' && typeof user.longitude === 'number') ||
                        (user.lnglat && typeof user.lnglat.lat === 'number' && typeof user.lnglat.lng === 'number')
                    );

                    if (!isValid) {
                        console.warn(`useUserLocations - Invalid user data at index ${index}:`, user);
                    } else {
                        console.log(`useUserLocations - Valid user ${index}:`, {
                            id: user._id,
                            name: user.name || user.username,
                            latitude: user.latitude || user.lnglat?.lat,
                            longitude: user.longitude || user.lnglat?.lng
                        });
                    }

                    return isValid;
                });

                console.log(`useUserLocations - Filtered ${validUsers.length} valid users from ${data.length} total`);
                setUsers(validUsers);

            } catch (err) {
                console.error('useUserLocations - Fetch error:', err);
                setError(err.message);
                setUsers([]); // 確保錯誤時清空用戶資料
            } finally {
                setLoading(false);
                console.log('useUserLocations - Fetch completed');
            }
        };

        fetchUsers();
    }, []);

    console.log('useUserLocations - Current state:', {
        usersCount: users.length,
        loading,
        error
    });

    return { users, loading, error };
};

export default useUserLocations;
