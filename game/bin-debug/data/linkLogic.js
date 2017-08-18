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
                        currentType = GameData.elements[GameData[i][t]].type; //没有达到消除条件，那么重置一下类型和计数器。
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
                    } //没有达到消除条件，就从头开始
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
                    if (t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 1] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i][t + 1]].type) {
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
                        if (t < (GameData.MaxColumn - 1) && GameData.mapData[i][t + 2] != -1) {
                            if (i > 0 && t < (GameData.MaxColumn - 2) && GameData.mapData[i - 1][t + 2] && GameData.mapData[i - 1][t + 2] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i - 1][t + 2]].type) {
                                return true;
                            }
                            if (i < (GameData.MaxRow - 1) && t < (GameData.MaxColumn - 2) && GameData.mapData[i + 1][t + 2] && GameData.mapData[i + 1][t + 2] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i + 1][t + 2]].type) {
                                return true;
                            }
                            if (t < (GameData.MaxColumn - 3) && GameData.mapData[i][t + 3] && GameData.mapData[i][t + 3] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i][t + 3]].type) {
                                return true;
                            }
                        }
                    } //横向二连穷举完毕
                    if (i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i + 1][t]].type) {
                        if (i > 0 && GameData.mapData[i - 1][t] != -1) {
                            if (t > 0 && GameData.mapData[i - 1][t - 1] && GameData.mapData[i - 1][t - 1] != -1 && GameData.elements[GameData.mapData[i - 1][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                return true;
                            }
                            if (t < GameData.MaxColumn - 1 && GameData.mapData[i - 1][t + 1] && GameData.mapData[i - 1][t + 1] != -1 && GameData.elements[GameData.mapData[i - 1][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                return true;
                            }
                            if (i > 1 && GameData.mapData[i - 2][t] && GameData.mapData[i - 2][t] != -1 && GameData.elements[GameData.mapData[i - 2][t]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                return true;
                            }
                        }
                        if (i < (GameData.MaxRow - 2) && GameData.mapData[i + 2][t] != -1) {
                            if (t > 0 && GameData.mapData[i + 2][t - 1] && GameData.mapData[i + 2][t - 1] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i + 2][t - 1]].type) {
                                return true;
                            }
                            if (t < (GameData.MaxColumn - 1) && GameData.mapData[i + 2][t + 1] && GameData.mapData[i + 2][t + 1] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i + 2][t + 1]].type) {
                                return true;
                            }
                            if (i < (GameData.MaxRow - 3) && GameData.mapData[i + 3][t] && GameData.mapData[i + 3][t] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i + 3][t]].type) {
                                return true;
                            }
                        }
                    } //纵向二连穷举完毕
                    //方式二开始
                    //横向
                    if (t < GameData.MaxColumn - 2 && GameData.mapData[i][t + 2] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i][t + 2]].type) {
                        if (GameData.mapData[i][t + 1] != -1) {
                            if (i > 0 && GameData.mapData[i - 1][t + 1] && GameData.mapData[i - 1][t + 1] != -1 && GameData.elements[GameData.mapData[i - 1][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                return true;
                            }
                            if (i < GameData.MaxRow - 1 && GameData.mapData[i + 1][t + 1] && GameData.mapData[i + 1][t + 1] != -1 && GameData.elements[GameData.mapData[i + 1][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                return true;
                            }
                        }
                    }
                    //纵向
                    if (i < GameData.MaxRow - 2 && GameData.mapData[i + 2][t] != -1 && GameData.elements[GameData.mapData[i][t]].type == GameData.elements[GameData.mapData[i + 2][t]].type) {
                        if (GameData.mapData[i + 1][t] != -1) {
                            if (t > 0 && GameData.mapData[i + 1][t - 1] && GameData.mapData[i + 1][t - 1] != -1 && GameData.elements[GameData.mapData[i + 1][t - 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                return true;
                            }
                            if (t < GameData.MaxColumn - 1 && GameData.mapData[i + 1][t + 1] && GameData.mapData[i + 1][t + 1] != -1 && GameData.elements[GameData.mapData[i + 1][t + 1]].type == GameData.elements[GameData.mapData[i][t]].type) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    linkLogic.canMove = function (id1, id2) {
        var l1row = Math.floor(GameData.elements[id1].locataion / GameData.MaxRow);
        var l1col = GameData.elements[id1].locataion % GameData.MaxColumn;
        var l2row = Math.floor(GameData.elements[id2].locataion / GameData.MaxRow);
        var l2col = GameData.elements[id2].locataion % GameData.MaxColumn;
        if (l1row == l2row) {
            if (Math.abs(l1col - l2col) == 1) {
                return true;
            }
        }
        if (l1col == l2col) {
            if (Math.abs(l1row - l2row) == 1) {
                return true;
            }
        }
        return false;
    };
    linkLogic.changeOrder = function () {
        var arr = [];
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    arr.push(GameData.mapData[i][t]);
                }
            }
        }
        var index = 0;
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                index = Math.floor(Math.random() * arr.length);
                GameData.mapData[i][t] = arr[index];
                GameData.elements[arr[index]].locataion = i * GameData.MaxColumn + t;
                arr.slice(index, i);
            }
        }
    };
    linkLogic.isHaveLineByIndex = function (p1, p2) {
        var p1n = p1;
        var p2n = p2;
        var p1id = GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow];
        var p2id = GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow];
        GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow] = p2id;
        GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow] = p1id;
        var rel = linkLogic.isHaveLine();
        if (rel) {
            GameData.elements[p1id].locataion = p2;
            GameData.elements[p2id].locataion = p1;
            return true;
        }
        else {
            GameData.mapData[Math.floor(p1 / GameData.MaxColumn)][p1 % GameData.MaxRow] = p1id;
            GameData.mapData[Math.floor(p2 / GameData.MaxColumn)][p2 % GameData.MaxRow] = p2id;
        }
        return false;
    };
    return linkLogic;
})();
egret.registerClass(linkLogic,"linkLogic");
//# sourceMappingURL=linkLogic.js.map