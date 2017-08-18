class GameLogic {
    private _gameStage:egret.Sprite;
    public constructor(gamestage:egret.Sprite) {
        this._gameStage = gamestage;
        this.init();
    }

    private evm:ElementViewManage;
    private levm:LevelReqViewManage;
    private mapc:MapContorl;
    private pvm:PropViewManage;
    private init(){
        GameData.initData();

        var leveldata = RES.getRes("l1");
        mapDataParse.createMapData(leveldata.map);
        levelGameDataParse.parseLevelGameData(leveldata);

        this.mapc = new MapContorl();
        this.mapc.createElementAllMap();

        var gbg:GameBackGround = new GameBackGround();
        this._gameStage.addChild(gbg);
        gbg.changeBackground();

        var lec:egret.Sprite = new egret.Sprite();
        this._gameStage.addChild(lec);
        this.levm = new LevelReqViewManage(lec);
        this.levm.createCurrentLevelReq();

        var pvmc:egret.Sprite = new egret.Sprite();
        this._gameStage.addChild(pvmc);
        this.pvm = new PropViewManage(pvmc);

        var cc:egret.Sprite = new egret.Sprite();
        this._gameStage.addChild(cc);
        this.evm = new ElementViewManage(cc);
        this.evm.showAllElement();
        this.evm.addEventListener(ElementViewManageEvent.TAP_TWO_ELEMENT, this.viewTouchTap, this);
        this.evm.addEventListener(ElementViewManageEvent.REMOVE_ANIMATION_OVER, this.removeAniOver, this);
        this.evm.addEventListener(ElementViewManageEvent.UPDATE_MAP, this.createNewElement, this);
        this.evm.addEventListener(ElementViewManageEvent.UPDATE_VIEW_OVER, this.checkOtherElementLink, this);
        this.evm.addEventListener(ElementViewManageEvent.USE_PROP_CLICK, this.usePropClick, this);
    }

    private viewTouchTap(evt:ElementViewManageEvent){
        var rel:boolean = linkLogic.canMove(evt.ele1, evt.ele2);
        if (rel) {
            var linerel:boolean = linkLogic.isHaveLineByIndex(GameData.elements[evt.ele1].locataion, GameData.elements[evt.ele2].locataion);
            if (linerel) {
                this.evm.changeLocationAndScale(evt.ele1, evt.ele2);
                GameData.stepLeft--;
                this.levm.updateStep();
            }
            else{
                this.evm.changeLocationAndBack(evt.ele1, evt.ele2);
            }
        }
        else{
            this.evm.setNewElementFocus(evt.ele2);
        }
    }


    private removeAniOver(evt:ElementViewManageEvent){
        var len:number = linkLogic.lines.length;
        var rel:boolean;
        for (var i:number = 0; i < len; i++) {
            var etype:string = "";
            var l:number = linkLogic.lines[i].length;
            for (var t:number = 0; t < l; t++) {
                etype = GameData.elements[linkLogic.lines[i][t]].type;
                rel = this.levm.haveReqType(etype);
                if (rel) {
                    var p:egret.Point = this.levm.getPointByType(etype);
                    GameData.levelReq.changeReqNum(etype, 1);
                    this.levm.update();
                    this.evm.playReqRemoveAn(linkLogic.lines[i][t], p.x, p.y);
                }
                else{
                    this.evm.playRemoveAni(linkLogic.lines[i][t]);
                }
            }
        }
    }


    private createNewElement(evt:ElementViewManageEvent){
        this.mapc.undateMapLocation();
        this.evm.updateMapData();
    }

    private checkOtherElementLink(evt:ElementViewManageEvent){
        if (linkLogic.isHaveLine()) {
            this.removeAniOver(null);
        }
        else{
            if (!linkLogic.isNextHaveLine()) {
                var rel:boolean = false;
                var next:boolean = true;
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
    }


    private gameoverpanel:GameOverPanel;
    private isGameOver(){
        if (!this.gameoverpanel) {
            if (GameData.stepLeft == 0) {
                this.gameoverpanel = new GameOverPanel();
                this._gameStage.addChild(this.gameoverpanel);
                if (GameData.levelReq.isClear()) {
                    this.gameoverpanel.show(true);
                }
                else{
                    this.gameoverpanel.show(false);
                }
            }
            else{
                if (GameData.levelReq.isClear()) {
                    this.gameoverpanel = new GameOverPanel();
                    this._gameStage.addChild(this.gameoverpanel);
                    this.gameoverpanel.show(true);
                }
            }
        }
    }

    private usePropClick(evt:ElementViewManageEvent){
        PropLogic.useProp(PropViewManage.proptype, evt.propToElementLocation);
        this.pvm.useProp();
        this.removeAniOver(null);
    }
}