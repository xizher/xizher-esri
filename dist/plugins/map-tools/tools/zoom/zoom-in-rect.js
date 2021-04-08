import DrawTool from '../draw/draw-tool';
/** 拉框放大工具类 */
export class ZoomInRectTool extends DrawTool {
    //#region 构造函数
    /**
     * 构造拉框放大工具类
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(map, view) {
        super(map, view, { drawType: 'rectangle' });
        this.cursorType_ = 'zoomin';
        this.setDrawingStyle({
            fill: {
                color: [0, 0, 0, .5],
                outline: { color: [0, 0, 0, .3], width: 4 }
            }
        });
    }
    //#endregion
    //#region 保护方法
    /** 重写绘制完成处理事件 */
    onDrawEnd_(e) {
        const graphic = super.onDrawEnd_(e);
        if (!graphic) {
            return false;
        }
        this.clearDrawed();
        this.view_.goTo(graphic);
        return graphic;
    }
}
export default ZoomInRectTool;
