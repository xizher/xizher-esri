import { onUnmounted } from 'vue-demi';
export function useHandler(handler) {
    onUnmounted(() => handler.remove());
}
