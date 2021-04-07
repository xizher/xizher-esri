import BaseTool from '../../base-tool';
/** 比例放大工具对象 */
export class ZoomInTool extends BaseTool {
    //#region 构造函数
    /**
     * 构造比例放大工具对象
     * @param map 地图对象
     * @param view 视图对象
     */
    constructor(map, view) {
        super(map, view, true);
    }
    //#endregion
    //#region 保护方法
    /** 重写：工具激活处理事件 */
    onToolActived_(e) {
        if (!super.onToolActived_(e)) {
            return false;
        }
        const zoom = this.view_.zoom + 1;
        this.view_.goTo({ zoom });
        return true;
    }
}
export default ZoomInTool;
