class mapDataParse {
	public static createMapData(val:number[]):void
	{
		var len:number = val.length;
		GameData.unMapNum = len;
		var index:number = 0;
		for (var i = 0; i < len; i++) {
			var index = val[i];
			var row:number = Math.floor( index/GameData.MaxColumn );
			var col:number = index % GameData.MaxRow;
			GameData.mapData[row][col] = -1;
		}
		GameData.currentElementNum = GameData.MaxRow * GameData.MaxColumn - len;
	}
}