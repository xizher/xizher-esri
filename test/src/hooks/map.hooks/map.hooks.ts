import { onMounted, Ref, ref } from '@vue/composition-api'
import { createGuid } from '@xizher/core/es/utils/base.utils'
import { Basemap, LayerOperations, WebMap } from '../../esri'
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
    debug: true,
    assetsPath: './assets',
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
    .use(new LayerOperations({
      layerItem: [
        {
          name: '经度地带性分异规律',
          target: {
            lyrType: 'ImageryLayer',
            url: 'http://192.168.65.134:6080/arcgis/rest/services/GLC30/GLC30_Y2020_N48TO51_40/ImageServer'
          }
        }, {
          name: '乞力马扎罗地表覆盖',
          target: {
            lyrType: 'ImageryLayer',
            url: 'http://192.168.65.134:6080/arcgis/rest/services/GLC30/GLC30_Y2000_KILIMANJARO/ImageServer'
          }
        }, {
          name: '长三角2020年地表覆盖',
          target: {
          lyrType: 'ImageryLayer',
          url: `http://192.168.65.134:6080/arcgis/rest/services/GLC30/GLC30_Y2020_CSJ/ImageServer`,
          }
        }, {
          name: '长三角省级行政区划',
          target: {
            lyrType: 'FeatureLayer',
            url: `http://192.168.65.134:6080/arcgis/rest/services/GLC30/CSJ_BOUA/MapServer/0`,
          }
        }, {
          name: '长三角市级行政区划',
          target: {
          lyrType: 'FeatureLayer',
            url: `http://192.168.65.134:6080/arcgis/rest/services/GLC30/CSJ_BOUA/MapServer/1`,
            renderer: { type: 'simple', symbol: { type: 'simple-fill', color: [0, 0, 0, 0], outline: { color: 'white' } } }
          }
        },
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
