import Collection from '@arcgis/core/core/Collection'
import Extent from '@arcgis/core/geometry/Extent'

export function createCollection<T> (arr: T[] = []) : Collection {
  return new Collection(arr)
}

export function createExtent (pt1: [number, number], pt2: [number, number], spatialReference: __esri.SpatialReference): Extent {
  let [xmin, ymin] = pt1, [xmax, ymax] = pt2
  xmin > xmax && ([xmin, xmax] = [xmax, xmin])
  ymin > ymax && ([ymin, ymax] = [ymax, ymin])
  return new Extent({
    xmin, ymin, xmax, ymax, spatialReference,
  })
}
