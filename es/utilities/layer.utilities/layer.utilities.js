import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
export const createLayer = options => {
    switch (options.lyrType) {
        case 'WebTileLayer':
            return new WebTileLayer(options);
        // no default
    }
};
export default createLayer;
