import { reactive, watch } from 'vue-demi';
import { useHandler } from '..';
export function useBasemap(basemap, keys = basemap.basemapKeys) {
    const state = reactive({
        selectedKey: basemap.selectedKey,
        visible: basemap.visible,
        list: basemap.basemapKeys.map(key => ({
            key, select() {
                basemap.selectBasemap(key);
            }
        })).filter(item => keys.includes(item.key))
    });
    watch(() => state.selectedKey, key => {
        if (key !== basemap.selectedKey) {
            basemap.selectBasemap(key);
        }
    });
    watch(() => state.visible, visible => {
        if (visible !== basemap.visible) {
            basemap.setVisible(visible);
        }
    });
    useHandler(basemap.on('change:selected-key', e => {
        state.selectedKey = e.selectedKey;
    }));
    useHandler(basemap.on('change:visible', e => {
        state.visible = e.visible;
    }));
    return state;
}
export default useBasemap;
