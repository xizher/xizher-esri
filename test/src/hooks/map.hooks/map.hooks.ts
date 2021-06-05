import { onMounted, Ref, ref } from '@vue/composition-api'
import { createGuid } from '@xizher/core/es/utils/base.utils'
import { Basemap, WebMap } from '../../esri'
import '@arcgis/core/assets/esri/themes/light/main.css'

let webMap: WebMap
const loaded = ref(false)

export function useLoaded () : Ref<boolean> {
  return loaded
}

export function useCreate () : [WebMap, string] {
  const id = createGuid()
  loaded.value = false
  webMap = new WebMap(id, {
    viewOptions: { zoom: 5 },
    debug: true
  })
    .use(new Basemap({
      customItems: [
        {
          key: '自定义底图1',
          lyrs: [
            {
              lyrType: 'WebTileLayer',
              urlTemplate: 'http://192.168.65.134:6080/arcgis/rest/services/GLC30/WorldLand/MapServer/tile/{level}/{row}/{col}'
            }
          ]
        }, {
          key: '自定义底图2',
          lyrs: [
            {
              lyrType: 'TileLayer',
              url: 'http://192.168.65.134:6080/arcgis/rest/services/GLC30/WorldLand/MapServer'
            }
          ]
        }
      ]
    }))
  webMap.on('loaded', () => loaded.value = true)
  onMounted(() => webMap.mount())
  return [webMap, id]
}

function getWebMap () : WebMap {
  return webMap
}

export default getWebMap
