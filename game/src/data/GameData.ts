class GameData {
	public static unMapNum:number = 0;//空白地图块的数量。
	public static mapData:number[][];//真正地图数据。
	public static stepLeft:number = 0;//玩家剩余步数。
	public static stepRequired:number = 0;//完成当前关卡所需要的步数。
	public static elementTypes:number[];//当前关卡出现的元素类型；
	public static levelReq:levelRequire;//过关条件
	public static elements:GameElement[];//游戏元素的对象池,疑点
	public static unUsedElements:number[];//未被使用的元素
	public static levelBGImageName:string = "";//游戏背景图

	public static MaxRow:number = 8;
	public static MaxColumn:number = 8;
	public static currentElementNum:number = 0;//当前元素的能够使用的地图数量
	
	public static initData()//初始化游戏数据。
	{
		GameData.mapData = [];
		for(var i=0; i<GameData.MaxRow; i++)
		{
			var arr:number[] = [];
			for (var t=0; t<GameData.MaxColumn; t++)
			{
				GameData.mapData[t].push(-2);//-1表示当前这块地图无法使用，-2表示是空地图，可以用，但没放东西。
			}
		}
		GameData.levelReq = new levelRequire();

		GameData.elements = [];
		GameData.unUsedElements = [];

		var len:number = GameData.MaxRow * GameData.MaxColumn;
		for(var q=0; q<len; q++)//创建游戏元素
		{
			var ele:GameElement = new GameElement();
			ele.id = q;
			GameData.elements.push(ele);
			GameData.unUsedElements.push(q);
		}
		GameData.stageW = egret.MainContext.instance.stage.stageWidth;
		GameData.stageH = egret.MainContext.instance.stage.stageHeight;//貌似要清理之后再构建？
	}
	public static stageW:number = 0;
	public static stageH:number = 0;
}