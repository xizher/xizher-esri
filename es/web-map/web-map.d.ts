import { IWebMapPlugin } from '../web-map-plugin';
import IWebMap, { IMap, IView, IWebMapEvents, IWebMapOptions } from './web-map.interfaces';
import Observable from '@xizher/core/es/observable';
import { IBasemap } from '../plugins/basemap';
import { ILayerOperation } from '../plugins/layer-operation';
/**
 * WebMap类
 */
export declare class WebMap extends Observable<IWebMapEvents> implements IWebMap {
    basemap: IBasemap;
    layerOperation: ILayerOperation;
    /**
     * 默认配置项
     */
    private static readonly _defaultOptions;
    /**
     * 地图容器
     */
    private _target;
    /**
     * 地图对象
     */
    private _map;
    /**
     * 视图对象
     */
    private _view;
    /**
     * 配置项
     */
    private _options;
    /**
     * 地图容器
     */
    get target(): string | HTMLDivElement;
    /**
     * 地图对象
     */
    get map(): IMap;
    /**
     * 配置项
     */
    get view(): IView;
    /**
     * 构造WebMap对象
     * @param options 配置项
     */
    constructor(target: string, options?: IWebMapOptions);
    /**
     * 初始化配置项
     * @param options 配置项
     * @returns this
     */
    private _initOptions;
    /**
     * 初始化地图对象
     * @returns this
     */
    private _initMap;
    /**
     * 初始化视图对象
     * @returns this
     */
    private _initView;
    /**
     * 初始化静态资源目录
     * @returns this
     */
    private _initAssetsPath;
    /**
     * 初始化调试
     * @returns this
     */
    private _initDebug;
    /**
     * 安装插件
     * @param plugin 插件
     * @returns this
     */
    use(plugin: IWebMapPlugin): this;
    /**
     * 启动WebMap
     * @returns this
     */
    mount(): this;
}
export default WebMap;
