'use client'
import React, { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MapLibreControlZoomHome from '../components/ui/maplibre-control-zoomhome';

const MapComponent = () => {
  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map',
      style: '/style.json',
      center: [-64.9395, -40.5736],
      zoom: 3.7,
      bearing: 0,
      pitch: 0,
      attributionControl: false,
    });

    //Controls
    const zoomhome = new MapLibreControlZoomHome({
      resetLngLat: [-64.9395, -40.5736],
      resetZoom: 3.7,    
    });
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.addControl(zoomhome, 'top-right');
    map.addControl(new maplibregl.GeolocateControl({}), 'top-right');
    map.addControl(new maplibregl.FullscreenControl(), 'top-right');
    map.addControl(new maplibregl.ScaleControl({}), 'bottom-right');
    // map.addControl(new maplibregl.AttributionControl(), 'bottom-left');
    // map.addControl(new maplibregl.AttributionControl({compact: false}), 'bottom-right');
    // map.addControl(new maplibregl.MarkerControl({}), 'top-right');

    return () => map.remove();
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '100vh' }} />
  );
};

export default MapComponent;