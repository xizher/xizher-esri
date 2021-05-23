import GroupLayer from '@arcgis/core/layers/GroupLayer'
import { baseUtils } from '@xizher/core/es/utils'
import WebMapPlugin from '../../web-map-plugin/web-map-plugin'
import WebMap from '../../web-map/web-map'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import WMSLayer from '@arcgis/core/layers/WMSLayer'
import OGCFeatureLayer from '@arcgis/core/layers/OGCFeatureLayer'
import KMLLayer from '@arcgis/core/layers/KMLLayer'
import CSVLayer from '@arcgis/core/layers/CSVLayer'

export type LayerType = 'geojson' | 'wms' | 'wfs' | 'csv' | 'kml'

/** 图层项配置项接口 */
export interface ILayerItemsOptions {
  name: string
  type: LayerType
  options: __esri.LayerProperties
}

/** 图层控制插件配置项接口 */
export interface ILayerOperationOptions {
  layerItems?: ILayerItemsOptions[]
}

/** 图层控制插件类 */
export class LayerOperation extends WebMapPlugin<{
  'change:visible': {
    visible: boolean
    layer: __esri.Layer
    layerName: string
  }
  'change:opacity': {
    opacity: number
    layer: __esri.Layer
    layerName: string
  }
}> {

  //#region 私有属性

  /** 配置项 */
  private _options: ILayerOperationOptions = {
    layerItems: []
  }

  /** 图层池 */
  private _layerPool: Map<string, [__esri.Layer, ILayerItemsOptions]> = new Map()

  /** 图层组 */
  private _groupLayer: __esri.GroupLayer

  //#endregion

  //#region 构造函数

  /**
   * 构造图层控制插件对象
   * @param options 配置项
   */
  constructor (options: ILayerOperationOptions = {}) {
    super('layerOperation')
    baseUtils.$extend(true, this._options, options)
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  private _init () : this {
    this._groupLayer = new GroupLayer()
    this.map_.add(this._groupLayer)
    return this._initLayer()
  }

  /** 初始化图层 */
  private _initLayer () : this {
    this._options.layerItems.forEach(item => {
      let layer: __esri.Layer
      switch (item.type) {
        case 'geojson':
          layer = this._initGeoJSONLayer(item)
          break
        case 'wms':
          layer = this._initWmsLayer(item)
          break
        case 'wfs':
          layer = this._initWfsLayer(item) // no support
          break
        case 'kml':
          layer = this._initKmlLayer(item)
          break
        case 'csv':
          layer = this._initCsvLayer(item) // no support
          break
        default:
          break
      }
      if (!layer) {
        return
      }
      this._groupLayer.add(layer)
      this._layerPool.set(item.name, [layer, item])
      layer.watch('visible', visible => {
        this.fire('change:visible', {
          visible,
          layer,
          layerName: item.name
        })
      })
      layer.watch('opacity', opacity => {
        this.fire('change:opacity', {
          opacity,
          layer,
          layerName: item.name
        })
      })
    })
    return this
  }

  /** 初始化GeoJSON图层 */
  private _initGeoJSONLayer (layerItemOptions: ILayerItemsOptions) : __esri.Layer {
    const layer = new GeoJSONLayer(layerItemOptions.options)
    return layer
  }

  /** 初始化WMS图层 */
  private _initWmsLayer (layerItemOptions: ILayerItemsOptions) : __esri.Layer {
    const layer = new WMSLayer(layerItemOptions.options)
    return layer
  }

  /** 初始化WFS图层 */
  private _initWfsLayer (layerItemOptions: ILayerItemsOptions) : __esri.Layer {
    const layer = new OGCFeatureLayer(layerItemOptions.options)
    return layer
  }

  /** 初始化KML图层 */
  private _initKmlLayer (layerItemOptions: ILayerItemsOptions) : __esri.Layer {
    const layer = new KMLLayer(layerItemOptions.options)
    return layer
  }

  /** 初始化CSV图层 */
  private _initCsvLayer (layerItemOptions: ILayerItemsOptions) : __esri.Layer {
    const layer = new CSVLayer(layerItemOptions.options)
    return layer
  }

  //#endregion

  //#region 公有方法

  /** 重写：插件安装 */
  public installPlugin (webMap: WebMap) : this {
    super.installPlugin(webMap)
    return this._init()
  }

  /**
   * 通过图层名获取图层对象
   * @param name 图层名
   * @returns 图层对象
   */
  public getLayerByName (name: string) : __esri.Layer {
    const [layer] = this._layerPool.get(name)
    return layer
  }

  /**
   * 设置图层可见性
   * @param name 图层名
   * @param visible 可见性
   */
  public setLayerVisible (name: string, visible: boolean) : this
  /**
   * 设置图层可见性
   * @param layer 图层对象
   * @param visible 可见性
   */
  public setLayerVisible (layer: __esri.Layer, visible: boolean) : this
  /**
   * 设置图层可见性
   * @param arg0 图层名或图层可见性
   * @param visible 可见性
   */
  public setLayerVisible (arg0: string | __esri.Layer, visible: boolean) : this {
    const layer = typeof arg0 === 'string'
      ? this.getLayerByName(arg0)
      : arg0
    layer.visible = visible
    return this
  }

  /**
   * 设置图层透明度
   * @param name 图层名
   * @param opacity 不可透明度
   */
  public setLayerOpacity (name: string, opacity: number) : this
  /**
   * 设置图层透明度
   * @param layer 图层对象
   * @param opacity 不可透明度
   */
  public setLayerOpacity (layer: __esri.Layer, opacity: number) : this
  /**
   * 设置图层透明度
   * @param arg0 图层名或图层对象
   * @param opacity 不可透明度
   */
  public setLayerOpacity (arg0: string | __esri.Layer, opacity: number) : this {
    const layer = typeof arg0 === 'string'
      ? this.getLayerByName(arg0)
      : arg0
    layer.opacity = opacity
    return this
  }

  /**
   * 缩放至图层
   * @param name 图层名
   */
  public zoomTo (name: string) : this
  /**
   * 缩放至图层
   * @param names 图层名
   */
  public zoomTo (names: string[]) : this
  /**
   * 缩放至图层
   * @param layer 图层对象
   */
  public zoomTo (layer: __esri.Layer) : this
  /**
   * 缩放至图层
   * @param layers 图层对象
   */
  public zoomTo (layers: __esri.Layer[]) : this
  /**
   * 缩放至图层
   * @param name 图层名或图层对象
   */
  public zoomTo (arg0: string | string[] | __esri.Layer | __esri.Layer[]) : this {
    if (typeof arg0 === 'string') {
      const layer = this.getLayerByName(arg0)
      this.view_.goTo(layer.fullExtent)
      return this
    }
    if (Array.isArray(arg0)) {
      let extent: __esri.Extent
      arg0.forEach(item => {
        if (typeof arg0 === 'string') {
          const layer = this.getLayerByName(item)
          if (extent) {
            extent.union(layer.fullExtent)
          } else {
            extent = layer.fullExtent
          }
        } else {
          if (extent) {
            extent.union(item.fullExtent)
          } else {
            extent = item.fullExtent
          }
        }
      })
      console.log(arg0, extent)
      extent && this.view_.goTo(extent)
      return this
    }
    this.view_.goTo(arg0.fullExtent)
    return this
  }

  //#endregion

}

export default LayerOperation
