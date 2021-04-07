import { IMap, IView } from '../../../../web-map/web-map';
import BaseTool, { OnToolActivedParams, OnToolActivedReture } from '../../base-tool';
/** 比例缩小工具对象 */
export declare class ZoomOutTool extends BaseTool {
    /**
     * 构造比例缩小工具对象
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(map: IMap, view: IView);
    /** 重写：工具激活处理事件 */
    protected onToolActived_(e: OnToolActivedParams<this>): OnToolActivedReture;
}
export default ZoomOutTool;
