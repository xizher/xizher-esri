import IWebMap from '../web-map/web-map.interfaces'

export interface IWebMapPlugin {
  readonly pluginName: string
  installPlugin (webMap: IWebMap) : this
}

export default IWebMapPlugin
