import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import { baseUtils } from '@xizher/js-utils';
import Observer from '@xizher/observer';
/** WebMap类 */
export class WebMap extends Observer {
    //#endregion
    //#region 构造函数
    /**
     * 构造WebMap对象
     * @param targetDiv 地图容器Id
     * @param options 配置项
     */
    constructor(targetDiv, options = {}) {
        super();
        /** 配置项 */
        this._options = {
            mode: '2d',
            viewOptions: {
                center: [0, 0],
                zoom: 1,
                ui: { components: [] }
            },
            mapOptions: {
            // basemap: {
            //   baseLayers: []
            // }
            // basemap: 'streets-navigation-vector'
            },
            debug: false,
            debugName: 'webMap'
        };
        this._targetDiv = targetDiv;
        baseUtils.$extend(true, this._options, options);
        this._init();
    }
    //#endregion
    //#region getter
    get targetDiv() {
        return this._targetDiv;
    }
    get map() {
        return this._map;
    }
    get view() {
        return this._view;
    }
    //#endregion
    //#region 私有方法
    /** 初始化 */
    _init() {
        const { mapOptions, viewOptions, debug, debugName } = this._options;
        const map = new ArcGISMap(mapOptions);
        const view = this._options.mode === '3d'
            ? new SceneView({ ...viewOptions, map })
            : new MapView({ ...viewOptions, map });
        this._view = Object.assign(view, { $owner: this });
        this._map = Object.assign(map, { $owner: this });
        if (debug) {
            window[debugName] = this;
        }
        return this;
    }
    //#endregion
    //#region 公有方法
    /**
   * 挂载插件
   * @param plugin WebMap插件对象
   */
    use(plugin) {
        this[plugin.pluginName] = plugin.installPlugin(this);
        return this;
    }
    /**
     * 挂载WebMap
     */
    mount() {
        this._view.container = this._targetDiv;
        this.fire('loaded');
        return this;
    }
}
export default WebMap;
