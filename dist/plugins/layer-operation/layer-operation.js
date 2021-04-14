import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { baseUtils } from '@xizher/js-utils';
import WebMapPlugin from '../../web-map-plugin/web-map-plugin';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import WMSLayer from '@arcgis/core/layers/WMSLayer';
import OGCFeatureLayer from '@arcgis/core/layers/OGCFeatureLayer';
import KMLLayer from '@arcgis/core/layers/KMLLayer';
import CSVLayer from '@arcgis/core/layers/CSVLayer';
/** 图层控制插件类 */
export class LayerOperation extends WebMapPlugin {
    //#endregion
    //#region 构造函数
    /**
     * 构造图层控制插件对象
     * @param options 配置项
     */
    constructor(options = {}) {
        super('layerOperation');
        //#region 私有属性
        /** 配置项 */
        this._options = {
            layerItems: []
        };
        /** 图层池 */
        this._layerPool = new Map();
        baseUtils.$extend(true, this._options, options);
    }
    //#endregion
    //#region 私有方法
    /** 初始化 */
    _init() {
        this._groupLayer = new GroupLayer();
        this.map_.add(this._groupLayer);
        return this._initLayer();
    }
    /** 初始化图层 */
    _initLayer() {
        this._options.layerItems.forEach(item => {
            let layer;
            switch (item.type) {
                case 'geojson':
                    layer = this._initGeoJSONLayer(item);
                    break;
                case 'wms':
                    layer = this._initWmsLayer(item);
                    break;
                case 'wfs':
                    layer = this._initWfsLayer(item); // no support
                    break;
                case 'kml':
                    layer = this._initKmlLayer(item);
                    break;
                case 'csv':
                    layer = this._initCsvLayer(item); // no support
                    break;
                default:
                    break;
            }
            if (!layer) {
                return;
            }
            this._groupLayer.add(layer);
            this._layerPool.set(item.name, [layer, item]);
            layer.watch('visible', visible => {
                this.fire('change:visible', {
                    visible,
                    layer,
                    layerName: item.name
                });
            });
            layer.watch('opacity', opacity => {
                this.fire('change:opacity', {
                    opacity,
                    layer,
                    layerName: item.name
                });
            });
        });
        return this;
    }
    /** 初始化GeoJSON图层 */
    _initGeoJSONLayer(layerItemOptions) {
        const layer = new GeoJSONLayer(layerItemOptions.options);
        return layer;
    }
    /** 初始化WMS图层 */
    _initWmsLayer(layerItemOptions) {
        const layer = new WMSLayer(layerItemOptions.options);
        return layer;
    }
    /** 初始化WFS图层 */
    _initWfsLayer(layerItemOptions) {
        const layer = new OGCFeatureLayer(layerItemOptions.options);
        return layer;
    }
    /** 初始化KML图层 */
    _initKmlLayer(layerItemOptions) {
        const layer = new KMLLayer(layerItemOptions.options);
        return layer;
    }
    /** 初始化CSV图层 */
    _initCsvLayer(layerItemOptions) {
        const layer = new CSVLayer(layerItemOptions.options);
        return layer;
    }
    //#endregion
    //#region 公有方法
    /** 重写：插件安装 */
    installPlugin(webMap) {
        super.installPlugin(webMap);
        return this._init();
    }
    /**
     * 通过图层名获取图层对象
     * @param name 图层名
     * @returns 图层对象
     */
    getLayerByName(name) {
        const [layer] = this._layerPool.get(name);
        return layer;
    }
    /**
     * 设置图层可见性
     * @param arg0 图层名或图层可见性
     * @param visible 可见性
     */
    setLayerVisible(arg0, visible) {
        const layer = typeof arg0 === 'string'
            ? this.getLayerByName(arg0)
            : arg0;
        layer.visible = visible;
        return this;
    }
    /**
     * 设置图层透明度
     * @param arg0 图层名或图层对象
     * @param opacity 不可透明度
     */
    setLayerOpacity(arg0, opacity) {
        const layer = typeof arg0 === 'string'
            ? this.getLayerByName(arg0)
            : arg0;
        layer.opacity = opacity;
        return this;
    }
    /**
     * 缩放至图层
     * @param name 图层名或图层对象
     */
    zoomTo(arg0) {
        if (typeof arg0 === 'string') {
            const layer = this.getLayerByName(arg0);
            this.view_.goTo(layer.fullExtent);
            return this;
        }
        if (Array.isArray(arg0)) {
            let extent;
            arg0.forEach(item => {
                if (typeof arg0 === 'string') {
                    const layer = this.getLayerByName(item);
                    if (extent) {
                        extent.union(layer.fullExtent);
                    }
                    else {
                        extent = layer.fullExtent;
                    }
                }
                else {
                    if (extent) {
                        extent.union(item.fullExtent);
                    }
                    else {
                        extent = item.fullExtent;
                    }
                }
            });
            console.log(arg0, extent);
            extent && this.view_.goTo(extent);
            return this;
        }
        this.view_.goTo(arg0.fullExtent);
        return this;
    }
}
export default LayerOperation;
