import { $extend } from '@xizher/core/es/utils/base.utils';
import WebMapPlugin from '../../web-map-plugin';
import { createLayer } from '../../utilities/layer.utilities';
export class LayerOperations extends WebMapPlugin {
    //#region 静态私有属性
    static _defaultOptions = {
        layerItem: []
    };
    //#endregion
    //#region 私有属性
    _options;
    _layerPool;
    _groupLayer;
    //#endregion
    //#region 构造函数
    constructor(options = {}) {
        super('layerOperation');
        this._options = LayerOperations._defaultOptions;
        $extend(true, this._options, options);
        this._layerPool = new Map();
    }
    //#endregion
    //#region 私有方法
    _init() {
        this._groupLayer = createLayer({ lyrType: 'GroupLayer' });
        this.map_.add(this._groupLayer);
        return this._initLayer();
    }
    _initLayer() {
        this._options.layerItem.forEach(item => {
            const layer = createLayer(item.target);
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
    //#endregion
    //#region 公有方法
    installPlugin(webMap) {
        return super
            .installPlugin(webMap)
            ._init();
    }
    getLayer(name) {
        if (this._layerPool.has(name)) {
            return this._layerPool.get(name)[0];
        }
        return null;
    }
    setLayerOpacity(name, opacity) {
        const layer = this.getLayer(name);
        if (layer) {
            layer.opacity = opacity;
        }
        return this;
    }
    setLayerVisible(name, visible) {
        const layer = this.getLayer(name);
        if (layer) {
            layer.visible = visible;
        }
        return this;
    }
    zoomTo(arg0) {
        const items = Array.isArray(arg0) ? arg0 : [arg0];
        let extent;
        items.forEach(item => {
            let lyr = item;
            if (typeof item === 'string') {
                const layer = this.getLayer(item);
                if (!layer) {
                    return;
                }
                lyr = layer;
            }
            if (extent) {
                extent.union(lyr.fullExtent);
            }
            else {
                extent = lyr.fullExtent;
            }
        });
        extent && this.view_.goTo(extent);
        return this;
    }
}
export default LayerOperations;
