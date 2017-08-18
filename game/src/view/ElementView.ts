class ElementView extends egret.Sprite
{
    private thisparent: egret.Sprite;
    public constructor(tparent: egret.Sprite)
    {
        super();
        this.thisparent = tparent;
        this.init();
    }
    public location:number = 0;

    public _id:number = -1;
    public get id():number
    {
        return this._id
    }
    public set id(val:number)
    {
        this._id = val;
    }





    private bitmap:egret.Bitmap;

    private init() 
    {
        this.touchEnabled = true;
        this.touchChildren = false;
        this.bitmap = new egret.Bitmap();
        var bitwidth:number = (GameData.stageW-40)/GameData.MaxColumn;
        this.bitmap.width = bitwidth - 10;
        this.bitmap.height = bitwidth - 10;
        this.bitmap.x = -1 * bitwidth / 2;
        this.bitmap.y = -1 * bitwidth / 2;
        this.addChild(this.bitmap);
    }

    public setTexture(val:string)
    {
        this.bitmap.texture = RES.getRes(val);
    }




    private _focus:boolean = false;
    public get focus():boolean
    {
        return this._focus;
    }
    private _focusMc:egret.MovieClip;

    public setFocus(val:boolean)
    {
        if (val != this._focus) 
        {
            this._focus = val;
            if (!this._focusMc) 
            {
                var tex = RES.getRes("foucsmc_png");
                var data = RES.getRes("foucsmc_json");
                var mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, tex);
                this._focusMc = new egret.MovieClip(mcf.generateMovieClipData("foucsmc"));
                this._focusMc.x = this._focusMc.width / -2;
                this._focusMc.y = this._focusMc.height / -2;
                this._focusMc.width = this.bitmap.width;
                this._focusMc.height = this.bitmap.height;
            }
            if (val) 
            {
                this.addChild(this._focusMc);
                this._focusMc.play(-1);
            }
            else
            {
                if (this._focusMc.parent) 
                {
                    this._focusMc.stop();
                    this.removeChild(this._focusMc);
                }
            }
        }
    }





    public speed:number = 700;
    public move()
    {
        var tw:egret.Tween = egret.Tween.get(this);
        tw.to({x:this.targetX(), y:this.targetY()}, this.speed, egret.Ease.cubicInOut);
    }

    public show(wait:number)
    {
        var tw:egret.Tween = egret.Tween.get(this);
        tw.wait(wait, false);
        tw.call(this.addThisToParent, this);
        tw.to({x: this.targetX(), y:this.targetY()}, this.speed, egret.Ease.bounceInOut);
    }

    private addThisToParent()
    {
        if (!this.parent) {
            this.thisparent.addChild(this);
        }
    }

    public targetX():number
    {
        var gridwidth:number = (GameData.stageW-40) / GameData.MaxColumn;
        var xx:number = 20 + gridwidth * (this.location % GameData.MaxColumn) + gridwidth / 2 + 5;
        return xx;
    }
    public targetY():number
    {
        var gridwidth:number = (GameData.stageW - 40) / GameData.MaxColumn;
        var startY:number = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - gridwidth * GameData.MaxColumn;
        var yy:number = startY + gridwidth * (Math.floor(this.location / 8)) + gridwidth / 2 + 5;
        return yy;
    }




    public moveAndBack(location:number, isscale:boolean = false)
    {
        var gridwidth:number = (GameData.stageW - 40) / GameData.MaxColumn;
        var xx:number = 20 + gridwidth * (location%GameData.MaxColumn) + gridwidth / 2 + 5;
        var startY:number = (GameData.stageH - (GameData.stageW-30) / 6 -60) - gridwidth * GameData.MaxColumn;
        var yy:number = startY + gridwidth * (Math.floor(location / 8)) + gridwidth / 2 + 5;

        var tw:egret.Tween = egret.Tween.get(this);
        if (isscale) 
        {
            tw.to({x:xx, y:yy, scaleX:1.2, scaleY:1.2}, 300, egret.Ease.cubicOut).call(this.back, this);
        }
        else
        {
            tw.to({x:xx, y:yy, scaleX:0.8, scaleY:0.8}, 300, egret.Ease.cubicOut).call(this.back, this);
        }
    }
    private back()
    {
        var tw:egret.Tween = egret.Tween.get(this);
        tw.to({x:this.targetX(), y:this.targetY(), scaleX:1, scaleY:1}, 300, egret.Ease.cubicOut);
    }


    public moveAndScale(location:number, isscale:boolean = false)
    {
        var gridwidth:number = (GameData.stageW - 40) / GameData.MaxColumn;
        var xx:number = 20 + gridwidth * (location%GameData.MaxColumn) + gridwidth / 2 + 5;
        var startY:number = (GameData.stageH - (GameData.stageW-30) / 6 -60) - gridwidth * GameData.MaxColumn;
        var yy:number = startY + gridwidth * (Math.floor(location / 8)) + gridwidth / 2 + 5;

        var tw:egret.Tween = egret.Tween.get(this);
        if (isscale) 
        {
            tw.to({x:xx, y:yy, scaleX:1.4, scaleY:1.4}, 300, egret.Ease.cubicOut).call(this.backScale, this);
        }
        else
        {
            tw.to({x:xx, y:yy, scaleX:0.6, scaleY:0.6}, 300, egret.Ease.cubicOut).call(this.backScale, this);
        }
    }
    private backScale()
    {
        var tw:egret.Tween = egret.Tween.get(this);
        tw.to({scaleX:1, scaleY:1}, 300, egret.Ease.cubicOut).call(this.canRemove, this);
    }
    private canRemove()
    {
        var evt:ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.REMOVE_ANIMATION_OVER);
        this.dispatchEvent(evt);
    }
    

    public playCurveMove(tx:number, ty:number)
    {
        var tw:egret.Tween = egret.Tween.get(this);
        tw.to({x:tx, y:ty}, 700, egret.Ease.quadOut).call(this.overCurveMove, this);
    }
    private overCurveMove()
    {
        if (this.parent) 
        {
            this.parent.removeChild(this);
        }
        var evt:ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_MAP);        
        this.dispatchEvent(evt);
    }


    public playRemoveAni()
    {
        var tw:egret.Tween = egret.Tween.get(this);
        tw.to({scaleX:1.4, scaleY:1.4}, 300, egret.Ease.cubicInOut).to({scaleX:0.1, scaleY:0.1}, 300, egret.Ease.cubicInOut).call(this.removeAniCall, this);
    }
    private removeAniCall()
    {
        if (this.parent) 
        {
            this.parent.removeChild(this);
        }
        var evt:ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_MAP);        
        this.dispatchEvent(evt);
    }


    public moveNewLocation()
    {
        if (!this.parent) 
        {
            var gridwidth:number = (GameData.stageW-40) / GameData.MaxColumn;
            var startY: number = (GameData.stageH - (GameData.stageW - 30) / 6 - 60) - gridwidth * GameData.MaxColumn;
            this.y = startY - this.width;
            this.scaleX = 1;
            this.scaleY = 1;
            this.x = this.targetX();
            this.thisparent.addChild(this);
        }
        egret.Tween.get(this).to({x:this.targetX(), y:this.targetY()}, this.speed, egret.Ease.bounceOut).call(this.moveNewLocationOver, this);
    }
    private moveNewLocationOver()
    {
        var evt:ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.UPDATE_VIEW_OVER);        
        this.dispatchEvent(evt);
    }
}