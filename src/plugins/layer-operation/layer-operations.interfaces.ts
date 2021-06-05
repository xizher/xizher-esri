import { LayerOptions } from '../../utilities/layer.utilities'
import WebMapPlugin from '../../web-map-plugin'

export type LayerType =
'GeoJSONLayer' |
'FeatureLayer' |
'WebTileLayer' |
'TileLayer' |
'ImageryLayer' |
'GroupLayer'

export interface ILayerOperationEvent {
  'change:visible': {
    visible: boolean
    layer: __esri.Layer
    layerName: string
  }
  'change:opacity': {
    opacity: number
    layer: __esri.Layer
    layerName: string
  }
}

export interface ILayerItemOptions {
  name: string
  target: LayerOptions
}

export interface ILayerOperationOptions {
  layerItem?: ILayerItemOptions[]
}

export interface ILayerOperation extends WebMapPlugin<ILayerOperationEvent> {
  getLayer (name: string) : __esri.Layer | null
  setLayerVisible (name: string, visible: boolean) : this
  setLayerOpacity (name: string, opacity: number) : this
  zoomTo (name: string) : this
  zoomTo (names: string[]) : this
  zoomTo (layer: __esri.Layer) : this
  zoomTo (layers: __esri.Layer[]) : this
}
