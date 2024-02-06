'use client';
import React, { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MapLibreControlZoomHome from '../components/ui/maplibre-control-zoomhome'

const MapComponent = () => {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map',
      style: '/style.json',
      center: [-64.9395, -40.5736],
      zoom: 3.7,
      bearing: 0,
      pitch: 0,
    });

    //Controls
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.addControl(new maplibregl.ScaleControl({}), 'bottom-right');
    map.addControl(new maplibregl.GeolocateControl({}), 'top-right');
    map.addControl(new maplibregl.FullscreenControl(), 'top-right');
    // map.addControl(new maplibregl.AttributionControl({compact: false}), 'bottom-right');
    // map.addControl(new maplibregl.MarkerControl({}), 'top-right');

    const zoomhome = new MapLibreControlZoomHome({
      // use a LngLatBounds or LngLatBoundsLike
      resetBounds: [[-24.5525, 28.36838], [19.77906, 49.82957]],
      /*
      // use a LatLng or LatLngLike plus a zoom
      resetLngLat: [100.66541, 16.15097],
      resetZoom: 4,
      */
    });
    map.addControl(zoomhome, 'top-right');

    return () => map.remove();
  }, []);

  return (
    React.createElement('div', {
      id: 'map', style: {
        width: '100%',
        height: '100vh'
      }
    })
  );
};

export default MapComponent;