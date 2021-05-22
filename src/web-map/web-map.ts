import Basemap from '@arcgis/core/Basemap'
import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import SceneView from '@arcgis/core/views/SceneView'
import { baseUtils } from '@xizher/js-utils/dist/utilities/base.utilities'
import Observer from '@xizher/observer'
import LayerOperation from '../plugins/layer-operation/layer-operation'
import MapCursor from '../plugins/map-cursor/map-cursor'
import MapElementDisplay from '../plugins/map-element-display/map-element-display'
import MapTools from '../plugins/map-tools/map-tools'
import WebMapPlugin from '../web-map-plugin/web-map-plugin'
import esriConfig from '@arcgis/core/config'

/** 地图对象接口 */
export interface IMap extends ArcGISMap {
  $owner: WebMap
}

/** 视图对象接口 */
export type IView = (MapView | SceneView) & { $owner: WebMap }

/** 地图模式 */
export type Mode = '2d' | '3d'

/** WebMap配置项接口 */
export interface IWebMapOptions {
  mode?: Mode
  mapOptions?: __esri.MapProperties
  viewOptions?: __esri.MapViewProperties | __esri.SceneViewProperties
  debug?: boolean
  debugName?: string
  assetsPath?: string
}

/** WebMap类 */
export class WebMap extends Observer<{
  'loaded': void
}> {

  //#region 公有属性（插件对象）

  public basemap?: Basemap
  public mapCursor?: MapCursor
  public mapElementDisplay?: MapElementDisplay
  public mapTools?: MapTools
  public layerOperation?: LayerOperation

  //#endregion

  //#region 私有属性

  /** 地图目标容器Id */
  private _targetDiv: string

  /** 地图对象 */
  private _map: IMap

  /** 视图对象 */
  private _view: IView

  /** 配置项 */
  private _options: IWebMapOptions = {
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
    debugName: 'webMap',
    assetsPath: 'https://js.arcgis.com/4.19/@arcgis/core/assets'
  }

  //#endregion

  //#region getter

  public get targetDiv () : string {
    return this._targetDiv
  }

  public get map () : IMap {
    return this._map
  }

  public get view () : IView {
    return this._view
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造WebMap对象
   * @param targetDiv 地图容器Id
   * @param options 配置项
   */
  constructor (targetDiv: string, options: IWebMapOptions = {}) {
    super ()
    this._targetDiv = targetDiv
    baseUtils.$extend(true, this._options, options)
    this._init()
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  private _init () : this {
    const { mapOptions, viewOptions, debug, debugName, assetsPath } = this._options
    esriConfig.assetsPath = assetsPath
    const map = new ArcGISMap(mapOptions)
    const view = this._options.mode === '3d'
      ? new SceneView({ ...(viewOptions as __esri.SceneViewProperties), map })
      : new MapView({ ...viewOptions, map })
    this._view = Object.assign(view, { $owner: this })
    this._map = Object.assign(map, { $owner: this })
    if (debug) {
      window[debugName] = this
    }
    return this
  }

  //#endregion

  //#region 公有方法

  /**
 * 挂载插件
 * @param plugin WebMap插件对象
 */
  public use <T> (plugin: WebMapPlugin<T>) : WebMap {
    this[plugin.pluginName] = plugin.installPlugin(this)
    return this
  }

  /**
   * 挂载WebMap
   */
  public mount () : WebMap {
    this._view.container = (this._targetDiv as unknown) as HTMLDivElement
    this.fire('loaded')
    return this
  }

  //#endregion

}

export default WebMap
