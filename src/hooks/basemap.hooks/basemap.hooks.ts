import {reactive, watch } from 'vue-demi'
import { useHandler } from '..'
import { IBasemap } from '../../plugins'

export interface IBasemapState {
  selectedKey: string
  visible: boolean
  list: {
    key: string
    select (): void
  }[]
}

export function useBasemap (basemap: IBasemap, keys: string[] = basemap.basemapKeys) : IBasemapState {
  const state : IBasemapState = reactive({
    selectedKey: basemap.selectedKey,
    visible: basemap.visible,
    list: basemap.basemapKeys.map(key => ({
      key, select () {
        basemap.selectBasemap(key)
      }
    })).filter(item => keys.includes(item.key))
  })
  watch(() => state.selectedKey, key => {
    if (key !== basemap.selectedKey) {
      basemap.selectBasemap(key)
    }
  })
  watch(() => state.visible, visible => {
    if (visible !== basemap.visible) {
      basemap.setVisible(visible)
    }
  })
  useHandler(basemap.on('change:selected-key', e => {
    state.selectedKey = e.selectedKey
  }))
  useHandler(basemap.on('change:visible', e => {
    state.visible = e.visible
  }))
  return state
}

export default useBasemap
