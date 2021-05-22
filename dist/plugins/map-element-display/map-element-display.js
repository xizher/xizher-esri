import { baseUtils } from '@xizher/js-utils/dist/utilities/base.utilities';
import WebMapPlugin from '../../web-map-plugin/web-map-plugin';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Graphic from '@arcgis/core/Graphic';
/** 图元控制插件对象 */
export class MapElementDisplay extends WebMapPlugin {
    //#endregion
    //#region 构造函数
    /**
     * 构造图元控制插件对象
     * @param options 配置项
     */
    constructor(options = {}) {
        super('mapElementDisplay');
        this._options = {
            graphicsSymbol: {
                marker: {
                    color: [255, 0, 0, .8],
                    style: 'circle',
                    size: '12px',
                    outline: { color: [255, 0, 0], width: 1 }
                },
                line: {
                    color: [255, 0, 0, .8],
                    width: '2px',
                    style: 'solid'
                },
                fill: {
                    color: [255, 0, 0, .4],
                    style: 'solid',
                    outline: { color: [255, 0, 0], width: 1 }
                },
            },
            highlightSymbol: {
                marker: {
                    color: [0, 255, 255, .8],
                    style: 'circle',
                    size: '12px',
                    outline: { color: [0, 255, 255], width: 1 }
                },
                line: {
                    color: [0, 255, 255, .8],
                    width: '2px',
                    style: 'solid'
                },
                fill: {
                    color: [0, 255, 255, .4],
                    style: 'solid',
                    outline: { color: [0, 255, 255], width: 1 }
                },
            }
        };
        baseUtils.$extend(true, this._options, options);
    }
    //#endregion
    //#region 私有方法
    /** 初始化 */
    _init() {
        this._graphicsSymbol = this._options.graphicsSymbol;
        this._highlightSymbol = this._options.highlightSymbol;
        this._graphicsLayer = new GraphicsLayer();
        this._highlightLayer = new GraphicsLayer();
        this._groupLayer = new GroupLayer({
            layers: [this._graphicsLayer, this._highlightLayer]
        });
        this.map_.layers.add(this._groupLayer);
        this.map_.$owner.on('loaded', () => {
            this.map_.layers.reorder(this._groupLayer, this.map_.layers.length - 1);
        });
        return this;
    }
    //#endregion
    //#region 公有方法
    /** 重写：安装插件 */
    installPlugin(webMap) {
        super.installPlugin(webMap);
        return this._init();
    }
    /**
     * 添加基础图元
     * @param arg0 图元对象
     */
    addGraphics(arg0) {
        Array.isArray(arg0)
            ? arg0.forEach(g => this._graphicsLayer.add(g))
            : this._graphicsLayer.add(arg0);
        return this;
    }
    /** 清理基础图元 */
    clearGraphics() {
        this._graphicsLayer.removeAll();
        return this;
    }
    /**
     * 移除指定基础图元
     * @param arg0 图元对象
     */
    removeGraphics(arg0) {
        Array.isArray(arg0)
            ? this._graphicsLayer.removeMany(arg0)
            : this._graphicsLayer.remove(arg0);
        return this;
    }
    /**
     * 设置基础图元
     * @param graphic 图元对象
     */
    setGraphics(arg0) {
        // eslint-disable-next-line
        //@ts-ignore
        return this.clearGraphics().addGraphics(arg0);
    }
    /**
     * 添加高亮图元
     * @param arg0 图元对象
     */
    addHighlight(arg0) {
        Array.isArray(arg0)
            ? arg0.forEach(g => this._highlightLayer.add(g))
            : this._highlightLayer.add(arg0);
        return this;
    }
    /** 清理高亮图元 */
    clearHighlight() {
        this._highlightLayer.removeAll();
        return this;
    }
    /**
     * 移除指定高亮图元
     * @param arg0 图元对象
     */
    removeHighlight(arg0) {
        Array.isArray(arg0)
            ? this._highlightLayer.removeMany(arg0)
            : this._highlightLayer.remove(arg0);
        return this;
    }
    /**
     * 设置高亮图元
     * @param graphic 图元对象
     */
    setHighlight(arg0) {
        // eslint-disable-next-line
        //@ts-ignore
        return this.clearHighlight().addHighlight(arg0);
    }
    /**
     * 解析几何对象（基础）
     * @param arg0 几何对象
     * @param symbolOptions 样式
     * @returns 图元对象
     */
    parseGraphics(arg0, symbolOptions) {
        const geometryType = Array.isArray(arg0)
            ? arg0[0]?.type
            : arg0.type;
        if (!geometryType) {
            return null;
        }
        let symbol = null;
        switch (geometryType) {
            case 'point':
            case 'multipoint':
                symbol = new SimpleMarkerSymbol(this._graphicsSymbol.marker);
                break;
            case 'polyline':
                symbol = new SimpleLineSymbol(this._graphicsSymbol.line);
                break;
            case 'polygon':
            case 'extent':
                symbol = new SimpleFillSymbol(this._graphicsSymbol.fill);
                break;
            // case 'mesh': // TODO
            //   break
            default:
                break;
        }
        baseUtils.$extend(true, symbol, symbolOptions ?? {});
        return Array.isArray(arg0)
            ? arg0.map(geometry => new Graphic({ geometry, symbol }))
            : new Graphic({ geometry: arg0, symbol });
    }
    /**
     * 解析几何对象（高亮）
     * @param arg0 几何对象
     * @param symbolOptions 样式
     * @returns 图元对象
     */
    parseHighlight(arg0, symbolOptions) {
        const geometryType = Array.isArray(arg0)
            ? arg0[0]?.type
            : arg0.type;
        if (!geometryType) {
            return null;
        }
        let symbol = null;
        switch (geometryType) {
            case 'point':
            case 'multipoint':
                symbol = new SimpleMarkerSymbol(this._highlightSymbol.marker);
                break;
            case 'polyline':
                symbol = new SimpleLineSymbol(this._highlightSymbol.line);
                break;
            case 'polygon':
            case 'extent':
                symbol = new SimpleFillSymbol(this._highlightSymbol.fill);
                break;
            // case 'mesh': // TODO
            //   break
            default:
                break;
        }
        baseUtils.$extend(true, symbol, symbolOptions ?? {});
        return Array.isArray(arg0)
            ? arg0.map(geometry => new Graphic({ geometry, symbol }))
            : new Graphic({ geometry: arg0, symbol });
    }
}
export default MapElementDisplay;
