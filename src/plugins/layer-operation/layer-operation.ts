import { $extend } from '@xizher/core/es/utils/base.utils'
import { IWebMap } from '../../web-map'
import WebMapPlugin from '../../web-map-plugin'
import { ILayerItemOptions, ILayerOperation, ILayerOperationEvent, ILayerOperationOptions } from './layer-operations.interfaces'
import { createLayer } from '../../utilities/layer.utilities'

export class LayerOperations extends WebMapPlugin<ILayerOperationEvent> implements ILayerOperation {

  //#region 静态私有属性

  private static readonly _defaultOptions: ILayerOperationOptions = {
    layerItem: []
  }

  //#endregion

  //#region 私有属性

  private _layerPool: Map<string, [__esri.Layer, ILayerItemOptions]>

  private _groupLayer: __esri.GroupLayer

  //#endregion

  //#region 保护属性

  private options_: ILayerOperationOptions

  //#endregion

  //#region 构造函数

  constructor (options: ILayerOperationOptions = {}) {
    super('layerOperation')
    this.options_ = LayerOperations._defaultOptions
    $extend(true, this.options_, options)
    this._layerPool = new Map()
  }

  //#endregion

  //#region 私有方法

  private _init () : this {
    this._groupLayer = createLayer({ lyrType: 'GroupLayer' })
    this.map_.add(this._groupLayer)
    return this._initLayer()
  }

  private _initLayer () : this {
    this.options_.layerItem.forEach(item => {
      const layer = createLayer(item.target)
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

  //#endregion

  //#region 公有方法

  public installPlugin (webMap: IWebMap) : this {
    return super
      .installPlugin(webMap)
      ._init()
  }

  public getLayer (name: string) : null | __esri.Layer {
    if (this._layerPool.has(name)) {
      return this._layerPool.get(name)[0]
    }
    return null
  }

  public setLayerOpacity (name: string, opacity: number) : this {
    const layer = this.getLayer(name)
    if (layer) {
      layer.opacity = opacity
    }
    return this
  }

  public setLayerVisible (name: string, visible: boolean) : this {
    const layer = this.getLayer(name)
    if (layer) {
      layer.visible = visible
    }
    return this
  }

  public zoomTo (name: string) : this
  public zoomTo (names: string[]) : this
  public zoomTo (layer: __esri.Layer) : this
  public zoomTo (layers: __esri.Layer[]) : this
  public zoomTo (arg0: string | string[] | __esri.Layer | __esri.Layer[]) : this {
    const items = Array.isArray(arg0) ? arg0 : [arg0]
    let extent: __esri.Extent
    items.forEach(item => {
      let lyr = item as __esri.Layer
      if (typeof item === 'string') {
        const layer = this.getLayer(item)
        if (!layer) {
          return
        }
        lyr = layer
      }
      if (extent) {
        extent.union(lyr.fullExtent)
      } else {
        extent = lyr.fullExtent
      }
    })
    extent && this.view_.goTo(extent)
    return this
  }

  //#endregion

}

export default LayerOperations
