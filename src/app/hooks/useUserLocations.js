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

                // 驗證每個用戶的資料結構 - 更寬鬆的驗證
                const validUsers = data.filter((user, index) => {
                    // 檢查基本用戶資料
                    if (!user || !user._id) {
                        console.warn(`useUserLocations - Invalid user data at index ${index}: missing basic data`);
                        return false;
                    }

                    // 檢查位置資料 - 接受多種格式
                    const hasNumericCoords = (
                        typeof user.latitude === 'number' && typeof user.longitude === 'number'
                    );

                    const hasStringCoords = (
                        (typeof user.latitude === 'string' && typeof user.longitude === 'string') &&
                        (!isNaN(parseFloat(user.latitude)) && !isNaN(parseFloat(user.longitude)))
                    );

                    const hasLngLatObject = (
                        user.lnglat &&
                        (typeof user.lnglat.lat === 'number' || !isNaN(parseFloat(user.lnglat.lat))) &&
                        (typeof user.lnglat.lng === 'number' || !isNaN(parseFloat(user.lnglat.lng)))
                    );

                    const hasAddress = (
                        typeof user.address === 'string' && user.address.trim().length > 0
                    );

                    const isValid = hasNumericCoords || hasStringCoords || hasLngLatObject || hasAddress;

                    if (!isValid) {
                        console.warn(`useUserLocations - Invalid user data at index ${index}:`, {
                            id: user._id,
                            name: user.name,
                            hasNumericCoords,
                            hasStringCoords,
                            hasLngLatObject,
                            hasAddress,
                            latitude: user.latitude,
                            longitude: user.longitude,
                            lnglat: user.lnglat,
                            address: user.address
                        });
                    } else {
                        console.log(`useUserLocations - Valid user ${index}:`, {
                            id: user._id,
                            name: user.name || user.username,
                            latitude: user.latitude || user.lnglat?.lat,
                            longitude: user.longitude || user.lnglat?.lng,
                            address: user.address,
                            locationType: hasNumericCoords ? 'numeric' : hasStringCoords ? 'string' : hasLngLatObject ? 'lnglat' : 'address'
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
