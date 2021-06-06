import LayerOperations from '../layer-operation'
import { ILayerTree, ILayerTreeItem } from './layer-tree.interfaces'

export class LayerTree<T> extends LayerOperations implements ILayerTree {

  //#region 静态私有方法

  private static _listToTree <T extends ILayerTreeItem> (list: T[]) : ILayerTreeItem[] {
    const map = {}
    let node, i
    const roots = []
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i
      list[i].children = []
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i]
      if (node.parentId !== '0') {
        list[map[node.parentId]].children.push(node)
      } else {
        roots.push(node)
      }
    }
    return roots
  }

  private static _parseListFiled <T, K extends T> (list: T[], parseOptions: { [key: string] : string }) : K[] {
    return list.map(item => {
      const newItem = { ...item }
      Object.entries(parseOptions).forEach(([sourceField, targetField]) => {
        newItem[targetField] = newItem[sourceField]
      })
      return newItem
    }) as K[]
  }

  //#endregion

  constructor (layerItems: T[]) {
    super()
  }

  public getTree () : ILayerTreeItem[] {
    return []
  }

}

export default LayerTree
