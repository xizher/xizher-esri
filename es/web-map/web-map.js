import Observable from '@xizher/core/es/observable';
import { $extend } from '@xizher/core/es/utils/base.utils';
import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import esriConfig from '@arcgis/core/config';
/**
 * WebMap类
 */
export class WebMap extends Observable {
    basemap;
    layerOperation;
    //#region 私有静态属性
    /**
     * 默认配置项
     */
    static _defaultOptions = {
        viewOptions: {
            center: [0, 0],
            zoom: 1,
            ui: { components: [] }
        },
        debug: false,
        debugName: 'webMap',
    };
    //#endregion
    //#region 私有属性
    /**
     * 地图容器
     */
    _target;
    /**
     * 地图对象
     */
    _map;
    /**
     * 视图对象
     */
    _view;
    /**
     * 配置项
     */
    _options;
    //#endregion
    //#region getter
    /**
     * 地图容器
     */
    get target() {
        return this._target;
    }
    /**
     * 地图对象
     */
    get map() {
        return this._map;
    }
    /**
     * 配置项
     */
    get view() {
        return this._view;
    }
    //#endregion
    //#region 构造函数
    /**
     * 构造WebMap对象
     * @param options 配置项
     */
    constructor(target, options = {}) {
        super();
        this._target = target;
        this
            ._initOptions(options)
            ._initMap()
            ._initView()
            ._initAssetsPath()
            ._initDebug();
    }
    //#endregion
    //#region 私有方法
    /**
     * 初始化配置项
     * @param options 配置项
     * @returns this
     */
    _initOptions(options) {
        this._options = WebMap._defaultOptions;
        $extend(true, this._options, options);
        return this;
    }
    /**
     * 初始化地图对象
     * @returns this
     */
    _initMap() {
        const { mapOptions } = this._options;
        const map = new ArcGISMap(mapOptions);
        this._map = Object.assign(map, { $owner: this });
        return this;
    }
    /**
     * 初始化视图对象
     * @returns this
     */
    _initView() {
        const { viewOptions } = this._options;
        const view = new MapView({
            ...viewOptions,
            map: this._map
        });
        this._view = Object.assign(view, { $owner: this });
        return this;
    }
    /**
     * 初始化静态资源目录
     * @returns this
     */
    _initAssetsPath() {
        const { assetsPath } = this._options;
        assetsPath && (esriConfig.assetsPath = assetsPath);
        return this;
    }
    /**
     * 初始化调试
     * @returns this
     */
    _initDebug() {
        const { debug, debugName } = this._options;
        debug && (window[debugName] = this);
        return this;
    }
    //#endregion
    //#region 公有方法
    /**
     * 安装插件
     * @param plugin 插件
     * @returns this
     */
    use(plugin) {
        this[plugin.pluginName] = plugin.installPlugin(this);
        return this;
    }
    /**
     * 启动WebMap
     * @returns this
     */
    mount() {
        this._view.container = this._target;
        this.fire('loaded');
        return this;
    }
}
export default WebMap;
