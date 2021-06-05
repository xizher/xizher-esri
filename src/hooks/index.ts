import { onUnmounted } from 'vue-demi'
import { IHandle } from '@xizher/core/es/observable'

export function useHandler (handler: IHandle) : void {
  onUnmounted(() => handler.remove())
}
