import WebMapPlugin from '../../web-map-plugin/web-map-plugin';
import WebMap from '../../web-map/web-map';
export declare type LayerType = 'geojson' | 'wms' | 'wfs' | 'csv' | 'kml';
/** 图层项配置项接口 */
export interface ILayerItemsOptions {
    name: string;
    type: LayerType;
    options: __esri.LayerProperties;
}
/** 图层控制插件配置项接口 */
export interface ILayerOperationOptions {
    layerItems?: ILayerItemsOptions[];
}
/** 图层控制插件类 */
export declare class LayerOperation extends WebMapPlugin<{
    'change:visible': {
        visible: boolean;
        layer: __esri.Layer;
        layerName: string;
    };
    'change:opacity': {
        opacity: number;
        layer: __esri.Layer;
        layerName: string;
    };
}> {
    /** 配置项 */
    private _options;
    /** 图层池 */
    private _layerPool;
    /** 图层组 */
    private _groupLayer;
    /**
     * 构造图层控制插件对象
     * @param options 配置项
     */
    constructor(options?: ILayerOperationOptions);
    /** 初始化 */
    private _init;
    /** 初始化图层 */
    private _initLayer;
    /** 初始化GeoJSON图层 */
    private _initGeoJSONLayer;
    /** 初始化WMS图层 */
    private _initWmsLayer;
    /** 初始化WFS图层 */
    private _initWfsLayer;
    /** 初始化KML图层 */
    private _initKmlLayer;
    /** 初始化CSV图层 */
    private _initCsvLayer;
    /** 重写：插件安装 */
    installPlugin(webMap: WebMap): this;
    /**
     * 通过图层名获取图层对象
     * @param name 图层名
     * @returns 图层对象
     */
    getLayerByName(name: string): __esri.Layer;
    /**
     * 设置图层可见性
     * @param name 图层名
     * @param visible 可见性
     */
    setLayerVisible(name: string, visible: boolean): this;
    /**
     * 设置图层可见性
     * @param layer 图层对象
     * @param visible 可见性
     */
    setLayerVisible(layer: __esri.Layer, visible: boolean): this;
    /**
     * 设置图层透明度
     * @param name 图层名
     * @param opacity 不可透明度
     */
    setLayerOpacity(name: string, opacity: number): this;
    /**
     * 设置图层透明度
     * @param layer 图层对象
     * @param opacity 不可透明度
     */
    setLayerOpacity(layer: __esri.Layer, opacity: number): this;
    /**
     * 缩放至图层
     * @param name 图层名
     */
    zoomTo(name: string): this;
    /**
     * 缩放至图层
     * @param names 图层名
     */
    zoomTo(names: string[]): this;
    /**
     * 缩放至图层
     * @param layer 图层对象
     */
    zoomTo(layer: __esri.Layer): this;
    /**
     * 缩放至图层
     * @param layers 图层对象
     */
    zoomTo(layers: __esri.Layer[]): this;
}
export default LayerOperation;
