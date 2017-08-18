var LevelReqViewManage = (function () {
    function LevelReqViewManage(layer) {
        this._layer = layer;
        this.init();
    }
    var d = __define,c=LevelReqViewManage;p=c.prototype;
    p.init = function () {
        this.elements = new Array();
    };
    p.createCurrentLevelReq = function () {
        var len = GameData.levelReq.getLevelReqNum();
        var el;
        for (var i = 0; i < len; i++) {
            if (this.elements.length <= i) {
                el = new LevelElementView();
                this.elements.push(el);
            }
            else {
                el = this.elements[i];
            }
            el.eltype = GameData.levelReq.reqElements[i].type;
            el.setTexture("e" + el.eltype + "_png");
            el.x = 43 + (5 + el.width) * i;
            el.y = 95;
            el.num = GameData.levelReq.reqElements[i].num;
            this._layer.addChild(el);
        }
        if (!this.stepNumText) {
            this.stepNumText = new egret.BitmapText();
            this.stepNumText.font = RES.getRes("number_fnt");
            this.stepNumText.x = GameData.stageW - 95;
            this.stepNumText.y = 90;
            this.stepNumText.scaleX = 1.5;
            this.stepNumText.scaleY = 1.5;
            this._layer.addChild(this.stepNumText);
            this.stepNumText.text = GameData.stepLeft.toString();
        }
    };
    p.haveReqType = function (type) {
        var l = this.elements.length;
        for (var i = 0; i < l; i++) {
            if (this.elements[i].eltype == type) {
                return true;
            }
        }
        return false;
    };
    p.getPointByType = function (type) {
        var p = new egret.Point();
        var l = this.elements.length;
        for (var i = 0; i < l; i++) {
            if (this.elements[i].eltype == type) {
                p.x = this.elements[i].x + this.elements[i].width / 2;
                p.y = this.elements[i].y + this.elements[i].height / 2;
            }
        }
        return p;
    };
    p.update = function () {
        var len = GameData.levelReq.getLevelReqNum();
        for (var i = 0; i < len; i++) {
            this.elements[i].num = GameData.levelReq.reqElements[i].num;
        }
    };
    p.updateStep = function () {
        this.stepNumText.text = GameData.stepLeft.toString();
    };
    return LevelReqViewManage;
})();
egret.registerClass(LevelReqViewManage,"LevelReqViewManage");
//# sourceMappingURL=LevelReqViewManage.js.map