import { IMap, IView } from '../../../../web-map/web-map';
import DrawTool, { OnDrawEndParams, OnDrawEndReture } from '../draw/draw-tool';
/** 拉框放大工具类 */
export declare class ZoomInRectTool extends DrawTool {
    /**
     * 构造拉框放大工具类
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(map: IMap, view: IView);
    /** 重写绘制完成处理事件 */
    protected onDrawEnd_(e: OnDrawEndParams<this>): OnDrawEndReture;
}
export default ZoomInRectTool;
