import Observable from '@xizher/core/es/observable';
/**
 * 插件类
 */
export class WebMapPlugin extends Observable {
    //#region 私有属性
    /**
     * 插件名
     */
    _pluginName;
    //#endregion
    //#region 保护属性
    /**
     * 地图对象
     */
    map_;
    /**
     * 视图对象
     */
    view_;
    //#endregion
    //#region 构造函数
    /**
     * 构造插件对象
     * @param pluginName 插件名
     */
    constructor(pluginName) {
        super();
        this._pluginName = pluginName;
    }
    //#endregion
    //#region getter
    /**
     * 插件名
     */
    get pluginName() {
        return this._pluginName;
    }
    //#endregion
    //#region 公有方法
    /**
     * 安装插件
     * @param webMap WebMap对象
     * @returns this
     */
    installPlugin(webMap) {
        this.map_ = webMap.map;
        this.view_ = webMap.view;
        return this;
    }
}
export default WebMapPlugin;
