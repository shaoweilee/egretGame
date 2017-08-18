var GameBackGround = (function (_super) {
    __extends(GameBackGround, _super);
    function GameBackGround() {
        _super.call(this);
    }
    var d = __define,c=GameBackGround;p=c.prototype;
    p.changeBackground = function () {
        this.cacheAsBitmap = false;
        this.removeChildren();
        this.createBackGroundImage();
        this.createMapBg();
        this.createLevelReqBg();
        this.createStepBg();
        this.cacheAsBitmap = true;
    };
    p.createBackGroundImage = function () {
        if (!this.bgImage) {
            this.bgImage = new egret.Bitmap();
        }
        this.bgImage.texture = RES.getRes(GameData.levelBGImageName);
        this.bgImage.width = GameData.stageW;
        this.bgImage.height = GameData.stageH;
        this.addChild(this.bgImage);
        var propbg = new egret.Bitmap();
        propbg.texture = RES.getRes("propbg_png");
        propbg.width = GameData.stageW;
        propbg.height = GameData.stageW / 5 + 20;
        propbg.y = GameData.stageH - propbg.height;
        this.addChild(propbg);
    };
    p.createMapBg = function () {
        if (!this.gridBg) {
            this.gridBg = new Array();
        }
        var grid;
        var gridwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - gridwidth * GameData.MaxColumn;
        for (var i = 0; i < GameData.MaxRow; i++) {
            for (var t = 0; t < GameData.MaxColumn; t++) {
                if (GameData.mapData[i][t] != -1) {
                    if (this.gridBg.length < (i * GameData.MaxRow + t)) {
                        grid = new egret.Bitmap();
                        this.gridBg.push(grid);
                    }
                    else {
                        grid = this.gridBg[i * GameData.MaxRow + t];
                    }
                    grid.width = gridwidth;
                    grid.height = gridwidth;
                    grid.x = 20 + gridwidth * t;
                    grid.y = startY + gridwidth * i;
                    if ((i % 2 == 0 && t % 2 == 0) || (i % 2 == 1 && t % 2 == 1)) {
                        grid.texture = RES.getRes("elementbg1");
                    }
                    else {
                        grid.texture = RES.getRes("elementbg2");
                    }
                    this.addChild(grid);
                }
            }
        }
    };
    p.createLevelReqBg = function () {
        var gridwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("levelreqbg_png");
        bg.width = GameData.levelReq.getLevelReqNum() * (10 + gridwidth) + 20;
        bg.height = gridwidth + 60;
        bg.x = 20;
        bg.y = 50;
        this.addChild(bg);
        var bgtxt = new egret.Bitmap();
        bgtxt.texture = RES.getRes("levelreqtitle_png");
        bgtxt.x = bg.x + (bg.width - bgtxt.width) / 2;
        bgtxt.y = bg.y - 18;
        this.addChild(bgtxt);
    };
    p.createStepBg = function () {
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("levelreqbg_png");
        bg.width = 100;
        bg.height = 100;
        bg.x = GameData.stageW - 110;
        bg.y = 50;
        this.addChild(bg);
        var bgtxt = new egret.Bitmap();
        bgtxt.texture = RES.getRes("sursteptitle_png");
        bgtxt.x = bg.x + (bg.width - bgtxt.width) / 2;
        bgtxt.y = bg.y + 10;
        this.addChild(bgtxt);
    };
    return GameBackGround;
})(egret.Sprite);
egret.registerClass(GameBackGround,"GameBackGround");
//# sourceMappingURL=GameBackGround.js.map