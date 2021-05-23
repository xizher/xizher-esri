import BaseTask, { IBaseTaskEvent, OnDoneParams, OnExecutingParams } from '../base-task'

/** 定位工具类 */
export class LocateTask extends BaseTask<IBaseTaskEvent<GeolocationPosition>> {

  //#region 私有属性



  //#endregion

  //#region 公有属性

  public zoomToLocationWhenDone = false

  //#endregion

  //#region 保护方法

  /** 重写：工具执行过程触发事件 */
  protected onExecuting_ (e: OnExecutingParams<this>) : void {
    super.onExecuting_(e)
    navigator.geolocation.getCurrentPosition(
      evt => {
        if (this.zoomToLocationWhenDone) {
          const { longitude, latitude } = evt.coords
          this.webMap_.view.goTo({
            center: [longitude, latitude]
          })
        }
        this.fire('done', {
          success: true,
          result: evt
        })
      },
      evt => {
        this.fire('done', {
          success: false,
          error: evt
        })
      }, { enableHighAccuracy: true }
    )
  }

  protected onDone_ (e: OnDoneParams<this>) : void {
    super.onDone_(e)
    // console
  }

  //#endregion

}

export default BaseTask
