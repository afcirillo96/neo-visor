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
      Object.keys(basemaps).forEach((layerId) => {
        const base = basemaps[layerId];
        const basemapContainer = document.createElement("img");
        basemapContainer.src = base.img;
        basemapContainer.classList.add("basemap");
        basemapContainer.dataset.id = layerId;
        basemapContainer.addEventListener("click", () => {
          const activeElement = this._container.querySelector(".active");
          activeElement.classList.remove("active");
          basemapContainer.classList.add("active");
          map.setStyle(maptilersdk.MapStyle[layerId]);
        });
        basemapContainer.classList.add("hidden");
        this._container.appendChild(basemapContainer);
        if (this._options.initialBasemap.id === layerId) {
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