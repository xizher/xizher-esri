import BaseTool from '../../base-tool';
import Draw from '@arcgis/core/views/draw/Draw';
import Point from '@arcgis/core/geometry/Point';
import Polyline from '@arcgis/core/geometry/Polyline';
import { baseUtils } from '@xizher/js-utils';
/** 绘图工具类 */
export class DrawTool extends BaseTool {
    //#endregion
    //#region 构造函数
    /**
     * 构造绘图工具对象
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(map, view, options) {
        super(map, view);
        this._graphics = new Set();
        /** 绘制时样式 */
        this._drawingStyle = {
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
        };
        /** 绘制完成样式 */
        this._drawedStyle = {
            marker: {},
            line: {},
            fill: {},
        };
        this._draw = new Draw({ view });
        this._drawType = options.drawType;
        this._onlyOneGraphic = !!options.onlyOneGraphic;
        this.on('draw-start', e => this.onDrawStart_(e));
        this.on('draw-move', e => this.onDrawMove_(e));
        this.on('draw-end', e => this.onDrawEnd_(e));
    }
    //#endregion
    //#region 私有方法
    /** 初始化任务 */
    _initAction() {
        this._action?.destroy();
        switch (this._drawType) {
            case 'point':
                return this._initPointAction();
            case 'polyline':
                return this._initPolylineAction();
            default:
                break;
        }
        return this;
    }
    /** 初始化点绘制任务 */
    _initPointAction() {
        this._action = this._draw.create('point');
        this._action.on('draw-complete', e => {
            const [x, y] = e.coordinates;
            this.fire('draw-start', { x, y });
            const geometry = new Point({
                x, y, spatialReference: this.view_.spatialReference
            });
            this.fire('draw-end', { geometry });
        });
        return this;
    }
    /** 初始化线绘制任务 */
    _initPolylineAction() {
        this._action = this._draw.create('polyline');
        this._action.on(['vertex-add', 'cursor-update', 'vertex-remove'], e => {
            const paths = e.vertices;
            const geometry = new Polyline({
                paths, spatialReference: this.view_.spatialReference
            });
            if (paths.length === 1) {
                e.type === 'vertex-add' && this.fire('draw-start', { x: paths[0][0], y: paths[0][1] });
                return;
            }
            this.fire('draw-move', { geometry });
        });
        this._action.on('draw-complete', e => {
            const paths = e.vertices;
            const geometry = new Polyline({
                paths, spatialReference: this.view_.spatialReference
            });
            this.fire('draw-end', { geometry });
        });
        return this;
    }
    //#endregion
    //#region 保护方法
    /** 重写：工具激活处理事件 */
    onToolActived_(e) {
        if (!super.onToolActived_(e)) {
            return false;
        }
        const { mapElementDisplay, mapTools } = this.map_.$owner;
        if (!mapElementDisplay) {
            console.warn('绘图工具需要WebMap类实例挂载MapElementDisplay插件类实例');
            mapTools.setMapTool('default');
        }
        else {
            this._initAction();
        }
        return true;
    }
    /** 重写：工具失活处理事件 */
    onToolDeActived_(e) {
        if (!super.onToolDeActived_(e)) {
            return false;
        }
        this._action.destroy();
        this._draw.destroy();
        return true;
    }
    /** 工具绘制开始处理事件 */
    onDrawStart_(e) {
        if (!this.actived) {
            return false;
        }
        const { x, y } = e;
        return new Point({ x, y, spatialReference: this.view_.spatialReference });
    }
    /** 工具绘制过程处理事件 */
    onDrawMove_(e) {
        if (!this.actived) {
            return false;
        }
        const { mapElementDisplay } = this.map_.$owner;
        if (!mapElementDisplay) {
            return;
        }
        this._tempGraphic && mapElementDisplay.removeGraphics(this._tempGraphic);
        this._tempGraphic = mapElementDisplay.parseGraphics(e.geometry, this._drawingStyle.line);
        mapElementDisplay.addGraphics(this._tempGraphic);
        return this._tempGraphic;
    }
    /** 工具绘制完成处理事件 */
    onDrawEnd_(e) {
        if (!this.actived) {
            return false;
        }
        const { mapElementDisplay } = this.map_.$owner;
        if (!mapElementDisplay) {
            return;
        }
        this._tempGraphic && mapElementDisplay.removeGraphics(this._tempGraphic);
        const graphic = mapElementDisplay.parseGraphics(e.geometry, this._drawedStyle.marker);
        if (this._onlyOneGraphic) {
            mapElementDisplay.setGraphics(graphic);
            this._graphics.clear();
        }
        else {
            mapElementDisplay.addGraphics(graphic);
        }
        this._graphics.add(graphic);
        this._initAction();
        return graphic;
    }
    //#endregion
    //#region 公有方法
    /** 清理绘制过的图元 */
    clearDrawed() {
        const { mapElementDisplay } = this.map_.$owner;
        if (!mapElementDisplay) {
            return this;
        }
        mapElementDisplay.removeGraphics([...this._graphics]);
        this._graphics.clear();
        return this;
    }
    /** 设置绘制完成图元样式 */
    setDrawedStyle(style) {
        baseUtils.$extend(true, this._drawedStyle, style);
        return this;
    }
    /** 设置绘制时图元样式 */
    setDrawingStyle(style) {
        baseUtils.$extend(true, this._drawingStyle, style);
        return this;
    }
}
export default DrawTool;
