import Collection from '@arcgis/core/core/Collection'

export function createCollection<T> (arr: T[] = []) : Collection {
  return new Collection(arr)
}
