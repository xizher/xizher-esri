import WebTileLayer from '@arcgis/core/layers/WebTileLayer'

export interface IWebTileLayerOptions extends __esri.WebTileLayerProperties {
  lyrType: 'WebTileLayer'
}

export interface ICreateLayer {
  (options: IWebTileLayerOptions) : __esri.WebTileLayer
}

export const createLayer: ICreateLayer = options => {
  switch (options.lyrType) {
    case 'WebTileLayer':
      return new WebTileLayer(options)
    // no default
  }
}

export default createLayer
