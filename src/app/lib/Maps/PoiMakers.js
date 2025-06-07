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
                // 驗證 POI 資料 - 修正資料結構檢查
                if (!poi || typeof poi.lat !== 'number' || typeof poi.lng !== 'number') {
                    console.warn(`PoiMarkers - Invalid location for poi ${index}:`, poi);
                    return null;
                }

                const markerKey = poi.userId || poi.name || `marker-${index}`;
                const position = { lat: poi.lat, lng: poi.lng };

                console.log(`PoiMarkers - Rendering marker ${index}:`, {
                    key: markerKey,
                    position: position,
                    userId: poi.userId
                });

                // 找到對應的產品
                const poiProducts = products && Array.isArray(products)
                    ? products.filter(product => product.userId === poi.userId)
                    : [];

                console.log(`PoiMarkers - Found ${poiProducts.length} products for user ${poi.userId}`);

                return (
                    <React.Fragment key={markerKey}>
                        <AdvancedMarker
                            position={position}
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
                                position={position}
                                onCloseClick={handleInfoWindowClose}
                            >
                                <Box style={{ marginBottom: '16px' }}>
                                    <Link
                                        href={`https://www.google.com/maps?q=${poi.lat},${poi.lng}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        📍Go to the restaurant
                                    </Link>
                                    <Typography variant="h6" style={{ margin: '10px 0' }}>
                                        {poi.name || 'Unknown Restaurant'}
                                    </Typography>
                                    <Typography variant="body2" style={{ marginBottom: '10px' }}>
                                        Address: {poi.address}
                                    </Typography>

                                    {/* 顯示產品資訊 */}
                                    {poiProducts.length > 0 ? (
                                        poiProducts.map((product, productIndex) => (
                                            <div key={product._id || `product-${productIndex}`} style={{ marginBottom: '8px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography style={{ marginRight: '5px' }}>
                                                        {product.dailyQuantity >= 5 ? "✅" : product.dailyQuantity > 0 ? "⚠️" : "⛔️"}
                                                    </Typography>
                                                    <Typography variant="body2" style={{ marginRight: '10px' }}>
                                                        {product.productName || product.name || 'Unknown Product'}
                                                    </Typography>
                                                    <Typography variant="body2" style={{ fontSize: '0.8em', color: '#666' }}>
                                                        📆: to {product.campaignExpiration?.split('T')[0] || 'No date'}
                                                    </Typography>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <Typography variant="body2" style={{ color: '#666', fontStyle: 'italic' }}>
                                            No products available
                                        </Typography>
                                    )}
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