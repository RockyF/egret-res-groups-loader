# egret-res-groups-loader
egret res groups loader(Promise)

## install
```npm install egret-res-groups-loader --save```

## example
```javascript
alien.ResGroupsLoader.instance.loadResGroups(resGroupNames).then(
	()=>{
		//do something
	},()=>{
    //do something
  });
```