import IWebMapPlugin from '../web-map-plugin/web-map-plugin.interfaces'

export interface IMap extends __esri.Map {
  $owner: IWebMap
}

export interface IView extends __esri.MapView {
  $owner: IWebMap
}

export interface IWebMapOptions {
  mapOptions?: __esri.MapProperties
  viewOptions?: __esri.MapViewProperties
  debug?: boolean
  debugName?: string
  assetsPath?: string
}

export interface IWebMapEvents {
  'loaded': void
}

export interface IWebMap {
  readonly target: string | HTMLDivElement
  readonly map: IMap
  readonly view: IView
  use (plugin: IWebMapPlugin) : this
  mount () : this
}

export default IWebMap
