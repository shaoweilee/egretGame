class levelGameDataParse {
	public static parseLevelGameData(val:any)
	{
		GameData.stepLeft = val.step;
		GameData.stepRequired = val.step;
		GameData.elementTypes = val.element;
		GameData.levelBGImageName = val.levelBGImg;
		levelGameDataParse.parseLevelReq( val.levelReq );
	}
	private static parseLevelReq(val:any)
	{
		GameData.levelReq.openChange();
		var len:number = val.length;
		for (var i = 0; i < len; i++) 
		{
			GameData.levelReq.addElement( val[i].type, val[i].num );	
		}
	}
}