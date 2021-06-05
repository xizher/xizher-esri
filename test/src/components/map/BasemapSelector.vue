<template>
  <div class="basemap-selector">
    <v-btn
      v-for="item in list"
      :key="item.key"
      :color="item.key === selectedKey ? 'primary' : 'default'"
      elevation="2"
      small
      @click="item.select()"
    >
      {{ item.key }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from '@vue/composition-api'
import getWebMap from '~/hooks/map.hooks'
import useBasemap from '../../esri/hooks/basemap.hooks'
export default defineComponent({
  setup () {
    const webMap = getWebMap()
    const state = useBasemap(webMap.basemap, [
      '自定义底图1', '自定义底图2', '天地图矢量3857'
    ])
    return {
      ...toRefs(state)
    }
  }
})

</script>

<style lang="scss" scoped>
.basemap-selector {
  bottom: 16px;
  right: 16px;
}
</style>
