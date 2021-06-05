export interface IBasemapOptions {
  defaultSelectedKey?: string
  visible?: boolean
}

export interface IBasemapEvents {
  'change': { selectedKey: string, visible: boolean }
  'change:selected-key': { selectedKey: string }
  'change:visible': { visible: boolean }
}

export interface IBasemap {
  readonly selectedKey: string
  readonly visible: boolean
  readonly basemapKeys : string[]
  selectBasemap (key: string) : this
  setVisible (visible: boolean) : this
  createBasemap (key: string, layer: __esri.Layer) : this
  createBasemap (key: string, layers: __esri.Layer[]) : this
  createBasemap (layer: __esri.Layer) : string
  createBasemap (layers: __esri.Layer[]) : string
  createAndSelectBasemap (key: string, layer: __esri.Layer) : this
  createAndSelectBasemap (key: string, layers: __esri.Layer[]) : this
  createAndSelectBasemap (layer: __esri.Layer) : string
  createAndSelectBasemap (layers: __esri.Layer[]) : string
}

export default IBasemap
