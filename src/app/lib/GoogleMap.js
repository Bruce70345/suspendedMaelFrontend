import React, { useState, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    InfoWindow,
    useMap,
    Pin
} from '@vis.gl/react-google-maps';
import PoiMarkers from '@/app/lib/Maps/PoiMakers';
import useUserLocations from '@/app/hooks/useUserLocations';
import { Margin } from '@mui/icons-material';

const mapContainerStyle = {
    width: '90%',
    height: '80vh',
    margin: '10px 0px'
};

// 預設地圖中心點（台北）
const DEFAULT_CENTER = { lat: 25.0330, lng: 121.5654 };

function GoogleMap() {
    const { users, loading, error } = useUserLocations();
    const [mapError, setMapError] = useState(null);

    console.log('GoogleMap - Render started');
    console.log('GoogleMap - users:', users);
    console.log('GoogleMap - loading:', loading);
    console.log('GoogleMap - error:', error);

    // 將 users 資料轉換為地圖標記格式 - 必須在所有條件檢查之前
    const locations = React.useMemo(() => {
        if (!users || !Array.isArray(users)) {
            console.log('GoogleMap - users is not valid array:', users);
            return [];
        }

        return users.map((user, index) => {
            // 取得用戶的實際位置資料
            let userLat, userLng;

            // 優先使用數值座標
            if (typeof user.latitude === 'number' && typeof user.longitude === 'number') {
                userLat = user.latitude;
                userLng = user.longitude;
            }
            // 其次使用字串座標
            else if (typeof user.latitude === 'string' && typeof user.longitude === 'string') {
                userLat = parseFloat(user.latitude);
                userLng = parseFloat(user.longitude);
            }
            // 再次使用 lnglat 物件
            else if (user.lnglat) {
                userLat = parseFloat(user.lnglat.lat);
                userLng = parseFloat(user.lnglat.lng);
            }
            // 最後如果只有地址，使用台北市的預設座標範圍
            else if (user.address) {
                // 根據地址區域給予大概的座標
                const address = user.address.toLowerCase();
                if (address.includes('大安區')) {
                    userLat = 25.0330 + (Math.random() - 0.5) * 0.01; // 大安區附近
                    userLng = 121.5654 + (Math.random() - 0.5) * 0.01;
                } else if (address.includes('信義區')) {
                    userLat = 25.0320 + (Math.random() - 0.5) * 0.01; // 信義區附近
                    userLng = 121.5598 + (Math.random() - 0.5) * 0.01;
                } else if (address.includes('中山區')) {
                    userLat = 25.0636 + (Math.random() - 0.5) * 0.01; // 中山區附近
                    userLng = 121.5264 + (Math.random() - 0.5) * 0.01;
                } else if (address.includes('大同區')) {
                    userLat = 25.0633 + (Math.random() - 0.5) * 0.01; // 大同區附近
                    userLng = 121.5130 + (Math.random() - 0.5) * 0.01;
                } else if (address.includes('萬華區')) {
                    userLat = 25.0340 + (Math.random() - 0.5) * 0.01; // 萬華區附近
                    userLng = 121.4998 + (Math.random() - 0.5) * 0.01;
                } else if (address.includes('中正區')) {
                    userLat = 25.0320 + (Math.random() - 0.5) * 0.01; // 中正區附近
                    userLng = 121.5198 + (Math.random() - 0.5) * 0.01;
                } else {
                    // 預設台北市中心
                    userLat = 25.0330 + (Math.random() - 0.5) * 0.02;
                    userLng = 121.5654 + (Math.random() - 0.5) * 0.02;
                }
                console.log(`GoogleMap - Generated coordinates for address "${user.address}":`, { userLat, userLng });
            }

            const location = {
                name: user.name || user.username || `User ${index + 1}`,
                userId: user.userId || user._id,
                lat: userLat,
                lng: userLng,
                address: user.address || 'No address provided',
                originalUser: user
            };

            // 驗證座標是否有效
            if (isNaN(location.lat) || isNaN(location.lng)) {
                console.warn(`GoogleMap - Invalid coordinates for user ${index}:`, location);
                return null;
            }

            console.log(`GoogleMap - Processed location ${index}:`, location);
            return location;
        }).filter(location => location !== null); // 過濾掉無效的位置
    }, [users]);

    console.log('GoogleMap - Final locations:', locations);

    // 檢查 Google Maps API 金鑰
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
    if (!apiKey) {
        console.error('GoogleMap - Missing Google Maps API key');
        return <p>Error: Missing Google Maps API key</p>;
    }

    // 載入狀態
    if (loading) {
        console.log('GoogleMap - Showing loading state');
        return <p>Loading...</p>;
    }

    // 錯誤狀態
    if (error) {
        console.error('GoogleMap - API error:', error);
        return <p>Loading Map Error: {error}</p>;
    }

    // 地圖錯誤狀態
    if (mapError) {
        console.error('GoogleMap - Map error:', mapError);
        return <p>Loading Map Error: {mapError}</p>;
    }

    // 無資料狀態
    if (!users || users.length === 0) {
        console.log('GoogleMap - No users data available');
        return <p>No available location data</p>;
    }

    const handleMapLoad = () => {
        console.log('GoogleMap - Maps API has loaded successfully');
    };

    const handleMapError = (error) => {
        console.error('GoogleMap - Maps API load error:', error);
        setMapError('Google Maps API load failed');
    };

    const handleCameraChange = (ev) => {
        console.log('GoogleMap - Camera changed:', {
            center: ev.detail.center,
            zoom: ev.detail.zoom
        });
    };

    return (
        <>
            <div style={mapContainerStyle}>
                <APIProvider
                    fullWidth
                    apiKey={apiKey}
                    onLoad={handleMapLoad}
                    onError={handleMapError}
                >
                    <Map
                        defaultZoom={13}
                        defaultCenter={DEFAULT_CENTER}
                        onCameraChanged={handleCameraChange}
                        mapId='400bae2ba2ce1d46'
                        onError={handleMapError}
                    >
                        <PoiMarkers pois={locations} />
                    </Map>
                </APIProvider>
            </div>
        </>
    );
}

export default GoogleMap;
