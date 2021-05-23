import Evented, { ICallbackParams } from '@xizher/core/es/evented';
import WebMap from '../web-map/web-map';
export declare type OnResetParams<T> = ICallbackParams<'reset', T>;
export declare type OnDoneParams<T> = ICallbackParams<'done', T>;
export declare type OnExecutingParams<T> = ICallbackParams<'executing', T>;
export interface IBaseTaskEvent<T> {
    'reset': void;
    'done': {
        success: true;
        result: T;
    } | {
        success: false;
        error: unknown;
    };
    'executing': void;
}
/** 基础工具类 */
export declare class BaseTask<T extends IBaseTaskEvent<unknown>> extends Evented<T & IBaseTaskEvent<unknown>> {
    /** WebMap对象 */
    protected webMap_: WebMap;
    /**
     * 初始化基础工具类
     * @param webMap WebMap对象
     */
    constructor(webMap: WebMap);
    /** 工具重置触发事件 */
    protected onReset_(e: OnResetParams<this>): void;
    /** 工具执行完成触发事件 */
    protected onDone_(e: OnDoneParams<this>): void;
    /** 工具执行过程触发事件 */
    protected onExecuting_(e: OnExecutingParams<this>): void;
    reset(): void;
    execute(): void;
}
export default BaseTask;
