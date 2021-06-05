<template>
  <div>
    <div
      :id="id"
      class="map-container"
    />
    <div
      v-if="loaded"
      class="map-components"
    >
      <BasemapSelector />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCreate, useLoaded } from '~hooks/map.hooks'
import BasemapSelector from '~cp/map/BasemapSelector.vue'
export default defineComponent({
  components: {
    BasemapSelector,
  },
  setup () {
    const [, id] = useCreate()
    const loaded = useLoaded()
    return {
      id,
      loaded,
    }
  }
})
</script>

<style lang="scss" scoped>
.map-container {
  width: 100vw;
  height: 100vh;
}
.map-components {
  > * {
    position: absolute;
  }
}
</style>
