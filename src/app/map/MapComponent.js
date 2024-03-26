'use client'
import React, { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MapLibreControlZoomHome from '../components/ui/maplibre-control-zoomhome';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import LayerSwitcherControl from '../components/ui/layerSwitcherControl';
import '../components/ui/layerSwitcherControl.css';

//maptiler
// import * as maptilersdk from '@maptiler/sdk';
// import "@maptiler/sdk/dist/maptiler-sdk.css";

const MapComponent = () => {
  const [drawnFeatures, setDrawnFeatures] = useState([]);

  const baseMaps = {
    "argenmap": {
      img: "https://cloud.maptiler.com/static/img/maps/streets.png"
    },
    "argenmap_gris": {
      img: "https://cloud.maptiler.com/static/img/maps/winter.png"
    },
    "argenmap_oscuro": {
      img: "https://cloud.maptiler.com/static/img/maps/hybrid.png"
    }
  }

  useEffect(() => {
    const initialStyle = '/style.json'
    
    const map = new maplibregl.Map({ //maplibregl o maptilersdk
      container: 'map',
      style: '/style.json', //initialStyle
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
    MapboxDraw.constants.classes.CONTROL_BASE = 'maplibregl-ctrl';
    MapboxDraw.constants.classes.CONTROL_PREFIX = 'maplibregl-ctrl-';
    MapboxDraw.constants.classes.CONTROL_GROUP = 'maplibregl-ctrl-group';

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        line_string: true,
        point: true,
        circle: true,
        rectangle: true,
        trash: true,
      },
    });

    map.addControl(draw, 'top-right');
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.addControl(zoomhome, 'top-right');
    map.addControl(new maplibregl.FullscreenControl(), 'top-right');
    map.addControl(new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }), 'top-right');
    map.addControl(new maplibregl.ScaleControl({}), 'bottom-right');
    map.addControl(new LayerSwitcherControl({basemaps: baseMaps, initialBasemapId: 'argenmap'}), 'bottom-left');
    // map.addControl(new maplibregl.AttributionControl(), 'bottom-left');
    // map.addControl(new maplibregl.AttributionControl({compact: false}), 'bottom-right');
    // map.addControl(new maplibregl.MarkerControl({}), 'top-right');
    
    map.on('draw.create', ({ features }) => { // Capturar datos del polígono dibujado
      const drawnGeometry = features;
      console.log(drawnGeometry)
      setDrawnFeatures([...drawnFeatures, drawnGeometry]);  // Almacenar datos del polígono
    });
    
    return () => map.remove();
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '100vh' }} />
  );
};

export default MapComponent;