import DrawTool from '../draw/draw-tool';
import Extent from '@arcgis/core/geometry/Extent';
/** 拉框缩小工具类 */
export class ZoomOutRectTool extends DrawTool {
    //#region 构造函数
    /**
     * 构造拉框缩小工具类
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(map, view) {
        super(map, view, { drawType: 'rectangle' });
        this.cursorType_ = 'zoomout';
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
        const { xmin, ymin, xmax, ymax } = graphic.geometry.extent;
        const { xmin: vXmin, ymin: vYmin, xmax: vXmax, ymax: vYmax } = this.view_.extent;
        const [gWidth, gHeight] = [xmax - xmin, ymax, ymin];
        const [vWidth, vHeight] = [vXmax - vXmin, vYmax - vYmin];
        const nWidth = vWidth ** 2 / gWidth;
        const nHeight = vHeight ** 2 / gHeight;
        const nXmin = vXmin - ((xmin - vXmin) * vWidth / gWidth);
        const nYmin = vYmin - ((ymin - vYmin) * vHeight / gHeight);
        const nXmax = nXmin + Math.abs(nWidth);
        const nYMax = nYmin + Math.abs(nHeight);
        this.view_.goTo(new Extent({
            xmin: nXmin,
            ymin: nYmin,
            xmax: nXmax,
            ymax: nYMax,
            spatialReference: this.view_.spatialReference,
        }));
        return graphic;
    }
}
export default ZoomOutRectTool;
