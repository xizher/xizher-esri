import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
export const createLayer = (options) => {
    switch (options.lyrType) {
        case 'WebTileLayer':
            return new WebTileLayer(options);
        case 'TileLayer':
            return new TileLayer(options);
        // no default
    }
};
export default createLayer;
