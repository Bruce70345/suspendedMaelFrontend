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
            const userLat = parseFloat(user.latitude) || parseFloat(user.lnglat?.lat);
            const userLng = parseFloat(user.longitude) || parseFloat(user.lnglat?.lng);

            const location = {
                name: user.name || user.username || `用戶 ${index + 1}`,
                key: user._id || user.name || user.username || `user-${index}`,
                secret: user.secret || '無可用密碼',
                userID: user.userId || user._id,
                location: {
                    lat: userLat || DEFAULT_CENTER.lat,
                    lng: userLng || DEFAULT_CENTER.lng
                },
                hasValidLocation: !!(userLat && userLng) // 標記是否有有效位置
            };

            console.log(`GoogleMap - Processing user ${index}:`, {
                original: user,
                processed: location,
                hasValidLocation: location.hasValidLocation
            });

            return location;
        }).filter(loc => loc.hasValidLocation); // 只保留有有效位置的用戶

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
