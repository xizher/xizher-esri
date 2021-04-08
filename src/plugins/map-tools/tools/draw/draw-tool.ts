import { IMap, IView } from '../../../../web-map/web-map'
import BaseTool, { OnToolActivedParams, OnToolActivedReture, OnToolDeActivedParams, OnToolDeActivedReture } from '../../base-tool'
import Draw from '@arcgis/core/views/draw/Draw'
import DrawAction from '@arcgis/core/views/draw/DrawAction'
import Geometry from '@arcgis/core/geometry/Geometry'
import Point from '@arcgis/core/geometry/Point'
import Polyline from '@arcgis/core/geometry/Polyline'
import Polygon from '@arcgis/core/geometry/Polygon'
import { IMapElementSymbol } from '../../../map-element-display/map-element-display'
import Graphic from '@arcgis/core/Graphic'
import { baseUtils } from '@xizher/js-utils'
import { IObserverCallbackParams } from '@xizher/observer'
import Extent from '@arcgis/core/geometry/Extent'
import { MapCursorType } from '../../../map-cursor/map-cursor'

export type DrawType = 'point' | 'multipoint' | 'polyline' | 'polygon' | 'rectangle' | 'circle' | 'ellipse'

export type OnDrawStartParams<T> = IObserverCallbackParams<'draw-start', T> & { x: number, y: number }
export type OnDrawMoveParams<T> = IObserverCallbackParams<'draw-move', T> & { geometry: Geometry }
export type OnDrawEndParams<T> = IObserverCallbackParams<'draw-end', T> & { geometry: Geometry }
export type OnDrawStartReture = Point | false
export type OnDrawMoveReture = Graphic | false
export type OnDrawEndReture = Graphic | false

export interface IDrawToolOptions {
  drawType: DrawType
  onlyOneGraphic?: boolean
}

/** 绘图工具类 */
export class DrawTool extends BaseTool<{
  'draw-start': { x: number, y: number }
  'draw-move': { geometry: Geometry }
  'draw-end': { geometry: Geometry }
}> {

  //#region 私有属性

  /** 绘图对象 */
  private _draw: Draw

  /** 绘制任务对象 */
  private _action: DrawAction

  /** 绘图类型 */
  private _drawType: DrawType

  /** 绘制目标是否仅允许存在一个 */
  private _onlyOneGraphic: boolean

  /** 绘制图元存储容器 */
  private _graphics: Set<Graphic> = new Set()

  /** 绘制过程图元 */
  private _tempGraphic: Graphic

  /** 绘制时样式 */
  private _drawingStyle: IMapElementSymbol = {
    marker: {
      color: [255, 0, 0, .3],
      outline: {
        color: [255, 0, 0, .5],
      },
    },
    line: {
      color: [255, 0, 0, .3],
    },
    fill: {
      color: [255, 0, 0, .3],
      outline: {
        color: [255, 0, 0, .5],
      },
    },
  }

  /** 绘制完成样式 */
  private _drawedStyle: IMapElementSymbol = {
    marker: {

    },
    line: {

    },
    fill: {

    },
  }

  //#endregion

  //#region 保护属性

  protected cursorType_: MapCursorType

  //#endregion

  //#region 构造函数

  /**
   * 构造绘图工具对象
   * @param map 地图对象
   * @param view 视图对象
   */
  constructor (map: IMap, view: IView, options: IDrawToolOptions) {
    super(map, view)
    this._draw = new Draw({ view })
    this._drawType = options.drawType
    this._onlyOneGraphic = !!options.onlyOneGraphic
    this.cursorType_ = 'draw'
    this.on('draw-start', e => this.onDrawStart_(e))
    this.on('draw-move', e => this.onDrawMove_(e))
    this.on('draw-end', e => this.onDrawEnd_(e))
  }

  //#endregion

  //#region 私有方法

  /** 初始化任务 */
  private _initAction () : this {
    this._action?.destroy()
    switch (this._drawType) {
      case 'point':
        return this._initPointAction()
      case 'polyline':
        return this._initPolylineAction()
      case 'polygon':
        return this._initPolygonAction()
      case 'rectangle':
        return this._initRectangleAction()
      default:
        break
    }
    return this
  }

  /** 初始化点绘制任务 */
  private _initPointAction () : this {
    this._action = this._draw.create('point')
    this._action.on('draw-complete', e => {
      const [x, y] = e.coordinates
      this.fire('draw-start', { x, y })
      const geometry = new Point({
        x, y, spatialReference: this.view_.spatialReference
      })
      this.fire('draw-end', { geometry })
    })
    return this
  }

  /** 初始化线绘制任务 */
  private _initPolylineAction () : this {
    this._action = this._draw.create('polyline')
    this._action.on(['vertex-add', 'cursor-update', 'vertex-remove'], e => {
      const paths = e.vertices
      if (paths.length === 1) {
        e.type === 'vertex-add' && this.fire('draw-start', { x: paths[0][0], y: paths[0][1] })
        return
      }
      const geometry = new Polyline({
        paths, spatialReference: this.view_.spatialReference
      })
      this.fire('draw-move', { geometry })
    })
    this._action.on('draw-complete', e => {
      const paths = e.vertices
      const geometry = new Polyline({
        paths, spatialReference: this.view_.spatialReference
      })
      this.fire('draw-end', { geometry })
    })
    return this
  }

  /** 初始化面绘制任务 */
  private _initPolygonAction () : this {
    this._action = this._draw.create('polygon')
    this._action.on(['vertex-add', 'cursor-update', 'vertex-remove'], e => {
      const rings = e.vertices
      if (rings.length === 1) {
        e.type === 'vertex-add' && this.fire('draw-start', { x: rings[0][0], y: rings[0][1] })
        return
      }
      const geometry = new Polygon({
        rings, spatialReference: this.view_.spatialReference
      })
      this.fire('draw-move', { geometry })
    })
    this._action.on('draw-complete', e => {
      const rings = e.vertices
      const geometry = new Polygon({
        rings, spatialReference: this.view_.spatialReference
      })
      this.fire('draw-end', { geometry })
    })
    return this
  }

  /** 初始化矩形绘制任务 */
  private _initRectangleAction () : this {
    const createExtent = (pt1: [number, number], pt2: [number, number]) : Extent => {
      let [xmin, ymin] = pt1, [xmax, ymax] = pt2
      xmin > xmax && ([xmin, xmax] = [xmax, xmin])
      ymin > ymax && ([ymin, ymax] = [ymax, ymin])
      return new Extent({
        xmin, ymin, xmax, ymax, spatialReference: this.view_.spatialReference
      })
    }
    this._action = this._draw.create('rectangle')
    this._action.on(['vertex-add', 'cursor-update'], e => {
      const rings = e.vertices
      if (rings.length === 1) {
        e.type === 'vertex-add' && this.fire('draw-start', { x: rings[0][0], y: rings[0][1] })
        return
      }
      const geometry = createExtent(rings[0], rings[1])
      this.fire('draw-move', { geometry })
    })
    this._action.on('draw-complete', e => {
      const rings = e.vertices
      if (rings.length === 1) {
        this._initAction()
        return
      }
      const geometry = createExtent(rings[0], rings[1])
      this.fire('draw-end', { geometry })
    })
    return this
  }

  private _matchStyle (geometry: Geometry, symbolOptions: IMapElementSymbol) : __esri.SymbolProperties {
    const type = geometry.type
    switch (type) {
      case 'point':
      case 'multipoint':
        return symbolOptions.marker
      case 'polyline':
        return symbolOptions.line
      case 'polygon':
      case 'extent':
        return symbolOptions.fill
      default:
        return {}
    }
  }

  //#endregion

  //#region 保护方法

  /** 重写：工具激活处理事件 */
  protected onToolActived_ (e: OnToolActivedParams<this>) : OnToolActivedReture {
    if (!super.onToolActived_(e)) {
      return false
    }
    const { mapElementDisplay, mapTools, mapCursor } = this.map_.$owner
    if (!mapElementDisplay) {
      console.warn('绘图工具需要WebMap类实例挂载MapElementDisplay插件类实例')
      mapTools.setMapTool('default')
      return false
    }
    if (!mapCursor) {
      console.warn('绘图工具需要WebMap类实例挂载MapCursor插件类实例')
    } else {
      mapCursor.setCursor(this.cursorType_)
    }
    this._initAction()
    return true
  }

  /** 重写：工具失活处理事件 */
  protected onToolDeActived_ (e: OnToolDeActivedParams<this>) : OnToolDeActivedReture {
    if (!super.onToolDeActived_(e)) {
      return false
    }
    const { mapCursor } = this.map_.$owner
    if (!mapCursor) {
      console.warn('绘图工具需要WebMap类实例挂载MapCursor插件类实例')
    } else {
      mapCursor.setCursor('default')
    }
    this._action.destroy()
    this._draw.destroy()
    return true
  }

  /** 工具绘制开始处理事件 */
  protected onDrawStart_ (e: OnDrawStartParams<this>) : OnDrawStartReture {
    if (!this.actived) {
      return false
    }
    const { x, y } = e
    return new Point({ x, y, spatialReference: this.view_.spatialReference})
  }

  /** 工具绘制过程处理事件 */
  protected onDrawMove_ (e: OnDrawMoveParams<this>) : OnDrawMoveReture {
    if (!this.actived) {
      return false
    }
    const { mapElementDisplay } = this.map_.$owner
    if (!mapElementDisplay) {
      return
    }
    this._tempGraphic && mapElementDisplay.removeGraphics(this._tempGraphic)
    this._tempGraphic = mapElementDisplay.parseGraphics(e.geometry, this._matchStyle(e.geometry, this._drawingStyle))
    mapElementDisplay.addGraphics(this._tempGraphic)
    return this._tempGraphic
  }

  /** 工具绘制完成处理事件 */
  protected onDrawEnd_ (e: OnDrawEndParams<this>) : OnDrawEndReture {
    if (!this.actived) {
      return false
    }
    const { mapElementDisplay } = this.map_.$owner
    if (!mapElementDisplay) {
      return
    }
    this._tempGraphic && mapElementDisplay.removeGraphics(this._tempGraphic)
    const graphic = mapElementDisplay.parseGraphics(e.geometry, this._matchStyle(e.geometry, this._drawedStyle))
    if (this._onlyOneGraphic) {
      mapElementDisplay.setGraphics(graphic)
      this._graphics.clear()
    } else {
      mapElementDisplay.addGraphics(graphic)
    }
    this._graphics.add(graphic)
    this._initAction()
    return graphic
  }

  //#endregion

  //#region 公有方法

  /** 清理绘制过的图元 */
  public clearDrawed () : this {
    const { mapElementDisplay } = this.map_.$owner
    if (!mapElementDisplay) {
      return this
    }
    mapElementDisplay.removeGraphics([...this._graphics])
    this._graphics.clear()
    return this
  }

  /** 设置绘制完成图元样式 */
  public setDrawedStyle (style: IMapElementSymbol) : this {
    baseUtils.$extend(true, this._drawedStyle, style)
    return this
  }

  /** 设置绘制时图元样式 */
  public setDrawingStyle (style: IMapElementSymbol) : this {
    baseUtils.$extend(true, this._drawingStyle, style)
    return this
  }

  //#endregion

}

export default DrawTool
