import Collection from '@arcgis/core/core/Collection';
export function createCollection(arr = []) {
    return new Collection(arr);
}
