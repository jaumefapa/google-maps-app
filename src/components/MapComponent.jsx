import React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

function MapComponent({ children, center }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const options = {
    disableDefaultUI: true
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        {children}
      </GoogleMap>
  ) : <>Loading map...</>
}

export default React.memo(MapComponent)
