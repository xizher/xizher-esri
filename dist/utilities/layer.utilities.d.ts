import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
/** 创建Web切片图层 */
export declare function createWebTileLayer(url: string, options?: __esri.WebTileLayerProperties): WebTileLayer;
/** 创建图层组图层 */
export declare function createGroupLayer(options?: __esri.GroupLayerProperties): GroupLayer;
