<template>
  <div>
    <button @click="locate">定位</button>
  </div>
</template>

<script setup>
import ToolLocate from '../../../dist/taskbox/tasks/locate.task'
/** @type { import('../../../dist/web-map/web-map').WebMap */
const webMap = window.webMap
const toolLocate = new ToolLocate(webMap)
toolLocate.zoomToLocationWhenDone = true
toolLocate.on('done', e => {
  if (e.success) {
  }
})
function locate () {
  toolLocate.execute()
}

</script>

<style scoped>

</style>
