import LayerOperations from '../layer-operation';
export interface ILayerTreeOptions<T> {
    layerOptionsList: T[];
    idField: keyof T;
    parentIdField: keyof T;
    levelField: keyof T;
}
export interface ITreeItem {
    children: ITreeItem[];
}
export interface ILayerTreeItem extends ITreeItem {
    id: string;
    parentId: string;
    level: number;
}
export interface ILayerTree extends LayerOperations {
    getTree(): ILayerTreeItem[];
}
