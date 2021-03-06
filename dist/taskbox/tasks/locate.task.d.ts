import BaseTask, { IBaseTaskEvent, OnDoneParams, OnExecutingParams } from '../base-task';
/** 定位工具类 */
export declare class LocateTask extends BaseTask<IBaseTaskEvent<GeolocationPosition>> {
    zoomToLocationWhenDone: boolean;
    /** 重写：工具执行过程触发事件 */
    protected onExecuting_(e: OnExecutingParams<this>): void;
    protected onDone_(e: OnDoneParams<this>): void;
}
export default BaseTask;
