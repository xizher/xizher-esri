import WebTileLayer from '@arcgis/core/layers/WebTileLayer'
import GroupLayer from '@arcgis/core/layers/GroupLayer'

/** 创建Web切片图层 */
export function createWebTileLayer (url: string, options: __esri.WebTileLayerProperties = {}) : WebTileLayer {
  return new WebTileLayer({
    urlTemplate: url,
    ...options
  })
}

/** 创建图层组图层 */
export function createGroupLayer (options: __esri.GroupLayerProperties = {}) : GroupLayer {
  return new GroupLayer(options)
}
