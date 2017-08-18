class GameBackGround extends egret.Sprite 
{
    public constructor() 
    {
        super();
    }

    public changeBackground():void
    {
        this.cacheAsBitmap = false;
        this.removeChildren();
        this.createBackGroundImage();
        this.createMapBg();
        this.createLevelReqBg();
        this.createStepBg();
        this.cacheAsBitmap = true;
    }

    private bgImage:egret.Bitmap;
    private gridBg:egret.Bitmap[];

    private createBackGroundImage()
    {
        if (!this.bgImage) 
        {
            this.bgImage = new egret.Bitmap();
        }
        this.bgImage.texture = RES.getRes( GameData.levelBGImageName );
        this.bgImage.width = GameData.stageW;
        this.bgImage.height = GameData.stageH;
        this.addChild(this.bgImage);

        var propbg:egret.Bitmap = new egret.Bitmap();
        propbg.texture = RES.getRes("propbg_png");
        propbg.width = GameData.stageW;
        propbg.height = GameData.stageW / 5 + 20;
        propbg.y = GameData.stageH - propbg.height;
        this.addChild(propbg);
    }
    private createMapBg()
    {
        if (!this.gridBg) 
        {
            this.gridBg = new Array();
        }
        var grid: egret.Bitmap;
        var gridwidth:number = (GameData.stageW-40)/GameData.MaxColumn;
        var startY:number = (GameData.stageH - (GameData.stageW-30)/6-60) - gridwidth * GameData.MaxColumn;
        for (var i:number = 0; i < GameData.MaxRow; i++) 
        {
            for (var t:number = 0; t < GameData.MaxColumn; t++) 
            {
                if (GameData.mapData[i][t] != -1) 
                {
                    if (this.gridBg.length < (i*GameData.MaxRow + t)) 
                    {
                        grid = new egret.Bitmap();
                        this.gridBg.push(grid);
                    }
                    else
                    {
                        grid = this.gridBg[ i*GameData.MaxRow + t ];
                    }

                    grid.width = gridwidth;
                    grid.height = gridwidth;
                    grid.x = 20+gridwidth*t;
                    grid.y = startY + gridwidth * i;
                    if ( (i%2==0 && t%2==0) || (i%2==1 && t%2 ==1) ) 
                    {
                        grid.texture = RES.getRes("elementbg1");
                    } 
                    else 
                    {
                        grid.texture = RES.getRes("elementbg2");
                    }
                    this.addChild(grid);
                } 
            }
        }
    }

    private createLevelReqBg()
    {
        var gridwidth:number = (GameData.stageW-40) / GameData.MaxColumn;
        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("levelreqbg_png");
        bg.width = GameData.levelReq.getLevelReqNum() * (10+gridwidth) + 20;
        bg.height = gridwidth + 60;
        bg.x = 20;
        bg.y = 50;
        this.addChild(bg);

        var bgtxt:egret.Bitmap = new egret.Bitmap();
        bgtxt.texture = RES.getRes("levelreqtitle_png");
        bgtxt.x = bg.x + (bg.width - bgtxt.width) / 2;
        bgtxt.y = bg.y - 18;
        this.addChild(bgtxt);
    }

    private createStepBg()
    {
        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("levelreqbg_png");
        bg.width = 100;
        bg.height = 100;
        bg.x = GameData.stageW - 110;
        bg.y = 50;
        this.addChild(bg);

        var bgtxt: egret.Bitmap = new egret.Bitmap();
        bgtxt.texture = RES.getRes("sursteptitle_png");
        bgtxt.x = bg.x + (bg.width - bgtxt.width) / 2;
        bgtxt.y = bg.y + 10;
        this.addChild(bgtxt);
    }
}