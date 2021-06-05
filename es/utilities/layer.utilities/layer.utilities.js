import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
export const createLayer = (options) => {
    switch (options.lyrType) {
        case 'WebTileLayer':
            return new WebTileLayer(options);
        case 'TileLayer':
            return new TileLayer(options);
        case 'GeoJSONLayer':
            return new GeoJSONLayer(options);
        case 'FeatureLayer':
            return new FeatureLayer(options);
        case 'ImageryLayer':
            return new ImageryLayer(options);
        case 'GroupLayer':
            return new GroupLayer(options);
        // no default
    }
};
export default createLayer;
