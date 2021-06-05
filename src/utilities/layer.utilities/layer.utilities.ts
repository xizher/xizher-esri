import WebTileLayer from '@arcgis/core/layers/WebTileLayer'
import TileLayer from '@arcgis/core/layers/TileLayer'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import ImageryLayer from '@arcgis/core/layers/ImageryLayer'
import GroupLayer from '@arcgis/core/layers/GroupLayer'

export interface IWebTileLayerOptions extends __esri.WebTileLayerProperties {
  lyrType: 'WebTileLayer'
}

export interface ITileLayerOptions extends __esri.TileLayerProperties {
  lyrType: 'TileLayer'
}
export interface IGeoJSONLayerOptions extends __esri.GeoJSONLayerProperties {
  lyrType: 'GeoJSONLayer'
}
export interface IFeatureLayerOptions extends __esri.FeatureLayerProperties {
  lyrType: 'FeatureLayer'
}
export interface IImageryLayerOptions extends __esri.ImageryLayerProperties {
  lyrType: 'ImageryLayer'
}

export interface IGroupLayerOptions extends __esri.GroupLayerProperties {
  lyrType: 'GroupLayer'
}
export interface ILayerOptions extends __esri.LayerProperties {
  lyrType: string
}

export interface ICreateLayer {
  (options: IWebTileLayerOptions) : __esri.WebTileLayer
  (options: ITileLayerOptions) : __esri.TileLayer
  (options: IGeoJSONLayerOptions) : __esri.GeoJSONLayer
  (options: IFeatureLayerOptions) : __esri.FeatureLayer
  (options: IImageryLayerOptions) : __esri.ImageryLayer
  (options: IGroupLayerOptions) : __esri.GroupLayer
  (options: ILayerOptions) : __esri.Layer
}

export type LayerOptions = IWebTileLayerOptions | ITileLayerOptions | IGeoJSONLayerOptions | IFeatureLayerOptions | IImageryLayerOptions | IGroupLayerOptions

export const createLayer: ICreateLayer = (options: LayerOptions) : any => { // eslint-disable-line @typescript-eslint/no-explicit-any
  switch (options.lyrType) {
    case 'WebTileLayer':
      return new WebTileLayer(options)
    case 'TileLayer':
      return new TileLayer(options)
    case 'GeoJSONLayer':
      return new GeoJSONLayer(options)
    case 'FeatureLayer':
      return new FeatureLayer(options)
    case 'ImageryLayer':
      return new ImageryLayer(options)
    case 'GroupLayer':
      return new GroupLayer(options)
    // no default
  }
}

export default createLayer
