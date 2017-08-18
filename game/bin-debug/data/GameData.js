var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData;p=c.prototype;
    GameData.initData = function () {
        GameData.mapData = [];
        for (var i = 0; i < GameData.MaxRow; i++) {
            var arr = [];
            for (var t = 0; t < GameData.MaxColumn; t++) {
                GameData.mapData[t].push(-2); //-1表示当前这块地图无法使用，-2表示是空地图，可以用，但没放东西。
            }
        }
        GameData.levelReq = new levelRequire();
        GameData.elements = [];
        GameData.unUsedElements = [];
        var len = GameData.MaxRow * GameData.MaxColumn;
        for (var q = 0; q < len; q++) {
            var ele = new GameElement();
            ele.id = q;
            GameData.elements.push(ele);
            GameData.unUsedElements.push(q);
        }
        GameData.stageW = egret.MainContext.instance.stage.stageWidth;
        GameData.stageH = egret.MainContext.instance.stage.stageHeight; //貌似要清理之后再构建？
    };
    GameData.unMapNum = 0; //空白地图块的数量。
    GameData.stepLeft = 0; //玩家剩余步数。
    GameData.stepRequired = 0; //完成当前关卡所需要的步数。
    GameData.levelBGImageName = ""; //游戏背景图
    GameData.MaxRow = 8;
    GameData.MaxColumn = 8;
    GameData.currentElementNum = 0; //当前元素的能够使用的地图数量
    GameData.stageW = 0;
    GameData.stageH = 0;
    return GameData;
})();
egret.registerClass(GameData,"GameData");
//# sourceMappingURL=GameData.js.map