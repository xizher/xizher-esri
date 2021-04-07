import { IMap, IView } from '../../../../web-map/web-map'
import BaseTool, { OnToolActivedParams, OnToolActivedReture } from '../../base-tool'
import Extent from '@arcgis/core/geometry/Extent'

/** 返回初始位置工具对象 */
export class ZoomHomeTool extends BaseTool {

  //#region 私有属性

  /** 起始位置范围对象 */
  private _homeExtent: Extent

  //#endregion

  //#region 构造函数

  /**
   * 构造返回初始位置工具对象
   * @param map 地图对象
   * @param view 视图对象
   */
  constructor (map: IMap, view: IView) {
    super(map, view, true)
    view.when(() => this._homeExtent = view.extent)
  }

  //#endregion

  //#region 保护方法

  /** 重写：工具激活处理事件 */
  protected onToolActived_ (e: OnToolActivedParams<this>) : OnToolActivedReture {
    if (!super.onToolActived_(e)) {
      return false
    }
    if (!this._homeExtent) {
      console.warn('home extent is null')
    }
    this.view_.goTo(this._homeExtent)
    return true
  }

  //#endregion

  //#region 公有方法

  /** 设置起始位置范围 */
  public setHomeExtent (extent: Extent) : this {
    this._homeExtent = extent
    return this
  }

  //#endregion

}

export default ZoomHomeTool
