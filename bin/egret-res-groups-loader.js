var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Created by rockyl on 2017/1/22.
 *
 * egret-res-groups-loader
 */
var alien;
(function (alien) {
    var ResGroupsLoader = (function () {
        function ResGroupsLoader() {
        }
        ResGroupsLoader.prototype.checkNeedLoad = function (resGroupNames) {
            var needLoad = false;
            for (var i = 0, li = resGroupNames.length; i < li; i++) {
                if (!RES.isGroupLoaded(resGroupNames[i])) {
                    needLoad = true;
                    break;
                }
            }
            return needLoad;
        };
        ResGroupsLoader.prototype.loadResGroups = function (resGroupNames, progressCallback) {
            if (progressCallback === void 0) { progressCallback = null; }
            return __awaiter(this, void 0, void 0, function () {
                var i, li, i, li;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._progressCallback = progressCallback;
                            this._total = 0;
                            this._loaded = 0;
                            for (i = 0, li = resGroupNames.length; i < li; i++) {
                                if (!RES.isGroupLoaded(resGroupNames[i])) {
                                    this._total += RES.getGroupByName(resGroupNames[i]).length;
                                    break;
                                }
                            }
                            i = 0, li = resGroupNames.length;
                            _a.label = 1;
                        case 1:
                            if (!(i < li)) return [3 /*break*/, 4];
                            if (!!RES.isGroupLoaded(resGroupNames[i])) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.loadResGroup(resGroupNames[i])];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        ResGroupsLoader.prototype.loadResGroup = function (resGroupName) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var onComplete = function () {
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onComplete, _this);
                    resolve();
                };
                var onError = function (event) {
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onError, _this);
                    reject("Group:" + event.groupName + " has failed to load");
                };
                var onProcess = function (event) {
                    _this._loaded++;
                    if (_this._progressCallback) {
                        _this._progressCallback(_this._loaded, _this._total);
                    }
                };
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onComplete, _this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onError, _this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onProcess, _this);
                RES.loadGroup(resGroupName);
            });
        };
        Object.defineProperty(ResGroupsLoader, "instance", {
            get: function () {
                return this._instance || (this._instance = new ResGroupsLoader());
            },
            enumerable: true,
            configurable: true
        });
        return ResGroupsLoader;
    }());
    alien.ResGroupsLoader = ResGroupsLoader;
    __reflect(ResGroupsLoader.prototype, "alien.ResGroupsLoader");
})(alien || (alien = {}));
