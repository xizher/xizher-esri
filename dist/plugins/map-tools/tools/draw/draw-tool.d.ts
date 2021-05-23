import { IMap, IView } from '../../../../web-map/web-map';
import BaseTool, { OnToolActivedParams, OnToolActivedReture, OnToolDeActivedParams, OnToolDeActivedReture } from '../../base-tool';
import Geometry from '@arcgis/core/geometry/Geometry';
import Point from '@arcgis/core/geometry/Point';
import { IMapElementSymbol } from '../../../map-element-display/map-element-display';
import Graphic from '@arcgis/core/Graphic';
import { ICallbackParams } from '@xizher/core/es/evented';
import { MapCursorType } from '../../../map-cursor/map-cursor';
export declare type DrawType = 'point' | 'multipoint' | 'polyline' | 'polygon' | 'rectangle' | 'circle' | 'ellipse';
export declare type OnDrawStartParams<T> = ICallbackParams<'draw-start', T> & {
    x: number;
    y: number;
};
export declare type OnDrawMoveParams<T> = ICallbackParams<'draw-move', T> & {
    geometry: Geometry;
};
export declare type OnDrawEndParams<T> = ICallbackParams<'draw-end', T> & {
    geometry: Geometry;
};
export declare type OnDrawStartReture = Point | false;
export declare type OnDrawMoveReture = Graphic | false;
export declare type OnDrawEndReture = Graphic | false;
export interface IDrawToolOptions {
    drawType: DrawType;
    onlyOneGraphic?: boolean;
}
/** 绘图工具类 */
export declare class DrawTool extends BaseTool<{
    'draw-start': {
        x: number;
        y: number;
    };
    'draw-move': {
        geometry: Geometry;
    };
    'draw-end': {
        geometry: Geometry;
    };
}> {
    /** 绘图对象 */
    private _draw;
    /** 绘制任务对象 */
    private _action;
    /** 绘图类型 */
    private _drawType;
    /** 绘制目标是否仅允许存在一个 */
    private _onlyOneGraphic;
    /** 绘制图元存储容器 */
    private _graphics;
    /** 绘制过程图元 */
    private _tempGraphic;
    /** 绘制时样式 */
    private _drawingStyle;
    /** 绘制完成样式 */
    private _drawedStyle;
    protected cursorType_: MapCursorType;
    /**
     * 构造绘图工具对象
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(map: IMap, view: IView, options: IDrawToolOptions);
    /** 初始化任务 */
    private _initAction;
    /** 初始化点绘制任务 */
    private _initPointAction;
    /** 初始化线绘制任务 */
    private _initPolylineAction;
    /** 初始化面绘制任务 */
    private _initPolygonAction;
    /** 初始化矩形绘制任务 */
    private _initRectangleAction;
    private _initCircleAction;
    private _matchStyle;
    /** 重写：工具激活处理事件 */
    protected onToolActived_(e: OnToolActivedParams<this>): OnToolActivedReture;
    /** 重写：工具失活处理事件 */
    protected onToolDeActived_(e: OnToolDeActivedParams<this>): OnToolDeActivedReture;
    /** 工具绘制开始处理事件 */
    protected onDrawStart_(e: OnDrawStartParams<this>): OnDrawStartReture;
    /** 工具绘制过程处理事件 */
    protected onDrawMove_(e: OnDrawMoveParams<this>): OnDrawMoveReture;
    /** 工具绘制完成处理事件 */
    protected onDrawEnd_(e: OnDrawEndParams<this>): OnDrawEndReture;
    /** 清理绘制过的图元 */
    clearDrawed(): this;
    /** 设置绘制完成图元样式 */
    setDrawedStyle(style: IMapElementSymbol): this;
    /** 设置绘制时图元样式 */
    setDrawingStyle(style: IMapElementSymbol): this;
}
export default DrawTool;
