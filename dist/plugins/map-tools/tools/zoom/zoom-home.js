import BaseTool from '../../base-tool';
/** 返回初始位置工具对象 */
export class ZoomHomeTool extends BaseTool {
    //#endregion
    //#region 构造函数
    /**
     * 构造返回初始位置工具对象
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(map, view) {
        super(map, view, true);
        view.when(() => this._homeExtent = view.extent);
    }
    //#endregion
    //#region 保护方法
    /** 重写：工具激活处理事件 */
    onToolActived_(e) {
        if (!super.onToolActived_(e)) {
            return false;
        }
        if (!this._homeExtent) {
            console.warn('home extent is null');
        }
        this.view_.goTo(this._homeExtent);
        return true;
    }
    //#endregion
    //#region 公有方法
    /** 设置起始位置范围 */
    setHomeExtent(extent) {
        this._homeExtent = extent;
        return this;
    }
}
export default ZoomHomeTool;
