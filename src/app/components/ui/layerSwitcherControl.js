//maptiler
// import * as maptilersdk from '@maptiler/sdk';
// import "@maptiler/sdk/dist/maptiler-sdk.css";

//maplibre
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

class LayerSwitcherControl {
  
    constructor(options) {
      this._options = {...options};
      this._container = document.createElement("div");
      this._container.classList.add("maplibregl-ctrl");
      this._container.classList.add("maplibregl-ctrl-basemaps");
      this._container.classList.add("closed");
      switch (this._options.expandDirection || "right") {
        case "top":
          this._container.classList.add("reverse");
        case "down":
          this._container.classList.add("column");
          break;
        case "left":
          this._container.classList.add("reverse");
        case "right":
          this._container.classList.add("row");
      }
      this._container.addEventListener("mouseenter", () => {
        this._container.classList.remove("closed");
      });
      this._container.addEventListener("mouseleave", () => {
        this._container.classList.add("closed");
      });
    }
  
    onAdd(map) {
      this._map = map;
      const basemaps = this._options.basemaps;
      const initialBaseMapId = this._options.initialBasemapId;
      Object.keys(basemaps).forEach((layerId) => {
        const base = basemaps[layerId];
        const basemapContainer = document.createElement("img");
        basemapContainer.src = base.img;
        basemapContainer.classList.add("basemap");
        basemapContainer.id = layerId;
        basemapContainer.addEventListener("click", () => {
          const activeElement = this._container.querySelector(".active");
          activeElement.classList.remove("active");
          basemapContainer.classList.add("active");

          map.getStyle().layers.forEach(layer => {
            if (layer.type === 'raster') {
              map.setLayoutProperty(layer.id, 'visibility', 'none'); // Hides all raster basemaps
            }
          });
          map.setLayoutProperty(layerId, 'visibility', 'visible'); //activates raster basemap

        });
        this._container.appendChild(basemapContainer);

        if (basemapContainer.id === initialBaseMapId) {
          basemapContainer.classList.add("active");
        }
      });
      return this._container;
    }
  
    onRemove(){
      this._container.parentNode?.removeChild(this._container);
      delete this._map;
    }
}
export default LayerSwitcherControl;