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




function GoogleMap() {
    const { locations, loading, error } = useUserLocations();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div style={mapContainerStyle}>
                <APIProvider
                    fullWidth
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}
                    onLoad={() => console.log('Maps API has loaded.')}
                >
                    <Map
                        defaultZoom={13}
                        defaultCenter={{ lat: 25.0330, lng: 121.5654 }}
                        onCameraChanged={(ev) =>
                            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                        }
                        mapId='400bae2ba2ce1d46'
                    >
                        <PoiMarkers pois={locations} />
                    </Map>
                </APIProvider>
            </div>
        </>
    );
}

export default GoogleMap;
