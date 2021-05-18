import Collection from '@arcgis/core/core/Collection';
import Extent from '@arcgis/core/geometry/Extent';
export declare function createCollection<T>(arr?: T[]): Collection;
export declare function createExtent(pt1: [number, number], pt2: [number, number], spatialReference: __esri.SpatialReference): Extent;
