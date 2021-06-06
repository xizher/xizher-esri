import LayerOperations from '../layer-operation'

export interface ILayerTreeOptions<T> {
  layerOptionsList: T[]
  idField: keyof T
  parentIdField: keyof T
  levelField: keyof T
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface ITreeItem {
  children: ITreeItem[]
}

export interface ILayerTreeItem extends ITreeItem {
  id: string
  parentId: string
  level: number
}


export interface ILayerTree extends LayerOperations {
  getTree () : ILayerTreeItem[]
}
