var mapDataParse = (function () {
    function mapDataParse() {
    }
    var d = __define,c=mapDataParse;p=c.prototype;
    mapDataParse.createMapData = function (val) {
        var len = val.length;
        GameData.unMapNum = len;
        var index = 0;
        for (var i = 0; i < len; i++) {
            var index = val[i];
            var row = Math.floor(index / GameData.MaxColumn);
            var col = index % GameData.MaxRow;
            GameData.mapData[row][col] = -1;
        }
        GameData.currentElementNum = GameData.MaxRow * GameData.MaxColumn - len;
    };
    return mapDataParse;
})();
egret.registerClass(mapDataParse,"mapDataParse");
//# sourceMappingURL=mapDataParse.js.map