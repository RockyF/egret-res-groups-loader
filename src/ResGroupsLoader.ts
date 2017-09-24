/**
 * Created by rockyl on 2017/1/22.
 *
 * egret-res-groups-loader
 */

module alien{
	export class ResGroupsLoader{
		private _progressCallback:Function;
		private _total;
		private _loaded;

		checkNeedLoad(resGroupNames:string[]):boolean{
			let needLoad = false;
			for(let i = 0, li = resGroupNames.length; i < li; i++){
				if(!RES.isGroupLoaded(resGroupNames[i])){
					needLoad = true;
					break;
				}
			}

			return needLoad;
		}

		async loadResGroups(resGroupNames:string[], progressCallback:Function = null): Promise<any>{
			this._progressCallback = progressCallback;

			this._total = 0;
			this._loaded = 0;
			for(let i = 0, li = resGroupNames.length; i < li; i++){
				if(!RES.isGroupLoaded(resGroupNames[i])){
					this._total += RES.getGroupByName(resGroupNames[i]).length;
					break;
				}
			}

			for(let i = 0, li = resGroupNames.length; i < li; i++){
				if(!RES.isGroupLoaded(resGroupNames[i])){
					await this.loadResGroup(resGroupNames[i]);
				}
			}
		}

		loadResGroup(resGroupName:string): Promise<any>{
			return new Promise((resolve, reject)=>{
				let onComplete = ()=>{
					RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onComplete, this);
					resolve();
				};
				let onError = (event: RES.ResourceEvent)=>{
					RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onError, this);
					reject("Group:" + event.groupName + " has failed to load");
				};
				let onProcess = (event: RES.ResourceEvent)=>{
					this._loaded ++;
					if(this._progressCallback){
						this._progressCallback(this._loaded, this._total);
					}
				};
				RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onComplete, this);
				RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onError, this);
				RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onProcess, this);

				RES.loadGroup(resGroupName);
			});
		}

		private static _instance:ResGroupsLoader;
		public static get instance():ResGroupsLoader {
			return this._instance || (this._instance = new ResGroupsLoader());
		}
	}
}
