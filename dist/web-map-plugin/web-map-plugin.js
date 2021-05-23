import Evented from '@xizher/core/es/evented';
/** WebMap插件类 */
class WebMapPlugin extends Evented {
    //#endregion
    //#region 构造函数
    /**
     * 构造WebMap插件对象
     * @param pluginName 插件对象名
     */
    constructor(pluginName) {
        super();
        this._pluginName = pluginName;
    }
    //#endregion
    //#region getter
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
