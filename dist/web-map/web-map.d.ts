import Basemap from '@arcgis/core/Basemap';
import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import Evented from '@xizher/core/es/evented';
import LayerOperation from '../plugins/layer-operation/layer-operation';
import MapCursor from '../plugins/map-cursor/map-cursor';
import MapElementDisplay from '../plugins/map-element-display/map-element-display';
import MapTools from '../plugins/map-tools/map-tools';
import WebMapPlugin from '../web-map-plugin/web-map-plugin';
/** 地图对象接口 */
export interface IMap extends ArcGISMap {
    $owner: WebMap;
}
/** 视图对象接口 */
export declare type IView = (MapView | SceneView) & {
    $owner: WebMap;
};
/** 地图模式 */
export declare type Mode = '2d' | '3d';
/** WebMap配置项接口 */
export interface IWebMapOptions {
    mode?: Mode;
    mapOptions?: __esri.MapProperties;
    viewOptions?: __esri.MapViewProperties | __esri.SceneViewProperties;
    debug?: boolean;
    debugName?: string;
    assetsPath?: string;
}
/** WebMap类 */
export declare class WebMap extends Evented<{
    'loaded': void;
}> {
    basemap?: Basemap;
    mapCursor?: MapCursor;
    mapElementDisplay?: MapElementDisplay;
    mapTools?: MapTools;
    layerOperation?: LayerOperation;
    /** 地图目标容器Id */
    private _targetDiv;
    /** 地图对象 */
    private _map;
    /** 视图对象 */
    private _view;
    /** 配置项 */
    private _options;
    get targetDiv(): string;
    get map(): IMap;
    get view(): IView;
    /**
     * 构造WebMap对象
     * @param targetDiv 地图容器Id
     * @param options 配置项
     */
    constructor(targetDiv: string, options?: IWebMapOptions);
    /** 初始化 */
    private _init;
    /**
   * 挂载插件
   * @param plugin WebMap插件对象
   */
    use<T>(plugin: WebMapPlugin<T>): WebMap;
    /**
     * 挂载WebMap
     */
    mount(): WebMap;
}
export default WebMap;
