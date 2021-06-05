import { $extend, createGuid } from '@xizher/core/es/utils/base.utils'
import WebMapPlugin from '../../web-map-plugin'
import IBasemap, { IBasemapEvents, IBasemapOptions } from './basemap.interface'
import Collection from '@arcgis/core/core/Collection'
import { IWebMap } from '../../web-map'
import createLayer from '../../utilities/layer.utilities'

const TIAN_DI_TU_KEY = 'd524142425d379adcf285daba823e28a'

export class Basemap extends WebMapPlugin<IBasemapEvents> implements IBasemap {

  //#region 私有静态属性

  private static readonly _tdt3857: { [key: string]: string } = {
    '影像底图': `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
    '影像注记': `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
    '矢量底图': `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
    '矢量注记': `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
    '地形底图': `http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
    '地形注记': `http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
  }

  private static readonly _tdt4326: { [key: string]: string } = {
    '影像底图': `http://t0.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
    '影像注记': `http://t0.tianditu.gov.cn/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
    '矢量底图': `http://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
    '矢量注记': `http://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
    '地形底图': `http://t0.tianditu.gov.cn/ter_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
    '地形注记': `http://t0.tianditu.gov.cn/cta_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${TIAN_DI_TU_KEY}`,
  }

  private static readonly _geoQ: { [key: string]: string } = {
    '彩色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{level}/{row}/{col}',
    '灰色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{level}/{row}/{col}',
    '蓝黑色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{level}/{row}/{col}',
    '暖色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{level}/{row}/{col}',
  }

  private static readonly _defaultOptions: IBasemapOptions = {
    defaultSelectedKey: '天地图矢量3857',
    visible: true,
  }

  //#endregion

  private _basemapItemPool: Map<string, __esri.Collection<__esri.Layer>>

  private _selectedKey: string

  private _visible: boolean

  private _options: IBasemapOptions

  public get selectedKey () : string {
    return this._selectedKey
  }

  public get visible () : boolean {
    return this._visible
  }

  public get basemapKeys () : string[] {
    return [...this._basemapItemPool.keys()]
  }

  constructor (options: IBasemapOptions) {
    super('basemap')
    this._options = Basemap._defaultOptions
    $extend(true, this._options, options)
    this._selectedKey = this._options.defaultSelectedKey
    this._visible = this._options.visible
    this._basemapItemPool = new Map()
  }

  private _init () : this {
    return this
      ._initGeoQ()
      ._initTdt()
  }

  private _initGeoQ () : this {
    Object.entries(Basemap._geoQ).forEach(
      ([key, urlTemplate]) => this._basemapItemPool.set(
        key, new Collection([createLayer({
          urlTemplate,
          lyrType: 'WebTileLayer',
        })])
      )
    )
    return this
  }

  private _initTdt () : this {
    const createTianDiTuItem = (name: string, proj: string) => {
      this.createBasemap(
        `天地图${name}${proj}`,
        createLayer({ lyrType: 'WebTileLayer', urlTemplate: Basemap[`_TianDiTu${proj}Urls`][`${name}底图`] })
      )
      this.createBasemap(`天地图${name}含注记${proj}`, [
        createLayer({ lyrType: 'WebTileLayer', urlTemplate: Basemap[`_TianDiTu${proj}Urls`][`${name}底图`] }),
        createLayer({ lyrType: 'WebTileLayer', urlTemplate: Basemap[`_TianDiTu${proj}Urls`][`${name}注记`] }),
      ])
      return createTianDiTuItem
    }
    createTianDiTuItem('影像', '4326')('矢量', '4326')('地形', '4326')('影像', '3857')('矢量', '3857')('地形', '3857')
    return this
  }

  public installPlugin (webMap: IWebMap) : this {
    super.installPlugin(webMap)
    return this._init()
  }

  public createBasemap (key: string, layer: __esri.Layer) : this
  public createBasemap (key: string, layers: __esri.Layer[]) : this
  public createBasemap (layer: __esri.Layer) : string
  public createBasemap (layers: __esri.Layer[]) : string
  public createBasemap (...args :
  [key: string, layer: __esri.Layer] |
  [key: string, layers: __esri.Layer[]] |
  [layer: __esri.Layer] |
  [layers: __esri.Layer[]]
  ) : string | this {
    let key: string
    switch (args.length) {
      case 1:
        key = createGuid()
        this._basemapItemPool.set(
          key,
          new Collection(
            Array.isArray(args[0])
              ? args[0]
              : [args[0]]
          )
        )
        return key
      case 2:
        this._basemapItemPool.set(
          args[0],
          new Collection(
            Array.isArray(args[1])
              ? args[1]
              : [args[1]]
          )
        )
        return this
      // no default
    }
  }

  public createAndSelectBasemap (key: string, layer: __esri.Layer) : this
  public createAndSelectBasemap (key: string, layers: __esri.Layer[]) : this
  public createAndSelectBasemap (layer: __esri.Layer) : string
  public createAndSelectBasemap (layers: __esri.Layer[]) : string
  public createAndSelectBasemap (...args :
  [key: string, layer: __esri.Layer] |
  [key: string, layers: __esri.Layer[]] |
  [layer: __esri.Layer] |
  [layers: __esri.Layer[]]
  ) : string | this {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ret = this.createBasemap(...args)
    if (typeof ret === 'string') {
      return this.selectBasemap(ret)
    }
    return this
  }

  public selectBasemap (key: string) : this {
    if (this._basemapItemPool.has(key)) {
      this.map_.basemap.baseLayers = this._basemapItemPool.get(key)
      this._selectedKey = key
      this.fire('change:selected-key', { selectedKey: key })
      this.fire('change', { selectedKey: key, visible: this._visible })
      return this
    }
    console.warn(`当前key值【${key}】无对应底图项`)
    return this
  }

  public setVisible (visible: boolean) : this {
    [...this._basemapItemPool.values()].forEach(
      item => item.forEach(lyr => lyr.visible = visible)
    )
    this._visible = visible
    this.fire('change:visible', { visible })
    this.fire('change', { visible, selectedKey: this._selectedKey })
    return this
  }

}

export default Basemap
