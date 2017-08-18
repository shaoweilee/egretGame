var GameLogic = (function () {
    function GameLogic(gamestage) {
        this._gameStage = gamestage;
        this.init();
    }
    var d = __define,c=GameLogic;p=c.prototype;
    p.init = function () {
        GameData.initData();
        var leveldata = RES.getRes("l1");
        mapDataParse.createMapData(leveldata.map);
        levelGameDataParse.parseLevelGameData(leveldata);
        this.mapc = new MapContorl();
        this.mapc.createElementAllMap();
        var gbg = new GameBackGround();
        this._gameStage.addChild(gbg);
        gbg.changeBackground();
        var lec = new egret.Sprite();
        this._gameStage.addChild(lec);
        this.levm = new LevelReqViewManage(lec);
        this.levm.createCurrentLevelReq();
        var pvmc = new egret.Sprite();
        this._gameStage.addChild(pvmc);
        this.pvm = new PropViewManage(pvmc);
        var cc = new egret.Sprite();
        this._gameStage.addChild(cc);
        this.evm = new ElementViewManage(cc);
        this.evm.showAllElement();
        this.evm.addEventListener(ElementViewManageEvent.TAP_TWO_ELEMENT, this.viewTouchTap, this);
        this.evm.addEventListener(ElementViewManageEvent.REMOVE_ANIMATION_OVER, this.removeAniOver, this);
        this.evm.addEventListener(ElementViewManageEvent.UPDATE_MAP, this.createNewElement, this);
        this.evm.addEventListener(ElementViewManageEvent.UPDATE_VIEW_OVER, this.checkOtherElementLink, this);
        this.evm.addEventListener(ElementViewManageEvent.USE_PROP_CLICK, this.usePropClick, this);
    };
    p.viewTouchTap = function (evt) {
        var rel = linkLogic.canMove(evt.ele1, evt.ele2);
        if (rel) {
            var linerel = linkLogic.isHaveLineByIndex(GameData.elements[evt.ele1].locataion, GameData.elements[evt.ele2].locataion);
            if (linerel) {
                this.evm.changeLocationAndScale(evt.ele1, evt.ele2);
                GameData.stepLeft--;
                this.levm.updateStep();
            }
            else {
                this.evm.changeLocationAndBack(evt.ele1, evt.ele2);
            }
        }
        else {
            this.evm.setNewElementFocus(evt.ele2);
        }
    };
    p.removeAniOver = function (evt) {
        var len = linkLogic.lines.length;
        var rel;
        for (var i = 0; i < len; i++) {
            var etype = "";
            var l = linkLogic.lines[i].length;
            for (var t = 0; t < l; t++) {
                etype = GameData.elements[linkLogic.lines[i][t]].type;
                rel = this.levm.haveReqType(etype);
                if (rel) {
                    var p = this.levm.getPointByType(etype);
                    GameData.levelReq.changeReqNum(etype, 1);
                    this.levm.update();
                    this.evm.playReqRemoveAn(linkLogic.lines[i][t], p.x, p.y);
                }
                else {
                    this.evm.playRemoveAni(linkLogic.lines[i][t]);
                }
            }
        }
    };
    p.createNewElement = function (evt) {
        this.mapc.undateMapLocation();
        this.evm.updateMapData();
    };
    p.checkOtherElementLink = function (evt) {
        if (linkLogic.isHaveLine()) {
            this.removeAniOver(null);
        }
        else {
            if (!linkLogic.isNextHaveLine()) {
                var rel = false;
                var next = true;
                while (next) {
                    linkLogic.changeOrder();
                    if (!linkLogic.isHaveLine()) {
                        if (linkLogic.isNextHaveLine()) {
                            next = false;
                            rel = true;
                        }
                    }
                }
                if (rel) {
                    this.evm.updateOrder();
                }
            }
        }
        this.isGameOver();
    };
    p.isGameOver = function () {
        if (!this.gameoverpanel) {
            if (GameData.stepLeft == 0) {
                this.gameoverpanel = new GameOverPanel();
                this._gameStage.addChild(this.gameoverpanel);
                if (GameData.levelReq.isClear()) {
                    this.gameoverpanel.show(true);
                }
                else {
                    this.gameoverpanel.show(false);
                }
            }
            else {
                if (GameData.levelReq.isClear()) {
                    this.gameoverpanel = new GameOverPanel();
                    this._gameStage.addChild(this.gameoverpanel);
                    this.gameoverpanel.show(true);
                }
            }
        }
    };
    p.usePropClick = function (evt) {
        PropLogic.useProp(PropViewManage.proptype, evt.propToElementLocation);
        this.pvm.useProp();
        this.removeAniOver(null);
    };
    return GameLogic;
})();
egret.registerClass(GameLogic,"GameLogic");
//# sourceMappingURL=GameLogic.js.map