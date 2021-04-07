import { IMap, IView } from '../../../../web-map/web-map';
import BaseTool, { OnToolActivedParams, OnToolActivedReture } from '../../base-tool';
import Extent from '@arcgis/core/geometry/Extent';
/** 返回初始位置工具对象 */
export declare class ZoomHomeTool extends BaseTool {
    /** 起始位置范围对象 */
    private _homeExtent;
    /**
     * 构造返回初始位置工具对象
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(map: IMap, view: IView);
    /** 重写：工具激活处理事件 */
    protected onToolActived_(e: OnToolActivedParams<this>): OnToolActivedReture;
    /** 设置起始位置范围 */
    setHomeExtent(extent: Extent): this;
}
export default ZoomHomeTool;
