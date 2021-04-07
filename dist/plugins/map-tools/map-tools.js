import WebMapPlugin from '../../web-map-plugin/web-map-plugin';
import BaseTool from './base-tool';
import ZoomInTool from './tools/zoom/zoom-in';
import ZoomOutTool from './tools/zoom/zoom-out';
import ZoomHomeTool from './tools/zoom/zoom-home';
import DrawTool from './tools/draw/draw-tool';
/** 地图工具链 */
export class MapTools extends WebMapPlugin {
    //#endregion
    //#region 构造函数
    /** 构造地图工具链对象 */
    constructor() {
        super('mapTools');
        //#region 私有方法
        /** 工具池 */
        this._toolPool = new Map();
        /** 当前激活工具的Key */
        this._activedKey = 'default';
    }
    //#endregion
    //#region getter
    get activedKey() {
        return this._activedKey;
    }
    //#endregion
    //#region 私有方法
    /** 初始化 */
    _init() {
        this._toolPool
            .set('default', new BaseTool(this.map_, this.view_))
            .set('zoom-in', new ZoomInTool(this.map_, this.view_))
            .set('zoom-out', new ZoomOutTool(this.map_, this.view_))
            .set('zoom-home', new ZoomHomeTool(this.map_, this.view_))
            .set('draw-point', new DrawTool(this.map_, this.view_, { drawType: 'point' }))
            .set('draw-polyline', new DrawTool(this.map_, this.view_, { drawType: 'polyline' }));
    }
    //#endregion
    //#region 公有方法
    /** 重写：插件安装方法 */
    installPlugin(webMap) {
        super.installPlugin(webMap);
        this._init();
        return this;
    }
    /**
     * 设置工具
     * @param toolKey 工具Key
     */
    setMapTool(toolKey) {
        if (!this._toolPool.has(toolKey)) {
            return this;
        }
        const tool = this._toolPool.get(toolKey);
        if (tool.isOnceTool) {
            this.fire('change', {
                previousKey: this._activedKey,
                currentKey: this._activedKey,
                executeKey: toolKey,
                isOnceTool: true
            });
            tool.active();
            return this;
        }
        [...this._toolPool.values()].map(t => {
            if (t !== tool) {
                t.deactive();
            }
        });
        this.fire('change', {
            previousKey: this._activedKey,
            currentKey: toolKey,
            executeKey: toolKey,
            isOnceTool: false
        });
        this._activedKey = toolKey;
        tool.active();
        return this;
    }
    /**
     * 创建自定义工具
     * @param key 工具Key
     * @param tool 工具对象
     */
    createCustomTool(key, tool) {
        this._toolPool.set(key, tool);
        return this;
    }
    /**
     * 检查是否存在工具
     * @param key 工具Key
     */
    hasTool(key) {
        return this._toolPool.has(key);
    }
    /**
     * 移除工具
     * @param key 工具Key
     */
    deleteTool(key) {
        this._toolPool.has(key) && this._toolPool.delete(key);
        if (this._activedKey === key) {
            this.setMapTool('default');
        }
        return this;
    }
    /**
     * 获取工具
     * @param key 工具Key
     */
    getTool(key) {
        if (!this._toolPool.has(key)) {
            return null;
        }
        return this._toolPool.get(key);
    }
}
export default MapTools;
