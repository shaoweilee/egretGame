var levelGameDataParse = (function () {
    function levelGameDataParse() {
    }
    var d = __define,c=levelGameDataParse;p=c.prototype;
    levelGameDataParse.parseLevelGameData = function (val) {
        GameData.stepLeft = val.step;
        GameData.stepRequired = val.step;
        GameData.elementTypes = val.element;
        GameData.levelBGImageName = val.levelBGImg;
        levelGameDataParse.parseLevelReq(val.levelReq);
    };
    levelGameDataParse.parseLevelReq = function (val) {
        GameData.levelReq.openChange();
        var len = val.length;
        for (var i = 0; i < len; i++) {
            GameData.levelReq.addElement(val[i].type, val[i].num);
        }
    };
    return levelGameDataParse;
})();
egret.registerClass(levelGameDataParse,"levelGameDataParse");
//# sourceMappingURL=levelGameDataParse.js.map