class LevelElementView extends egret.Sprite
{
    public constructor()
    {
        super();
        this.init();
    }

    public eltype:string = "";

    public set num(val:number)
    {
        if (val <= 0) 
        {
            if (!this.checkmarkbit) 
            {
                this.checkmarkbit = new egret.Bitmap();
                this.checkmarkbit.texture = RES.getRes("checkmark_png");
                this.checkmarkbit.x = (this.bitmap.width - this.checkmarkbit.width) / 2;
                this.checkmarkbit.y = this.bitmap.height + this.bitmap.y - this.checkmarkbit.height / 2;
                this.addChild(this.checkmarkbit);
                this.removeChild(this.bittext);
            }
        } 
        else 
        {
            this.bittext.text = val.toString();
        }
    }
    public get num():number
    {
        return Number(this.bittext.text);
    }
    private bitmap:egret.Bitmap;
    private checkmarkbit:egret.Bitmap;
    private bittext:egret.BitmapText;
    private init()
    {
        this.touchChildren = false;
        if (!this.bitmap) 
        {
            this.bitmap = new egret.Bitmap();
        }
        var bitwidth:number = (GameData.stageW - 40) / GameData.MaxColumn;
        this.bitmap.width = bitwidth;
        this.bitmap.height = bitwidth;
        this.addChild(this.bitmap);

        this.bittext = new egret.BitmapText();
        this.bittext.font = RES.getRes("number_fnt");
        this.bittext.text = "0";
        this.bittext.x = (bitwidth - this.bittext.width) / 2;
        this.bittext.y = this.bitmap.height + this.bitmap.y - this.bittext.height / 2;
        this.addChild(this.bittext);
    }
    public setTexture(val:string)
    {
        this.bitmap.texture = RES.getRes(val);
    }
}