<template>
  <HelloWorld />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import HelloWorld from '~cp/HelloWorld.vue'
export default defineComponent({
  components: {
    HelloWorld,
  }
})

</script>

<style lang="scss" scoped>

</style>
