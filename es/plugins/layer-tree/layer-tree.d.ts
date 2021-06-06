import LayerOperations from '../layer-operation';
import { ILayerTree, ILayerTreeItem } from './layer-tree.interfaces';
export declare class LayerTree<T> extends LayerOperations implements ILayerTree {
    private static _listToTree;
    private static _parseListFiled;
    constructor(layerItems: T[]);
    getTree(): ILayerTreeItem[];
}
export default LayerTree;
