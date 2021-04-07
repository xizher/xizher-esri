import WebMapPlugin from '../../web-map-plugin/web-map-plugin';
import WebMap from '../../web-map/web-map';
/** 图元样式接口 */
export interface IMapElementSymbol {
    marker?: __esri.SimpleMarkerSymbolProperties;
    line?: __esri.SimpleLineSymbolProperties;
    fill?: __esri.SimpleFillSymbolProperties;
}
/** 图元控制插件配置项 */
export interface IMapElementDisplayOptions {
    graphicsSymbol?: IMapElementSymbol;
    highlightSymbol?: IMapElementSymbol;
}
/** 图元控制插件对象 */
export declare class MapElementDisplay extends WebMapPlugin<{}> {
    /** 基础图元样式 */
    private _graphicsSymbol;
    /** 高亮图元样式 */
    private _highlightSymbol;
    /** 基础图元存储图层 */
    private _graphicsLayer;
    /** 高亮图元存储图层 */
    private _highlightLayer;
    /** 图元图层存储图层组 */
    private _groupLayer;
    private _options;
    /**
     * 构造图元控制插件对象
     * @param options 配置项
     */
    constructor(options?: IMapElementDisplayOptions);
    /** 初始化 */
    private _init;
    /** 重写：安装插件 */
    installPlugin(webMap: WebMap): this;
    /**
     * 添加基础图元
     * @param graphic 图元对象
     */
    addGraphics(graphic: __esri.Graphic): this;
    /**
     * 添加基础图元
     * @param graphics 图元对象
     */
    addGraphics(graphics: __esri.Graphic[]): this;
    /** 清理基础图元 */
    clearGraphics(): this;
    /**
     * 移除指定基础图元
     * @param graphic 图元对象
     */
    removeGraphics(graphic: __esri.Graphic): this;
    /**
     * 移除指定基础图元
     * @param graphics 图元对象
     */
    removeGraphics(graphics: __esri.Graphic[]): this;
    /**
     * 设置基础图元
     * @param graphic 图元对象
     */
    setGraphics(graphic: __esri.Graphic): this;
    /**
     * 设置基础图元
     * @param graphic 图元对象
     */
    setGraphics(graphics: __esri.Graphic[]): this;
    /**
     * 添加高亮图元
     * @param graphic 图元对象
     */
    addHighlight(graphic: __esri.Graphic): this;
    /**
     * 添加高亮图元
     * @param graphics 图元对象
     */
    addHighlight(graphics: __esri.Graphic[]): this;
    /** 清理高亮图元 */
    clearHighlight(): this;
    /**
     * 移除指定高亮图元
     * @param graphic 图元对象
     */
    removeHighlight(graphic: __esri.Graphic): this;
    /**
     * 移除指定高亮图元
     * @param graphics 图元对象
     */
    removeHighlight(graphics: __esri.Graphic[]): this;
    /**
     * 设置高亮图元
     * @param graphic 图元对象
     */
    setHighlight(graphic: __esri.Graphic): this;
    /**
     * 设置高亮图元
     * @param graphic 图元对象
     */
    setHighlight(graphics: __esri.Graphic[]): this;
    /**
     * 解析几何对象（基础）
     * @param geometry 几何对象
     * @param symbolOptions 样式
     * @returns 图元对象
     */
    parseGraphics(geometry: __esri.Geometry, symbolOptions?: __esri.SymbolProperties): __esri.Graphic | null;
    /**
     * 解析几何对象（基础）
     * @param geometries 几何对象
     * @param symbolOptions 样式
     * @returns 图元对象
     */
    parseGraphics(geometries: __esri.Geometry[], symbolOptions?: __esri.SymbolProperties): __esri.Graphic[] | null;
    /**
     * 解析几何对象（高亮）
     * @param geometry 几何对象
     * @param symbolOptions 样式
     * @returns 图元对象
     */
    parseHighlight(geometry: __esri.Geometry, symbolOptions?: __esri.SymbolProperties): __esri.Graphic | null;
    /**
     * 解析几何对象（高亮）
     * @param geometries 几何对象
     * @param symbolOptions 样式
     * @returns 图元对象
     */
    parseHighlight(geometries: __esri.Geometry[], symbolOptions?: __esri.SymbolProperties): __esri.Graphic[] | null;
}
export default MapElementDisplay;
