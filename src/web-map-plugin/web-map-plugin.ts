import Observable from '@xizher/core/es/observable'
import { IWebMap, IMap, IView } from '../web-map'
import IWebMapPlugin from './web-map-plugin.interfaces'

/**
 * 插件类
 */
export class WebMapPlugin<T> extends Observable<T> implements IWebMapPlugin {

  //#region 私有属性

  /**
   * 插件名
   */
  private _pluginName: string

  //#endregion

  //#region 保护属性

  /**
   * 地图对象
   */
  protected map_: IMap

  /**
   * 视图对象
   */
  protected view_: IView

  //#endregion

  //#region 构造函数

  /**
   * 构造插件对象
   * @param pluginName 插件名
   */
  constructor (pluginName: string) {
    super()
    this._pluginName = pluginName
  }

  //#endregion

  //#region getter

  /**
   * 插件名
   */
  public get pluginName () : string {
    return this._pluginName
  }

  //#endregion

  //#region 公有方法

  /**
   * 安装插件
   * @param webMap WebMap对象
   * @returns this
   */
  public installPlugin (webMap: IWebMap) : this {
    this.map_ = webMap.map
    this.view_ = webMap.view
    return this
  }

  //#endregion

}

export default WebMapPlugin
