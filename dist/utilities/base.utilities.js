import Collection from '@arcgis/core/core/Collection';
import Extent from '@arcgis/core/geometry/Extent';
export function createCollection(arr = []) {
    return new Collection(arr);
}
export function createExtent(pt1, pt2, spatialReference) {
    let [xmin, ymin] = pt1, [xmax, ymax] = pt2;
    xmin > xmax && ([xmin, xmax] = [xmax, xmin]);
    ymin > ymax && ([ymin, ymax] = [ymax, ymin]);
    return new Extent({
        xmin, ymin, xmax, ymax, spatialReference,
    });
}
