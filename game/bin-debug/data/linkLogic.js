var linkLogic = (function () {
    function linkLogic() {
    }
    var d = __define,c=linkLogic;p=c.prototype;
    linkLogic.isHaveLine = function () {
        linkLogic.lines = [];
        var currentType = "";
        var typeNum = 0;
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    if (currentType != GameData.elements[GameData[i][t]].type) {
                        if (typeNum >= 3) {
                            var arr = [];
                            for (var q = 0; q < typeNum; q++) {
                                arr.push(GameData.mapData[i][t - q - 1]);
                            }
                            linkLogic.lines.push(arr);
                        }
                        currentType = GameData.elements[GameData[i][t]].type;
                        typeNum = 1;
                    }
                    else {
                        typeNum++;
                    }
                }
                else {
                    if (typeNum >= 3) {
                        var arr = [];
                        for (var q = 0; q < typeNum; q++) {
                            arr.push(GameData.mapData[i][t - q - 1]);
                        }
                        linkLogic.lines.push(arr);
                    }
                    currentType = "";
                    typeNum = 0;
                }
            }
            if (typeNum >= 3) {
                var arr = [];
                for (var q = 0; q < typeNum; q++) {
                    arr.push(GameData.mapData[i][t - q - 1]);
                }
                linkLogic.lines.push(arr);
            }
            currentType = "";
            typeNum = 0;
        }
        for (i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[t][i] != -1) {
                    if (currentType != GameData.elements[GameData.mapData[t][i]].type) {
                        if (typeNum >= 3) {
                            var arr = [];
                            for (var q = 0; q < typeNum; q++) {
                                arr.push(GameData.mapData[t - q - 1][i]);
                            }
                            linkLogic.lines.push(arr);
                        }
                        currentType = GameData.elements[GameData.mapData[t][i]].type;
                        typeNum = 1;
                    }
                    else {
                        typeNum++;
                    }
                }
                else {
                    if (typeNum >= 3) {
                        var arr = [];
                        for (var q = 0; q < typeNum; q++) {
                            arr.push(GameData.mapData[t - q - 1][i]);
                        }
                        linkLogic.lines.push(arr);
                    }
                    currentType = "";
                    typeNum = 0;
                }
            }
            if (typeNum >= 3) {
                var arr = [];
                for (var q = 0; q < typeNum; q++) {
                    arr.push(GameData.mapData[t - q - 1][i]);
                }
                linkLogic.lines.push(arr);
            }
            currentType = "";
            typeNum = 0;
        }
        if (linkLogic.lines.length != 0) {
            return true;
        }
        return false;
    };
    linkLogic.isNextHaveLine = function () {
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    if (t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 1] != -1 && GameData.elements[GameData[i][t]].type == GameData.elements[GameData[i][t + 1]].type) {
                        if (t > 0 && GameData.mapData[i][t - 1] != -1) {
                            if (i > 0 && t > 0 && GameData.mapData[i - 1][t - 1] && GameData.mapData[i - 1][t - 1] != -1 && GameData.elements[GameData.mapData[i - 1][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                return true;
                            }
                            if (i < (GameData.MaxRow - 1) && t > 0 && GameData.mapData[i + 1][t - 1] && GameData.mapData[i + 1][t - 1] != -1 && GameData.elements[GameData.mapData[i + 1][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                return true;
                            }
                            if (t > 1 && GameData.mapData[i][t - 2] && GameData.mapData[i][t - 2] != -1 && GameData.elements[GameData.mapData[i][t - 2]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    };
    return linkLogic;
})();
egret.registerClass(linkLogic,"linkLogic");
//# sourceMappingURL=linkLogic.js.map