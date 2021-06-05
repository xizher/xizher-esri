import { IBasemap } from '../../plugins';
export interface IBasemapState {
    selectedKey: string;
    visible: boolean;
    list: {
        key: string;
        select(): void;
    }[];
}
export declare function useBasemap(basemap: IBasemap, keys?: string[]): IBasemapState;
export default useBasemap;
