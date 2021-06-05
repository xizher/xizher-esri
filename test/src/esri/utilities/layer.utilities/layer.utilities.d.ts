export interface IWebTileLayerOptions extends __esri.WebTileLayerProperties {
    lyrType: 'WebTileLayer';
}
export interface ITileLayerOptions extends __esri.TileLayerProperties {
    lyrType: 'TileLayer';
}
export interface ICreateLayer {
    (options: IWebTileLayerOptions): __esri.WebTileLayer;
    (options: ITileLayerOptions): __esri.TileLayer;
}
export declare type LayerOptions = IWebTileLayerOptions | ITileLayerOptions;
export declare const createLayer: ICreateLayer;
export default createLayer;
