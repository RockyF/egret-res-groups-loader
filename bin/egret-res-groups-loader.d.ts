/**
 * Created by rockyl on 2017/1/22.
 *
 * egret-res-groups-loader
 */
declare module alien {
    class ResGroupsLoader {
        private _progressCallback;
        private _total;
        private _loaded;
        checkNeedLoad(resGroupNames: string[]): boolean;
        loadResGroups(resGroupNames: string[], progressCallback?: Function): Promise<any>;
        loadResGroup(resGroupName: string): Promise<any>;
        private static _instance;
        static readonly instance: ResGroupsLoader;
    }
}
