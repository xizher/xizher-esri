<template>
<div>
  <div :id="id"></div>
  <div v-if="loaded">
    <BasemapControl />
    <BaseToolControl />
    <ToolBoxControl />
  </div>
</div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue-demi'
import {
  WebMap,
  MapCursor,
  Basemap,
  MapElementDisplay,
  MapTools,
  LayerOperation,
} from '../../dist'
import BasemapControl from './components/BasemapControl.vue'
import BaseToolControl from './components/BaseToolsControl.vue'
import ToolBoxControl from './components/ToolBoxControl.vue'
export default {
  components: {
    BasemapControl,
    BaseToolControl,
    ToolBoxControl,
  },
  name: 'test',
  setup () {
    const id = 'ol-container'
    const webMap = new WebMap(id, {
      viewOptions: {
        center: [113, 23],
        zoom: 6,
      },
      // mode: '3d',
      // assetsPath: './src/assets'
    })
      .use(new Basemap())
      .use(new MapCursor())
      .use(new MapElementDisplay())
      .use(new MapTools())
      .use(new LayerOperation({
        layerItems: [
          {
            name: '中国省级行政区划图',
            type: 'geojson',
            options: {
              url: '/sample-data/china_100000_full.json',
              renderer: {
                type: "simple",
                symbol: {
                  type: "simple-fill",
                  color: [0, 0, 0, 0],
                  outline: {
                    width: 0.5,
                    color: "black"
                  }
                }
              }
            }
          },
          {
            name: '广州区县级行政区划/wms',
            type: 'wms',
            options: {
              url: 'http://wuxizhe.fun:8080/geoserver/webgis-ol-base/wms',
              version: '1.1.1',
              sublayers: [
                { name: 'webgis-ol-base:boundary' }
              ]
            }
          },
          // {
          //   name: '广州区县级行政区划',
          //   type: 'wfs',
          //   options: {
          //     url: 'http://wuxizhe.fun:8080/geoserver/webgis-ol-base/ows',
          //     collectionId: "boundary"
          //   }
          // },
          // {
          //   name: '广佛地铁线路',
          //   type: 'kml',
          //   options: {
          //     url: 'http://wuxizhe.fun:8080/geoserver/webgis-ol-base/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webgis-ol-base:subway&outputFormat=application/vnd.google-earth.kml+xml',
          //   }
          // },
          // {
          //   name: '广佛地铁站点',
          //   type: 'kml',
          //   options: {
          //     url: 'http://wuxizhe.fun:8080/geoserver/webgis-ol-base/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webgis-ol-base:stations&outputFormat=application/vnd.google-earth.kml+xml',
          //   }
          // },
          // {
          //   name: '地震数据',
          //   type: 'csv',
          //   options: {
          //     url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv',
          //   }
          // }
        ]
      }))
    const loaded = ref(false)
    const handler = webMap.on('loaded', () => {
      window.webMap = webMap
      loaded.value = true
    })
    onMounted(() => { webMap.mount() })
    onUnmounted(() => handler.remove())
    return {
      id,
      loaded,
    }
  }
}
</script>

<style>
#ol-container {
  height: 80vh;
  width: 100vw;
}
html,
body {
  padding: 0;
  margin: 0;
}
</style>
