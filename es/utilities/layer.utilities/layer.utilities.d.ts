export interface IWebTileLayerOptions extends __esri.WebTileLayerProperties {
    lyrType: 'WebTileLayer';
}
export interface ITileLayerOptions extends __esri.TileLayerProperties {
    lyrType: 'TileLayer';
}
export interface IGeoJSONLayerOptions extends __esri.GeoJSONLayerProperties {
    lyrType: 'GeoJSONLayer';
}
export interface IFeatureLayerOptions extends __esri.FeatureLayerProperties {
    lyrType: 'FeatureLayer';
}
export interface IImageryLayerOptions extends __esri.ImageryLayerProperties {
    lyrType: 'ImageryLayer';
}
export interface IGroupLayerOptions extends __esri.GroupLayerProperties {
    lyrType: 'GroupLayer';
}
export interface ILayerOptions extends __esri.LayerProperties {
    lyrType: string;
}
export interface ICreateLayer {
    (options: IWebTileLayerOptions): __esri.WebTileLayer;
    (options: ITileLayerOptions): __esri.TileLayer;
    (options: IGeoJSONLayerOptions): __esri.GeoJSONLayer;
    (options: IFeatureLayerOptions): __esri.FeatureLayer;
    (options: IImageryLayerOptions): __esri.ImageryLayer;
    (options: IGroupLayerOptions): __esri.GroupLayer;
    (options: ILayerOptions): __esri.Layer;
}
export declare type LayerOptions = IWebTileLayerOptions | ITileLayerOptions | IGeoJSONLayerOptions | IFeatureLayerOptions | IImageryLayerOptions | IGroupLayerOptions;
export declare const createLayer: ICreateLayer;
export default createLayer;
