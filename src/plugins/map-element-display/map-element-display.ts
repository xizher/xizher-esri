import { baseUtils } from '@xizher/js-utils'
import WebMapPlugin from '../../web-map-plugin/web-map-plugin'
import WebMap from '../../web-map/web-map'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import GroupLayer from '@arcgis/core/layers/GroupLayer'
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol'
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol'
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol'
import Graphic from '@arcgis/core/Graphic'

/** 图元样式接口 */
export interface IMapElementSymbol {
  marker: __esri.SimpleMarkerSymbolProperties
  line: __esri.SimpleLineSymbolProperties
  fill: __esri.SimpleFillSymbolProperties
}

/** 图元控制插件配置项 */
export interface IMapElementDisplayOptions {
  graphicsSymbol?: IMapElementSymbol
  highlightSymbol?: IMapElementSymbol
}

/** 图元控制插件对象 */
export class MapElementDisplay extends WebMapPlugin<{

}> {

  //#region 私有属性

  /** 基础图元样式 */
  private _graphicsSymbol: IMapElementSymbol

  /** 高亮图元样式 */
  private _highlightSymbol: IMapElementSymbol

  /** 基础图元存储图层 */
  private _graphicsLayer: __esri.GraphicsLayer

  /** 高亮图元存储图层 */
  private _highlightLayer: __esri.GraphicsLayer

  /** 图元图层存储图层组 */
  private _groupLayer: __esri.GroupLayer

  private _options: IMapElementDisplayOptions = {
    graphicsSymbol: {
      marker: {
        color: [255, 0, 0, .8],
        style: 'circle',
        size: '12px',
        outline: { color: [255, 0, 0], width: 1 }
      },
      line: {
        color: [255, 0, 0, .8],
        width: '2px',
        style: 'solid'
      },
      fill: {
        color: [255, 0, 0, .4],
        style: 'solid',
        outline: { color: [255, 0, 0], width: 1 }
      },
    },
    highlightSymbol: {
      marker: {
        color: [0, 255, 255, .8],
        style: 'circle',
        size: '12px',
        outline: { color: [0, 255, 255], width: 1 }
      },
      line: {
        color: [0, 255, 255, .8],
        width: '2px',
        style: 'solid'
      },
      fill: {
        color: [0, 255, 255, .4],
        style: 'solid',
        outline: { color: [0, 255, 255], width: 1 }
      },
    }
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造图元控制插件对象
   * @param options 配置项
   */
  constructor (options: IMapElementDisplayOptions = {}) {
    super('mapElementDisplay')
    baseUtils.$extend(true, this._options, options)
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  private _init () : this {
    this._graphicsSymbol = this._options.graphicsSymbol
    this._highlightSymbol = this._options.highlightSymbol
    this._graphicsLayer = new GraphicsLayer()
    this._highlightLayer = new GraphicsLayer()
    this._groupLayer = new GroupLayer({
      layers: [this._graphicsLayer, this._highlightLayer]
    })
    this.map_.layers.add(this._groupLayer)
    return this
  }

  //#endregion

  //#region 公有方法

  /** 重写：安装插件 */
  public installPlugin (webMap: WebMap) : this {
    super.installPlugin(webMap)
    return this._init()
  }

  /**
   * 添加基础图元
   * @param graphic 图元对象
   */
  public addGraphics (graphic: __esri.Graphic) : this

  /**
   * 添加基础图元
   * @param graphics 图元对象
   */
  public addGraphics (graphics: __esri.Graphic[]) : this

  /**
   * 添加基础图元
   * @param arg0 图元对象
   */
  public addGraphics (arg0: __esri.Graphic | __esri.Graphic[]) : this {
    Array.isArray(arg0)
      ? arg0.forEach(g => this._graphicsLayer.add(g))
      : this._graphicsLayer.add(arg0)
    return this
  }

  /** 清理基础图元 */
  public clearGraphics () : this {
    this._graphicsLayer.removeAll()
    return this
  }

  /**
   * 移除指定基础图元
   * @param graphic 图元对象
   */
  public removeGraphics (graphic: __esri.Graphic) : this

  /**
   * 移除指定基础图元
   * @param graphics 图元对象
   */
  public removeGraphics (graphics: __esri.Graphic[]) : this

  /**
   * 移除指定基础图元
   * @param arg0 图元对象
   */
  public removeGraphics (arg0: __esri.Graphic | __esri.Graphic[]) : this {
    Array.isArray(arg0)
      ? this._graphicsLayer.removeMany(arg0)
      : this._graphicsLayer.remove(arg0)
    return this
  }

  /**
   * 设置基础图元
   * @param graphic 图元对象
   */
  public setGraphics (graphic: __esri.Graphic) : this

  /**
   * 设置基础图元
   * @param graphic 图元对象
   */
  public setGraphics (graphics: __esri.Graphic[]) : this

  /**
   * 设置基础图元
   * @param graphic 图元对象
   */
  public setGraphics (arg0: __esri.Graphic | __esri.Graphic[]) : this {
    // eslint-disable-next-line
    //@ts-ignore
    return this.clearGraphics().addGraphics(arg0)
  }

  /**
   * 添加高亮图元
   * @param graphic 图元对象
   */
  public addHighlight (graphic: __esri.Graphic) : this

  /**
   * 添加高亮图元
   * @param graphics 图元对象
   */
  public addHighlight (graphics: __esri.Graphic[]) : this

  /**
   * 添加高亮图元
   * @param arg0 图元对象
   */
  public addHighlight (arg0: __esri.Graphic | __esri.Graphic[]) : this {
    Array.isArray(arg0)
      ? arg0.forEach(g => this._highlightLayer.add(g))
      : this._highlightLayer.add(arg0)
    return this
  }

  /** 清理高亮图元 */
  public clearHighlight () : this {
    this._highlightLayer.removeAll()
    return this
  }

  /**
   * 移除指定高亮图元
   * @param graphic 图元对象
   */
  public removeHighlight (graphic: __esri.Graphic) : this

  /**
   * 移除指定高亮图元
   * @param graphics 图元对象
   */
  public removeHighlight (graphics: __esri.Graphic[]) : this

  /**
   * 移除指定高亮图元
   * @param arg0 图元对象
   */
  public removeHighlight (arg0: __esri.Graphic | __esri.Graphic[]) : this {
    Array.isArray(arg0)
      ? this._highlightLayer.removeMany(arg0)
      : this._highlightLayer.remove(arg0)
    return this
  }

  /**
   * 设置高亮图元
   * @param graphic 图元对象
   */
  public setHighlight (graphic: __esri.Graphic) : this

  /**
   * 设置高亮图元
   * @param graphic 图元对象
   */
  public setHighlight (graphics: __esri.Graphic[]) : this

  /**
   * 设置高亮图元
   * @param graphic 图元对象
   */
  public setHighlight (arg0: __esri.Graphic | __esri.Graphic[]) : this {
    // eslint-disable-next-line
    //@ts-ignore
    return this.clearHighlight().addHighlight(arg0)
  }

  /**
   * 解析几何对象（基础）
   * @param geometry 几何对象
   * @param symbolOptions 样式
   * @returns 图元对象
   */
  public parseGraphics (geometry: __esri.Geometry, symbolOptions: __esri.Symbol) : __esri.Graphic | null
  /**
   * 解析几何对象（基础）
   * @param geometries 几何对象
   * @param symbolOptions 样式
   * @returns 图元对象
   */
  public parseGraphics (geometries: __esri.Geometry[], symbolOptions: __esri.Symbol) : __esri.Graphic[] | null
  /**
   * 解析几何对象（基础）
   * @param arg0 几何对象
   * @param symbolOptions 样式
   * @returns 图元对象
   */
  public parseGraphics (arg0: __esri.Geometry | __esri.Geometry[], symbolOptions: __esri.Symbol) : __esri.Graphic | __esri.Graphic[] | null {
    const geometryType = Array.isArray(arg0)
      ? arg0[0]?.type
      : arg0.type
    if (!geometryType) {
      return null
    }
    let symbol = null
    switch (geometryType) {
      case 'point':
      case 'multipoint':
        symbol = new SimpleMarkerSymbol(this._graphicsSymbol.marker)
        break
      case 'polyline':
        symbol = new SimpleLineSymbol(this._graphicsSymbol.line)
        break
      case 'polygon':
      case 'extent':
        symbol = new SimpleFillSymbol(this._graphicsSymbol.fill)
        break
      // case 'mesh': // TODO
      //   break
      default:
        break
    }
    baseUtils.$extend(true, symbol, symbolOptions)
    return Array.isArray(arg0)
      ? arg0.map(geometry => new Graphic({ geometry, symbol }))
      : new Graphic({ geometry: arg0, symbol })
  }

  /**
   * 解析几何对象（高亮）
   * @param geometry 几何对象
   * @param symbolOptions 样式
   * @returns 图元对象
   */
  public parseHighlight (geometry: __esri.Geometry, symbolOptions: __esri.Symbol) : __esri.Graphic | null
  /**
   * 解析几何对象（高亮）
   * @param geometries 几何对象
   * @param symbolOptions 样式
   * @returns 图元对象
   */
  public parseHighlight (geometries: __esri.Geometry[], symbolOptions: __esri.Symbol) : __esri.Graphic[] | null
  /**
   * 解析几何对象（高亮）
   * @param arg0 几何对象
   * @param symbolOptions 样式
   * @returns 图元对象
   */
  public parseHighlight (arg0: __esri.Geometry | __esri.Geometry[], symbolOptions: __esri.Symbol) : __esri.Graphic | __esri.Graphic[] | null {
    const geometryType = Array.isArray(arg0)
      ? arg0[0]?.type
      : arg0.type
    if (!geometryType) {
      return null
    }
    let symbol = null
    switch (geometryType) {
      case 'point':
      case 'multipoint':
        symbol = new SimpleMarkerSymbol(this._highlightSymbol.marker)
        break
      case 'polyline':
        symbol = new SimpleLineSymbol(this._highlightSymbol.line)
        break
      case 'polygon':
      case 'extent':
        symbol = new SimpleFillSymbol(this._highlightSymbol.fill)
        break
      // case 'mesh': // TODO
      //   break
      default:
        break
    }
    baseUtils.$extend(true, symbol, symbolOptions)
    return Array.isArray(arg0)
      ? arg0.map(geometry => new Graphic({ geometry, symbol }))
      : new Graphic({ geometry: arg0, symbol })
  }

  //#endregion

}

export default MapElementDisplay
