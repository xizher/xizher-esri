export interface IWebTileLayerOptions extends __esri.WebTileLayerProperties {
    lyrType: 'WebTileLayer';
}
export interface ICreateLayer {
    (options: IWebTileLayerOptions): __esri.WebTileLayer;
}
export declare const createLayer: ICreateLayer;
export default createLayer;
