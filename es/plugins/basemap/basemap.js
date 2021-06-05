import { $extend, createGuid } from '@xizher/core/es/utils/base.utils';
import WebMapPlugin from '../../web-map-plugin';
import Collection from '@arcgis/core/core/Collection';
import createLayer from '../../utilities/layer.utilities';
const TIAN_DI_TU_KEY = 'd524142425d379adcf285daba823e28a';
export class Basemap extends WebMapPlugin {
    //#region 私有静态属性
    static _tdt3857 = {
        '影像底图': `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
        '影像注记': `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
        '矢量底图': `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
        '矢量注记': `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
        '地形底图': `http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
        '地形注记': `http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
    };
    static _tdt4326 = {
        '影像底图': `http://t0.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
        '影像注记': `http://t0.tianditu.gov.cn/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
        '矢量底图': `http://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
        '矢量注记': `http://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
        '地形底图': `http://t0.tianditu.gov.cn/ter_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
        '地形注记': `http://t0.tianditu.gov.cn/cta_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
    };
    static _geoQ = {
        '彩色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{level}/{row}/{col}',
        '灰色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{level}/{row}/{col}',
        '蓝黑色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{level}/{row}/{col}',
        '暖色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{level}/{row}/{col}',
    };
    static _defaultOptions = {
        defaultSelectedKey: '天地图矢量3857',
        visible: true,
    };
    //#endregion
    _basemapItemPool;
    _selectedKey;
    _visible;
    _options;
    get selectedKey() {
        return this._selectedKey;
    }
    get visible() {
        return this._visible;
    }
    get basemapKeys() {
        return [...this._basemapItemPool.keys()];
    }
    constructor(options) {
        super('basemap');
        this._options = Basemap._defaultOptions;
        $extend(true, this._options, options);
        this._selectedKey = this._options.defaultSelectedKey;
        this._visible = this._options.visible;
        this._basemapItemPool = new Map();
    }
    _init() {
        return this
            ._initGeoQ()
            ._initTdt();
    }
    _initGeoQ() {
        Object.entries(Basemap._geoQ).forEach(([key, urlTemplate]) => this._basemapItemPool.set(key, new Collection([createLayer({
                urlTemplate,
                lyrType: 'WebTileLayer',
            })])));
        return this;
    }
    _initTdt() {
        const createTianDiTuItem = (name, proj) => {
            this.createBasemap(`天地图${name}${proj}`, createLayer({ lyrType: 'WebTileLayer', urlTemplate: Basemap[`_TianDiTu${proj}Urls`][`${name}底图`] }));
            this.createBasemap(`天地图${name}含注记${proj}`, [
                createLayer({ lyrType: 'WebTileLayer', urlTemplate: Basemap[`_TianDiTu${proj}Urls`][`${name}底图`] }),
                createLayer({ lyrType: 'WebTileLayer', urlTemplate: Basemap[`_TianDiTu${proj}Urls`][`${name}注记`] }),
            ]);
            return createTianDiTuItem;
        };
        createTianDiTuItem('影像', '4326')('矢量', '4326')('地形', '4326')('影像', '3857')('矢量', '3857')('地形', '3857');
        return this;
    }
    installPlugin(webMap) {
        super.installPlugin(webMap);
        return this._init();
    }
    createBasemap(...args) {
        let key;
        switch (args.length) {
            case 1:
                key = createGuid();
                this._basemapItemPool.set(key, new Collection(Array.isArray(args[0])
                    ? args[0]
                    : [args[0]]));
                return key;
            case 2:
                this._basemapItemPool.set(args[0], new Collection(Array.isArray(args[1])
                    ? args[1]
                    : [args[1]]));
                return this;
            // no default
        }
    }
    createAndSelectBasemap(...args) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const ret = this.createBasemap(...args);
        if (typeof ret === 'string') {
            return this.selectBasemap(ret);
        }
        return this;
    }
    selectBasemap(key) {
        if (this._basemapItemPool.has(key)) {
            this.map_.basemap.baseLayers = this._basemapItemPool.get(key);
            this._selectedKey = key;
            this.fire('change:selected-key', { selectedKey: key });
            this.fire('change', { selectedKey: key, visible: this._visible });
            return this;
        }
        console.warn(`当前key值【${key}】无对应底图项`);
        return this;
    }
    setVisible(visible) {
        [...this._basemapItemPool.values()].forEach(item => item.forEach(lyr => lyr.visible = visible));
        this._visible = visible;
        this.fire('change:visible', { visible });
        this.fire('change', { visible, selectedKey: this._selectedKey });
        return this;
    }
}
export default Basemap;
