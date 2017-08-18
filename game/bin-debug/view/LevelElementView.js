var LevelElementView = (function (_super) {
    __extends(LevelElementView, _super);
    function LevelElementView() {
        _super.call(this);
        this.eltype = "";
        this.init();
    }
    var d = __define,c=LevelElementView;p=c.prototype;
    d(p, "num"
        ,function () {
            return Number(this.bittext.text);
        }
        ,function (val) {
            if (val <= 0) {
                if (!this.checkmarkbit) {
                    this.checkmarkbit = new egret.Bitmap();
                    this.checkmarkbit.texture = RES.getRes("checkmark_png");
                    this.checkmarkbit.x = (this.bitmap.width - this.checkmarkbit.width) / 2;
                    this.checkmarkbit.y = this.bitmap.height + this.bitmap.y - this.checkmarkbit.height / 2;
                    this.addChild(this.checkmarkbit);
                    this.removeChild(this.bittext);
                }
            }
            else {
                this.bittext.text = val.toString();
            }
        }
    );
    p.init = function () {
        this.touchChildren = false;
        if (!this.bitmap) {
            this.bitmap = new egret.Bitmap();
        }
        var bitwidth = (GameData.stageW - 40) / GameData.MaxColumn;
        this.bitmap.width = bitwidth;
        this.bitmap.height = bitwidth;
        this.addChild(this.bitmap);
        this.bittext = new egret.BitmapText();
        this.bittext.font = RES.getRes("number_fnt");
        this.bittext.text = "0";
        this.bittext.x = (bitwidth - this.bittext.width) / 2;
        this.bittext.y = this.bitmap.height + this.bitmap.y - this.bittext.height / 2;
        this.addChild(this.bittext);
    };
    p.setTexture = function (val) {
        this.bitmap.texture = RES.getRes(val);
    };
    return LevelElementView;
})(egret.Sprite);
egret.registerClass(LevelElementView,"LevelElementView");
//# sourceMappingURL=LevelElementView.js.map