import { IWebMap } from '../../web-map';
import WebMapPlugin from '../../web-map-plugin';
import { ILayerOperation, ILayerOperationEvent, ILayerOperationOptions } from './layer-operations.interfaces';
export declare class LayerOperations extends WebMapPlugin<ILayerOperationEvent> implements ILayerOperation {
    private static readonly _defaultOptions;
    private _options;
    private _layerPool;
    private _groupLayer;
    constructor(options?: ILayerOperationOptions);
    private _init;
    private _initLayer;
    installPlugin(webMap: IWebMap): this;
    getLayer(name: string): null | __esri.Layer;
    setLayerOpacity(name: string, opacity: number): this;
    setLayerVisible(name: string, visible: boolean): this;
    zoomTo(name: string): this;
    zoomTo(names: string[]): this;
    zoomTo(layer: __esri.Layer): this;
    zoomTo(layers: __esri.Layer[]): this;
}
export default LayerOperations;
