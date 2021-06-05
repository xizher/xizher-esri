import WebTileLayer from '@arcgis/core/layers/WebTileLayer'
import TileLayer from '@arcgis/core/layers/TileLayer'

export interface IWebTileLayerOptions extends __esri.WebTileLayerProperties {
  lyrType: 'WebTileLayer'
}

export interface ITileLayerOptions extends __esri.TileLayerProperties {
  lyrType: 'TileLayer'
}

export interface ICreateLayer {
  (options: IWebTileLayerOptions) : __esri.WebTileLayer
  (options: ITileLayerOptions) : __esri.TileLayer
}

export type LayerOptions = IWebTileLayerOptions | ITileLayerOptions

export const createLayer: ICreateLayer = (options: LayerOptions) : any => { // eslint-disable-line @typescript-eslint/no-explicit-any
  switch (options.lyrType) {
    case 'WebTileLayer':
      return new WebTileLayer(options)
    case 'TileLayer':
      return new TileLayer(options)
    // no default
  }
}

export default createLayer
