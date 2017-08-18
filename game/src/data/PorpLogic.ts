class PropLogic
{
    public static useProp(proptype:number, elLocation:number)
    {
        switch( proptype )
        {
            case 0:
            PropLogic.tongse(elLocation);
            break;
            case 1:
            PropLogic.zhadan(elLocation);
            break;
            case 2:
            PropLogic.zhenghang(elLocation);
            break;
            case 3:
            PropLogic.zhenglie(elLocation);
            break;
            case 4:
            PropLogic.chanzi(elLocation);
            break;
        }
    }
    private static tongse(loc:number)
    {
        linkLogic.lines = [];
        var arr:number[] = [];
        var type:string = GameData.elements[ GameData.mapData[Math.floor(loc/8)][loc % 8] ].type;
        for (var i = 0; i < GameData.MaxRow; i++) 
        {
            for (var t = 0; t < GameData.MaxColumn; t++) 
            {
                if (GameData.mapData[i][t] != -1 && GameData.elements[GameData.mapData[i][t]].type == type) 
                {
                    arr.push(GameData.mapData[i][t]);
                }
            }    
        }
        linkLogic.lines.push( arr );
    }
    private static zhadan(loc:number)
    {
        linkLogic.lines = new Array();
        var i:number = Math.floor(loc / 8);
        var t:number = loc % 8;
        var arr:number[] = new Array();
        arr.push(GameData.elements[GameData.mapData[i][t]].id)
        if (i>0 && GameData.mapData[i-1][t]!=-1) 
        {
            arr.push( GameData.elements[ GameData.mapData[i-1][t] ].id );
        }
        if (i<GameData.MaxRow-1 && GameData.mapData[i+1][t]!=-1) 
        {
            arr.push( GameData.elements[ GameData.mapData[i+1][t] ].id );
        }
        if (t>0 && GameData.mapData[i][t-1]!=-1) 
        {
            arr.push( GameData.elements[ GameData.mapData[i][t-1] ].id );
        }
        if (t<GameData.MaxColumn-1 && GameData.mapData[i][t+1]!=-1) 
        {
            arr.push( GameData.elements[ GameData.mapData[i][t+1] ].id );
        }
    }
    private static zhenghang(loc:number)
    {
        linkLogic.lines = new Array();
        var arr:number[] = new Array();
        var i:number = Math.floor(loc / 8);
        for (var t:number = 0; t < GameData.MaxColumn; t++) 
        {
            if (GameData.mapData[i][t]!=-1) 
            {
                arr.push( GameData.elements[ GameData.mapData[i][t] ].id );
            }
        }
        linkLogic.lines.push(arr);
    }
    private static zhenglie(loc:number)
    {
        linkLogic.lines = new Array();
        var arr:number[] = new Array();
        var t:number = loc % 8;
        for (var i:number = 0; i < GameData.MaxRow; i++) 
        {
            if (GameData.mapData[i][t]!=-1) 
            {
                arr.push( GameData.elements[ GameData.mapData[i][t] ].id );
            }
        }
        linkLogic.lines.push(arr);
    }
    private static chanzi(loc:number)
    {
        linkLogic.lines = new Array();
        linkLogic.lines.push( [GameData.elements[ GameData.mapData[Math.floor(loc / 8)][loc % 8] ].id] );
    }

}