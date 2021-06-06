import LayerOperations from '../layer-operation';
export class LayerTree extends LayerOperations {
    //#region 静态私有方法
    static _listToTree(list) {
        const map = {};
        let node, i;
        const roots = [];
        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i;
            list[i].children = [];
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.parentId !== '0') {
                list[map[node.parentId]].children.push(node);
            }
            else {
                roots.push(node);
            }
        }
        return roots;
    }
    static _parseListFiled(list, parseOptions) {
        return list.map(item => {
            const newItem = { ...item };
            Object.entries(parseOptions).forEach(([sourceField, targetField]) => {
                newItem[targetField] = newItem[sourceField];
            });
            return newItem;
        });
    }
    //#endregion
    constructor(layerItems) {
        super();
    }
    getTree() {
        return [];
    }
}
export default LayerTree;
