import { IWebMapPlugin } from '../web-map-plugin'
import IWebMap, { IMap, IView, IWebMapEvents, IWebMapOptions } from './web-map.interfaces'
import Observable from '@xizher/core/es/observable'
import { $extend } from '@xizher/core/es/utils/base.utils'
import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import esriConfig from '@arcgis/core/config'
import { IBasemap } from '../plugins/basemap'
import { ILayerOperation } from '../plugins/layer-operation'

/**
 * WebMap类
 */
export class WebMap extends Observable<IWebMapEvents> implements IWebMap {

  basemap: IBasemap
  layerOperation: ILayerOperation

  //#region 私有静态属性

  /**
   * 默认配置项
   */
  private static readonly _defaultOptions: IWebMapOptions = {
    viewOptions: {
      center: [0, 0],
      zoom: 1,
      ui: { components: [] }
    },
    debug: false,
    debugName: 'webMap',
  }

  //#endregion

  //#region 私有属性

  /**
   * 地图容器
   */
  private _target: string | HTMLDivElement

  /**
   * 地图对象
   */
  private _map: IMap

  /**
   * 视图对象
   */
  private _view: IView

  /**
   * 配置项
   */
  private _options: IWebMapOptions

  //#endregion

  //#region getter

  /**
   * 地图容器
   */
  public get target () : string | HTMLDivElement {
    return this._target
  }

  /**
   * 地图对象
   */
  public get map () : IMap {
    return this._map
  }

  /**
   * 配置项
   */
  public get view () : IView {
    return this._view
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造WebMap对象
   * @param options 配置项
   */
  constructor (target: string, options: IWebMapOptions = {}) {
    super()
    this._target = target
    this
      ._initOptions(options)
      ._initMap()
      ._initView()
      ._initAssetsPath()
      ._initDebug()
  }

  //#endregion

  //#region 私有方法

  /**
   * 初始化配置项
   * @param options 配置项
   * @returns this
   */
  private _initOptions (options: IWebMapOptions) : this {
    this._options = WebMap._defaultOptions
    $extend(true, this._options, options)
    return this
  }

  /**
   * 初始化地图对象
   * @returns this
   */
  private _initMap () : this {
    const { mapOptions } = this._options
    const map = new ArcGISMap(mapOptions)
    this._map = Object.assign(map, { $owner: this })
    return this
  }

  /**
   * 初始化视图对象
   * @returns this
   */
  private _initView () : this {
    const { viewOptions } = this._options
    const view = new MapView({
      ...viewOptions,
      map: this._map
    })
    this._view = Object.assign(view, { $owner: this })
    return this
  }

  /**
   * 初始化静态资源目录
   * @returns this
   */
  private _initAssetsPath () : this {
    const { assetsPath } = this._options
    assetsPath && (esriConfig.assetsPath = assetsPath)
    return this
  }

  /**
   * 初始化调试
   * @returns this
   */
  private _initDebug () : this {
    const { debug, debugName } = this._options
    debug && (window[debugName] = this)
    return this
  }

  //#endregion

  //#region 公有方法

  /**
   * 安装插件
   * @param plugin 插件
   * @returns this
   */
  public use (plugin: IWebMapPlugin) : this {
    this[plugin.pluginName] = plugin.installPlugin(this)
    return this
  }

  /**
   * 启动WebMap
   * @returns this
   */
  public mount () : this {
    this._view.container = this._target as HTMLDivElement
    this.fire('loaded')
    return this
  }

  //#endregion

}

export default WebMap
