var ElementView = (function (_super) {
    __extends(ElementView, _super);
    function ElementView(tparent) {
        _super.call(this);
        this.location = 0;
        this._id = -1;
        this._focus = false;
        this.speed = 700;
        this.thisparent = tparent;
        this.init();
    }
    var d = __define,c=ElementView;p=c.prototype;
    d(p, "id"
        ,function () {
            return this._id;
        }
        ,function (val) {
            this._id = val;
        }
    );
    p.init = function () {
        this.touchEnabled = true;
        this.touchChildren = false;
        this.bitmap = new egret.Bitmap();
        var bitwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        this.bitmap.width = bitwidth - 10;
        this.bitmap.height = bitwidth - 10;
        this.bitmap.x = -1 * bitwidth / 2;
        this.bitmap.y = -1 * bitwidth / 2;
        this.addChild(this.bitmap);
    };
    p.setTexture = function (val) {
        this.bitmap.texture = RES.getRes(val);
    };
    d(p, "focus"
        ,function () {
            return this._focus;
        }
    );
    p.setFocus = function (val) {
        if (val != this._focus) {
            this._focus = val;
            if (!this._focusMc) {
                var tex = RES.getRes("foucsmc_png");
                var data = RES.getRes("foucsmc_json");
                var mcf = new egret.MovieClipDataFactory(data, tex);
                this._focusMc = new egret.MovieClip(mcf.generateMovieClipData("foucsmc"));
                this._focusMc.x = this._focusMc.width / -2;
                this._focusMc.y = this._focusMc.height / -2;
                this._focusMc.width = this.bitmap.width;
                this._focusMc.height = this.bitmap.height;
            }
            if (val) {
                this.addChild(this._focusMc);
                this._focusMc.play(-1);
            }
            else {
                if (this._focusMc.parent) {
                    this._focusMc.stop();
                    this.removeChild(this._focusMc);
                }
            }
        }
    };
    p.move = function () {
        var tw = egret.Tween.get(this);
        tw.to({ x: this.targetX(), y: this.targetY() }, this.speed, egret.Ease.cubicInOut);
    };
    p.show = function (wait) {
        var tw = egret.Tween.get(this);
        tw.wait(wait, false);
        tw.call(this.addThisToParent, this);
        tw.to({ x: this.targetX(), y: this.targetY() }, this.speed, egret.Ease.bounceInOut);
    };
    p.addThisToParent = function () {
        if (!this.parent) {
            this.thisparent.addChild(this);
        }
    };
    p.targetX = function () {
        var gridwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var xx = 20 + gridwidth * (this.location % GameData.MaxColumn) + gridwidth / 2 + 5;
        return xx;
    };
    p.targetY = function () {
        var gridwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - gridwidth * GameData.MaxColumn;
        var yy = startY + gridwidth * (Math.floor(this.location / 8)) + gridwidth / 2 + 5;
        return yy;
    };
    p.moveAndBack = function (location, isscale) {
        if (isscale === void 0) { isscale = false; }
        var gridwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var xx = 20 + gridwidth * (location % GameData.MaxColumn) + gridwidth / 2 + 5;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - gridwidth * GameData.MaxColumn;
        var yy = startY + gridwidth * (Math.floor(location / 8)) + gridwidth / 2 + 5;
        var tw = egret.Tween.get(this);
        if (isscale) {
            tw.to({ x: xx, y: yy, scaleX: 1.2, scaleY: 1.2 }, 300, egret.Ease.cubicOut).call(this.back, this);
        }
        else {
            tw.to({ x: xx, y: yy, scaleX: 0.8, scaleY: 0.8 }, 300, egret.Ease.cubicOut).call(this.back, this);
        }
    };
    p.back = function () {
        var tw = egret.Tween.get(this);
        tw.to({ x: this.targetX(), y: this.targetY(), scaleX: 1, scaleY: 1 }, 300, egret.Ease.cubicOut);
    };
    p.moveAndScale = function (location, isscale) {
        if (isscale === void 0) { isscale = false; }
        var gridwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        var xx = 20 + gridwidth * (location % GameData.MaxColumn) + gridwidth / 2 + 5;
        var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - gridwidth * GameData.MaxColumn;
        var yy = startY + gridwidth * (Math.floor(location / 8)) + gridwidth / 2 + 5;
        var tw = egret.Tween.get(this);
        if (isscale) {
            tw.to({ x: xx, y: yy, scaleX: 1.4, scaleY: 1.4 }, 300, egret.Ease.cubicOut).call(this.backScale, this);
        }
        else {
            tw.to({ x: xx, y: yy, scaleX: 0.6, scaleY: 0.6 }, 300, egret.Ease.cubicOut).call(this.backScale, this);
        }
    };
    p.backScale = function () {
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.cubicOut).call(this.canRemove, this);
    };
    p.canRemove = function () {
        var evt = new ElementViewManageEvent(ElementViewManageEvent.REMOVE_ANIMATION_OVER);
        this.dispatchEvent(evt);
    };
    p.playCurveMove = function (tx, ty) {
        var tw = egret.Tween.get(this);
        tw.to({ x: tx, y: ty }, 700, egret.Ease.quadOut).call(this.overCurveMove, this);
    };
    p.overCurveMove = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var evt = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_MAP);
        this.dispatchEvent(evt);
    };
    p.playRemoveAni = function () {
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1.4, scaleY: 1.4 }, 300, egret.Ease.cubicInOut).to({ scaleX: 0.1, scaleY: 0.1 }, 300, egret.Ease.cubicInOut).call(this.removeAniCall, this);
    };
    p.removeAniCall = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        var evt = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_MAP);
        this.dispatchEvent(evt);
    };
    p.moveNewLocation = function () {
        if (!this.parent) {
            var gridwidth = (GameData.stageW - 40) / GameData.MaxColumn;
            var startY = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - gridwidth * GameData.MaxColumn;
            this.y = startY - this.width;
            this.scaleX = 1;
            this.scaleY = 1;
            this.x = this.targetX();
            this.thisparent.addChild(this);
        }
        egret.Tween.get(this).to({ x: this.targetX(), y: this.targetY() }, this.speed, egret.Ease.bounceOut).call(this.moveNewLocationOver, this);
    };
    p.moveNewLocationOver = function () {
        var evt = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_VIEW_OVER);
        this.dispatchEvent(evt);
    };
    return ElementView;
})(egret.Sprite);
egret.registerClass(ElementView,"ElementView");
//# sourceMappingURL=ElementView.js.map