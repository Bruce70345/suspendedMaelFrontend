import React, { useState, useEffect } from 'react';
import { Typography, Link, Box } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import { AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import useProductDisplay from '@/app/hooks/useProductDisplay';

const PoiMarkers = ({ pois }) => {
    const { products, loading, error } = useProductDisplay();
    const [selectedPoi, setSelectedPoi] = useState(null);

    console.log('PoiMarkers - Render started');
    console.log('PoiMarkers - pois received:', pois);
    console.log('PoiMarkers - products:', products);
    console.log('PoiMarkers - loading:', loading);
    console.log('PoiMarkers - error:', error);

    const handleMarkerClick = (poi) => {
        console.log('PoiMarkers - Marker clicked:', poi);
        setSelectedPoi(poi);
    };

    const handleInfoWindowClose = () => {
        console.log('PoiMarkers - InfoWindow closed');
        setSelectedPoi(null);
    };

    // 防護檢查：確保 pois 存在且為陣列
    if (!pois || !Array.isArray(pois)) {
        console.log('PoiMarkers - pois is not valid array:', pois);
        return null;
    }

    if (pois.length === 0) {
        console.log('PoiMarkers - No pois to display');
        return null;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {pois.map((poi, index) => {
                // 驗證 POI 資料
                if (!poi.location || typeof poi.location.lat !== 'number' || typeof poi.location.lng !== 'number') {
                    console.warn(`PoiMarkers - Invalid location for poi ${index}:`, poi);
                    return null;
                }

                const markerKey = poi.key || poi.name || `marker-${index}`;

                console.log(`PoiMarkers - Rendering marker ${index}:`, {
                    key: markerKey,
                    position: poi.location,
                    userID: poi.userID
                });

                return (
                    <React.Fragment key={markerKey}>
                        <AdvancedMarker
                            position={poi.location}
                            onClick={() => handleMarkerClick(poi)}
                        >
                            <Pin
                                background={'#FF0000'}
                                glyphColor={'#fff'}
                                borderColor={'#000'}
                            />
                        </AdvancedMarker>

                        {selectedPoi === poi && (
                            <InfoWindow
                                position={poi.location}
                                onCloseClick={handleInfoWindowClose}
                            >
                                <Box style={{ marginBottom: '16px' }}>
                                    <Link
                                        href={`https://www.google.com/maps?q=${poi.location.lat},${poi.location.lng}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        📍Go to the restaurant
                                    </Link>
                                    <Typography variant="h6" style={{ margin: '10px 0' }}>
                                        {poi.name || poi.key || 'Unknown Restaurant'}
                                    </Typography>
                                    <Typography variant="body2">
                                        Tell the owner: {poi.secret || 'No secret available'}
                                    </Typography>
                                    {products && Array.isArray(products) &&
                                        products
                                            .filter(product => product.userId === poi.userID)
                                            .map(product => (
                                                <div key={product._id}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Typography style={{ marginLeft: '5px' }}>
                                                            {product.dailyQuantity >= 5 ? "✅" : product.dailyQuantity > 0 ? "⚠️" : "⛔️"}
                                                        </Typography>
                                                        <Typography variant="body2" style={{ margin: '5px 0', marginLeft: '5px' }}>
                                                            {product.productName}
                                                        </Typography>
                                                        <Typography variant="body2" style={{ marginLeft: '5px' }}>
                                                            📆: to {product.campaignExpiration?.split('T')[0] || 'No date'}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </Box>
                            </InfoWindow>
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default PoiMarkers;