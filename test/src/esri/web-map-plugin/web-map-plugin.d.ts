import Observable from '@xizher/core/es/observable';
import { IWebMap, IMap, IView } from '../web-map';
import IWebMapPlugin from './web-map-plugin.interfaces';
/**
 * 插件类
 */
export declare class WebMapPlugin<T> extends Observable<T> implements IWebMapPlugin {
    /**
     * 插件名
     */
    private _pluginName;
    /**
     * 地图对象
     */
    protected map_: IMap;
    /**
     * 视图对象
     */
    protected view_: IView;
    /**
     * 构造插件对象
     * @param pluginName 插件名
     */
    constructor(pluginName: string);
    /**
     * 插件名
     */
    get pluginName(): string;
    /**
     * 安装插件
     * @param webMap WebMap对象
     * @returns this
     */
    installPlugin(webMap: IWebMap): this;
}
export default WebMapPlugin;
